import OpenAI from 'openai';

// Initialize OpenAI-compatible client (Works with Groq, Ollama, OpenAI)
const isOllama = process.env.AI_PROVIDER === 'ollama';
const isGroq = process.env.AI_PROVIDER === 'groq';

const getClient = () => {
    const apiKey = isGroq ? process.env.GROQ_API_KEY :
        isOllama ? 'ollama' :
            process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    return new OpenAI({
        apiKey,
        baseURL: isGroq ? 'https://api.groq.com/openai/v1' :
            isOllama ? 'http://localhost:11434/v1' :
                undefined,
    });
};

const MODEL = isGroq ? 'llama-3.3-70b-versatile' :
    isOllama ? 'llama3' :
        'gpt-4o-mini';

// System prompt for the military career advisor
const SYSTEM_PROMPT = `You are a friendly and professional military career advisor. Your name is Caprica.

You help TWO types of users:
1. VETERANS seeking civilian careers - help them translate MOS to civilian jobs
2. FUTURE RECRUITS considering military service - help them explore branches and MOS options

Your role is to:
1. Welcome users and quickly identify if they're a veteran or exploring military
2. For VETERANS: Learn about their MOS, years of service, skills, and career goals
3. For FUTURE RECRUITS: Learn about their interests, help them find the right MOS, and prep for ASVAB
4. Match them to appropriate careers (civilian for vets, military for recruits)
5. Be knowledgeable about military culture, benefits, and career paths

Key topics you can help with:
- MOS/Rate/AFSC translation to civilian jobs
- ASVAB preparation and score requirements
- Branch comparisons (Army, Navy, Air Force, Marines, etc.)
- GI Bill and SkillBridge programs
- Veteran-friendly employers
- Security clearance value
- Career progression paths

Guidelines:
- Be conversational and respectful of their service (past or future)
- Use military terminology appropriately but explain for newcomers
- Ask one or two questions at a time
- Show genuine interest in their journey
- Be encouraging about their prospects
- For veterans: emphasize how their skills translate to civilian world
- For recruits: be honest about military realities while being positive

Keep responses concise (2-4 sentences typically). Use emojis sparingly for warmth.

Current conversation phase will be provided. Phases:
- GREETING: Initial welcome, determine veteran or exploring
- VETERAN_DISCOVERY: Learning about their military background
- VETERAN_GOALS: Understanding civilian career goals
- VETERAN_MATCH: Ready to show career matches
- RECRUIT_INTERESTS: Learning what they're looking for
- RECRUIT_MOS: Helping find the right MOS
- RECRUIT_PREP: ASVAB prep and next steps
`;

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export type UserType = 'unknown' | 'veteran' | 'recruit';

export interface ConversationState {
    phase: 'GREETING' | 'VETERAN_DISCOVERY' | 'VETERAN_GOALS' | 'VETERAN_MATCH' |
    'RECRUIT_INTERESTS' | 'RECRUIT_MOS' | 'RECRUIT_PREP';
    userType: UserType;
    candidateData: {
        name?: string;
        email?: string;
        // Veteran-specific
        branch?: string;
        mos?: string;
        rank?: string;
        yearsOfService?: number;
        clearance?: string;
        skills?: string[];
        targetCivilianRole?: string;
        location?: string;
        salaryExpectation?: string;
        // Recruit-specific
        age?: number;
        interests?: string[];
        educationLevel?: string;
        targetBranch?: string;
        targetMOS?: string;
        asvabScores?: Record<string, number>;
        physicalFitness?: string;
    };
    messages: Message[];
}

// Determine the conversation phase based on what we know
function determinePhase(state: ConversationState): ConversationState['phase'] {
    const { userType, candidateData } = state;

    if (userType === 'unknown') return 'GREETING';

    if (userType === 'veteran') {
        if (!candidateData.mos && !candidateData.branch) return 'VETERAN_DISCOVERY';
        if (!candidateData.targetCivilianRole && !candidateData.skills?.length) return 'VETERAN_GOALS';
        return 'VETERAN_MATCH';
    }

    if (userType === 'recruit') {
        if (!candidateData.interests?.length) return 'RECRUIT_INTERESTS';
        if (!candidateData.targetMOS && !candidateData.targetBranch) return 'RECRUIT_MOS';
        return 'RECRUIT_PREP';
    }

    return 'GREETING';
}

// Detect user type from message
function detectUserType(message: string): UserType {
    const lower = message.toLowerCase();

    // Veteran indicators
    if (lower.includes('veteran') || lower.includes('separating') ||
        lower.includes('served') || lower.includes('my mos') ||
        lower.includes('got out') || lower.includes('retired') ||
        lower.includes('years in')) {
        return 'veteran';
    }

    // Recruit indicators
    if (lower.includes('join') || lower.includes('enlisting') ||
        lower.includes('thinking about') || lower.includes('considering') ||
        lower.includes('asvab') || lower.includes('recruiter') ||
        lower.includes('should i') || lower.includes('want to serve')) {
        return 'recruit';
    }

    return 'unknown';
}

