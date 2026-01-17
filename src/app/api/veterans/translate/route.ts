import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load MOS enrichment data
function loadMOSEnrichment() {
    try {
        const enrichmentPath = path.join(process.cwd(), 'data/positions/mos_enrichment.js');
        // Read the file and extract the object
        const content = fs.readFileSync(enrichmentPath, 'utf-8');
        // Simple extraction - in production use proper module loading
        const match = content.match(/const MOS_ENRICHMENT = ({[\s\S]*?});/);
        if (match) {
            // This is a simplified approach - works for our data
            return eval(`(${match[1]})`);
        }
    } catch (e) {
        console.error('Error loading enrichment:', e);
    }
    return {};
}

// Load complete MOS database
function loadMOSDatabase() {
    try {
        const dbPath = path.join(process.cwd(), 'data/positions/imports/army_mos_complete.json');
        if (fs.existsSync(dbPath)) {
            return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        }
    } catch (e) {
        console.error('Error loading MOS database:', e);
    }
    return [];
}

// Civilian career mappings by MOS category
const CIVILIAN_CAREERS: Record<string, any[]> = {
    'Combat': [
        { title: 'Security Manager', salaryMin: 65000, salaryMax: 95000, match: 92 },
        { title: 'Law Enforcement Officer', salaryMin: 55000, salaryMax: 85000, match: 88 },
        { title: 'Federal Agent (FBI/ATF/DEA)', salaryMin: 80000, salaryMax: 130000, match: 85 },
        { title: 'Corporate Security Director', salaryMin: 90000, salaryMax: 150000, match: 80 },
        { title: 'Private Security Contractor', salaryMin: 100000, salaryMax: 250000, match: 78 },
    ],
    'Cyber': [
        { title: 'Cybersecurity Analyst', salaryMin: 85000, salaryMax: 140000, match: 95 },
        { title: 'Penetration Tester', salaryMin: 90000, salaryMax: 160000, match: 92 },
        { title: 'Security Engineer', salaryMin: 100000, salaryMax: 180000, match: 90 },
        { title: 'SOC Analyst', salaryMin: 70000, salaryMax: 110000, match: 88 },
        { title: 'Threat Intelligence Analyst', salaryMin: 95000, salaryMax: 150000, match: 85 },
    ],
    'Signal': [
        { title: 'IT Support Specialist', salaryMin: 50000, salaryMax: 75000, match: 95 },
        { title: 'Network Administrator', salaryMin: 65000, salaryMax: 95000, match: 90 },
        { title: 'Systems Administrator', salaryMin: 70000, salaryMax: 110000, match: 88 },
        { title: 'Cloud Support Engineer', salaryMin: 80000, salaryMax: 120000, match: 82 },
        { title: 'Help Desk Manager', salaryMin: 60000, salaryMax: 85000, match: 80 },
    ],
    'Intelligence': [
        { title: 'Business Intelligence Analyst', salaryMin: 70000, salaryMax: 110000, match: 90 },
        { title: 'Government Intelligence Analyst', salaryMin: 80000, salaryMax: 130000, match: 95 },
        { title: 'Data Analyst', salaryMin: 65000, salaryMax: 100000, match: 85 },
        { title: 'Research Analyst', salaryMin: 55000, salaryMax: 85000, match: 82 },
        { title: 'Threat Analyst', salaryMin: 85000, salaryMax: 140000, match: 88 },
    ],
    'Medical': [
        { title: 'EMT/Paramedic', salaryMin: 35000, salaryMax: 60000, match: 95 },
        { title: 'Registered Nurse (with bridging)', salaryMin: 65000, salaryMax: 95000, match: 85 },
        { title: 'ER Technician', salaryMin: 40000, salaryMax: 55000, match: 90 },
        { title: 'Physician Assistant (with school)', salaryMin: 100000, salaryMax: 140000, match: 70 },
        { title: 'Medical Sales Rep', salaryMin: 70000, salaryMax: 120000, match: 75 },
    ],
    'Aviation': [
        { title: 'Commercial Pilot', salaryMin: 80000, salaryMax: 200000, match: 90 },
        { title: 'Air Traffic Controller', salaryMin: 80000, salaryMax: 180000, match: 92 },
        { title: 'Drone Operator', salaryMin: 50000, salaryMax: 85000, match: 88 },
        { title: 'Aviation Maintenance Technician', salaryMin: 55000, salaryMax: 80000, match: 85 },
        { title: 'Aerospace Engineer', salaryMin: 90000, salaryMax: 140000, match: 75 },
    ],
    'Transportation': [
        { title: 'Truck Driver (CDL)', salaryMin: 50000, salaryMax: 85000, match: 95 },
        { title: 'Logistics Coordinator', salaryMin: 45000, salaryMax: 70000, match: 88 },
        { title: 'Fleet Manager', salaryMin: 55000, salaryMax: 80000, match: 85 },
        { title: 'Supply Chain Manager', salaryMin: 70000, salaryMax: 110000, match: 80 },
        { title: 'Warehouse Manager', salaryMin: 50000, salaryMax: 75000, match: 82 },
    ],
    'Maintenance': [
        { title: 'Diesel Technician', salaryMin: 45000, salaryMax: 70000, match: 92 },
        { title: 'Auto Mechanic', salaryMin: 40000, salaryMax: 65000, match: 90 },
        { title: 'HVAC Technician', salaryMin: 50000, salaryMax: 80000, match: 85 },
        { title: 'Industrial Maintenance Tech', salaryMin: 55000, salaryMax: 85000, match: 88 },
        { title: 'Fleet Maintenance Manager', salaryMin: 60000, salaryMax: 90000, match: 80 },
    ],
    'Artillery': [
        { title: 'Fire Control Technician', salaryMin: 55000, salaryMax: 85000, match: 88 },
        { title: 'Survey Technician', salaryMin: 45000, salaryMax: 70000, match: 85 },
        { title: 'Meteorologist', salaryMin: 50000, salaryMax: 90000, match: 75 },
        { title: 'Defense Contractor', salaryMin: 70000, salaryMax: 120000, match: 82 },
        { title: 'Law Enforcement', salaryMin: 50000, salaryMax: 80000, match: 78 },
    ],
};

