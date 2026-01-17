// Veteran-Friendly Employers Database
// Sources: Military Friendly, Newsweek, Military.com Best for Vets 2024

export interface VetFriendlyEmployer {
    name: string;
    industry: string;
    careersUrl: string;
    veteranPrograms: string[];
    skillBridge: boolean;
    militarySpouseProgram: boolean;
    militaryFriendlyYears?: number;
    notes?: string;
}

export const VET_FRIENDLY_EMPLOYERS: VetFriendlyEmployer[] = [
    // DEFENSE CONTRACTORS (Highest hiring)
    {
        name: 'Lockheed Martin',
        industry: 'Defense',
        careersUrl: 'https://www.lockheedmartinjobs.com/search-jobs',
        veteranPrograms: ['Military Skills Translator', 'Veteran Employee Resource Group', 'Military Leave Policy'],
        skillBridge: true,
        militarySpouseProgram: true,
        notes: '25% of workforce are veterans',
    },
    {
        name: 'Northrop Grumman',
        industry: 'Defense',
        careersUrl: 'https://www.northropgrumman.com/careers/',
        veteranPrograms: ['SkillBridge', 'Operation IMPACT', 'Veteran Hiring Initiative'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Raytheon',
        industry: 'Defense',
        careersUrl: 'https://careers.rtx.com/',
        veteranPrograms: ['Veterans Hiring Program', 'Military Skills Translator'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'BAE Systems',
        industry: 'Defense',
        careersUrl: 'https://www.baesystems.com/en/careers',
        veteranPrograms: ['Veteran Employee Network', 'Transition Assistance'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'General Dynamics',
        industry: 'Defense',
        careersUrl: 'https://www.gd.com/careers',
        veteranPrograms: ['Veteran Talent Acquisition'],
        skillBridge: true,
        militarySpouseProgram: false,
    },
    {
        name: 'Booz Allen Hamilton',
        industry: 'Consulting',
        careersUrl: 'https://www.boozallen.com/careers.html',
        veteranPrograms: ['SkillBridge', 'Military Talent Program', 'Pathways for Veterans'],
        skillBridge: true,
        militarySpouseProgram: true,
        notes: '30%+ veteran workforce',
    },
    {
        name: 'CACI International',
        industry: 'Defense',
        careersUrl: 'https://careers.caci.com/',
        veteranPrograms: ['Military Hiring Program', 'Cleared Job Fair Participation'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'ManTech',
        industry: 'Defense',
        careersUrl: 'https://www.mantech.com/careers',
        veteranPrograms: ['Veteran Hiring Initiative'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Leidos',
        industry: 'Defense',
        careersUrl: 'https://careers.leidos.com/',
        veteranPrograms: ['Military Skills Translator', 'Veteran ERG'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'SAIC',
        industry: 'Defense',
        careersUrl: 'https://www.saic.com/careers',
        veteranPrograms: ['Veteran Talent Network'],
        skillBridge: true,
        militarySpouseProgram: true,
    },

    // TECH COMPANIES
    {
        name: 'Amazon',
        industry: 'Tech',
        careersUrl: 'https://www.amazon.jobs/en/military',
        veteranPrograms: ['Military Apprenticeship', 'AWS re/Start', 'Military Hiring Events'],
        skillBridge: true,
        militarySpouseProgram: true,
        notes: 'Pledged 100,000 veteran hires',
    },
    {
        name: 'Microsoft',
        industry: 'Tech',
        careersUrl: 'https://careers.microsoft.com/us/en/military',
        veteranPrograms: ['MSSA (Microsoft Software Systems Academy)', 'Hiring Our Heroes Fellowship'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Google',
        industry: 'Tech',
        careersUrl: 'https://careers.google.com/programs/veterans/',
        veteranPrograms: ['VetNet', 'Grow with Google Veterans'],
        skillBridge: false,
        militarySpouseProgram: true,
    },
    {
        name: 'Salesforce',
        industry: 'Tech',
        careersUrl: 'https://www.salesforce.com/company/careers/military/',
        veteranPrograms: ['Vetforce', 'Free Salesforce Training for Vets'],
        skillBridge: false,
        militarySpouseProgram: true,
        notes: 'Free certification for veterans',
    },
    {
        name: 'Cisco',
        industry: 'Tech',
        careersUrl: 'https://www.cisco.com/c/en/us/about/careers.html',
        veteranPrograms: ['Veterans Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Verizon',
        industry: 'Telecom',
        careersUrl: 'https://www.verizon.com/about/careers/military',
        veteranPrograms: ['Verizon Connect Military Program', 'Skills Translator'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'AT&T',
        industry: 'Telecom',
        careersUrl: 'https://www.att.jobs/military',
        veteranPrograms: ['Military Talent Acquisition'],
        skillBridge: true,
        militarySpouseProgram: true,
        militaryFriendlyYears: 17,
    },
    {
        name: 'Comcast',
        industry: 'Telecom',
        careersUrl: 'https://jobs.comcast.com/military',
        veteranPrograms: ['VetNet', 'Military Hiring Events'],
        skillBridge: true,
        militarySpouseProgram: true,
    },

    // FINANCIAL SERVICES
    {
        name: 'USAA',
        industry: 'Financial',
        careersUrl: 'https://www.usaa.com/inet/wc/about_usaa_careers_main',
        veteranPrograms: ['Military Affiliate Program', 'Veteran Leadership Program'],
        skillBridge: true,
        militarySpouseProgram: true,
        militaryFriendlyYears: 21,
        notes: '#1 Military Friendly all 21 years',
    },
    {
        name: 'JPMorgan Chase',
        industry: 'Financial',
        careersUrl: 'https://careers.jpmorgan.com/us/en/military',
        veteranPrograms: ['Veteran Jobs Mission', 'Military Pathways'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Bank of America',
        industry: 'Financial',
        careersUrl: 'https://careers.bankofamerica.com/en-us/military',
        veteranPrograms: ['Veteran ERG', 'Military Talent Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Fidelity',
        industry: 'Financial',
        careersUrl: 'https://jobs.fidelity.com/veterans/',
        veteranPrograms: ['Fidelity Veterans ERG'],
        skillBridge: true,
        militarySpouseProgram: true,
    },

    // HEALTHCARE
    {
        name: 'HCA Healthcare',
        industry: 'Healthcare',
        careersUrl: 'https://careers.hcahealthcare.com/pages/military',
        veteranPrograms: ['Military Affairs Program', 'SkillBridge'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'CVS Health',
        industry: 'Healthcare',
        careersUrl: 'https://jobs.cvshealth.com/military/',
        veteranPrograms: ['Veteran Talent Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'UnitedHealth Group',
        industry: 'Healthcare',
        careersUrl: 'https://careers.unitedhealthgroup.com/early-careers/military',
        veteranPrograms: ['Military and Veterans Network'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Humana',
        industry: 'Healthcare',
        careersUrl: 'https://careers.humana.com/military/',
        veteranPrograms: ['Veterans Network Resource Group'],
        skillBridge: true,
        militarySpouseProgram: true,
        notes: 'Target 500 vet hires annually',
    },

    // TRANSPORTATION & LOGISTICS
    {
        name: 'FedEx',
        industry: 'Logistics',
        careersUrl: 'https://careers.fedex.com/military',
        veteranPrograms: ['FedEx Cares Military Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'UPS',
        industry: 'Logistics',
        careersUrl: 'https://www.jobs-ups.com/category/military-jobs/1187/51509/1',
        veteranPrograms: ['Veteran Support Program'],
        skillBridge: true,
        militarySpouseProgram: false,
    },
    {
        name: 'J.B. Hunt',
        industry: 'Trucking',
        careersUrl: 'https://jobs.jbhunt.com/military',
        veteranPrograms: ['Military Apprenticeship', 'CDL Training'],
        skillBridge: true,
        militarySpouseProgram: false,
        militaryFriendlyYears: 17,
    },
    {
        name: 'Schneider',
        industry: 'Trucking',
        careersUrl: 'https://schneiderjobs.com/truck-driving-jobs/military',
        veteranPrograms: ['Military Apprenticeship Program'],
        skillBridge: true,
        militarySpouseProgram: false,
        militaryFriendlyYears: 17,
    },
    {
        name: 'Werner Enterprises',
        industry: 'Trucking',
        careersUrl: 'https://www.werner.com/careers/military/',
        veteranPrograms: ['Military Transition Program'],
        skillBridge: true,
        militarySpouseProgram: false,
    },
    {
        name: 'BNSF Railway',
        industry: 'Rail',
        careersUrl: 'https://jobs.bnsf.com/military',
        veteranPrograms: ['Military Friendly Program'],
        skillBridge: true,
        militarySpouseProgram: false,
        militaryFriendlyYears: 17,
        notes: '7,000+ veterans employed',
    },
    {
        name: 'Southwest Airlines',
        industry: 'Aviation',
        careersUrl: 'https://careers.southwestair.com/military',
        veteranPrograms: ['Military Skills Translator', 'Military Leave'],
        skillBridge: true,
        militarySpouseProgram: true,
        militaryFriendlyYears: 17,
    },
    {
        name: 'Delta Airlines',
        industry: 'Aviation',
        careersUrl: 'https://www.delta.com/us/en/careers/military',
        veteranPrograms: ['Military and Veterans Business Resource Group'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Penske',
        industry: 'Logistics',
        careersUrl: 'https://penske.jobs/military/',
        veteranPrograms: ['Veteran Driver Hiring Program'],
        skillBridge: true,
        militarySpouseProgram: false,
    },

    // RETAIL & SERVICES
    {
        name: 'Home Depot',
        industry: 'Retail',
        careersUrl: 'https://careers.homedepot.com/career-areas/military/',
        veteranPrograms: ['Military Discount Program', 'Veteran ERG'],
        skillBridge: true,
        militarySpouseProgram: true,
        militaryFriendlyYears: 21,
    },
    {
        name: "Lowe's",
        industry: 'Retail',
        careersUrl: 'https://talent.lowes.com/us/en/military',
        veteranPrograms: ['Track to the Trades', 'Veteran Hiring'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Walmart',
        industry: 'Retail',
        careersUrl: 'https://careers.walmart.com/military',
        veteranPrograms: ['Veterans Welcome Home Commitment'],
        skillBridge: false,
        militarySpouseProgram: true,
        notes: 'Guaranteed job for honorable discharge',
    },
    {
        name: 'Starbucks',
        industry: 'Retail',
        careersUrl: 'https://www.starbucks.com/careers/veterans/',
        veteranPrograms: ['Armed Forces Network'],
        skillBridge: false,
        militarySpouseProgram: true,
    },

    // ENERGY & UTILITIES
    {
        name: 'Dominion Energy',
        industry: 'Energy',
        careersUrl: 'https://careers.dominionenergy.com/military',
        veteranPrograms: ['Military Hiring Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Southern Company',
        industry: 'Energy',
        careersUrl: 'https://southerncompany.jobs/military-and-veterans/',
        veteranPrograms: ['Veteran Hiring Initiative'],
        skillBridge: true,
        militarySpouseProgram: true,
        militaryFriendlyYears: 17,
    },

    // GOVERNMENT CONTRACTORS / CONSULTING
    {
        name: 'Accenture',
        industry: 'Consulting',
        careersUrl: 'https://www.accenture.com/us-en/careers/local/veterans',
        veteranPrograms: ['Military Transition Program', 'Skills Training'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'Deloitte',
        industry: 'Consulting',
        careersUrl: 'https://www2.deloitte.com/us/en/pages/careers/articles/veteran-military.html',
        veteranPrograms: ['CORE Leadership Program'],
        skillBridge: true,
        militarySpouseProgram: true,
    },
    {
        name: 'PwC',
        industry: 'Consulting',
        careersUrl: 'https://www.pwc.com/us/en/careers/experienced/opportunities/military.html',
        veteranPrograms: ['Veteran Hiring Program'],
        skillBridge: false,
        militarySpouseProgram: true,
    },
];

// Get employers by industry
export function getEmployersByIndustry(industry: string): VetFriendlyEmployer[] {
    return VET_FRIENDLY_EMPLOYERS.filter(e => e.industry === industry);
}

// Get SkillBridge partners
export function getSkillBridgePartners(): VetFriendlyEmployer[] {
    return VET_FRIENDLY_EMPLOYERS.filter(e => e.skillBridge);
}

// Get all industries
export function getIndustries(): string[] {
    return [...new Set(VET_FRIENDLY_EMPLOYERS.map(e => e.industry))];
}

export default VET_FRIENDLY_EMPLOYERS;
