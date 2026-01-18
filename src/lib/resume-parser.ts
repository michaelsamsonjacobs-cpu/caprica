import OpenAI from 'openai';

export async function parseResumeWithAI(resumeText: string): Promise<ParsedResume> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {

        export interface ParsedResume {
            name: string;
            email: string;
            phone: string;
            location: string;
            summary: string;
            skills: string[];
            experience: {
                title: string;
                company: string;
                duration: string;
                description: string;
            }[];
            education: {
                degree: string;
                institution: string;
                year: string;
            }[];
            totalYearsExperience: number;
            certifications: string[];
            languages: string[];
        }

        const EXTRACTION_PROMPT = `You are a resume parsing expert. Extract structured information from this resume text.

Return a JSON object with these fields (use empty string or empty array if not found):
{
  "name": "Full name",
  "email": "Email address",
  "phone": "Phone number",
  "location": "City, State or full address",
  "summary": "Professional summary or objective (1-2 sentences)",
  "skills": ["skill1", "skill2", ...],  // Technical and professional skills
  "experience": [
    {
      "title": "Job title",
      "company": "Company name",
      "duration": "Start - End dates",
      "description": "Brief description of responsibilities"
    }
  ],
  "education": [
    {
      "degree": "Degree name",
      "institution": "School/University name",
      "year": "Graduation year"
    }
  ],
  "totalYearsExperience": 0,  // Estimated total years
  "certifications": ["cert1", "cert2", ...],
  "languages": ["English", ...]
}

Be thorough with skills - extract ALL mentioned technical skills, tools, software, frameworks, methodologies, and soft skills.

Return ONLY valid JSON, no markdown or explanation.`;

        export async function parseResumeWithAI(resumeText: string): Promise<ParsedResume> {
            try {
                const response = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: EXTRACTION_PROMPT },
                        { role: 'user', content: `Resume text:\n\n${resumeText.substring(0, 15000)}` }
                    ],
                    temperature: 0.1,
                    max_tokens: 2000,
                });

                const content = response.choices[0].message.content || '{}';
                const cleaned = content.replace(/```json\n?|\n?```/g, '');
                const parsed = JSON.parse(cleaned);

                return {
                    name: parsed.name || '',
                    email: parsed.email || '',
                    phone: parsed.phone || '',
                    location: parsed.location || '',
                    summary: parsed.summary || '',
                    skills: parsed.skills || [],
                    experience: parsed.experience || [],
                    education: parsed.education || [],
                    totalYearsExperience: parsed.totalYearsExperience || 0,
                    certifications: parsed.certifications || [],
                    languages: parsed.languages || [],
                };
            } catch (error) {
                console.error('Error parsing resume with AI:', error);
                throw new Error('Failed to parse resume');
            }
        }

        // Match resume skills to position requirements
        export function calculateSkillMatch(
            candidateSkills: string[],
            positionSkills: string[]
        ): { score: number; matchedSkills: string[]; missingSkills: string[] } {
            const normalizedCandidate = candidateSkills.map(s => s.toLowerCase());
            const normalizedPosition = positionSkills.map(s => s.toLowerCase());

            const matchedSkills: string[] = [];
            const missingSkills: string[] = [];

            for (const skill of normalizedPosition) {
                const found = normalizedCandidate.some(cs =>
                    cs.includes(skill) || skill.includes(cs)
                );
                if (found) {
                    matchedSkills.push(skill);
                } else {
                    missingSkills.push(skill);
                }
            }

            const score = positionSkills.length > 0
                ? Math.round((matchedSkills.length / positionSkills.length) * 100)
                : 0;

            return { score, matchedSkills, missingSkills };
        }

        export default { parseResumeWithAI, calculateSkillMatch };