// Default civilian careers for unmapped categories
const DEFAULT_CAREERS = [
    { title: 'Project Manager', salaryMin: 65000, salaryMax: 100000, match: 80 },
    { title: 'Operations Manager', salaryMin: 60000, salaryMax: 95000, match: 78 },
    { title: 'Training Specialist', salaryMin: 50000, salaryMax: 75000, match: 75 },
    { title: 'Safety Manager', salaryMin: 55000, salaryMax: 85000, match: 72 },
    { title: 'Government Contractor', salaryMin: 60000, salaryMax: 110000, match: 70 },
];

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    const search = request.nextUrl.searchParams.get('search');
    const field = request.nextUrl.searchParams.get('field');

    const mosDatabase = loadMOSDatabase();
    const enrichment = loadMOSEnrichment();

    // List all MOS codes
    if (!code) {
        let results = mosDatabase;

        // Filter by search term
        if (search) {
            const q = search.toLowerCase();
            results = results.filter((mos: any) =>
                mos.code.toLowerCase().includes(q) ||
                mos.title.toLowerCase().includes(q) ||
                mos.careerField?.toLowerCase().includes(q)
            );
        }

        // Filter by career field
        if (field) {
            results = results.filter((mos: any) =>
                mos.careerField?.toLowerCase() === field.toLowerCase()
            );
        }

        return NextResponse.json({
            count: results.length,
            positions: results.map((mos: any) => ({
                code: mos.code,
                title: mos.title,
                careerField: mos.careerField,
                signingBonus: mos.signingBonus || mos.bonus,
                asvabScore: Object.values(mos.asvabRequirements || mos.asvab || {})[0] || 0,
            })),
        });
    }

    // Get specific MOS with translation
    const mos = mosDatabase.find((m: any) => m.code.toUpperCase() === code.toUpperCase());

    if (!mos) {
        return NextResponse.json({ error: `MOS ${code} not found` }, { status: 404 });
    }

    // Get enrichment data
    const mosEnrichment = enrichment[code.toUpperCase()] || {};

    // Get civilian career matches
    const careerField = mos.careerField || 'General';
    const civilianCareers = CIVILIAN_CAREERS[careerField] || DEFAULT_CAREERS;

    // Build full response
    const response = {
        // Basic info
        code: mos.code,
        title: mos.title,
        branch: 'Army',
        careerField: mos.careerField,

        // ASVAB requirements
        asvabRequirements: mos.asvabRequirements || mos.asvab,

        // Compensation
        signingBonus: mos.signingBonus || mos.bonus || 0,

        // Requirements
        clearanceRequired: mos.clearanceRequired || mos.clearance,
        physicalDemand: mos.physicalDemand || mos.physical,

        // Enrichment
        description: mosEnrichment.description || `${mos.title} serving in the U.S. Army.`,
        dailyDuties: mosEnrichment.dailyDuties || ['Perform specialized duties', 'Support unit missions'],
        trainingWeeks: mosEnrichment.trainingWeeks || 12,
        trainingLocation: mosEnrichment.trainingLocation || 'Various',
        careerProgression: mosEnrichment.careerProgression || [],
        benefits: mosEnrichment.benefits || ['Leadership experience', 'Technical skills'],
        lifestyle: mosEnrichment.lifestyle || 'Varies by assignment.',
        civilianPath: mosEnrichment.civilianPath || 'Various opportunities.',
        certifications: mosEnrichment.certifications || [],

        // Civilian career matches
        civilianCareers: civilianCareers.map(c => ({
            ...c,
            salary: `$${c.salaryMin.toLocaleString()} - $${c.salaryMax.toLocaleString()}`,
        })),

        // Skills
        transferableSkills: mos.idealTraits || ['Leadership', 'Discipline', 'Teamwork'],
    };

    return NextResponse.json(response);
}
