// MOS Enrichment Data - Candidate-Facing Descriptions
// Adds detailed info for when candidates ask about their matches

const MOS_ENRICHMENT = {
    // ============================================
    // INFANTRY & COMBAT (11 Series)
    // ============================================
    '11B': {
        description: 'The Infantry is the main land combat force of the Army. As an Infantryman, you\'ll be on the front lines, trained to locate, close with, and destroy enemy forces through fire and maneuver.',
        dailyDuties: ['Lead fire team in tactical operations', 'Operate and maintain weapons systems', 'Conduct reconnaissance patrols', 'Plan and execute missions', 'Train junior soldiers'],
        trainingWeeks: 22,
        trainingLocation: 'Fort Moore, GA (formerly Fort Benning)',
        careerProgression: ['Private → Specialist → Sergeant → Staff Sergeant → Sergeant First Class → Master Sergeant/First Sergeant → Sergeant Major', 'Can become Drill Sergeant, Ranger, or Special Forces'],
        benefits: ['Combat skills applicable to law enforcement', 'Leadership experience', 'Strong team bonds', 'Eligible for Airborne/Ranger schools'],
        lifestyle: 'High operational tempo with frequent field training. Expect deployments and physically demanding work. Strong camaraderie and unit pride.',
        civilianPath: 'Law enforcement, security consulting, private military contractors, federal agencies (FBI, DEA, ATF)',
    },
    '11C': {
        description: 'Indirect Fire Infantrymen are mortarmen who provide close and immediate indirect fire support to infantry units. You\'ll operate mortars ranging from 60mm to 120mm.',
        dailyDuties: ['Set up and operate mortar systems', 'Calculate firing data', 'Conduct fire missions', 'Maintain ammunition and equipment', 'Integrate with infantry operations'],
        trainingWeeks: 22,
        trainingLocation: 'Fort Moore, GA',
        benefits: ['Technical mathematics skills', 'Artillery expertise', 'Leadership opportunities'],
        civilianPath: 'Surveying, engineering technician, law enforcement',
    },

    // ============================================
    // CYBER (17 Series)
    // ============================================
    '17C': {
        description: 'Cyber Operations Specialists are the Army\'s digital warriors. You\'ll conduct offensive and defensive cyberspace operations, protecting military networks and conducting cyber missions against adversaries.',
        dailyDuties: ['Conduct vulnerability assessments', 'Perform penetration testing', 'Analyze malware and cyber threats', 'Develop cyber tools and techniques', 'Defend critical networks'],
        trainingWeeks: 52,
        trainingLocation: 'Fort Eisenhower, GA (formerly Fort Gordon)',
        careerProgression: ['Specialist → Sergeant → Staff Sergeant → Senior Cyber NCO', 'Can become Warrant Officer (170A) or commission as Cyber Officer'],
        benefits: ['Top industry certifications (CEH, Security+, OSCP)', 'TS/SCI clearance (worth $15k+ in civilian sector)', 'Cutting-edge technology exposure', '$50k signing bonus'],
        lifestyle: 'Mostly office/operations center environment. May deploy to support combat operations. Highly technical work with constant learning.',
        civilianPath: 'Cybersecurity analyst ($80-150k), Penetration tester, SOC analyst, Security engineer, Government contractor',
        certifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'GIAC certifications'],
    },

    // ============================================
    // SPECIAL FORCES (18 Series)
    // ============================================
    '18X': {
        description: 'Special Forces Candidates train to become Green Berets - the Army\'s premier unconventional warfare experts. You\'ll learn to work with indigenous forces, conduct special reconnaissance, and execute direct action missions.',
        dailyDuties: ['Unconventional warfare operations', 'Foreign internal defense', 'Special reconnaissance', 'Direct action raids', 'Counter-terrorism'],
        trainingWeeks: 63,
        trainingLocation: 'Fort Liberty, NC (formerly Fort Bragg)',
        careerProgression: ['Complete Special Forces Qualification Course', 'Specialize in weapons, engineering, medical, or communications', 'Can progress to team sergeant or warrant officer'],
        benefits: ['Special Forces Tab', 'Language training', 'Elite status', 'Foreign travel', 'Additional pay (SDAP, language pay)'],
        lifestyle: 'Extremely demanding selection and training. High operational tempo with frequent deployments. Small team operations worldwide.',
        civilianPath: 'Executive protection, security consulting, government agencies (CIA, State Dept), corporate security leadership',
        requirements: ['Must be male (policy under review)', 'GT score 110+', 'Pass SFAS selection', 'Airborne qualified'],
    },

    // ============================================
    // INTELLIGENCE (35 Series)
    // ============================================
    '35F': {
        description: 'Intelligence Analysts are the Army\'s information experts. You\'ll collect, analyze, and disseminate intelligence to support military operations and national security.',
        dailyDuties: ['Analyze intelligence from multiple sources', 'Prepare intelligence products and briefings', 'Maintain databases and tracking systems', 'Brief commanders on enemy threats', 'Coordinate with other intelligence disciplines'],
        trainingWeeks: 23,
        trainingLocation: 'Fort Huachuca, AZ',
        careerProgression: ['Analyst → Senior Analyst → Intelligence NCO → Chief of Intelligence', 'Can become Warrant Officer (350F) or commission'],
        benefits: ['TS/SCI clearance', 'Analytical skills highly valued', 'Multiple career paths', 'Work with cutting-edge technology'],
        lifestyle: 'Mix of office work and tactical operations. May work in sensitive compartmented facilities. Some deployments to support operations.',
        civilianPath: 'Business intelligence analyst ($65-100k), Government intelligence analyst (CIA, DIA, NSA), Corporate security, Data analyst',
        certifications: ['Various classified certifications available'],
    },
    '35P': {
        description: 'Cryptologic Linguists are language experts who intercept, identify, and analyze foreign communications. You\'ll become fluent in a critical foreign language.',
        dailyDuties: ['Translate foreign communications', 'Analyze cultural context', 'Produce intelligence reports', 'Support signals intelligence operations', 'Maintain language proficiency'],
        trainingWeeks: 64,
        trainingLocation: 'Defense Language Institute (DLI), Monterey, CA + Fort Huachuca, AZ',
        careerProgression: ['Linguist → Senior Linguist → Language Team Lead → Chief Linguist', 'Can earn bachelor\'s degree equivalency in language'],
        benefits: ['Full language immersion training', 'Up to $40k bonus', 'Foreign Language Proficiency Pay (FLPP)', 'College credits for language training'],
        lifestyle: 'Long training period (1-2 years for language alone). Mostly analytical work. May deploy for tactical SIGINT.',
        civilianPath: 'Translator/Interpreter ($50-90k), Government linguist (NSA, FBI), Language teacher, International business',
        languages: ['Arabic', 'Chinese (Mandarin)', 'Korean', 'Russian', 'Farsi', 'Other critical languages'],
    },

    // ============================================
    // SIGNAL/IT (25 Series)
    // ============================================
    '25B': {
        description: 'Information Technology Specialists are the Army\'s IT professionals. You\'ll install, configure, and maintain computer systems and networks across military installations.',
        dailyDuties: ['Install and configure network hardware', 'Troubleshoot system issues', 'Manage user accounts and security', 'Maintain servers and databases', 'Provide technical support'],
        trainingWeeks: 20,
        trainingLocation: 'Fort Eisenhower, GA',
        careerProgression: ['IT Specialist → Senior Technician → Network Manager → Chief Information Officer', 'Can become 255A Warrant Officer'],
        benefits: ['Industry certifications (CompTIA A+, Network+, Security+)', 'Transferable skills', 'Always in demand'],
        lifestyle: 'Mostly garrison/office environment. Some field operations. Technical work with regular hours typically.',
        civilianPath: 'IT Support Specialist ($45-70k), Network Administrator ($60-90k), Systems Administrator, Help Desk Manager',
        certifications: ['CompTIA A+', 'CompTIA Network+', 'CompTIA Security+', 'Microsoft certifications'],
    },
    '25D': {
        description: 'Cyber Network Defenders are the Army\'s elite network security specialists. You\'ll protect critical networks from cyber threats and respond to incidents.',
        dailyDuties: ['Monitor networks for threats', 'Respond to security incidents', 'Conduct vulnerability assessments', 'Implement security controls', 'Train users on security practices'],
        trainingWeeks: 35,
        trainingLocation: 'Fort Eisenhower, GA',
        benefits: ['TS/SCI clearance', 'Advanced cybersecurity training', 'Up to $40k bonus', 'High civilian demand'],
        lifestyle: 'Operations center environment. May work shifts. Critical mission with real-world impact.',
        civilianPath: 'SOC Analyst ($70-100k), Incident Responder ($80-120k), Security Engineer, CISO pathway',
        certifications: ['GCIA', 'GCIH', 'Security+', 'CEH'],
    },

    // ============================================
    // MEDICAL (68 Series)
    // ============================================
    '68W': {
        description: 'Combat Medics are the Army\'s front-line medical providers. You\'ll provide emergency medical treatment on the battlefield and primary care in garrison. One of the most respected roles in the military.',
        dailyDuties: ['Provide emergency trauma care', 'Administer medications', 'Perform medical evacuations', 'Conduct sick call and routine care', 'Train soldiers in first aid'],
        trainingWeeks: 16,
        trainingLocation: 'Fort Sam Houston, TX',
        careerProgression: ['Medic → Senior Medic → Medical NCO → Medical Platoon Sergeant', 'Can become 68W-Y2 (LPN) or commission as Medical Service Officer'],
        benefits: ['National Registry EMT certification', 'Transferable medical skills', 'Highly respected position', 'Multiple civilian pathways'],
        lifestyle: 'Mix of clinic work and field operations. Attached to combat units. Can be physically and emotionally demanding.',
        civilianPath: 'EMT/Paramedic ($35-60k), Nurse (with additional schooling), Physician Assistant pathway, Hospital administrator',
        certifications: ['National Registry EMT (NREMT)', 'Advanced Cardiac Life Support (ACLS)', 'Trauma certifications'],
    },
    '68C': {
        description: 'Practical Nursing Specialists provide nursing care in military hospitals and clinics. You\'ll assist physicians and registered nurses while caring for patients.',
        dailyDuties: ['Administer medications', 'Monitor patient vital signs', 'Assist with medical procedures', 'Document patient care', 'Educate patients on health'],
        trainingWeeks: 52,
        trainingLocation: 'Fort Sam Houston, TX',
        benefits: ['LPN licensure upon completion', 'Work in military hospitals', 'Pathway to RN'],
        lifestyle: 'Hospital/clinic environment. Standard shifts. Professional medical setting.',
        civilianPath: 'Licensed Practical Nurse ($45-55k), Registered Nurse pathway ($60-80k), Healthcare administration',
        certifications: ['LPN License'],
    },

    // ============================================
    // AVIATION (15 Series)
    // ============================================
    '15W': {
        description: 'UAS Operators fly unmanned aircraft systems (drones) to conduct reconnaissance, surveillance, and target acquisition missions. You\'ll be the eyes in the sky for ground commanders.',
        dailyDuties: ['Operate UAV flight controls', 'Conduct mission planning', 'Analyze real-time imagery', 'Brief commanders on observations', 'Maintain flight logs'],
        trainingWeeks: 23,
        trainingLocation: 'Fort Huachuca, AZ',
        careerProgression: ['Operator → Mission Commander → UAS Operations NCO → Master Trainer'],
        benefits: ['Secret clearance', 'Aviation experience', 'High-tech equipment', 'Growing field'],
        lifestyle: 'Operations center environment with screens and controls. Some field deployments. Shift work possible.',
        civilianPath: 'Commercial drone operator ($50-80k), FAA positions, Aerospace industry, Film/Photography drones',
        certifications: ['FAA Part 107 pathway'],
    },
    '15Q': {
        description: 'Air Traffic Control Operators manage aircraft in military airspace. You\'ll control aircraft at Army airfields and coordinate with FAA facilities.',
        dailyDuties: ['Control aircraft arrivals/departures', 'Issue clearances and instructions', 'Monitor radar and communications', 'Coordinate with other facilities', 'Respond to emergencies'],
        trainingWeeks: 26,
        trainingLocation: 'Fort Novosel, AL (formerly Fort Rucker)',
        benefits: ['FAA certification pathway', 'High civilian demand', 'Critical responsibility'],
        lifestyle: 'Tower or radar facility. Shift work. High-stress, high-reward position.',
        civilianPath: 'FAA Air Traffic Controller ($80-180k) - one of highest paying federal jobs',
        certifications: ['Control Tower Operator rating'],
    },

    // ============================================
    // TRANSPORTATION (88 Series)
    // ============================================
    '88M': {
        description: 'Motor Transport Operators drive military trucks to transport cargo, personnel, and equipment. You\'ll operate everything from cargo trucks to fuel tankers.',
        dailyDuties: ['Operate wheeled vehicles (2.5-ton to tractor trailers)', 'Load and secure cargo', 'Perform vehicle inspections', 'Navigate convoy routes', 'Maintain vehicles'],
        trainingWeeks: 7,
        trainingLocation: 'Fort Leonard Wood, MO',
        benefits: ['Commercial Driver License (CDL)', 'Quick training', 'Always in demand', 'Travel opportunities'],
        lifestyle: 'Mobile job with lots of driving. Convoy operations. Can involve long hours on the road.',
        civilianPath: 'Truck Driver ($45-75k), Logistics coordinator, Fleet manager, Owner-operator',
        certifications: ['CDL Class A'],
    },

    // ============================================
    // MAINTENANCE (91 Series)
    // ============================================
    '91B': {
        description: 'Wheeled Vehicle Mechanics maintain and repair military vehicles. You\'ll work on everything from Humvees to heavy trucks.',
        dailyDuties: ['Diagnose vehicle problems', 'Repair engines, transmissions, brakes', 'Perform preventive maintenance', 'Order and manage parts', 'Train junior mechanics'],
        trainingWeeks: 16,
        trainingLocation: 'Fort Leonard Wood, MO',
        benefits: ['ASE certification pathway', 'Transferable skills', 'Always needed'],
        lifestyle: 'Motor pool/shop environment. Some field operations. Hands-on mechanical work.',
        civilianPath: 'Auto Mechanic ($40-60k), Diesel Technician ($50-70k), Fleet maintenance manager',
        certifications: ['ASE certifications available'],
    },

    // ============================================
    // EOD (89 Series)
    // ============================================
    '89D': {
        description: 'Explosive Ordnance Disposal Specialists are bomb technicians. You\'ll locate, identify, and neutralize explosive threats from IEDs to nuclear weapons.',
        dailyDuties: ['Respond to bomb threats', 'Render safe explosive devices', 'Conduct post-blast analysis', 'Train units on IED awareness', 'Support VIP missions'],
        trainingWeeks: 37,
        trainingLocation: 'Fort Sill, OK + Eglin AFB, FL',
        careerProgression: ['EOD Tech → Team Leader → EOD NCO → EOD Senior NCO', 'Can become 890A Warrant Officer'],
        benefits: ['Special Duty Assignment Pay', 'High civilian demand', 'Elite status', 'Advanced training'],
        lifestyle: 'High-risk work requiring extreme focus. On-call for emergencies. Small, elite community.',
        civilianPath: 'FBI/ATF Bomb Technician ($80-120k), Private EOD contractor ($100-200k), Public safety',
        requirements: ['ST score 110+', 'Secret clearance', 'No history of mental health issues'],
    },
};

// Function to enrich MOS data with candidate information
function enrichMOSData(mosCode) {
    const enrichment = MOS_ENRICHMENT[mosCode];
    if (!enrichment) {
        // Return generic enrichment for codes without specific data
        return {
            description: 'Military specialty providing essential support to Army operations.',
            dailyDuties: ['Perform job-specific duties', 'Maintain equipment', 'Train and develop skills', 'Support unit missions'],
            trainingWeeks: 12,
            benefits: ['Valuable skills training', 'Leadership opportunities', 'Educational benefits'],
            lifestyle: 'Varies by unit assignment. Combination of garrison and field operations.',
            civilianPath: 'Various opportunities based on skills developed',
        };
    }
    return enrichment;
}

module.exports = { MOS_ENRICHMENT, enrichMOSData };
