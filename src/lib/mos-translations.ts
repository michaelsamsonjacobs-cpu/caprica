// Comprehensive MOS to Civilian Career Mappings
// Covers all major military branches with salary data and skill translations

export interface CivilianCareer {
    title: string;
    salaryMin: number;
    salaryMax: number;
    match: number;
    clearanceBonus?: boolean;
    certRequired?: string;
}

export interface MOSTranslation {
    code: string;
    title: string;
    branch: string;
    careerField: string;
    civilianCareers: CivilianCareer[];
    transferableSkills: string[];
    certifications: string[];
    recommendedCerts?: { name: string; why: string }[];
    description: string;
}

export const MOS_TRANSLATIONS: Record<string, MOSTranslation> = {
    // ==================== ARMY - INFANTRY (11 Series) ====================
    '11B': {
        code: '11B', title: 'Infantryman', branch: 'Army', careerField: 'Combat',
        civilianCareers: [
            { title: 'Security Manager', salaryMin: 65000, salaryMax: 95000, match: 92 },
            { title: 'Law Enforcement Officer', salaryMin: 55000, salaryMax: 85000, match: 88 },
            { title: 'Federal Agent (FBI/ATF/DEA)', salaryMin: 80000, salaryMax: 130000, match: 85, clearanceBonus: true },
            { title: 'Private Security Contractor', salaryMin: 100000, salaryMax: 250000, match: 78, clearanceBonus: true },
        ],
        transferableSkills: ['Leadership', 'Team Management', 'Crisis Response', 'Tactical Planning'],
        certifications: ['CPR/First Aid', 'Firearms Certification', 'Security Clearance'],
        recommendedCerts: [{ name: 'PMP', why: 'Transforms leadership into project management' }, { name: 'Executive Protection', why: 'unlocks private security roles' }],
        description: 'Infantry experience translates to security, law enforcement, and leadership roles.',
    },
    '11C': {
        code: '11C', title: 'Indirect Fire Infantryman', branch: 'Army', careerField: 'Combat',
        civilianCareers: [
            { title: 'Survey Technician', salaryMin: 45000, salaryMax: 70000, match: 85 },
            { title: 'Security Specialist', salaryMin: 55000, salaryMax: 80000, match: 82 },
            { title: 'Defense Contractor', salaryMin: 70000, salaryMax: 120000, match: 80, clearanceBonus: true },
        ],
        transferableSkills: ['Mathematics', 'Precision', 'Coordination', 'Team Operations'],
        certifications: ['Fire Direction', 'Survey Certification'],
        description: 'Mortarmen skills apply to surveying.technical calculations, and precision work.',
    },

    // ==================== ARMY - CYBER (17 Series) ====================
    '17C': {
        code: '17C', title: 'Cyber Operations Specialist', branch: 'Army', careerField: 'Cyber',
        civilianCareers: [
            { title: 'Cybersecurity Analyst', salaryMin: 85000, salaryMax: 140000, match: 95 },
            { title: 'Penetration Tester', salaryMin: 95000, salaryMax: 165000, match: 92 },
            { title: 'Security Engineer', salaryMin: 110000, salaryMax: 180000, match: 90 },
            { title: 'Threat Intelligence Analyst', salaryMin: 95000, salaryMax: 150000, match: 85, clearanceBonus: true },
        ],
        transferableSkills: ['Network Security', 'Penetration Testing', 'Malware Analysis', 'Incident Response'],
        certifications: ['Security+', 'CEH', 'CISSP Eligible', 'OSCP', 'TS/SCI'],
        recommendedCerts: [{ name: 'CISSP', why: 'The gold standard for management' }, { name: 'CISM', why: 'For info security management roles' }],
        description: 'Cyber Operations is #1 translating MOS. TS/SCI clearance worth $15-25K more.',
    },
    '17E': {
        code: '17E', title: 'Electronic Warfare Specialist', branch: 'Army', careerField: 'Cyber',
        civilianCareers: [
            { title: 'RF Engineer', salaryMin: 80000, salaryMax: 130000, match: 90 },
            { title: 'Electronic Warfare Analyst', salaryMin: 90000, salaryMax: 150000, match: 92, clearanceBonus: true },
            { title: 'Spectrum Manager', salaryMin: 70000, salaryMax: 110000, match: 85 },
        ],
        transferableSkills: ['RF/Signals Analysis', 'Electronic Systems', 'Technical Analysis'],
        certifications: ['EW Certification', 'Security Clearance', 'RF Training'],
        description: 'EW specialists are in high demand in defense industry and RF engineering.',
    },

    // ==================== ARMY - SPECIAL FORCES (18 Series) ====================
    '18B': {
        code: '18B', title: 'Special Forces Weapons Sergeant', branch: 'Army', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Defense Contractor', salaryMin: 120000, salaryMax: 300000, match: 95, clearanceBonus: true },
            { title: 'Executive Protection', salaryMin: 100000, salaryMax: 250000, match: 90 },
            { title: 'Training Consultant', salaryMin: 80000, salaryMax: 150000, match: 85 },
        ],
        transferableSkills: ['Advanced Tactics', 'Weapons Training', 'Leadership', 'Problem Solving'],
        certifications: ['TS/SCI', 'Multiple Weapons Systems'],
        description: 'SF operators command premium contractor rates with clearances.',
    },
    '18D': {
        code: '18D', title: 'Special Forces Medical Sergeant', branch: 'Army', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Physician Assistant', salaryMin: 100000, salaryMax: 150000, match: 85, certRequired: 'PA School' },
            { title: 'Paramedic Supervisor', salaryMin: 60000, salaryMax: 90000, match: 90 },
            { title: 'Trauma Nurse', salaryMin: 70000, salaryMax: 110000, match: 82, certRequired: 'RN' },
        ],
        transferableSkills: ['Trauma Medicine', 'Emergency Care', 'Wilderness Medicine', 'Leadership'],
        certifications: ['NREMT-P', 'PHTLS', 'ACLS', 'TCCC'],
        description: '18Ds have excellent medical career pathways with additional education.',
    },

    // ==================== ARMY - SIGNAL (25 Series) ====================
    '25B': {
        code: '25B', title: 'Information Technology Specialist', branch: 'Army', careerField: 'IT',
        civilianCareers: [
            { title: 'IT Support Specialist', salaryMin: 50000, salaryMax: 80000, match: 95 },
            { title: 'Systems Administrator', salaryMin: 65000, salaryMax: 100000, match: 90 },
            { title: 'Network Administrator', salaryMin: 60000, salaryMax: 95000, match: 88 },
            { title: 'Help Desk Manager', salaryMin: 55000, salaryMax: 85000, match: 85 },
        ],
        transferableSkills: ['System Administration', 'Troubleshooting', 'Network Management', 'User Support'],
        certifications: ['CompTIA A+', 'Security+', 'Network+', 'MCSA'],
        description: '25Bs have direct translation to IT support and admin roles.',
    },
    '25N': {
        code: '25N', title: 'Nodal Network Systems Operator', branch: 'Army', careerField: 'IT',
        civilianCareers: [
            { title: 'Network Engineer', salaryMin: 75000, salaryMax: 120000, match: 92 },
            { title: 'Network Technician', salaryMin: 55000, salaryMax: 85000, match: 95 },
            { title: 'Telecommunications Specialist', salaryMin: 60000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Network Operations', 'Routers/Switches', 'VoIP', 'Telecommunications'],
        certifications: ['CCNA', 'Network+', 'VCP'],
        description: 'Network operators excel in telecommunications and enterprise networking.',
    },
    '25S': {
        code: '25S', title: 'Satellite Communications Specialist', branch: 'Army', careerField: 'Communications',
        civilianCareers: [
            { title: 'Satellite Technician', salaryMin: 60000, salaryMax: 100000, match: 95 },
            { title: 'RF Engineer', salaryMin: 70000, salaryMax: 120000, match: 85 },
            { title: 'Telecommunications Tech', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Satellite Systems', 'RF Communications', 'Signal Processing', 'Antenna Systems'],
        certifications: ['SATCOM Certifications', 'FCC License'],
        description: 'SATCOM operators find opportunities in commercial satellite industry.',
    },

    // ==================== ARMY - MILITARY POLICE (31 Series) ====================
    '31B': {
        code: '31B', title: 'Military Police', branch: 'Army', careerField: 'Law Enforcement',
        civilianCareers: [
            { title: 'Police Officer', salaryMin: 50000, salaryMax: 90000, match: 95 },
            { title: 'Federal Agent', salaryMin: 70000, salaryMax: 130000, match: 82, clearanceBonus: true },
            { title: 'Corrections Officer', salaryMin: 40000, salaryMax: 65000, match: 88 },
            { title: 'Security Manager', salaryMin: 55000, salaryMax: 90000, match: 85 },
        ],
        transferableSkills: ['Law Enforcement', 'Investigation', 'Security', 'Report Writing'],
        certifications: ['Law Enforcement Training', 'Security Clearance', 'Firearms'],
        description: 'MPs have direct pathways to civilian law enforcement careers.',
    },
    '31D': {
        code: '31D', title: 'Criminal Investigations Special Agent (CID)', branch: 'Army', careerField: 'Law Enforcement',
        civilianCareers: [
            { title: 'Special Agent (FBI/ATF/DEA)', salaryMin: 80000, salaryMax: 140000, match: 92, clearanceBonus: true },
            { title: 'Corporate Investigator', salaryMin: 65000, salaryMax: 110000, match: 88 },
            { title: 'Police Detective', salaryMin: 60000, salaryMax: 100000, match: 90 },
        ],
        transferableSkills: ['Criminal Investigation', 'Forensics', 'Interview Techniques', 'Evidence Collection'],
        certifications: ['CID Training', 'CFE', 'Federal Certification'],
        description: 'CID agents are highly qualified for federal law enforcement positions.',
    },

    // ==================== ARMY - INTELLIGENCE (35 Series) ====================
    '35F': {
        code: '35F', title: 'Intelligence Analyst', branch: 'Army', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 65000, salaryMax: 110000, match: 95, clearanceBonus: true },
            { title: 'Security Analyst', salaryMin: 60000, salaryMax: 100000, match: 88 },
            { title: 'Research Analyst', salaryMin: 55000, salaryMax: 90000, match: 85 },
        ],
        transferableSkills: ['Intelligence Analysis', 'Research', 'Reporting', 'Threat Assessment'],
        certifications: ['TS/SCI', 'GEOINT', 'SIGINT'],
        description: '35F analysts are in high demand in IC and defense industry.',
    },
    '35L': {
        code: '35L', title: 'Counter-Intelligence Agent', branch: 'Army', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'CI Analyst', salaryMin: 75000, salaryMax: 130000, match: 95, clearanceBonus: true },
            { title: 'Security Investigator', salaryMin: 65000, salaryMax: 110000, match: 88 },
            { title: 'Corporate Security', salaryMin: 70000, salaryMax: 120000, match: 82 },
        ],
        transferableSkills: ['Counter-Intelligence', 'Investigations', 'Security Operations'],
        certifications: ['TS/SCI', 'Polygraph', 'CI Training'],
        description: 'CI agents have premium opportunities in government and defense.',
    },
    '35N': {
        code: '35N', title: 'Signals Intelligence Analyst', branch: 'Army', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'SIGINT Analyst', salaryMin: 80000, salaryMax: 140000, match: 95, clearanceBonus: true },
            { title: 'RF Analyst', salaryMin: 70000, salaryMax: 120000, match: 88 },
            { title: 'Defense Contractor', salaryMin: 90000, salaryMax: 160000, match: 92, clearanceBonus: true },
        ],
        transferableSkills: ['Signals Analysis', 'SIGINT Tools', 'Technical Analysis'],
        certifications: ['TS/SCI', 'SIGINT Certifications'],
        description: '35N analysts command top salaries in defense and IC.',
    },

    // ==================== ARMY - ARMOR (19 Series) ====================
    '19D': {
        code: '19D', title: 'Cavalry Scout', branch: 'Army', careerField: 'Combat Arms',
        civilianCareers: [
            { title: 'Security Manager', salaryMin: 55000, salaryMax: 90000, match: 88 },
            { title: 'Intelligence Analyst', salaryMin: 60000, salaryMax: 100000, match: 85, clearanceBonus: true },
            { title: 'Private Investigator', salaryMin: 50000, salaryMax: 85000, match: 82 },
        ],
        transferableSkills: ['Reconnaissance', 'Intelligence Gathering', 'Surveillance', 'Reporting'],
        certifications: ['Security Clearance', 'PI License'],
        description: 'Scouts excel in investigative and intelligence-focused careers.',
    },
    '19K': {
        code: '19K', title: 'M1 Armor Crewmember', branch: 'Army', careerField: 'Combat Arms',
        civilianCareers: [
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 75000, match: 88 },
            { title: 'Security Specialist', salaryMin: 50000, salaryMax: 80000, match: 85 },
            { title: 'Defense Contractor', salaryMin: 70000, salaryMax: 120000, match: 80, clearanceBonus: true },
        ],
        transferableSkills: ['Vehicle Operations', 'Maintenance', 'Team Operations', 'Communications'],
        certifications: ['CDL', 'Heavy Equipment Certification'],
        description: 'Tank crewmembers translate to heavy equipment and vehicle operations.',
    },

    // ==================== ARMY - FIELD ARTILLERY (13 Series) ====================
    '13B': {
        code: '13B', title: 'Cannon Crewmember', branch: 'Army', careerField: 'Combat',
        civilianCareers: [
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 75000, match: 85 },
            { title: 'Security Specialist', salaryMin: 50000, salaryMax: 80000, match: 82 },
            { title: 'Logistics Coordinator', salaryMin: 45000, salaryMax: 70000, match: 78 },
        ],
        transferableSkills: ['Team Coordination', 'Heavy Equipment', 'Precision Operations'],
        certifications: ['HAZMAT', 'Heavy Equipment', 'Security Clearance'],
        description: 'Cannon crewmembers translate to logistics and heavy equipment roles.',
    },
    '13F': {
        code: '13F', title: 'Fire Support Specialist', branch: 'Army', careerField: 'Combat',
        civilianCareers: [
            { title: 'Project Coordinator', salaryMin: 50000, salaryMax: 80000, match: 85 },
            { title: 'Defense Analyst', salaryMin: 70000, salaryMax: 120000, match: 82, clearanceBonus: true },
            { title: 'Emergency Manager', salaryMin: 55000, salaryMax: 90000, match: 78 },
        ],
        transferableSkills: ['Coordination', 'Communications', 'Analysis', 'Planning'],
        certifications: ['Joint Fires Observer', 'Security Clearance'],
        description: 'FISTers excel in coordination and analytical roles.',
    },
    '13M': {
        code: '13M', title: 'MLRS/HIMARS Crewmember', branch: 'Army', careerField: 'Field Artillery',
        civilianCareers: [
            { title: 'Missile Systems Technician', salaryMin: 60000, salaryMax: 100000, match: 90, clearanceBonus: true },
            { title: 'Defense Contractor', salaryMin: 70000, salaryMax: 130000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['Rocket Systems', 'Technical Operations', 'Logistics'],
        certifications: ['Hazmat', 'Security Clearance'],
        description: 'HIMARS operators are increasingly valuable with weapon system prominence.',
    },

    // ==================== ARMY - AIR DEFENSE (14 Series) ====================
    '14E': {
        code: '14E', title: 'Patriot Fire Control Operator', branch: 'Army', careerField: 'Air Defense',
        civilianCareers: [
            { title: 'Air Traffic Controller', salaryMin: 80000, salaryMax: 160000, match: 85 },
            { title: 'Radar Technician', salaryMin: 60000, salaryMax: 95000, match: 90 },
            { title: 'Defense Systems Analyst', salaryMin: 85000, salaryMax: 140000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['Radar Operations', 'Missile Systems', 'Tactical Decision Making'],
        certifications: ['Security Clearance', 'Radar Operator'],
        description: 'Patriot operators have valuable radar and air defense skills.',
    },

    // ==================== ARMY - AVIATION (15 Series) ====================
    '15T': {
        code: '15T', title: 'UH-60 Helicopter Repairer', branch: 'Army', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Aircraft Mechanic', salaryMin: 55000, salaryMax: 90000, match: 95 },
            { title: 'A&P Technician', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Aviation Inspector', salaryMin: 60000, salaryMax: 100000, match: 88 },
        ],
        transferableSkills: ['Aircraft Maintenance', 'Troubleshooting', 'Safety Procedures'],
        certifications: ['A&P License', 'FAA Certifications'],
        description: '15T experience leads directly to A&P certification and aviation careers.',
    },

    // ==================== ARMY - PSYOP/CA (37/38 Series) ====================
    '37F': {
        code: '37F', title: 'Psychological Operations Specialist', branch: 'Army', careerField: 'Information Operations',
        civilianCareers: [
            { title: 'Marketing Manager', salaryMin: 70000, salaryMax: 130000, match: 90 },
            { title: 'Public Relations Specialist', salaryMin: 55000, salaryMax: 90000, match: 88 },
            { title: 'Intelligence Analyst', salaryMin: 65000, salaryMax: 110000, match: 85, clearanceBonus: true },
        ],
        transferableSkills: ['Influence Operations', 'Media Analysis', 'Strategic Communications'],
        certifications: ['TS/SCI', 'Marketing Certifications'],
        description: 'PSYOP translates well to marketing, PR, and influence-based careers.',
    },
    '38B': {
        code: '38B', title: 'Civil Affairs Specialist', branch: 'Army', careerField: 'Civil Affairs',
        civilianCareers: [
            { title: 'Program Manager', salaryMin: 75000, salaryMax: 130000, match: 90 },
            { title: 'International Development', salaryMin: 65000, salaryMax: 120000, match: 88 },
            { title: 'NGO Director', salaryMin: 70000, salaryMax: 120000, match: 82 },
        ],
        transferableSkills: ['Community Relations', 'Cross-Cultural Communication', 'Program Management'],
        certifications: ['PMP', 'Language Certifications'],
        description: 'Civil Affairs specialists excel in NGO and program management.',
    },

    // ==================== ARMY - MEDICAL (68 Series) ====================
    '68W': {
        code: '68W', title: 'Combat Medic', branch: 'Army', careerField: 'Medical',
        civilianCareers: [
            { title: 'Paramedic', salaryMin: 45000, salaryMax: 70000, match: 95 },
            { title: 'ER Technician', salaryMin: 40000, salaryMax: 60000, match: 92 },
            { title: 'Registered Nurse', salaryMin: 60000, salaryMax: 95000, match: 82, certRequired: 'RN' },
            { title: 'Physician Assistant', salaryMin: 100000, salaryMax: 150000, match: 75, certRequired: 'PA' },
        ],
        transferableSkills: ['Emergency Medicine', 'Trauma Care', 'Patient Assessment', 'Medical Procedures'],
        certifications: ['NREMT-P', 'ACLS', 'PHTLS', 'TCCC'],
        recommendedCerts: [{ name: 'BSN (Nursing)', why: 'Bridge programs available for medics' }, { name: 'Flight Paramedic (FP-C)', why: 'Higher pay in air ambulance' }],
        description: '68W is the gold standard for civilian EMS with bridge programs to nursing.',
    },

    // ==================== ARMY - CBRN (74 Series) ====================
    '74D': {
        code: '74D', title: 'CBRN Specialist', branch: 'Army', careerField: 'CBRN',
        civilianCareers: [
            { title: 'HAZMAT Technician', salaryMin: 50000, salaryMax: 80000, match: 92 },
            { title: 'Environmental Health & Safety', salaryMin: 55000, salaryMax: 95000, match: 88 },
            { title: 'Nuclear Safety Inspector', salaryMin: 70000, salaryMax: 120000, match: 78 },
        ],
        transferableSkills: ['HAZMAT Response', 'Decontamination', 'Safety Procedures', 'Risk Assessment'],
        certifications: ['HAZMAT', 'HAZWOPER', 'OSHA', 'Health Physics'],
        description: 'CBRN specialists find opportunities in EHS and emergency response.',
    },

    // ==================== ARMY - TRANSPORTATION (88 Series) ====================
    '88M': {
        code: '88M', title: 'Motor Transport Operator', branch: 'Army', careerField: 'Transportation',
        civilianCareers: [
            { title: 'CDL Truck Driver', salaryMin: 50000, salaryMax: 85000, match: 98 },
            { title: 'Fleet Manager', salaryMin: 55000, salaryMax: 85000, match: 78 },
            { title: 'Owner-Operator', salaryMin: 60000, salaryMax: 150000, match: 80 },
        ],
        transferableSkills: ['Commercial Driving', 'Vehicle Inspection', 'Cargo Management', 'Route Planning'],
        certifications: ['CDL Class A', 'HAZMAT Endorsement', 'Tanker Endorsement'],
        description: '88M provides direct CDL pathway with immediate civilian employment.',
    },
    '88N': {
        code: '88N', title: 'Transportation Management Coordinator', branch: 'Army', careerField: 'Logistics',
        civilianCareers: [
            { title: 'Logistics Coordinator', salaryMin: 45000, salaryMax: 70000, match: 92 },
            { title: 'Supply Chain Analyst', salaryMin: 55000, salaryMax: 90000, match: 85 },
            { title: 'Operations Manager', salaryMin: 65000, salaryMax: 100000, match: 80 },
        ],
        transferableSkills: ['Logistics Planning', 'Transportation Management', 'Supply Chain'],
        certifications: ['APICS', 'Logistics Certifications', 'Supply Chain Management'],
        description: 'TMC experience applies directly to civilian logistics.',
    },

    // ==================== ARMY - MAINTENANCE (91 Series) ====================
    '91B': {
        code: '91B', title: 'Wheeled Vehicle Mechanic', branch: 'Army', careerField: 'Maintenance',
        civilianCareers: [
            { title: 'Diesel Mechanic', salaryMin: 45000, salaryMax: 75000, match: 95 },
            { title: 'Auto Mechanic', salaryMin: 40000, salaryMax: 65000, match: 90 },
            { title: 'Fleet Maintenance Manager', salaryMin: 55000, salaryMax: 85000, match: 80 },
        ],
        transferableSkills: ['Vehicle Diagnostics', 'Engine Repair', 'Preventive Maintenance'],
        certifications: ['ASE Certifications', 'Diesel Certification'],
        description: 'Vehicle mechanics have excellent civilian prospects with ASE.',
    },

    // ==================== ARMY - SUPPLY/LOGISTICS (92 Series) ====================
    '92A': {
        code: '92A', title: 'Automated Logistical Specialist', branch: 'Army', careerField: 'Logistics',
        civilianCareers: [
            { title: 'Warehouse Manager', salaryMin: 50000, salaryMax: 80000, match: 88 },
            { title: 'Inventory Control Specialist', salaryMin: 40000, salaryMax: 65000, match: 92 },
            { title: 'Supply Chain Coordinator', salaryMin: 45000, salaryMax: 75000, match: 85 },
        ],
        transferableSkills: ['Inventory Management', 'Logistics Systems', 'Supply Chain'],
        certifications: ['APICS CPIM', 'Logistics Certifications', 'SAP/ERP Training'],
        description: 'Supply specialists have strong warehouse and logistics opportunities.',
    },
    '92F': {
        code: '92F', title: 'Petroleum Supply Specialist', branch: 'Army', careerField: 'Logistics',
        civilianCareers: [
            { title: 'Fuel Distribution Operator', salaryMin: 45000, salaryMax: 75000, match: 92 },
            { title: 'Petroleum Technician', salaryMin: 50000, salaryMax: 85000, match: 88 },
            { title: 'Refinery Operator', salaryMin: 60000, salaryMax: 100000, match: 78 },
        ],
        transferableSkills: ['Fuel Handling', 'Safety Procedures', 'Quality Control'],
        certifications: ['HAZMAT', 'CDL w/ Tanker', 'Petroleum Certifications'],
        description: 'Petroleum specialists find opportunities in oil/gas and aviation fueling.',
    },

    // ==================== NAVY RATINGS ====================
    'IT': {
        code: 'IT', title: 'Information Systems Technician', branch: 'Navy', careerField: 'IT',
        civilianCareers: [
            { title: 'Systems Administrator', salaryMin: 65000, salaryMax: 110000, match: 95 },
            { title: 'Network Administrator', salaryMin: 60000, salaryMax: 100000, match: 92 },
            { title: 'Cybersecurity Analyst', salaryMin: 75000, salaryMax: 130000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['System Administration', 'Network Management', 'Cybersecurity'],
        certifications: ['Security+', 'CCNA', 'Microsoft Certifications'],
        description: 'Navy ITs have excellent IT career pathways.',
    },
    'CTN': {
        code: 'CTN', title: 'Cryptologic Technician Networks', branch: 'Navy', careerField: 'Cyber',
        civilianCareers: [
            { title: 'Cybersecurity Analyst', salaryMin: 85000, salaryMax: 150000, match: 95, clearanceBonus: true },
            { title: 'Penetration Tester', salaryMin: 100000, salaryMax: 175000, match: 92 },
            { title: 'SOC Analyst', salaryMin: 70000, salaryMax: 110000, match: 90 },
        ],
        transferableSkills: ['Offensive Cyber', 'Network Security', 'Threat Hunting'],
        certifications: ['TS/SCI', 'OSCP', 'CEH', 'CISSP'],
        description: 'CTNs are among the most marketable cyber ratings.',
    },
    'HM': {
        code: 'HM', title: 'Hospital Corpsman', branch: 'Navy', careerField: 'Medical',
        civilianCareers: [
            { title: 'EMT/Paramedic', salaryMin: 35000, salaryMax: 60000, match: 95 },
            { title: 'Medical Assistant', salaryMin: 35000, salaryMax: 50000, match: 92 },
            { title: 'LPN', salaryMin: 45000, salaryMax: 65000, match: 88 },
        ],
        transferableSkills: ['Patient Care', 'Emergency Medicine', 'Medical Procedures'],
        certifications: ['NREMT', 'CMA', 'LPN Pathway'],
        description: 'Corpsmen have multiple healthcare career pathways.',
    },
    'ET': {
        code: 'ET', title: 'Electronics Technician', branch: 'Navy', careerField: 'Electronics',
        civilianCareers: [
            { title: 'Electronics Technician', salaryMin: 50000, salaryMax: 85000, match: 95 },
            { title: 'Field Service Engineer', salaryMin: 55000, salaryMax: 90000, match: 90 },
            { title: 'Telecommunications Tech', salaryMin: 50000, salaryMax: 80000, match: 88 },
        ],
        transferableSkills: ['Electronics Repair', 'Troubleshooting', 'Calibration'],
        certifications: ['CET', 'ETA Certifications'],
        description: 'ETs have strong electronics industry career paths.',
    },
    'FC': {
        code: 'FC', title: 'Fire Controlman', branch: 'Navy', careerField: 'Weapons Systems',
        civilianCareers: [
            { title: 'Radar Technician', salaryMin: 60000, salaryMax: 100000, match: 90 },
            { title: 'Defense Systems Tech', salaryMin: 70000, salaryMax: 130000, match: 92, clearanceBonus: true },
            { title: 'Electronics Engineer', salaryMin: 75000, salaryMax: 120000, match: 85 },
        ],
        transferableSkills: ['Weapons Systems', 'Radar Systems', 'Electronics', 'Fire Control'],
        certifications: ['Security Clearance', 'Electronics Certs'],
        description: 'FCs have strong defense contractor opportunities.',
    },
    'SW': {
        code: 'SW', title: 'Special Warfare Operator (SEAL)', branch: 'Navy', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Executive Protection', salaryMin: 100000, salaryMax: 300000, match: 95 },
            { title: 'Defense Contractor', salaryMin: 150000, salaryMax: 350000, match: 92, clearanceBonus: true },
            { title: 'Corporate Security Director', salaryMin: 150000, salaryMax: 300000, match: 88 },
        ],
        transferableSkills: ['Special Operations', 'Leadership', 'Crisis Management', 'Tactical Planning'],
        certifications: ['TS/SCI', 'Executive Protection', 'All weapons'],
        description: 'SEALs command premium rates in executive protection and consulting.',
    },

    // ==================== AIR FORCE AFSCs ====================
    '1B4X1': {
        code: '1B4X1', title: 'Cyber Warfare Operations', branch: 'Air Force', careerField: 'Cyber',
        civilianCareers: [
            { title: 'Cyber Operations Specialist', salaryMin: 90000, salaryMax: 160000, match: 95, clearanceBonus: true },
            { title: 'Offensive Security Engineer', salaryMin: 100000, salaryMax: 180000, match: 92 },
            { title: 'Red Team Operator', salaryMin: 110000, salaryMax: 200000, match: 90 },
        ],
        transferableSkills: ['Offensive Cyber', 'Penetration Testing', 'Malware Analysis'],
        certifications: ['TS/SCI', 'OSCP', 'OSCE', 'GXPN'],
        description: '1B4 is the premier AF cyber career field with top salaries.',
    },
    '3D0X2': {
        code: '3D0X2', title: 'Cyber Systems Operations', branch: 'Air Force', careerField: 'IT',
        civilianCareers: [
            { title: 'Systems Administrator', salaryMin: 60000, salaryMax: 100000, match: 95 },
            { title: 'Network Administrator', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Cloud Engineer', salaryMin: 80000, salaryMax: 140000, match: 85 },
        ],
        transferableSkills: ['System Administration', 'Server Management', 'Cloud Computing'],
        certifications: ['Security+', 'MCSA', 'AWS/Azure'],
        description: 'Cyber Systems Ops have direct IT career translation.',
    },
    '3P0X1': {
        code: '3P0X1', title: 'Security Forces', branch: 'Air Force', careerField: 'Security',
        civilianCareers: [
            { title: 'Police Officer', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Federal Law Enforcement', salaryMin: 55000, salaryMax: 100000, match: 90, clearanceBonus: true },
            { title: 'Security Manager', salaryMin: 55000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Law Enforcement', 'Security', 'Investigations', 'Access Control'],
        certifications: ['Security Clearance', 'State Police Academy'],
        description: 'Security Forces have strong law enforcement and security career paths.',
    },
    '2A3X3': {
        code: '2A3X3', title: 'Tactical Aircraft Maintenance', branch: 'Air Force', careerField: 'Aviation Maintenance',
        civilianCareers: [
            { title: 'Aircraft Mechanic', salaryMin: 55000, salaryMax: 90000, match: 95 },
            { title: 'A&P Technician', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Aviation Inspector', salaryMin: 60000, salaryMax: 100000, match: 88 },
        ],
        transferableSkills: ['Aircraft Maintenance', 'Troubleshooting', 'Inspections'],
        certifications: ['A&P License', 'FCC License'],
        description: 'Tactical aircraft maintainers have excellent A&P career pathways.',
    },

    // ==================== MARINES MOS ====================
    '0311': {
        code: '0311', title: 'Rifleman', branch: 'Marines', careerField: 'Combat',
        civilianCareers: [
            { title: 'Security Specialist', salaryMin: 50000, salaryMax: 85000, match: 90 },
            { title: 'Law Enforcement', salaryMin: 50000, salaryMax: 85000, match: 88 },
            { title: 'Security Contractor', salaryMin: 80000, salaryMax: 200000, match: 85, clearanceBonus: true },
        ],
        transferableSkills: ['Leadership', 'Team Operations', 'Crisis Response', 'Physical Security'],
        certifications: ['Firearms', 'Security Clearance', 'First Aid'],
        description: 'Marine Riflemen translate to security and law enforcement.',
    },
    '0321': {
        code: '0321', title: 'Reconnaissance Man', branch: 'Marines', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Security Contractor', salaryMin: 100000, salaryMax: 250000, match: 92, clearanceBonus: true },
            { title: 'Executive Protection', salaryMin: 80000, salaryMax: 180000, match: 90 },
            { title: 'Federal Agent', salaryMin: 75000, salaryMax: 130000, match: 85 },
        ],
        transferableSkills: ['Reconnaissance', 'Special Operations', 'Leadership', 'Tactical Planning'],
        certifications: ['TS/SCI', 'Dive Certs', 'Jump Certs'],
        description: 'Recon Marines command premium rates in security contracting.',
    },
    '2651': {
        code: '2651', title: 'Cybersecurity Technician', branch: 'Marines', careerField: 'Cyber',
        civilianCareers: [
            { title: 'Cybersecurity Analyst', salaryMin: 75000, salaryMax: 130000, match: 95 },
            { title: 'SOC Analyst', salaryMin: 65000, salaryMax: 110000, match: 92 },
            { title: 'Security Engineer', salaryMin: 90000, salaryMax: 150000, match: 88 },
        ],
        transferableSkills: ['Incident Response', 'Security Monitoring', 'Network Defense'],
        certifications: ['Security+', 'CEH', 'CISSP'],
        description: 'Marine cyber technicians have strong security career paths.',
    },
    '5811': {
        code: '5811', title: 'Military Police', branch: 'Marines', careerField: 'Law Enforcement',
        civilianCareers: [
            { title: 'Police Officer', salaryMin: 50000, salaryMax: 85000, match: 95 },
            { title: 'Federal Law Enforcement', salaryMin: 55000, salaryMax: 100000, match: 92, clearanceBonus: true },
            { title: 'Security Director', salaryMin: 60000, salaryMax: 110000, match: 82 },
        ],
        transferableSkills: ['Law Enforcement', 'Investigations', 'Security', 'Physical Security'],
        certifications: ['State Police Academy', 'Security Clearance'],
        description: 'Marine MPs have excellent law enforcement career paths.',
    },

    // ==================== COAST GUARD RATINGS ====================
    'IT_CG': {
        code: 'IT', title: 'Information Systems Technician', branch: 'Coast Guard', careerField: 'IT',
        civilianCareers: [
            { title: 'Systems Administrator', salaryMin: 60000, salaryMax: 100000, match: 95 },
            { title: 'Network Administrator', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'IT Support Specialist', salaryMin: 50000, salaryMax: 80000, match: 90 },
        ],
        transferableSkills: ['System Administration', 'Network Management', 'Troubleshooting'],
        certifications: ['Security+', 'CCNA', 'Microsoft Certs'],
        description: 'Coast Guard ITs have strong IT career pathways.',
    },
    'ME': {
        code: 'ME', title: 'Maritime Enforcement Specialist', branch: 'Coast Guard', careerField: 'Law Enforcement',
        civilianCareers: [
            { title: 'Federal Agent (CBP)', salaryMin: 55000, salaryMax: 100000, match: 95 },
            { title: 'Police Officer', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Security Manager', salaryMin: 55000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Law Enforcement', 'Maritime Security', 'Investigations', 'Boarding Operations'],
        certifications: ['FLETC Training', 'Security Clearance', 'Firearms'],
        description: 'MEs have strong federal law enforcement pathways.',
    },

    // ==================== SPACE FORCE ====================
    '5S0X1': {
        code: '5S0X1', title: 'Space Systems Operations', branch: 'Space Force', careerField: 'Space Operations',
        civilianCareers: [
            { title: 'Satellite Operations Specialist', salaryMin: 70000, salaryMax: 120000, match: 95, clearanceBonus: true },
            { title: 'Space Systems Engineer', salaryMin: 90000, salaryMax: 150000, match: 88, clearanceBonus: true },
            { title: 'Mission Operations', salaryMin: 75000, salaryMax: 130000, match: 90, clearanceBonus: true },
        ],
        transferableSkills: ['Satellite Operations', 'Orbital Mechanics', 'Mission Planning', 'Space Systems'],
        certifications: ['TS/SCI', 'Space Operations Certifications'],
        description: 'Space Systems operators are in high demand in commercial space industry.',
    },
    '1C6X1': {
        code: '1C6X1', title: 'Space Systems Operations', branch: 'Space Force', careerField: 'Space Operations',
        civilianCareers: [
            { title: 'Spacecraft Controller', salaryMin: 80000, salaryMax: 140000, match: 95, clearanceBonus: true },
            { title: 'Satellite Engineer', salaryMin: 90000, salaryMax: 160000, match: 90 },
            { title: 'Space Analyst', salaryMin: 75000, salaryMax: 130000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['Spacecraft Operations', 'Telemetry', 'GPS Systems', 'Space Surveillance'],
        certifications: ['TS/SCI', 'PMP', 'Space Systems Certs'],
        description: 'Guardians have growing opportunities in commercial space sector.',
    },

    // ==================== ARMY - ENGINEER (12 Series) ====================
    '12B': {
        code: '12B', title: 'Combat Engineer', branch: 'Army', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Construction Manager', salaryMin: 70000, salaryMax: 120000, match: 90 },
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 75000, match: 92 },
            { title: 'Demolition Specialist', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Construction', 'Demolition', 'Heavy Equipment', 'Route Clearance'],
        certifications: ['OSHA', 'CDL', 'Explosives Handling'],
        description: 'Combat engineers excel in construction and demolition careers.',
    },
    '12C': {
        code: '12C', title: 'Bridge Crewmember', branch: 'Army', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Bridge Inspector', salaryMin: 55000, salaryMax: 85000, match: 90 },
            { title: 'Structural Engineer Tech', salaryMin: 50000, salaryMax: 80000, match: 85 },
        ],
        transferableSkills: ['Bridge Construction', 'Heavy Equipment', 'Structural Assessment'],
        certifications: ['OSHA', 'CDL', 'Bridge Inspection'],
        description: 'Bridge specialists translate to infrastructure careers.',
    },
    '12N': {
        code: '12N', title: 'Horizontal Construction Engineer', branch: 'Army', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 80000, match: 95 },
            { title: 'Road Construction Foreman', salaryMin: 55000, salaryMax: 90000, match: 88 },
            { title: 'Grading Contractor', salaryMin: 60000, salaryMax: 100000, match: 85 },
        ],
        transferableSkills: ['Graders', 'Bulldozers', 'Scrapers', 'Site Preparation'],
        certifications: ['CDL', 'OSHA', 'Equipment Operator'],
        description: 'Horizontal engineers are in high demand for road construction.',
    },
    '12Y': {
        code: '12Y', title: 'Geospatial Engineer', branch: 'Army', careerField: 'Engineering',
        civilianCareers: [
            { title: 'GIS Analyst', salaryMin: 55000, salaryMax: 85000, match: 92 },
            { title: 'Surveyor', salaryMin: 50000, salaryMax: 80000, match: 90 },
            { title: 'Cartographer', salaryMin: 55000, salaryMax: 85000, match: 88 },
        ],
        transferableSkills: ['GIS Software', 'Surveying', 'Mapping', 'Data Analysis'],
        certifications: ['GIS Professional', 'Surveying License'],
        description: 'Geospatial engineers have strong GIS career pathways.',
    },

    // ==================== ARMY - HUMAN RESOURCES (42 Series) ====================
    '42A': {
        code: '42A', title: 'Human Resources Specialist', branch: 'Army', careerField: 'Administration',
        civilianCareers: [
            { title: 'HR Specialist', salaryMin: 45000, salaryMax: 75000, match: 95 },
            { title: 'HR Manager', salaryMin: 60000, salaryMax: 100000, match: 88 },
            { title: 'Recruiter', salaryMin: 50000, salaryMax: 85000, match: 90 },
            { title: 'Benefits Administrator', salaryMin: 50000, salaryMax: 80000, match: 85 },
        ],
        transferableSkills: ['HR Systems', 'Personnel Management', 'Records', 'Customer Service'],
        certifications: ['PHR', 'SHRM-CP', 'HR Certifications'],
        description: '42A has direct translation to civilian HR careers.',
    },

    // ==================== ARMY - PUBLIC AFFAIRS (46 Series) ====================
    '46S': {
        code: '46S', title: 'Public Affairs Specialist', branch: 'Army', careerField: 'Communications',
        civilianCareers: [
            { title: 'Public Relations Specialist', salaryMin: 50000, salaryMax: 90000, match: 95 },
            { title: 'Communications Manager', salaryMin: 60000, salaryMax: 110000, match: 90 },
            { title: 'Journalist', salaryMin: 45000, salaryMax: 80000, match: 88 },
            { title: 'Social Media Manager', salaryMin: 50000, salaryMax: 85000, match: 85 },
        ],
        transferableSkills: ['Writing', 'Media Relations', 'Photography', 'Social Media'],
        certifications: ['APR', 'Press Credentials'],
        description: 'Public Affairs specialists excel in PR and communications.',
    },
    '46Q': {
        code: '46Q', title: 'Public Affairs Broadcast Specialist', branch: 'Army', careerField: 'Communications',
        civilianCareers: [
            { title: 'Video Producer', salaryMin: 50000, salaryMax: 90000, match: 95 },
            { title: 'Broadcast Journalist', salaryMin: 45000, salaryMax: 85000, match: 92 },
            { title: 'Video Editor', salaryMin: 45000, salaryMax: 80000, match: 90 },
        ],
        transferableSkills: ['Video Production', 'Broadcasting', 'Editing', 'Storytelling'],
        certifications: ['Adobe Premiere', 'Final Cut', 'Broadcasting'],
        description: 'Broadcast specialists have strong media production careers.',
    },

    // ==================== ARMY - AMMUNITION (89 Series) ====================
    '89B': {
        code: '89B', title: 'Ammunition Specialist', branch: 'Army', careerField: 'Ordnance',
        civilianCareers: [
            { title: 'Ammunition Technician', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Explosives Handler', salaryMin: 55000, salaryMax: 90000, match: 90 },
            { title: 'Defense Contractor', salaryMin: 65000, salaryMax: 110000, match: 85, clearanceBonus: true },
        ],
        transferableSkills: ['Ammunition Handling', 'Safety', 'Inventory', 'Hazmat'],
        certifications: ['ATF', 'HAZMAT', 'Explosives'],
        description: 'Ammunition specialists find roles in defense and explosives industries.',
    },
    '89D': {
        code: '89D', title: 'Explosive Ordnance Disposal (EOD)', branch: 'Army', careerField: 'Ordnance',
        civilianCareers: [
            { title: 'EOD Technician', salaryMin: 70000, salaryMax: 130000, match: 95, clearanceBonus: true },
            { title: 'Bomb Squad', salaryMin: 65000, salaryMax: 110000, match: 92 },
            { title: 'Defense Contractor', salaryMin: 100000, salaryMax: 200000, match: 90, clearanceBonus: true },
        ],
        transferableSkills: ['EOD', 'Hazmat', 'Robotics', 'Crisis Response'],
        certifications: ['EOD Certification', 'TS/SCI'],
        description: 'EOD technicians are highly sought after in defense and law enforcement.',
    },

    // ==================== ARMY - ELECTRONIC MAINTENANCE (94 Series) ====================
    '94E': {
        code: '94E', title: 'Radio and Communications Security Repairer', branch: 'Army', careerField: 'Electronics',
        civilianCareers: [
            { title: 'Electronics Technician', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'RF Technician', salaryMin: 55000, salaryMax: 90000, match: 90 },
            { title: 'Communications Tech', salaryMin: 50000, salaryMax: 80000, match: 88 },
        ],
        transferableSkills: ['Radio Repair', 'Electronics', 'COMSEC', 'Troubleshooting'],
        certifications: ['CET', 'Electronics Certs'],
        description: 'Radio repairers have strong electronics career paths.',
    },
    '94F': {
        code: '94F', title: 'Computer/Detection Systems Repairer', branch: 'Army', careerField: 'Electronics',
        civilianCareers: [
            { title: 'Computer Technician', salaryMin: 45000, salaryMax: 75000, match: 92 },
            { title: 'IT Support', salaryMin: 45000, salaryMax: 70000, match: 90 },
            { title: 'Field Service Tech', salaryMin: 50000, salaryMax: 80000, match: 88 },
        ],
        transferableSkills: ['Computer Repair', 'Diagnostics', 'Electronics', 'Troubleshooting'],
        certifications: ['CompTIA A+', 'Electronics'],
        description: 'Computer repairers translate well to IT support roles.',
    },

    // ==================== MORE NAVY RATINGS ====================
    'AM': {
        code: 'AM', title: 'Aviation Structural Mechanic', branch: 'Navy', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Aircraft Structural Mechanic', salaryMin: 50000, salaryMax: 85000, match: 95 },
            { title: 'A&P Technician', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Composites Technician', salaryMin: 50000, salaryMax: 80000, match: 88 },
        ],
        transferableSkills: ['Aircraft Structures', 'Composites', 'Sheet Metal', 'NDI'],
        certifications: ['A&P License', 'NDI Certifications'],
        description: 'Aviation structural mechanics have excellent A&P career paths.',
    },
    'AD': {
        code: 'AD', title: 'Aviation Machinist Mate', branch: 'Navy', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Aircraft Engine Mechanic', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'Powerplant Technician', salaryMin: 55000, salaryMax: 90000, match: 92 },
            { title: 'Turbine Mechanic', salaryMin: 60000, salaryMax: 100000, match: 88 },
        ],
        transferableSkills: ['Jet Engines', 'Turbines', 'Powerplants', 'Troubleshooting'],
        certifications: ['A&P License', 'Powerplant Rating'],
        description: 'Aviation machinists have excellent powerplant career paths.',
    },
    'AE': {
        code: 'AE', title: 'Aviation Electrician Mate', branch: 'Navy', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Avionics Technician', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'Aircraft Electrician', salaryMin: 55000, salaryMax: 90000, match: 92 },
            { title: 'A&P Technician', salaryMin: 55000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Avionics', 'Aircraft Electrical', 'Troubleshooting', 'Wiring'],
        certifications: ['A&P License', 'Avionics Certs'],
        description: 'Aviation electricians have excellent avionics career paths.',
    },
    'AT': {
        code: 'AT', title: 'Aviation Electronics Technician', branch: 'Navy', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Avionics Technician', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'Electronics Technician', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Radar Technician', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Avionics', 'Radar', 'Electronics', 'Test Equipment'],
        certifications: ['A&P License', 'FCC License'],
        description: 'Aviation electronics technicians excel in avionics careers.',
    },
    'EM': {
        code: 'EM', title: 'Electrician Mate', branch: 'Navy', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Industrial Electrician', salaryMin: 55000, salaryMax: 90000, match: 95 },
            { title: 'Marine Electrician', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Power Plant Electrician', salaryMin: 60000, salaryMax: 100000, match: 88 },
        ],
        transferableSkills: ['Electrical Systems', 'Power Generation', 'Troubleshooting', 'Maintenance'],
        certifications: ['Journeyman Electrician', 'Master Electrician'],
        description: 'Electrician Mates have excellent electrical trade careers.',
    },
    'MM': {
        code: 'MM', title: 'Machinist Mate', branch: 'Navy', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Industrial Mechanic', salaryMin: 50000, salaryMax: 85000, match: 95 },
            { title: 'Marine Engineer', salaryMin: 60000, salaryMax: 100000, match: 92 },
            { title: 'HVAC Technician', salaryMin: 50000, salaryMax: 80000, match: 85 },
        ],
        transferableSkills: ['Mechanical Systems', 'Propulsion', 'Maintenance', 'Troubleshooting'],
        certifications: ['Industrial Maintenance', 'HVAC'],
        description: 'Machinist Mates have strong mechanical career paths.',
    },
    'OS': {
        code: 'OS', title: 'Operations Specialist', branch: 'Navy', careerField: 'Operations',
        civilianCareers: [
            { title: 'Air Traffic Controller', salaryMin: 80000, salaryMax: 160000, match: 85 },
            { title: 'Operations Coordinator', salaryMin: 50000, salaryMax: 80000, match: 88 },
            { title: 'Radar Operator', salaryMin: 55000, salaryMax: 90000, match: 90 },
        ],
        transferableSkills: ['Radar Operations', 'Air Control', 'Communications', 'Coordination'],
        certifications: ['FAA ATC', 'Radar Certifications'],
        description: 'Operations Specialists have pathways to ATC and operations roles.',
    },
    'IS': {
        code: 'IS', title: 'Intelligence Specialist', branch: 'Navy', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 65000, salaryMax: 110000, match: 95, clearanceBonus: true },
            { title: 'Security Analyst', salaryMin: 60000, salaryMax: 100000, match: 90 },
            { title: 'Defense Contractor', salaryMin: 80000, salaryMax: 140000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['Intelligence Analysis', 'Research', 'Reporting', 'Briefings'],
        certifications: ['TS/SCI', 'Intelligence Certs'],
        description: 'Navy IS ratings translate directly to IC and defense jobs.',
    },
    'LS': {
        code: 'LS', title: 'Logistics Specialist', branch: 'Navy', careerField: 'Logistics',
        civilianCareers: [
            { title: 'Supply Chain Manager', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Logistics Coordinator', salaryMin: 45000, salaryMax: 75000, match: 95 },
            { title: 'Warehouse Manager', salaryMin: 50000, salaryMax: 80000, match: 88 },
        ],
        transferableSkills: ['Supply Chain', 'Inventory', 'Procurement', 'Logistics'],
        certifications: ['APICS', 'Supply Chain Certs'],
        description: 'Logistics Specialists have excellent supply chain careers.',
    },
    'YN': {
        code: 'YN', title: 'Yeoman', branch: 'Navy', careerField: 'Administration',
        civilianCareers: [
            { title: 'Administrative Assistant', salaryMin: 40000, salaryMax: 65000, match: 95 },
            { title: 'Office Manager', salaryMin: 50000, salaryMax: 80000, match: 90 },
            { title: 'Executive Assistant', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Administration', 'Personnel Records', 'Customer Service', 'Typing'],
        certifications: ['Microsoft Office', 'Admin Certs'],
        description: 'Yeomen have strong administrative career pathways.',
    },

    // ==================== MORE AIR FORCE AFSCs ====================
    '1A8X1': {
        code: '1A8X1', title: 'Airborne Cryptologic Linguist', branch: 'Air Force', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 70000, salaryMax: 120000, match: 92, clearanceBonus: true },
            { title: 'Translator/Interpreter', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'Linguist', salaryMin: 60000, salaryMax: 110000, match: 90, clearanceBonus: true },
        ],
        transferableSkills: ['Languages', 'SIGINT', 'Analysis', 'Transcription'],
        certifications: ['DLPT', 'TS/SCI', 'Language Certifications'],
        description: 'Cryptologic linguists are in high demand in IC and translation.',
    },
    '1N0X1': {
        code: '1N0X1', title: 'All Source Intelligence Analyst', branch: 'Air Force', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 70000, salaryMax: 120000, match: 95, clearanceBonus: true },
            { title: 'Defense Contractor', salaryMin: 85000, salaryMax: 150000, match: 92, clearanceBonus: true },
            { title: 'Security Analyst', salaryMin: 65000, salaryMax: 110000, match: 88 },
        ],
        transferableSkills: ['All-Source Analysis', 'Briefings', 'Research', 'Targeting'],
        certifications: ['TS/SCI', 'Intelligence Certs'],
        description: 'All-source analysts have premium IC and defense careers.',
    },
    '2W1X1': {
        code: '2W1X1', title: 'Aircraft Armament Systems', branch: 'Air Force', careerField: 'Weapons',
        civilianCareers: [
            { title: 'Weapons Systems Tech', salaryMin: 55000, salaryMax: 95000, match: 90, clearanceBonus: true },
            { title: 'Defense Contractor', salaryMin: 65000, salaryMax: 110000, match: 88, clearanceBonus: true },
            { title: 'Ordnance Tech', salaryMin: 50000, salaryMax: 85000, match: 85 },
        ],
        transferableSkills: ['Weapons Systems', 'Munitions', 'Safety', 'Troubleshooting'],
        certifications: ['Security Clearance', 'Weapons Certs'],
        description: 'Armament specialists have defense contractor opportunities.',
    },
    '4B0X1': {
        code: '4B0X1', title: 'Bioenvironmental Engineering', branch: 'Air Force', careerField: 'Medical',
        civilianCareers: [
            { title: 'Environmental Health Specialist', salaryMin: 55000, salaryMax: 90000, match: 95 },
            { title: 'Industrial Hygienist', salaryMin: 60000, salaryMax: 100000, match: 92 },
            { title: 'Safety Manager', salaryMin: 60000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Environmental Health', 'Industrial Hygiene', 'Safety', 'Hazmat'],
        certifications: ['CIH', 'CSP', 'OSHA'],
        description: 'Bioenvironmental specialists have strong EHS career paths.',
    },

    // ==================== MORE MARINES MOS ====================
    '0621': {
        code: '0621', title: 'Field Radio Operator', branch: 'Marines', careerField: 'Communications',
        civilianCareers: [
            { title: 'Radio Technician', salaryMin: 45000, salaryMax: 75000, match: 90 },
            { title: 'Telecommunications Tech', salaryMin: 50000, salaryMax: 80000, match: 88 },
            { title: 'Network Technician', salaryMin: 50000, salaryMax: 85000, match: 85 },
        ],
        transferableSkills: ['Radio Communications', 'Troubleshooting', 'Networking', 'Electronics'],
        certifications: ['FCC License', 'Network+'],
        description: 'Field radio operators translate to telecommunications careers.',
    },
    '0861': {
        code: '0861', title: 'Fire Support Man', branch: 'Marines', careerField: 'Combat',
        civilianCareers: [
            { title: 'Operations Coordinator', salaryMin: 50000, salaryMax: 80000, match: 85 },
            { title: 'Emergency Manager', salaryMin: 55000, salaryMax: 90000, match: 82 },
            { title: 'Defense Analyst', salaryMin: 65000, salaryMax: 110000, match: 80, clearanceBonus: true },
        ],
        transferableSkills: ['Fire Support', 'Coordination', 'Communications', 'Planning'],
        certifications: ['JTAC', 'Security Clearance'],
        description: 'Fire support Marines excel in coordination and operations roles.',
    },
    '1833': {
        code: '1833', title: 'Assault Amphibian Vehicle Crewman', branch: 'Marines', careerField: 'Combat',
        civilianCareers: [
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 75000, match: 88 },
            { title: 'Mechanic', salaryMin: 45000, salaryMax: 70000, match: 85 },
            { title: 'Marine Operations', salaryMin: 50000, salaryMax: 85000, match: 82 },
        ],
        transferableSkills: ['Vehicle Operations', 'Maintenance', 'Amphibious Ops', 'Crew Coordination'],
        certifications: ['CDL', 'Heavy Equipment'],
        description: 'AAV crewmen have heavy equipment and maritime opportunities.',
    },
    '3531': {
        code: '3531', title: 'Motor Vehicle Operator', branch: 'Marines', careerField: 'Transportation',
        civilianCareers: [
            { title: 'CDL Truck Driver', salaryMin: 50000, salaryMax: 85000, match: 98 },
            { title: 'Fleet Manager', salaryMin: 55000, salaryMax: 85000, match: 80 },
            { title: 'Logistics Coordinator', salaryMin: 45000, salaryMax: 70000, match: 78 },
        ],
        transferableSkills: ['Commercial Driving', 'Vehicle Maintenance', 'Route Planning'],
        certifications: ['CDL Class A', 'HAZMAT Endorsement'],
        description: 'Marine motor vehicle operators have immediate CDL employment.',
    },
    '6323': {
        code: '6323', title: 'AH-1 Mechanic', branch: 'Marines', careerField: 'Aviation',
        civilianCareers: [
            { title: 'Helicopter Mechanic', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'A&P Technician', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Aviation Inspector', salaryMin: 60000, salaryMax: 100000, match: 88 },
        ],
        transferableSkills: ['Helicopter Maintenance', 'Powerplants', 'Avionics', 'Troubleshooting'],
        certifications: ['A&P License', 'Helicopter Rating'],
        description: 'Cobra mechanics have excellent helicopter maintenance careers.',
    },

    // ==================== MORE COAST GUARD RATINGS ====================
    'BM_CG': {
        code: 'BM', title: 'Boatswain Mate', branch: 'Coast Guard', careerField: 'Deck',
        civilianCareers: [
            { title: 'Merchant Mariner', salaryMin: 50000, salaryMax: 100000, match: 92 },
            { title: 'Ship Captain', salaryMin: 60000, salaryMax: 120000, match: 88 },
            { title: 'Port Operations', salaryMin: 55000, salaryMax: 90000, match: 85 },
        ],
        transferableSkills: ['Seamanship', 'Navigation', 'Deck Operations', 'Leadership'],
        certifications: ['USCG MMC', 'STCW', 'TWIC'],
        description: 'Coast Guard BMs have strong merchant marine pathways.',
    },
    'MK': {
        code: 'MK', title: 'Machinery Technician', branch: 'Coast Guard', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Marine Engineer', salaryMin: 55000, salaryMax: 95000, match: 95 },
            { title: 'Diesel Mechanic', salaryMin: 45000, salaryMax: 75000, match: 92 },
            { title: 'Industrial Mechanic', salaryMin: 50000, salaryMax: 85000, match: 88 },
        ],
        transferableSkills: ['Marine Engineering', 'Diesel Engines', 'Electrical', 'HVAC'],
        certifications: ['USCG License', 'Diesel Certification'],
        description: 'Machinery Technicians have excellent marine engineering careers.',
    },
    'HS': {
        code: 'HS', title: 'Health Services Technician', branch: 'Coast Guard', careerField: 'Medical',
        civilianCareers: [
            { title: 'EMT/Paramedic', salaryMin: 35000, salaryMax: 60000, match: 95 },
            { title: 'Medical Assistant', salaryMin: 35000, salaryMax: 50000, match: 92 },
            { title: 'Nurse (with education)', salaryMin: 60000, salaryMax: 95000, match: 80, certRequired: 'RN' },
        ],
        transferableSkills: ['Patient Care', 'Emergency Medicine', 'Medical Procedures'],
        certifications: ['NREMT', 'CMA', 'LPN Pathway'],
        description: 'Health Services Technicians have multiple healthcare pathways.',
    },
    'DC': {
        code: 'DC', title: 'Damage Controlman', branch: 'Coast Guard', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Firefighter', salaryMin: 45000, salaryMax: 80000, match: 90 },
            { title: 'Welder', salaryMin: 45000, salaryMax: 75000, match: 88 },
            { title: 'Shipyard Worker', salaryMin: 50000, salaryMax: 85000, match: 85 },
        ],
        transferableSkills: ['Firefighting', 'Welding', 'Pipe Fitting', 'Damage Control'],
        certifications: ['Welder Certification', 'Firefighter I/II'],
        description: 'Damage Controlmen have firefighting and welding career paths.',
    },

    // ==================== ADDITIONAL ARMY MOS ====================
    '27D': {
        code: '27D', title: 'Paralegal Specialist', branch: 'Army', careerField: 'Legal',
        civilianCareers: [
            { title: 'Paralegal', salaryMin: 45000, salaryMax: 75000, match: 98 },
            { title: 'Legal Assistant', salaryMin: 40000, salaryMax: 65000, match: 95 },
            { title: 'Court Reporter', salaryMin: 50000, salaryMax: 80000, match: 85 },
        ],
        transferableSkills: ['Legal Research', 'Document Preparation', 'Court Procedures', 'Case Management'],
        certifications: ['Certified Paralegal', 'NALA', 'ABA Approved'],
        description: 'Military paralegals have direct civilian career translation.',
    },
    '35G': {
        code: '35G', title: 'Geospatial Intelligence Imagery Analyst', branch: 'Army', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Imagery Analyst', salaryMin: 75000, salaryMax: 130000, match: 95, clearanceBonus: true },
            { title: 'GIS Analyst', salaryMin: 60000, salaryMax: 100000, match: 90 },
            { title: 'Remote Sensing Specialist', salaryMin: 65000, salaryMax: 110000, match: 88 },
        ],
        transferableSkills: ['Imagery Analysis', 'GIS', 'Remote Sensing', 'Pattern Recognition'],
        certifications: ['TS/SCI', 'GEOINT Certifications', 'GIS Professional'],
        description: '35G analysts are in extremely high demand in IC and defense.',
    },
    '35T': {
        code: '35T', title: 'Military Intelligence Systems Maintainer', branch: 'Army', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Systems Administrator', salaryMin: 65000, salaryMax: 110000, match: 92, clearanceBonus: true },
            { title: 'Network Engineer', salaryMin: 70000, salaryMax: 120000, match: 88 },
            { title: 'IT Security Specialist', salaryMin: 75000, salaryMax: 130000, match: 90, clearanceBonus: true },
        ],
        transferableSkills: ['MI Systems', 'Network Administration', 'Troubleshooting', 'Security'],
        certifications: ['Security+', 'TS/SCI', 'CISSP'],
        description: '35T combines IT skills with intelligence background.',
    },
    '36B': {
        code: '36B', title: 'Financial Management Technician', branch: 'Army', careerField: 'Finance',
        civilianCareers: [
            { title: 'Accountant', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Financial Analyst', salaryMin: 55000, salaryMax: 95000, match: 88 },
            { title: 'Budget Analyst', salaryMin: 55000, salaryMax: 90000, match: 90 },
            { title: 'Payroll Specialist', salaryMin: 45000, salaryMax: 70000, match: 95 },
        ],
        transferableSkills: ['Accounting', 'Budgeting', 'Financial Systems', 'Auditing'],
        certifications: ['CPA pathway', 'Accounting Certifications'],
        description: 'Finance technicians have excellent accounting career paths.',
    },
    '92G': {
        code: '92G', title: 'Culinary Specialist', branch: 'Army', careerField: 'Food Service',
        civilianCareers: [
            { title: 'Chef', salaryMin: 35000, salaryMax: 65000, match: 95 },
            { title: 'Food Service Manager', salaryMin: 45000, salaryMax: 75000, match: 90 },
            { title: 'Catering Manager', salaryMin: 40000, salaryMax: 70000, match: 85 },
            { title: 'Restaurant Manager', salaryMin: 45000, salaryMax: 75000, match: 82 },
        ],
        transferableSkills: ['Cooking', 'Food Safety', 'Kitchen Management', 'Inventory'],
        certifications: ['ServSafe', 'Culinary Certifications'],
        description: 'Culinary specialists have hospitality and food service careers.',
    },

    // ==================== ADDITIONAL NAVY RATINGS ====================
    'CS': {
        code: 'CS', title: 'Culinary Specialist', branch: 'Navy', careerField: 'Food Service',
        civilianCareers: [
            { title: 'Executive Chef', salaryMin: 45000, salaryMax: 85000, match: 95 },
            { title: 'Food Service Director', salaryMin: 50000, salaryMax: 90000, match: 90 },
            { title: 'Catering Manager', salaryMin: 40000, salaryMax: 70000, match: 88 },
        ],
        transferableSkills: ['Culinary Arts', 'Large Scale Cooking', 'Food Safety', 'Menu Planning'],
        certifications: ['ServSafe', 'ACF Certification'],
        description: 'Navy Culinary Specialists excel in hospitality and food service.',
    },
    'MA': {
        code: 'MA', title: 'Master-at-Arms', branch: 'Navy', careerField: 'Law Enforcement',
        civilianCareers: [
            { title: 'Police Officer', salaryMin: 50000, salaryMax: 90000, match: 95 },
            { title: 'Federal Agent', salaryMin: 65000, salaryMax: 120000, match: 90, clearanceBonus: true },
            { title: 'Security Manager', salaryMin: 55000, salaryMax: 95000, match: 88 },
        ],
        transferableSkills: ['Law Enforcement', 'Physical Security', 'Investigations', 'Anti-Terrorism'],
        certifications: ['Law Enforcement Training', 'Security Clearance'],
        description: 'Master-at-Arms have direct paths to law enforcement careers.',
    },
    'ND': {
        code: 'ND', title: 'Navy Diver', branch: 'Navy', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Commercial Diver', salaryMin: 50000, salaryMax: 100000, match: 95 },
            { title: 'Underwater Welder', salaryMin: 60000, salaryMax: 150000, match: 90 },
            { title: 'Salvage Specialist', salaryMin: 55000, salaryMax: 110000, match: 88 },
        ],
        transferableSkills: ['Diving', 'Underwater Welding', 'Salvage', 'Demolition'],
        certifications: ['Commercial Diver', 'Welding Certs', 'HAZMAT'],
        description: 'Navy Divers command premium rates in commercial diving.',
    },
    'SB': {
        code: 'SB', title: 'Special Warfare Boat Operator (SWCC)', branch: 'Navy', careerField: 'Special Operations',
        civilianCareers: [
            { title: 'Security Contractor', salaryMin: 100000, salaryMax: 250000, match: 95, clearanceBonus: true },
            { title: 'Maritime Security', salaryMin: 80000, salaryMax: 150000, match: 90 },
            { title: 'Executive Protection', salaryMin: 90000, salaryMax: 180000, match: 88 },
        ],
        transferableSkills: ['Small Boat Operations', 'Maritime Tactics', 'Weapons', 'Navigation'],
        certifications: ['TS/SCI', 'USCG Captain License'],
        description: 'SWCC operators have premium security contractor opportunities.',
    },

    // ==================== ADDITIONAL AIR FORCE AFSCs ====================
    '1N4X1': {
        code: '1N4X1', title: 'Fusion Analyst', branch: 'Air Force', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 75000, salaryMax: 130000, match: 95, clearanceBonus: true },
            { title: 'Fusion Center Analyst', salaryMin: 70000, salaryMax: 120000, match: 92, clearanceBonus: true },
            { title: 'Security Analyst', salaryMin: 65000, salaryMax: 110000, match: 88 },
        ],
        transferableSkills: ['Multi-INT Fusion', 'Analysis', 'Targeting', 'Briefings'],
        certifications: ['TS/SCI', 'Intelligence Certifications'],
        description: 'Fusion analysts are highly valued in IC and defense.',
    },
    '3E5X1': {
        code: '3E5X1', title: 'Engineering', branch: 'Air Force', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Facilities Manager', salaryMin: 55000, salaryMax: 95000, match: 92 },
            { title: 'Construction Manager', salaryMin: 60000, salaryMax: 100000, match: 88 },
            { title: 'Civil Engineer Tech', salaryMin: 50000, salaryMax: 85000, match: 90 },
        ],
        transferableSkills: ['Engineering', 'Project Management', 'Construction', 'Maintenance'],
        certifications: ['PE pathway', 'PMP', 'OSHA'],
        description: 'AF Engineers have strong facilities and construction careers.',
    },
    '3E7X1': {
        code: '3E7X1', title: 'Fire Protection', branch: 'Air Force', careerField: 'Fire/Emergency',
        civilianCareers: [
            { title: 'Firefighter', salaryMin: 45000, salaryMax: 85000, match: 98 },
            { title: 'Fire Inspector', salaryMin: 50000, salaryMax: 80000, match: 92 },
            { title: 'Fire Captain', salaryMin: 70000, salaryMax: 110000, match: 85 },
        ],
        transferableSkills: ['Firefighting', 'Emergency Response', 'Hazmat', 'Aircraft Rescue'],
        certifications: ['Firefighter I/II', 'ARFF', 'EMT'],
        description: 'AF firefighters have direct civilian fire department careers.',
    },
    '4A0X1': {
        code: '4A0X1', title: 'Health Services Management', branch: 'Air Force', careerField: 'Medical',
        civilianCareers: [
            { title: 'Healthcare Administrator', salaryMin: 55000, salaryMax: 100000, match: 95 },
            { title: 'Medical Office Manager', salaryMin: 50000, salaryMax: 85000, match: 92 },
            { title: 'Health Information Manager', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Healthcare Admin', 'Medical Records', 'HIPAA', 'Management'],
        certifications: ['RHIA', 'Healthcare Management Certs'],
        description: 'Health services managers have strong healthcare admin careers.',
    },

    // ==================== ADDITIONAL MARINES MOS ====================
    '0111': {
        code: '0111', title: 'Administrative Specialist', branch: 'Marines', careerField: 'Administration',
        civilianCareers: [
            { title: 'Administrative Assistant', salaryMin: 40000, salaryMax: 65000, match: 95 },
            { title: 'Office Manager', salaryMin: 50000, salaryMax: 80000, match: 90 },
            { title: 'Executive Assistant', salaryMin: 55000, salaryMax: 90000, match: 85 },
        ],
        transferableSkills: ['Office Administration', 'Records Management', 'Customer Service'],
        certifications: ['Microsoft Office', 'Administrative Certs'],
        description: 'Marine admin specialists have strong office career paths.',
    },
    '0231': {
        code: '0231', title: 'Intelligence Specialist', branch: 'Marines', careerField: 'Intelligence',
        civilianCareers: [
            { title: 'Intelligence Analyst', salaryMin: 65000, salaryMax: 115000, match: 95, clearanceBonus: true },
            { title: 'Security Analyst', salaryMin: 60000, salaryMax: 100000, match: 90 },
            { title: 'Defense Contractor', salaryMin: 80000, salaryMax: 140000, match: 88, clearanceBonus: true },
        ],
        transferableSkills: ['Intelligence Analysis', 'Research', 'Briefings', 'Reporting'],
        certifications: ['TS/SCI', 'Intelligence Certifications'],
        description: 'Marine intel specialists are highly valued in IC.',
    },
    '1371': {
        code: '1371', title: 'Combat Engineer', branch: 'Marines', careerField: 'Engineering',
        civilianCareers: [
            { title: 'Construction Manager', salaryMin: 60000, salaryMax: 100000, match: 90 },
            { title: 'Heavy Equipment Operator', salaryMin: 45000, salaryMax: 75000, match: 92 },
            { title: 'Demolition Specialist', salaryMin: 55000, salaryMax: 90000, match: 88 },
        ],
        transferableSkills: ['Construction', 'Demolition', 'Heavy Equipment', 'Explosives'],
        certifications: ['OSHA', 'CDL', 'Explosives Handling'],
        description: 'Marine combat engineers excel in construction careers.',
    },
    '3381': {
        code: '3381', title: 'Food Service Specialist', branch: 'Marines', careerField: 'Food Service',
        civilianCareers: [
            { title: 'Chef', salaryMin: 35000, salaryMax: 65000, match: 95 },
            { title: 'Food Service Manager', salaryMin: 45000, salaryMax: 75000, match: 90 },
            { title: 'Catering Manager', salaryMin: 40000, salaryMax: 70000, match: 88 },
        ],
        transferableSkills: ['Culinary', 'Large Scale Cooking', 'Food Safety', 'Inventory'],
        certifications: ['ServSafe', 'Culinary Certifications'],
        description: 'Marine food service specialists have hospitality careers.',
    },
};

// Get translation by MOS code
export function getTranslation(code: string): MOSTranslation | null {
    const upperCode = code.toUpperCase().trim();
    return MOS_TRANSLATIONS[upperCode] || null;
}

// Search translations by keyword
export function searchTranslations(query: string): MOSTranslation[] {
    const q = query.toLowerCase();
    return Object.values(MOS_TRANSLATIONS).filter(mos =>
        mos.code.toLowerCase().includes(q) ||
        mos.title.toLowerCase().includes(q) ||
        mos.careerField.toLowerCase().includes(q)
    );
}

// Get all MOS codes
export function getAllMOSCodes(): { code: string; title: string; field: string }[] {
    return Object.values(MOS_TRANSLATIONS).map(mos => ({
        code: mos.code,
        title: mos.title,
        field: mos.careerField,
    }));
}

export default MOS_TRANSLATIONS;
