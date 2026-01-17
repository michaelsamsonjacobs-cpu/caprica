import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In production, this would be a database call
function loadCDLJobs() {
    const jobsPath = path.join(process.cwd(), 'data/positions/imports/cdl_jobs.json');

    if (fs.existsSync(jobsPath)) {
        return JSON.parse(fs.readFileSync(jobsPath, 'utf-8'));
    }

    // Sample data for development
    return [
        {
            id: 'sample_1',
            source: 'Werner',
            title: 'OTR CDL-A Driver',
            company: 'Werner Enterprises',
            location: 'Nationwide',
            salary: '$0.65-0.85 per mile',
            cdlType: 'OTR',
            signingBonus: 15000,
            benefits: ['Health Insurance', '401(k)', 'Home Time', 'No-Touch Freight'],
            veteranFriendly: true,
        },
        {
            id: 'sample_2',
            source: 'Schneider',
            title: 'Regional Truck Driver',
            company: 'Schneider',
            location: 'Texas Region',
            salary: '$1,200-1,600/week',
            cdlType: 'Regional',
            signingBonus: 10000,
            benefits: ['Health Insurance', 'Dental', '401(k)', 'Home Weekly'],
            veteranFriendly: true,
        },
        {
            id: 'sample_3',
            source: 'J.B. Hunt',
            title: 'Dedicated CDL Driver',
            company: 'J.B. Hunt',
            location: 'Phoenix, AZ',
            salary: '$75,000-85,000/year',
            cdlType: 'Dedicated',
            signingBonus: 8000,
            benefits: ['Health Insurance', '401(k) Match', 'Home Daily'],
            veteranFriendly: true,
        },
        {
            id: 'sample_4',
            source: 'CRST',
            title: 'Team Driver - No Experience OK',
            company: 'CRST International',
            location: 'Cedar Rapids, IA',
            salary: 'Training + $50,000+ first year',
            cdlType: 'Team Driver',
            signingBonus: 5000,
            benefits: ['Paid Training', 'Health Insurance', 'Pet Policy'],
            veteranFriendly: true,
        },
        {
            id: 'sample_5',
            source: 'Old Dominion',
            title: 'LTL City Driver',
            company: 'Old Dominion Freight',
            location: 'Dallas, TX',
            salary: '$70,000-90,000/year',
            cdlType: 'Local',
            benefits: ['Health Insurance', 'Pension', 'Home Daily', 'Union'],
            veteranFriendly: false,
        },
    ];
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type'); // OTR, Regional, Local, etc.
    const location = searchParams.get('location');
    const query = searchParams.get('q');
    const veteranOnly = searchParams.get('veteran') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let jobs = loadCDLJobs();

    // Filter by type
    if (type && type !== 'All') {
        jobs = jobs.filter((job: any) => job.cdlType === type);
    }

    // Filter by location
    if (location) {
        const loc = location.toLowerCase();
        jobs = jobs.filter((job: any) =>
            job.location?.toLowerCase().includes(loc)
        );
    }

    // Filter by search query
    if (query) {
        const q = query.toLowerCase();
        jobs = jobs.filter((job: any) =>
            job.title?.toLowerCase().includes(q) ||
            job.company?.toLowerCase().includes(q) ||
            job.location?.toLowerCase().includes(q)
        );
    }

    // Filter veteran-friendly only
    if (veteranOnly) {
        jobs = jobs.filter((job: any) => job.veteranFriendly);
    }

    // Pagination
    const total = jobs.length;
    jobs = jobs.slice(offset, offset + limit);

    return NextResponse.json({
        jobs,
        total,
        limit,
        offset,
        hasMore: offset + jobs.length < total,
    });
}

// POST endpoint for candidate job alerts signup
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            email,
            name,
            cdlClass,
            jobType,
            location,
            isVeteran,
            yearsExperience,
        } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // In production, save to database
        const candidate = {
            email,
            name,
            cdlClass,
            jobType,
            location,
            isVeteran,
            yearsExperience: parseInt(yearsExperience) || 0,
            createdAt: new Date().toISOString(),
            status: 'active',
            jobAlerts: true,
        };

        console.log('New candidate signup:', candidate);

        // In production, also:
        // - Save to database
        // - Send welcome email with first batch of matches
        // - Add to job alert queue

        return NextResponse.json({
            success: true,
            message: 'Successfully signed up for job alerts',
            candidateId: `cand_${Date.now()}`,
        });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Failed to process signup' },
            { status: 500 }
        );
    }
}