// Extract candidate data from conversation using AI
async function extractCandidateData(
    messages: Message[],
    currentData: ConversationState['candidateData'],
    userType: UserType
): Promise<ConversationState['candidateData']> {
    const extractionPrompt = `Analyze this conversation with a ${userType === 'veteran' ? 'military veteran' : userType === 'recruit' ? 'potential military recruit' : 'user'} and extract any new information mentioned.
Return a JSON object with ONLY the fields that have NEW information.

Possible fields:
- name: string
- email: string
${userType === 'veteran' ? `
- branch: string (Army, Navy, Air Force, Marines, Coast Guard, Space Force)
- mos: string (their military occupational specialty code like 11B, 17C, etc.)
- rank: string (E-1 through E-9, O-1 through O-10)
- yearsOfService: number
- clearance: string (None, Secret, TS, TS/SCI)
- skills: string[] (technical or professional skills)
- targetCivilianRole: string (what civilian job they want)
- location: string
- salaryExpectation: string
` : `
- age: number
- interests: string[] (what they're interested in - tech, medical, combat, etc.)
- educationLevel: string (high school, some college, degree)
- targetBranch: string (which branch interests them)
- targetMOS: string (specific job code if mentioned)
- physicalFitness: string (athletic, average, needs work)
`}

Current known data: ${JSON.stringify(currentData)}

Recent messages:
${messages.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n')}

Return ONLY valid JSON, no markdown or explanation:`;

    try {
        const client = getClient();
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: [{ role: 'user', content: extractionPrompt }],
            temperature: 0.1,
            max_tokens: 500,
            // @ts-ignore - response_format is supported by most modern providers
            response_format: { type: 'json_object' }
        });

        const content = response.choices[0].message.content || '{}';
        const extracted = JSON.parse(content.replace(/```json\n?|\n?```/g, ''));

        return {
            ...currentData,
            ...extracted,
            skills: [...(currentData.skills || []), ...(extracted.skills || [])].filter(
                (v, i, a) => a.indexOf(v) === i
            ),
            interests: [...(currentData.interests || []), ...(extracted.interests || [])].filter(
                (v, i, a) => a.indexOf(v) === i
            ),
        };
    } catch (error) {
        console.error('Error extracting candidate data:', error);
        return currentData;
    }
}

// Generate agent response
export async function generateAgentResponse(
    state: ConversationState,
    userMessage: string
): Promise<{ response: string; updatedState: ConversationState }> {
    // Add user message to history
    const messages: Message[] = [
        ...state.messages,
        { role: 'user', content: userMessage },
    ];

    // Detect user type if not yet known
    let userType = state.userType;
    if (userType === 'unknown') {
        userType = detectUserType(userMessage);
    }

    // Extract any new candidate data
    const updatedData = await extractCandidateData(messages, state.candidateData, userType);

    // Create updated state to determine phase
    const tempState = { ...state, userType, candidateData: updatedData };
    const phase = determinePhase(tempState);

    // Prepare state metadata
    const stateMetadata = {
        phase,
        userType,
        candidateData: updatedData,
    };

    // Build the conversation for the AI
    const conversationMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: SYSTEM_PROMPT + `\n\nCurrent phase: ${phase}\nUser type: ${userType}\nKnown data: ${JSON.stringify(updatedData)}`
        },
        ...messages.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ];

    try {
        const client = getClient();
        const response = await client.chat.completions.create({
            model: MODEL,
            messages: conversationMessages,
            temperature: 0.7,
            max_tokens: 400,
        });

        const assistantMessage = response.choices[0].message.content || "I'm sorry, I had trouble responding. Could you try again?";

        const updatedState: ConversationState = {
            ...stateMetadata,
            messages: [
                ...messages,
                { role: 'assistant', content: assistantMessage },
            ],
        };

        return { response: assistantMessage, updatedState };
    } catch (error: any) {
        console.warn('AI Provider failed, using fallback demo response:', error.message);

        // Demo Fallback Logic (Rule-based)
        let fallback = "I'm currently in demo mode. ";

        if (phase === 'GREETING') {
            fallback += "Are you a veteran looking for civilian roles, or exploring military careers?";
        } else if (userType === 'veteran') {
            fallback += `I've noted you're a veteran. Tell me more about your MOS and what kind of civilian role you're interested in.`;
        } else {
            fallback += `That's exciting! What branches of the military are you considering?`;
        }

        const updatedState: ConversationState = {
            ...stateMetadata,
            messages: [
                ...messages,
                { role: 'assistant', content: fallback },
            ],
        };

        return { response: fallback, updatedState };
    }
}

// Create initial greeting
export async function createInitialGreeting(): Promise<ConversationState> {
    const greeting = `Hi there! 👋 I'm Caprica, your military career advisor. 

Whether you're a **veteran** looking for your next mission in the civilian world, or you're **exploring** whether military service is right for you—I'm here to help.

Which best describes you?`;

    return {
        phase: 'GREETING',
        userType: 'unknown',
        candidateData: {},
        messages: [{ role: 'assistant', content: greeting }],
    };
}

export default {
    generateAgentResponse,
    createInitialGreeting,
};
