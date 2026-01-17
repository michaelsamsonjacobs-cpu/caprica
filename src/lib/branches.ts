// Military Branch Comparison Data
// Comprehensive information for each branch of service

export interface BranchInfo {
    id: string;
    name: string;
    shortName: string;
    motto: string;
    color: string;
    icon: string;
    overview: string;
    culture: {
        description: string;
        keywords: string[];
    };
    benefits: {
        highlight: string;
        details: string[];
    };
    careers: {
        totalMOS: number;
        popular: string[];
        uniqueOpportunities: string[];
    };
    requirements: {
        ageRange: string;
        asvabMinimum: number;
        physicalTest: string;
        contractLength: string;
    };
    lifestyle: {
        deploymentFrequency: string;
        baseLocations: string[];
        familySupport: string;
    };
    statistics: {
        activePersonnel: string;
        averageSalary: string;
        enlistmentBonus: string;
    };
}

export const BRANCHES: BranchInfo[] = [
    {
        id: 'army',
        name: 'United States Army',
        shortName: 'Army',
        motto: 'This We\'ll Defend',
        color: '#4B5320', // Army Green
        icon: '🪖',
        overview: 'The largest branch of the U.S. military, focused on land-based operations. Offers the widest variety of career paths and training opportunities.',
        culture: {
            description: 'Mission-focused with strong emphasis on teamwork, discipline, and adaptability. Known for its diverse roles from combat to technical specialties.',
            keywords: ['Ground Combat', 'Teamwork', 'Diverse Careers', 'Leadership Development'],
        },
        benefits: {
            highlight: 'Largest signing bonuses (up to $50,000) and most MOS options',
            details: [
                'Student loan repayment up to $65,000',
                'College Fund up to $40,000 + GI Bill',
                'Choice of duty station programs',
                'Army COOL certification funding',
            ],
        },
        careers: {
            totalMOS: 190,
            popular: ['11B Infantry', '68W Combat Medic', '25B IT Specialist', '35F Intel Analyst'],
            uniqueOpportunities: ['Special Forces (Green Berets)', 'Army Rangers', 'Cyber Operations', 'Aviation'],
        },
        requirements: {
            ageRange: '17-35',
            asvabMinimum: 31,
            physicalTest: 'Army Combat Fitness Test (ACFT)',
            contractLength: '2-6 years',
        },
        lifestyle: {
            deploymentFrequency: 'Varies by unit, typically 9-12 months',
            baseLocations: ['Fort Bragg, NC', 'Fort Hood, TX', 'Fort Campbell, KY', 'Germany', 'Korea'],
            familySupport: 'Extensive family readiness programs, on-post housing available',
        },
        statistics: {
            activePersonnel: '485,000',
            averageSalary: '$41,000 - $75,000',
            enlistmentBonus: 'Up to $50,000',
        },
    },
    {
        id: 'navy',
        name: 'United States Navy',
        shortName: 'Navy',
        motto: 'Forged by the Sea',
        color: '#000080', // Navy Blue
        icon: '⚓',
        overview: 'America\'s sea power, operating ships, submarines, and naval aviation. Offers unique opportunities for global travel and maritime careers.',
        culture: {
            description: 'Professional environment with emphasis on technical expertise and global readiness. Strong tradition and naval heritage.',
            keywords: ['Sea Power', 'Technical Excellence', 'Global Travel', 'Naval Aviation'],
        },
        benefits: {
            highlight: 'Best advancement opportunities and nuclear training programs',
            details: [
                'Nuclear field bonuses up to $38,000',
                'SEAL/Special Warfare bonuses',
                'Submarine duty pay',
                'Sea pay and hazardous duty pay',
            ],
        },
        careers: {
            totalMOS: 80,
            popular: ['Hospital Corpsman', 'Information Systems Tech', 'Aviation Electronics', 'Nuclear Engineer'],
            uniqueOpportunities: ['Navy SEALs', 'Nuclear Submarine Operations', 'Naval Aviation', 'Diving/EOD'],
        },
        requirements: {
            ageRange: '17-39',
            asvabMinimum: 35,
            physicalTest: 'Physical Readiness Test (PRT)',
            contractLength: '4-6 years',
        },
        lifestyle: {
            deploymentFrequency: '6-9 month deployments, every 18-24 months',
            baseLocations: ['San Diego, CA', 'Norfolk, VA', 'Pearl Harbor, HI', 'Japan', 'Italy'],
            familySupport: 'Fleet and Family Support Centers, ombudsman programs',
        },
        statistics: {
            activePersonnel: '340,000',
            averageSalary: '$43,000 - $80,000',
            enlistmentBonus: 'Up to $40,000',
        },
    },
    {
        id: 'airforce',
        name: 'United States Air Force',
        shortName: 'Air Force',
        motto: 'Aim High... Fly-Fight-Win',
        color: '#00308F', // Air Force Blue
        icon: '✈️',
        overview: 'America\'s air and space superiority force. Known for cutting-edge technology, excellent facilities, and superior quality of life.',
        culture: {
            description: 'Innovation-driven with emphasis on technology and education. Generally considered to have the best quality of life among branches.',
            keywords: ['Technology', 'Innovation', 'Quality of Life', 'Space Operations'],
        },
        benefits: {
            highlight: 'Best quality of life and education opportunities',
            details: [
                'Community College of the Air Force (CCAF) automatic enrollment',
                'Base amenities typically superior',
                'Tuition assistance up to $4,500/year',
                'Cyber and space career bonuses',
            ],
        },
        careers: {
            totalMOS: 130,
            popular: ['Cyber Systems Operations', 'Aircraft Maintenance', 'Security Forces', 'Medical Technician'],
            uniqueOpportunities: ['Space Force Transfer', 'Drone Operations', 'Cyber Warfare', 'Pararescue (PJ)'],
        },
        requirements: {
            ageRange: '17-39',
            asvabMinimum: 36,
            physicalTest: 'Physical Fitness Test (PFT)',
            contractLength: '4-6 years',
        },
        lifestyle: {
            deploymentFrequency: 'Typically shorter (4-6 months), varies by career',
            baseLocations: ['Lackland AFB, TX', 'Nellis AFB, NV', 'Wright-Patterson AFB, OH', 'Germany', 'Japan'],
            familySupport: 'Airman & Family Readiness Centers, excellent base housing',
        },
        statistics: {
            activePersonnel: '325,000',
            averageSalary: '$44,000 - $82,000',
            enlistmentBonus: 'Up to $40,000',
        },
    },
    {
        id: 'marines',
        name: 'United States Marine Corps',
        shortName: 'Marines',
        motto: 'Semper Fidelis (Always Faithful)',
        color: '#CC0000', // Marine Scarlet
        icon: '🦅',
        overview: 'America\'s expeditionary force-in-readiness. Known for elite training, combat focus, and strong brotherhood culture.',
        culture: {
            description: 'Elite warrior culture with intense pride and discipline. "Every Marine a Rifleman" philosophy emphasizes combat readiness for all.',
            keywords: ['Elite Training', 'Brotherhood', 'Combat Ready', 'Expeditionary'],
        },
        benefits: {
            highlight: 'Most respected brand for security/law enforcement careers',
            details: [
                'Strongest veteran network for job placement',
                'Combat training valued by employers',
                'Leadership development second to none',
                'Marine Corps Martial Arts Program (MCMAP)',
            ],
        },
        careers: {
            totalMOS: 60,
            popular: ['Infantry', 'Combat Engineer', 'Aviation Mechanic', 'Cyber Network Operator'],
            uniqueOpportunities: ['Force Recon', 'Marine Raiders (MARSOC)', 'Embassy Security Guard', 'Presidential Guard'],
        },
        requirements: {
            ageRange: '17-28',
            asvabMinimum: 32,
            physicalTest: 'Physical Fitness Test (PFT) / Combat Fitness Test (CFT)',
            contractLength: '4-5 years',
        },
        lifestyle: {
            deploymentFrequency: 'High OPTEMPO, 7 month deployments common',
            baseLocations: ['Camp Pendleton, CA', 'Camp Lejeune, NC', 'Okinawa, Japan', '29 Palms, CA'],
            familySupport: 'Marine Corps Family Team Building, unit-focused support',
        },
        statistics: {
            activePersonnel: '180,000',
            averageSalary: '$40,000 - $72,000',
            enlistmentBonus: 'Up to $30,000',
        },
    },
    {
        id: 'coastguard',
        name: 'United States Coast Guard',
        shortName: 'Coast Guard',
        motto: 'Semper Paratus (Always Ready)',
        color: '#003366', // Coast Guard Blue
        icon: '⛵',
        overview: 'America\'s maritime law enforcement and rescue service. Unique mission set including search and rescue, port security, and environmental protection.',
        culture: {
            description: 'Service-oriented with focus on humanitarian missions and law enforcement. Smaller, tight-knit community with CONUS-focused assignments.',
            keywords: ['Search & Rescue', 'Maritime Law', 'Humanitarian', 'Small Service'],
        },
        benefits: {
            highlight: 'Best work-life balance and CONUS assignments',
            details: [
                'Most likely to be stationed near home',
                'Smaller service = faster advancement',
                'Law enforcement experience valued',
                'Direct maritime industry crossover',
            ],
        },
        careers: {
            totalMOS: 25,
            popular: ['Maritime Law Enforcement', 'Aviation Survival Tech', 'IT Specialist', 'Health Services Tech'],
            uniqueOpportunities: ['Rescue Swimmer', 'Maritime Security', 'Port Operations', 'Environmental Response'],
        },
        requirements: {
            ageRange: '17-31',
            asvabMinimum: 40,
            physicalTest: 'Physical Fitness Test',
            contractLength: '4-8 years',
        },
        lifestyle: {
            deploymentFrequency: 'Short patrols (weeks), mostly CONUS',
            baseLocations: ['Alameda, CA', 'Miami, FL', 'Seattle, WA', 'Boston, MA', 'New Orleans, LA'],
            familySupport: 'Work-Life Balance programs, primarily shore-based assignments',
        },
        statistics: {
            activePersonnel: '42,000',
            averageSalary: '$42,000 - $76,000',
            enlistmentBonus: 'Up to $20,000',
        },
    },
    {
        id: 'spaceforce',
        name: 'United States Space Force',
        shortName: 'Space Force',
        motto: 'Semper Supra (Always Above)',
        color: '#0B3D91', // Space Force Blue
        icon: '🚀',
        overview: 'America\'s newest branch, focused on space operations, satellite systems, and orbital defense. Cutting-edge technology and small, elite force.',
        culture: {
            description: 'Startup mentality within military structure. Heavy emphasis on technology, innovation, and digital fluency.',
            keywords: ['Space Operations', 'Cutting-Edge Tech', 'Small Elite Force', 'Innovation'],
        },
        benefits: {
            highlight: 'Newest branch with fastest advancement and tech focus',
            details: [
                'Smallest branch = fastest promotion',
                'Direct path to space industry careers',
                'Partnership with commercial space companies',
                'Cutting-edge training programs',
            ],
        },
        careers: {
            totalMOS: 20,
            popular: ['Space Systems Operations', 'Cyber Operations', 'Intelligence', 'Orbital Warfare'],
            uniqueOpportunities: ['Satellite Operations', 'Space Launch Operations', 'Orbital Analysis', 'Space Cybersecurity'],
        },
        requirements: {
            ageRange: '17-39',
            asvabMinimum: 36,
            physicalTest: 'Space Force Physical Fitness Test',
            contractLength: '4-6 years',
        },
        lifestyle: {
            deploymentFrequency: 'Minimal traditional deployments',
            baseLocations: ['Vandenberg SFB, CA', 'Peterson SFB, CO', 'Patrick SFB, FL', 'Buckley SFB, CO'],
            familySupport: 'Leverages Air Force infrastructure',
        },
        statistics: {
            activePersonnel: '8,600',
            averageSalary: '$45,000 - $85,000',
            enlistmentBonus: 'Up to $40,000',
        },
    },
];

export function getBranchById(id: string): BranchInfo | undefined {
    return BRANCHES.find(b => b.id === id);
}

export function compareBranches(ids: string[]): BranchInfo[] {
    return BRANCHES.filter(b => ids.includes(b.id));
}
