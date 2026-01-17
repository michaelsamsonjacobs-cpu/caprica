import { NextRequest, NextResponse } from 'next/server';
import { matchCandidateToMultiplePositions, MatchScore } from '@/lib/matching';
import { ParsedResume } from '@/lib/resume-parser';
import fs from 'fs';
import path from 'path';

// Load positions from scraped data
function loadPositions() {
    const positions = [];
    const importsDir = path.join(process.cwd(), 'data/positions/imports');

    // Load Jacobs jobs
    const jacobsPath = path.join(importsDir, 'jacobs_jobs.json');
    if (fs.existsSync(jacobsPath)) {
        const jacobsJobs = JSON.parse(fs.readFileSync(jacobsPath, 'utf-8'));
        for (const job of jacobsJobs) {
            positions.push({
                id: `jacobs_${job.jobId}`,
                title: job.title,
                company: 'Jacobs',
                requiredSkills: job.skills || [],
                preferredSkills: [],
                location: job.location,
                workMode: job.workMode?.toLowerCase() === 'remote' ? 'remote' as const :
                    job.workMode?.toLowerCase() === 'hybrid' ? 'hybrid' as const : 'onsite' as const,
                category: job.category,
                department: job.department,
            });
        }
    }

    // Load MOS jobs - try complete database first, then fall back to scraped
    const mosCompletePath = path.join(importsDir, 'army_mos_complete.json');
    const mosPath = path.join(importsDir, 'army_mos.json');
    const mosFile = fs.existsSync(mosCompletePath) ? mosCompletePath : mosPath;

    if (fs.existsSync(mosFile)) {
        const mosJobs = JSON.parse(fs.readFileSync(mosFile, 'utf-8'));
        for (const mos of mosJobs) {
            positions.push({
                id: `mos_${mos.code}`,
                title: `${mos.code} - ${mos.title}`,
                company: 'US Army',
                requiredSkills: mos.idealTraits || [],
                preferredSkills: [],
                asvabRequirements: mos.asvabRequirements || mos.asvab,
                careerField: mos.careerField,
                rank: mos.rank,
                signingBonus: mos.signingBonus || mos.bonus,
                clearanceRequired: mos.clearanceRequired || mos.clearance,
                physicalDemand: mos.physicalDemand || mos.physical,
                civilianEquivalent: mos.civilianEquivalent,
            });
        }
    }

    return positions;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            candidateResume,
            assessmentResults,
            preferences,
            limit = 10,
            minScore = 0,
        } = body as {
            candidateResume: ParsedResume;
            assessmentResults?: any[];
            preferences?: any;
            limit?: number;
            minScore?: number;
        };

        if (!candidateResume) {
            return NextResponse.json(
                { error: 'Candidate resume data required' },
                { status: 400 }
            );
        }

        // Load all positions
        const positions = loadPositions();

        if (positions.length === 0) {
            return NextResponse.json(
                { error: 'No positions available. Please run the job scrapers first.' },
                { status: 404 }
            );
        }

        // Run matching
        const candidate = {
            resume: candidateResume,
            assessmentResults,
            preferences,
        };

        const matches = matchCandidateToMultiplePositions(candidate, positions);

        // Filter and limit results
        const filteredMatches = matches
            .filter(m => m.overallScore >= minScore)
            .slice(0, limit);

        // Add position details to matches
        const enrichedMatches = filteredMatches.map(match => {
            const position = positions.find(p => p.id === match.positionId);
            return {
                ...match,
                position: position ? {
                    company: (position as any).company,
                    location: (position as any).location,
                    department: (position as any).department,
                    category: (position as any).category,
                    careerField: (position as any).careerField,
                    signingBonus: (position as any).signingBonus,
                } : null,
            };
        });

        return NextResponse.json({
            success: true,
            totalPositions: positions.length,
            matchCount: enrichedMatches.length,
            matches: enrichedMatches,
        });

    } catch (error) {
        console.error('Matching error:', error);
        return NextResponse.json(
            { error: 'Failed to perform matching' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const positions = loadPositions();

        return NextResponse.json({
            totalPositions: positions.length,
            sources: {
                jacobs: positions.filter((p: any) => p.company === 'Jacobs').length,
                army: positions.filter((p: any) => p.company === 'US Army').length,
            },
        });
    } catch (error) {
        console.error('Error loading positions:', error);
        return NextResponse.json(
            { error: 'Failed to load positions' },
            { status: 500 }
        );
    }
}
