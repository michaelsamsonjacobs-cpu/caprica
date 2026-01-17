import { NextRequest, NextResponse } from 'next/server';
import { tailorResume, generateCoverLetter, analyzeSkillGaps } from '@/lib/resume-tailor';
import { ParsedResume } from '@/lib/resume-parser';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            resume,
            position,
            action = 'tailor',  // 'tailor' | 'cover-letter' | 'analyze'
            companyName,
        } = body as {
            resume: ParsedResume;
            position: {
                title: string;
                requiredSkills: string[];
                preferredSkills?: string[];
                description?: string;
                requirements?: string;
            };
            action?: string;
            companyName?: string;
        };

        if (!resume || !position) {
            return NextResponse.json(
                { error: 'Resume and position data required' },
                { status: 400 }
            );
        }

        switch (action) {
            case 'tailor':
                const tailored = await tailorResume(resume, position);
                return NextResponse.json({
                    success: true,
                    tailoredResume: tailored,
                });

            case 'cover-letter':
                const coverLetter = await generateCoverLetter(resume, position, companyName);
                return NextResponse.json({
                    success: true,
                    coverLetter,
                });

            case 'analyze':
                const analysis = analyzeSkillGaps(
                    resume.skills,
                    position.requiredSkills,
                    position.preferredSkills
                );
                return NextResponse.json({
                    success: true,
                    analysis,
                });

            default:
                return NextResponse.json(
                    { error: 'Invalid action. Use: tailor, cover-letter, or analyze' },
                    { status: 400 }
                );
        }

    } catch (error) {
        console.error('Resume tailor error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
