// AI-Powered Resume Tailoring
// Customizes resumes to highlight relevant experience for specific positions

import OpenAI from 'openai';
import { ParsedResume } from './resume-parser';

export async function tailorResume(
    resume: ParsedResume,
    position: Position
): Promise<TailoredResume> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const userMessage = `
## Candidate Resume Data
Name: ${resume.name}
Current Summary: ${resume.summary || 'None provided'}
Skills: ${resume.skills.join(', ')}
Total Experience: ${resume.totalYearsExperience} years
Education: ${resume.education.map(e => `${e.degree} from ${e.institution}`).join('; ')}

Experience:
${resume.experience.map(exp => `
- ${exp.title} at ${exp.company} (${exp.duration})
  ${exp.description}
`).join('\n')}

## Target Position
Title: ${position.title}
Required Skills: ${position.requiredSkills.join(', ')}
${position.preferredSkills ? `Preferred Skills: ${position.preferredSkills.join(', ')}` : ''}
${position.requirements ? `Requirements: ${position.requirements}` : ''}
${position.description ? `Description: ${position.description.substring(0, 1500)}` : ''}
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: TAILORING_PROMPT },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = response.choices[0].message.content || '{}';
        const cleaned = content.replace(/```json\n?|\n?```/g, '');
        const parsed = JSON.parse(cleaned);

        return {
            summary: parsed.summary || '',
            highlightedSkills: parsed.highlightedSkills || [],
            tailoredExperience: parsed.tailoredExperience || [],
            recommendations: parsed.recommendations || [],
            keywordsToAdd: parsed.keywordsToAdd || [],
            matchScore: parsed.matchScore || 0,
        };
    } catch (error) {
        console.error('Error tailoring resume:', error);
        throw new Error('Failed to tailor resume');
    }
}

// Generate a cover letter for the position
export async function generateCoverLetter(
    resume: ParsedResume,
    position: Position,
    companyName?: string
): Promise<string> {
    const prompt = `Write a professional cover letter for this candidate applying to the position.

Candidate:
- Name: ${resume.name}
- Skills: ${resume.skills.slice(0, 10).join(', ')}
- Experience: ${resume.totalYearsExperience} years
- Recent Role: ${resume.experience[0]?.title || 'N/A'} at ${resume.experience[0]?.company || 'N/A'}

Position: ${position.title}
${companyName ? `Company: ${companyName}` : ''}
Required Skills: ${position.requiredSkills.join(', ')}

Write a compelling, personalized cover letter (3 paragraphs):
1. Opening: Hook with enthusiasm and key qualification
2. Body: 2-3 specific examples of relevant experience/achievements
3. Closing: Call to action and forward-looking statement

Keep it under 300 words. Be professional but personable.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 600,
    });

    return response.choices[0].message.content || '';
}

// Quick skill gap analysis
export function analyzeSkillGaps(
    candidateSkills: string[],
    requiredSkills: string[],
    preferredSkills: string[] = []
): {
    matched: string[];
    missingRequired: string[];
    missingPreferred: string[];
    recommendations: string[];
} {
    const normalizedCandidate = candidateSkills.map(s => s.toLowerCase());

    const matched: string[] = [];
    const missingRequired: string[] = [];
    const missingPreferred: string[] = [];

    for (const skill of requiredSkills) {
        const skillLower = skill.toLowerCase();
        const found = normalizedCandidate.some(cs =>
            cs.includes(skillLower) || skillLower.includes(cs)
        );
        if (found) {
            matched.push(skill);
        } else {
            missingRequired.push(skill);
        }
    }

    for (const skill of preferredSkills) {
        const skillLower = skill.toLowerCase();
        const found = normalizedCandidate.some(cs =>
            cs.includes(skillLower) || skillLower.includes(cs)
        );
        if (!found) {
            missingPreferred.push(skill);
        } else if (!matched.includes(skill)) {
            matched.push(skill);
        }
    }

    // Generate recommendations
    const recommendations: string[] = [];
    if (missingRequired.length > 0) {
        recommendations.push(
            `Consider highlighting transferable skills related to: ${missingRequired.slice(0, 3).join(', ')}`
        );
    }
    if (missingRequired.length > 3) {
        recommendations.push(
            'This role may require additional training or certification in key areas'
        );
    }
    if (missingPreferred.length > 0 && missingRequired.length === 0) {
        recommendations.push(
            'You meet core requirements! Consider developing: ' + missingPreferred.slice(0, 2).join(', ')
        );
    }

    return { matched, missingRequired, missingPreferred, recommendations };
}

export default { tailorResume, generateCoverLetter, analyzeSkillGaps };
