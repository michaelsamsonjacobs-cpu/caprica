import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load enrichment data
function loadEnrichment() {
    const enrichmentPath = path.join(process.cwd(), 'data/positions/mos_enrichment.js');
    if (fs.existsSync(enrichmentPath)) {
        // Dynamic require for Node.js module
        const content = fs.readFileSync(enrichmentPath, 'utf-8');
        // Extract the MOS_ENRICHMENT object
        const match = content.match(/const MOS_ENRICHMENT = ({[\s\S]*?});/);
        if (match) {
            try {
                // eslint-disable-next-line no-eval
                return eval('(' + match[1] + ')');
            } catch {
                return {};
            }
        }
    }
    return {};
}

// Load MOS database
function loadMOSDatabase() {
    const mosPath = path.join(process.cwd(), 'data/positions/imports/army_mos_complete.json');
    if (fs.existsSync(mosPath)) {
        return JSON.parse(fs.readFileSync(mosPath, 'utf-8'));
    }
    return [];
}

export async function GET(request: NextRequest) {
    const mosCode = request.nextUrl.searchParams.get('code');

    if (!mosCode) {
        // Return all MOS codes with basic info
        const mosDatabase = loadMOSDatabase();
        const summary = mosDatabase.map((mos: any) => ({
            code: mos.code,
            title: mos.title,
            careerField: mos.careerField,
            signingBonus: mos.signingBonus || mos.bonus,
            asvabScore: Object.values(mos.asvabRequirements || mos.asvab || {})[0] || 0,
        }));

        return NextResponse.json({
            count: summary.length,
            positions: summary,
        });
    }

    // Get specific MOS details
    const mosDatabase = loadMOSDatabase();
    const enrichment = loadEnrichment();

    const mos = mosDatabase.find((m: any) => m.code === mosCode.toUpperCase());

    if (!mos) {
        return NextResponse.json(
            { error: `MOS ${mosCode} not found` },
            { status: 404 }
        );
    }

    // Combine base data with enrichment
    const enriched = enrichment[mosCode.toUpperCase()] || {};

    const fullInfo = {
        // Basic Info
        code: mos.code,
        title: mos.title,
        branch: mos.branch || 'Army',
        careerField: mos.careerField,
        rank: mos.rank || 'Enlisted',

        // Requirements
        asvabRequirements: mos.asvabRequirements || mos.asvab,
        asvabExplained: explainASVAB(mos.asvabRequirements || mos.asvab),
        clearanceRequired: mos.clearanceRequired || mos.clearance || 'None',
        physicalDemand: mos.physicalDemand || mos.physical,

        // Compensation
        signingBonus: mos.signingBonus || mos.bonus || 0,
        basePay: getBasePay(mos.rank),
        additionalPay: getAdditionalPay(mos.code, mos.clearanceRequired || mos.clearance),

        // Candidate-Facing Info
        description: enriched.description || `${mos.title} - ${mos.careerField} specialist in the U.S. Army.`,
        dailyDuties: enriched.dailyDuties || ['Perform specialized duties', 'Maintain equipment', 'Support unit missions'],
        idealTraits: mos.idealTraits || [],

        // Training
        trainingWeeks: enriched.trainingWeeks || 12,
        trainingLocation: enriched.trainingLocation || 'Varies by specialty',

        // Career
        careerProgression: enriched.careerProgression || ['Enlisted ranks E-1 through E-9'],
        civilianPath: enriched.civilianPath || mos.civilianEquivalent || 'Various opportunities',
        certifications: enriched.certifications || [],

        // Lifestyle
        lifestyle: enriched.lifestyle || 'Varies by assignment and unit.',
        benefits: enriched.benefits || ['GI Bill education benefits', 'Healthcare', 'Housing allowance', 'Job training'],

        // Additional
        requirements: enriched.requirements || [],
        languages: enriched.languages || [],
    };

    return NextResponse.json(fullInfo);
}

function explainASVAB(requirements: Record<string, number> | undefined) {
    if (!requirements) return 'No specific ASVAB requirements listed.';

    const lineScoreNames: Record<string, string> = {
        GT: 'General Technical (verbal + arithmetic)',
        CO: 'Combat Operations (arithmetic + mechanical)',
        CL: 'Clerical (verbal + arithmetic)',
        EL: 'Electronics (math + electronics)',
        FA: 'Field Artillery (arithmetic + math + mechanical)',
        GM: 'General Maintenance (science + mechanics)',
        MM: 'Mechanical Maintenance (automotive + mechanics)',
        OF: 'Operators & Food (verbal + science)',
        SC: 'Surveillance & Communications (verbal + science)',
        ST: 'Skilled Technical (science + verbal + math)',
    };

    const explanations = Object.entries(requirements).map(([score, min]) => {
        const name = lineScoreNames[score] || score;
        return `${score} (${name}): minimum ${min}`;
    });

    return explanations.join(', ');
}

function getBasePay(rank: string) {
    // Approximate base pay for enlisted ranks (2024 rates)
    const payTable: Record<string, string> = {
        'Enlisted': '$2,300 - $7,000+/month based on rank and time in service',
        'E-1': '$2,300/month',
        'E-2': '$2,578/month',
        'E-3': '$2,712/month',
        'E-4': '$3,006/month',
        'E-5': '$3,278/month',
        'E-6': '$3,578/month',
        'E-7': '$4,136/month',
    };
    return payTable[rank] || payTable['Enlisted'];
}

function getAdditionalPay(mosCode: string, clearance: string) {
    const additionalPay = [];

    if (clearance === 'TS/SCI') {
        additionalPay.push('Security clearance makes you highly valuable in civilian market (+$10-30k)');
    }

    // Special duty pay for certain MOS
    const sdapMOS = ['17C', '18B', '18C', '18D', '18E', '89D', '35P'];
    if (sdapMOS.includes(mosCode)) {
        additionalPay.push('Special Duty Assignment Pay (SDAP): $75-450/month');
    }

    // Language pay
    if (mosCode === '35P' || mosCode.startsWith('18')) {
        additionalPay.push('Foreign Language Proficiency Pay (FLPP): up to $1,000/month');
    }

    // Hazardous duty
    if (['11B', '11C', '89D', '12B', '19D'].includes(mosCode)) {
        additionalPay.push('Hostile Fire Pay when deployed: $225/month');
    }

    return additionalPay.length > 0 ? additionalPay : ['Standard military benefits apply'];
}
