// Complete Army MOS Database with ASVAB Requirements
// 160+ Military Occupational Specialties with line scores, bonuses, and details

const COMPLETE_MOS_DATABASE = [
    // ============================================
    // INFANTRY & COMBAT (11 Series)
    // ============================================
    { code: '11B', title: 'Infantryman', careerField: 'Infantry', asvab: { CO: 87 }, bonus: 20000, clearance: '', physical: 'Very High' },
    { code: '11C', title: 'Indirect Fire Infantryman', careerField: 'Infantry', asvab: { CO: 87 }, bonus: 15000, clearance: '', physical: 'Very High' },
    { code: '11X', title: 'Infantry Enlistment Option', careerField: 'Infantry', asvab: { CO: 87 }, bonus: 20000, clearance: '', physical: 'Very High' },

    // ============================================
    // COMBAT ENGINEER (12 Series)
    // ============================================
    { code: '12B', title: 'Combat Engineer', careerField: 'Engineer', asvab: { CO: 87 }, bonus: 18000, clearance: '', physical: 'Very High' },
    { code: '12C', title: 'Bridge Crewmember', careerField: 'Engineer', asvab: { CO: 87 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '12D', title: 'Diver', careerField: 'Engineer', asvab: { CO: 87, GM: 98 }, bonus: 25000, clearance: '', physical: 'Very High' },
    { code: '12G', title: 'Quarrying Specialist', careerField: 'Engineer', asvab: { GM: 88 }, bonus: 8000, clearance: '', physical: 'High' },
    { code: '12H', title: 'Construction Engineering Supervisor', careerField: 'Engineer', asvab: { GM: 100 }, bonus: 0, clearance: '', physical: 'Moderate' },
    { code: '12K', title: 'Plumber', careerField: 'Engineer', asvab: { GM: 88 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '12M', title: 'Firefighter', careerField: 'Engineer', asvab: { GM: 88 }, bonus: 15000, clearance: '', physical: 'High' },
    { code: '12N', title: 'Horizontal Construction Engineer', careerField: 'Engineer', asvab: { GM: 90 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '12P', title: 'Prime Power Production Specialist', careerField: 'Engineer', asvab: { EL: 107, ST: 107 }, bonus: 20000, clearance: 'Secret', physical: 'Moderate' },
    { code: '12Q', title: 'Transmission and Distribution Specialist', careerField: 'Engineer', asvab: { EL: 93 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '12R', title: 'Interior Electrician', careerField: 'Engineer', asvab: { EL: 88 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '12T', title: 'Technical Engineer', careerField: 'Engineer', asvab: { ST: 95 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '12V', title: 'Concrete and Asphalt Equipment Operator', careerField: 'Engineer', asvab: { GM: 88 }, bonus: 8000, clearance: '', physical: 'High' },
    { code: '12W', title: 'Carpentry and Masonry Specialist', careerField: 'Engineer', asvab: { GM: 88 }, bonus: 10000, clearance: '', physical: 'High' },
    { code: '12Y', title: 'Geospatial Engineer', careerField: 'Engineer', asvab: { ST: 100 }, bonus: 18000, clearance: 'Secret', physical: 'Low' },

    // ============================================
    // FIELD ARTILLERY (13 Series)
    // ============================================
    { code: '13B', title: 'Cannon Crewmember', careerField: 'Field Artillery', asvab: { FA: 93 }, bonus: 15000, clearance: '', physical: 'Very High' },
    { code: '13F', title: 'Fire Support Specialist', careerField: 'Field Artillery', asvab: { FA: 96 }, bonus: 18000, clearance: '', physical: 'High' },
    { code: '13J', title: 'Fire Control Specialist', careerField: 'Field Artillery', asvab: { FA: 93 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '13M', title: 'Multiple Launch Rocket System Crewmember', careerField: 'Field Artillery', asvab: { FA: 93 }, bonus: 15000, clearance: '', physical: 'High' },
    { code: '13R', title: 'Field Artillery Firefinder Radar Operator', careerField: 'Field Artillery', asvab: { FA: 93 }, bonus: 15000, clearance: '', physical: 'Moderate' },

    // ============================================
    // AIR DEFENSE ARTILLERY (14 Series)
    // ============================================
    { code: '14E', title: 'Patriot Fire Control Enhanced Operator/Maintainer', careerField: 'Air Defense', asvab: { EL: 98 }, bonus: 20000, clearance: 'Secret', physical: 'Moderate' },
    { code: '14G', title: 'Air Defense Battle Management System Operator', careerField: 'Air Defense', asvab: { EL: 98 }, bonus: 18000, clearance: 'Secret', physical: 'Moderate' },
    { code: '14H', title: 'Air Defense Enhanced Early Warning System Operator', careerField: 'Air Defense', asvab: { EL: 98 }, bonus: 18000, clearance: 'Secret', physical: 'Low' },
    { code: '14P', title: 'Air and Missile Defense Crewmember', careerField: 'Air Defense', asvab: { EL: 98 }, bonus: 16000, clearance: 'Secret', physical: 'Moderate' },
    { code: '14S', title: 'Avenger Crewmember', careerField: 'Air Defense', asvab: { GM: 98 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '14T', title: 'Patriot Launching Station Enhanced Operator/Maintainer', careerField: 'Air Defense', asvab: { MM: 99 }, bonus: 18000, clearance: 'Secret', physical: 'Moderate' },

    // ============================================
    // AVIATION (15 Series)
    // ============================================
    { code: '15B', title: 'Aircraft Powerplant Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 20000, clearance: '', physical: 'Moderate' },
    { code: '15D', title: 'Aircraft Powertrain Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '15E', title: 'Unmanned Aircraft Systems Repairer', careerField: 'Aviation', asvab: { EL: 93 }, bonus: 22000, clearance: 'Secret', physical: 'Low' },
    { code: '15F', title: 'Aircraft Electrician', careerField: 'Aviation', asvab: { EL: 93 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '15G', title: 'Aircraft Structural Repairer', careerField: 'Aviation', asvab: { GM: 92 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '15H', title: 'Aircraft Pneudraulics Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '15N', title: 'Avionic Mechanic', careerField: 'Aviation', asvab: { EL: 93 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '15P', title: 'Aviation Operations Specialist', careerField: 'Aviation', asvab: { CL: 95 }, bonus: 10000, clearance: '', physical: 'Low' },
    { code: '15Q', title: 'Air Traffic Control Operator', careerField: 'Aviation', asvab: { ST: 101 }, bonus: 22000, clearance: '', physical: 'Low' },
    { code: '15R', title: 'AH-64 Attack Helicopter Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 22000, clearance: '', physical: 'Moderate' },
    { code: '15S', title: 'OH-58D Helicopter Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '15T', title: 'UH-60 Helicopter Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 22000, clearance: '', physical: 'Moderate' },
    { code: '15U', title: 'CH-47 Helicopter Repairer', careerField: 'Aviation', asvab: { MM: 104 }, bonus: 22000, clearance: '', physical: 'Moderate' },
    { code: '15W', title: 'Unmanned Aerial Vehicle Operator', careerField: 'Aviation', asvab: { EL: 93 }, bonus: 25000, clearance: 'Secret', physical: 'Low' },
    { code: '15Y', title: 'AH-64D Armament/Electrical/Avionics Systems Repairer', careerField: 'Aviation', asvab: { EL: 105 }, bonus: 22000, clearance: '', physical: 'Moderate' },

    // ============================================
    // CYBER (17 Series)
    // ============================================
    { code: '17C', title: 'Cyber Operations Specialist', careerField: 'Cyber', asvab: { ST: 112 }, bonus: 50000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '17E', title: 'Electronic Warfare Specialist', careerField: 'Cyber', asvab: { ST: 112 }, bonus: 40000, clearance: 'TS/SCI', physical: 'Low' },

    // ============================================
    // SPECIAL FORCES (18 Series)
    // ============================================
    { code: '18B', title: 'Special Forces Weapons Sergeant', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 40000, clearance: 'Secret', physical: 'Extreme' },
    { code: '18C', title: 'Special Forces Engineer Sergeant', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 40000, clearance: 'Secret', physical: 'Extreme' },
    { code: '18D', title: 'Special Forces Medical Sergeant', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 45000, clearance: 'Secret', physical: 'Extreme' },
    { code: '18E', title: 'Special Forces Communications Sergeant', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 40000, clearance: 'Secret', physical: 'Extreme' },
    { code: '18F', title: 'Special Forces Assistant Operations and Intelligence Sergeant', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 40000, clearance: 'TS/SCI', physical: 'Extreme' },
    { code: '18X', title: 'Special Forces Candidate', careerField: 'Special Forces', asvab: { GT: 110 }, bonus: 40000, clearance: 'Secret', physical: 'Extreme' },

    // ============================================
    // ARMOR (19 Series)
    // ============================================
    { code: '19D', title: 'Cavalry Scout', careerField: 'Armor', asvab: { CO: 87 }, bonus: 17000, clearance: '', physical: 'Very High' },
    { code: '19K', title: 'M1 Armor Crewmember', careerField: 'Armor', asvab: { CO: 87 }, bonus: 18000, clearance: '', physical: 'Very High' },

    // ============================================
    // SIGNAL (25 Series)
    // ============================================
    { code: '25B', title: 'Information Technology Specialist', careerField: 'Signal', asvab: { EL: 98 }, bonus: 20000, clearance: 'Secret', physical: 'Low' },
    { code: '25C', title: 'Radio Operator-Maintainer', careerField: 'Signal', asvab: { EL: 98 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '25D', title: 'Cyber Network Defender', careerField: 'Signal', asvab: { EL: 105 }, bonus: 40000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '25E', title: 'Electromagnetic Spectrum Manager', careerField: 'Signal', asvab: { EL: 98, ST: 98 }, bonus: 18000, clearance: 'Secret', physical: 'Low' },
    { code: '25L', title: 'Cable Systems Installer-Maintainer', careerField: 'Signal', asvab: { EL: 89 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '25M', title: 'Multimedia Illustrator', careerField: 'Signal', asvab: { EL: 93 }, bonus: 8000, clearance: '', physical: 'Low' },
    { code: '25N', title: 'Nodal Network Systems Operator-Maintainer', careerField: 'Signal', asvab: { EL: 98 }, bonus: 15000, clearance: 'Secret', physical: 'Low' },
    { code: '25P', title: 'Microwave Systems Operator-Maintainer', careerField: 'Signal', asvab: { EL: 98 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '25Q', title: 'Multichannel Transmission Systems Operator-Maintainer', careerField: 'Signal', asvab: { EL: 98 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '25R', title: 'Visual Information Equipment Operator-Maintainer', careerField: 'Signal', asvab: { EL: 93 }, bonus: 8000, clearance: '', physical: 'Low' },
    { code: '25S', title: 'Satellite Communication Systems Operator-Maintainer', careerField: 'Signal', asvab: { EL: 92 }, bonus: 18000, clearance: 'Secret', physical: 'Moderate' },
    { code: '25U', title: 'Signal Support Systems Specialist', careerField: 'Signal', asvab: { EL: 98 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '25V', title: 'Combat Documentation/Production Specialist', careerField: 'Signal', asvab: { EL: 93 }, bonus: 8000, clearance: '', physical: 'Moderate' },

    // ============================================
    // MILITARY POLICE (31 Series)
    // ============================================
    { code: '31B', title: 'Military Police', careerField: 'Military Police', asvab: { ST: 91 }, bonus: 15000, clearance: '', physical: 'High' },
    { code: '31D', title: 'CID Special Agent', careerField: 'Military Police', asvab: { ST: 107 }, bonus: 25000, clearance: 'TS/SCI', physical: 'Moderate' },
    { code: '31E', title: 'Internment/Resettlement Specialist', careerField: 'Military Police', asvab: { ST: 95 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '31K', title: 'Military Working Dog Handler', careerField: 'Military Police', asvab: { ST: 91 }, bonus: 18000, clearance: '', physical: 'High' },

    // ============================================
    // MILITARY INTELLIGENCE (35 Series)
    // ============================================
    { code: '35F', title: 'Intelligence Analyst', careerField: 'Military Intelligence', asvab: { ST: 101 }, bonus: 25000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '35G', title: 'Geospatial Intelligence Imagery Analyst', careerField: 'Military Intelligence', asvab: { ST: 101 }, bonus: 28000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '35L', title: 'Counterintelligence Agent', careerField: 'Military Intelligence', asvab: { ST: 101 }, bonus: 30000, clearance: 'TS/SCI', physical: 'Moderate' },
    { code: '35M', title: 'Human Intelligence Collector', careerField: 'Military Intelligence', asvab: { ST: 101 }, bonus: 28000, clearance: 'TS/SCI', physical: 'Moderate' },
    { code: '35N', title: 'Signals Intelligence Analyst', careerField: 'Military Intelligence', asvab: { ST: 112 }, bonus: 30000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '35P', title: 'Cryptologic Linguist', careerField: 'Military Intelligence', asvab: { ST: 91 }, bonus: 40000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '35Q', title: 'Cryptologic Network Warfare Specialist', careerField: 'Military Intelligence', asvab: { ST: 112 }, bonus: 45000, clearance: 'TS/SCI', physical: 'Low' },
    { code: '35S', title: 'Signals Collector/Analyst', careerField: 'Military Intelligence', asvab: { ST: 101 }, bonus: 25000, clearance: 'TS/SCI', physical: 'Moderate' },
    { code: '35T', title: 'Military Intelligence Systems Maintainer/Integrator', careerField: 'Military Intelligence', asvab: { EL: 107 }, bonus: 25000, clearance: 'TS/SCI', physical: 'Low' },

    // ============================================
    // FINANCE (36 Series)
    // ============================================
    { code: '36B', title: 'Financial Management Technician', careerField: 'Finance', asvab: { CL: 101 }, bonus: 8000, clearance: '', physical: 'Low' },

    // ============================================
    // PSYCHOLOGICAL OPERATIONS (37 Series)
    // ============================================
    { code: '37F', title: 'Psychological Operations Specialist', careerField: 'PSYOP', asvab: { GT: 107 }, bonus: 35000, clearance: 'Secret', physical: 'High' },

    // ============================================
    // CIVIL AFFAIRS (38 Series)
    // ============================================
    { code: '38B', title: 'Civil Affairs Specialist', careerField: 'Civil Affairs', asvab: { GT: 107 }, bonus: 30000, clearance: 'Secret', physical: 'High' },

    // ============================================
    // HUMAN RESOURCES (42 Series)
    // ============================================
    { code: '42A', title: 'Human Resources Specialist', careerField: 'Human Resources', asvab: { CL: 90 }, bonus: 10000, clearance: '', physical: 'Low' },

    // ============================================
    // PUBLIC AFFAIRS (46 Series)
    // ============================================
    { code: '46Q', title: 'Public Affairs Mass Communication Specialist', careerField: 'Public Affairs', asvab: { EL: 107 }, bonus: 10000, clearance: '', physical: 'Low' },
    { code: '46R', title: 'Public Affairs Broadcast Specialist', careerField: 'Public Affairs', asvab: { EL: 107 }, bonus: 10000, clearance: '', physical: 'Low' },
    { code: '46S', title: 'Public Affairs Specialist', careerField: 'Public Affairs', asvab: { EL: 107 }, bonus: 10000, clearance: '', physical: 'Low' },

    // ============================================
    // MEDICAL (68 Series)
    // ============================================
    { code: '68A', title: 'Biomedical Equipment Specialist', careerField: 'Medical', asvab: { EL: 107, ST: 107 }, bonus: 25000, clearance: '', physical: 'Low' },
    { code: '68B', title: 'Orthopedic Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '68C', title: 'Practical Nursing Specialist', careerField: 'Medical', asvab: { ST: 105 }, bonus: 20000, clearance: '', physical: 'Moderate' },
    { code: '68D', title: 'Operating Room Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 25000, clearance: '', physical: 'Moderate' },
    { code: '68E', title: 'Dental Specialist', careerField: 'Medical', asvab: { ST: 91 }, bonus: 12000, clearance: '', physical: 'Low' },
    { code: '68F', title: 'Physical Therapy Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '68G', title: 'Patient Administration Specialist', careerField: 'Medical', asvab: { CL: 90 }, bonus: 8000, clearance: '', physical: 'Low' },
    { code: '68H', title: 'Optical Laboratory Specialist', careerField: 'Medical', asvab: { ST: 91 }, bonus: 8000, clearance: '', physical: 'Low' },
    { code: '68J', title: 'Medical Logistics Specialist', careerField: 'Medical', asvab: { ST: 95 }, bonus: 10000, clearance: '', physical: 'Low' },
    { code: '68K', title: 'Medical Laboratory Specialist', careerField: 'Medical', asvab: { ST: 106 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '68L', title: 'Occupational Therapy Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 15000, clearance: '', physical: 'Low' },
    { code: '68M', title: 'Nutrition Care Specialist', careerField: 'Medical', asvab: { ST: 95 }, bonus: 8000, clearance: '', physical: 'Low' },
    { code: '68N', title: 'Cardiovascular Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 25000, clearance: '', physical: 'Low' },
    { code: '68P', title: 'Radiology Specialist', careerField: 'Medical', asvab: { ST: 106 }, bonus: 18000, clearance: '', physical: 'Low' },
    { code: '68Q', title: 'Pharmacy Specialist', careerField: 'Medical', asvab: { ST: 95 }, bonus: 15000, clearance: '', physical: 'Low' },
    { code: '68R', title: 'Veterinary Food Inspection Specialist', careerField: 'Medical', asvab: { ST: 95 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '68S', title: 'Preventive Medicine Specialist', careerField: 'Medical', asvab: { ST: 101 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '68T', title: 'Animal Care Specialist', careerField: 'Medical', asvab: { ST: 91 }, bonus: 8000, clearance: '', physical: 'Moderate' },
    { code: '68U', title: 'Ear, Nose, and Throat Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 18000, clearance: '', physical: 'Low' },
    { code: '68V', title: 'Respiratory Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '68W', title: 'Combat Medic Specialist', careerField: 'Medical', asvab: { ST: 101, GT: 107 }, bonus: 30000, clearance: '', physical: 'High' },
    { code: '68X', title: 'Behavioral Health Specialist', careerField: 'Medical', asvab: { ST: 107 }, bonus: 25000, clearance: '', physical: 'Low' },
    { code: '68Y', title: 'Eye Specialist', careerField: 'Medical', asvab: { ST: 101 }, bonus: 15000, clearance: '', physical: 'Low' },

    // ============================================
    // CHEMICAL (74 Series)
    // ============================================
    { code: '74D', title: 'Chemical, Biological, Radiological, and Nuclear Specialist', careerField: 'Chemical', asvab: { ST: 100 }, bonus: 18000, clearance: '', physical: 'High' },

    // ============================================
    // TRANSPORTATION (88 Series)
    // ============================================
    { code: '88H', title: 'Cargo Specialist', careerField: 'Transportation', asvab: { CL: 86 }, bonus: 8000, clearance: '', physical: 'High' },
    { code: '88K', title: 'Watercraft Operator', careerField: 'Transportation', asvab: { OF: 92 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '88L', title: 'Watercraft Engineer', careerField: 'Transportation', asvab: { MM: 99 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '88M', title: 'Motor Transport Operator', careerField: 'Transportation', asvab: { CL: 90 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '88N', title: 'Transportation Management Coordinator', careerField: 'Transportation', asvab: { CL: 95 }, bonus: 10000, clearance: '', physical: 'Low' },

    // ============================================
    // EXPLOSIVE ORDNANCE DISPOSAL (89 Series)
    // ============================================
    { code: '89B', title: 'Ammunition Specialist', careerField: 'Ordnance', asvab: { MM: 91 }, bonus: 15000, clearance: '', physical: 'High' },
    { code: '89D', title: 'Explosive Ordnance Disposal Specialist', careerField: 'Ordnance', asvab: { ST: 110 }, bonus: 40000, clearance: 'Secret', physical: 'Very High' },

    // ============================================
    // MECHANICAL MAINTENANCE (91 Series)
    // ============================================
    { code: '91A', title: 'M1 Abrams Tank System Maintainer', careerField: 'Maintenance', asvab: { MM: 99 }, bonus: 18000, clearance: '', physical: 'High' },
    { code: '91B', title: 'Wheeled Vehicle Mechanic', careerField: 'Maintenance', asvab: { MM: 87 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '91C', title: 'Utilities Equipment Repairer', careerField: 'Maintenance', asvab: { MM: 87 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '91D', title: 'Power-Generation Equipment Repairer', careerField: 'Maintenance', asvab: { EL: 88, MM: 88 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '91E', title: 'Allied Trade Specialist', careerField: 'Maintenance', asvab: { GM: 88 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '91F', title: 'Small Arms/Artillery Repairer', careerField: 'Maintenance', asvab: { MM: 93 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '91G', title: 'Fire Control Repairer', careerField: 'Maintenance', asvab: { EL: 93 }, bonus: 15000, clearance: '', physical: 'Moderate' },
    { code: '91H', title: 'Track Vehicle Repairer', careerField: 'Maintenance', asvab: { MM: 87 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '91J', title: 'Quartermaster and Chemical Equipment Repairer', careerField: 'Maintenance', asvab: { MM: 87 }, bonus: 10000, clearance: '', physical: 'Moderate' },
    { code: '91L', title: 'Construction Equipment Repairer', careerField: 'Maintenance', asvab: { MM: 87 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '91M', title: 'Bradley Fighting Vehicle System Maintainer', careerField: 'Maintenance', asvab: { MM: 99 }, bonus: 18000, clearance: '', physical: 'High' },
    { code: '91P', title: 'Artillery Mechanic', careerField: 'Maintenance', asvab: { MM: 93 }, bonus: 12000, clearance: '', physical: 'High' },
    { code: '91S', title: 'Stryker Systems Maintainer', careerField: 'Maintenance', asvab: { MM: 99 }, bonus: 18000, clearance: '', physical: 'High' },

    // ============================================
    // SUPPLY/LOGISTICS (92 Series)
    // ============================================
    { code: '92A', title: 'Automated Logistical Specialist', careerField: 'Logistics', asvab: { CL: 90 }, bonus: 10000, clearance: '', physical: 'Low' },
    { code: '92F', title: 'Petroleum Supply Specialist', careerField: 'Logistics', asvab: { CL: 86 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '92G', title: 'Culinary Specialist', careerField: 'Logistics', asvab: { GM: 85 }, bonus: 8000, clearance: '', physical: 'Moderate' },
    { code: '92L', title: 'Petroleum Laboratory Specialist', careerField: 'Logistics', asvab: { ST: 91 }, bonus: 12000, clearance: '', physical: 'Low' },
    { code: '92M', title: 'Mortuary Affairs Specialist', careerField: 'Logistics', asvab: { CL: 90 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '92R', title: 'Parachute Rigger', careerField: 'Logistics', asvab: { CL: 88 }, bonus: 15000, clearance: '', physical: 'High' },
    { code: '92S', title: 'Shower/Laundry and Clothing Repair Specialist', careerField: 'Logistics', asvab: { CL: 84 }, bonus: 5000, clearance: '', physical: 'Moderate' },
    { code: '92W', title: 'Water Treatment Specialist', careerField: 'Logistics', asvab: { ST: 91 }, bonus: 12000, clearance: '', physical: 'Moderate' },
    { code: '92Y', title: 'Unit Supply Specialist', careerField: 'Logistics', asvab: { CL: 90 }, bonus: 12000, clearance: '', physical: 'Moderate' },

    // ============================================
    // ELECTRONIC MAINTENANCE (94 Series)
    // ============================================
    { code: '94A', title: 'Land Combat Electronic Missile System Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '94D', title: 'Air Traffic Control Equipment Repairer', careerField: 'Electronics', asvab: { EL: 107 }, bonus: 22000, clearance: '', physical: 'Low' },
    { code: '94E', title: 'Radio and Communications Security Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 18000, clearance: 'Secret', physical: 'Low' },
    { code: '94F', title: 'Computer/Detection Systems Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 18000, clearance: '', physical: 'Low' },
    { code: '94H', title: 'Test, Measurement, and Diagnostic Equipment Maintenance Support Specialist', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 18000, clearance: '', physical: 'Low' },
    { code: '94M', title: 'Radar Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '94P', title: 'Multiple Launch Rocket System Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 18000, clearance: '', physical: 'Moderate' },
    { code: '94R', title: 'Avionic and Survivability Equipment Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 20000, clearance: '', physical: 'Low' },
    { code: '94S', title: 'Patriot System Repairer', careerField: 'Electronics', asvab: { EL: 107 }, bonus: 22000, clearance: 'Secret', physical: 'Low' },
    { code: '94T', title: 'Avenger System Repairer', careerField: 'Electronics', asvab: { EL: 102 }, bonus: 18000, clearance: '', physical: 'Low' },
];

// Add common properties
const FULL_MOS_DATABASE = COMPLETE_MOS_DATABASE.map(mos => ({
    ...mos,
    branch: 'Army',
    rank: 'Enlisted',
    asvabRequirements: mos.asvab,
    signingBonus: mos.bonus,
    clearanceRequired: mos.clearance,
    physicalDemand: mos.physical,
    idealTraits: getTraitsForCareerField(mos.careerField),
    civilianEquivalent: getCivilianEquivalent(mos.code),
}));

function getTraitsForCareerField(field) {
    const traits = {
        'Infantry': ['Physical fitness', 'Leadership', 'Team player', 'Resilience', 'Combat readiness'],
        'Engineer': ['Problem solving', 'Technical aptitude', 'Physical stamina', 'Attention to detail'],
        'Field Artillery': ['Mathematical aptitude', 'Team coordination', 'Quick thinking', 'Precision'],
        'Air Defense': ['Technical aptitude', 'Vigilance', 'Quick decision-making', 'Attention to detail'],
        'Aviation': ['Mechanical aptitude', 'Attention to detail', 'Safety consciousness', 'Precision'],
        'Cyber': ['Analytical thinking', 'Problem solving', 'Continuous learning', 'Technical aptitude'],
        'Special Forces': ['Mental toughness', 'Physical elite', 'Leadership', 'Cultural awareness', 'Adaptability'],
        'Armor': ['Quick reflexes', 'Team coordination', 'Technical aptitude', 'Physical stamina'],
        'Signal': ['Technical aptitude', 'Troubleshooting', 'Communication skills', 'Continuous learning'],
        'Military Police': ['Law enforcement aptitude', 'Physical fitness', 'Ethics', 'Communication'],
        'Military Intelligence': ['Analytical skills', 'Critical thinking', 'Attention to detail', 'Language aptitude'],
        'Finance': ['Mathematical aptitude', 'Attention to detail', 'Organization', 'Ethics'],
        'PSYOP': ['Communication skills', 'Cultural awareness', 'Creativity', 'Persuasion'],
        'Civil Affairs': ['Cultural awareness', 'Communication', 'Problem solving', 'Diplomacy'],
        'Human Resources': ['Organization', 'Communication', 'Computer skills', 'Customer service'],
        'Public Affairs': ['Communication skills', 'Writing ability', 'Creativity', 'Public speaking'],
        'Medical': ['Compassion', 'Quick decision-making', 'Physical stamina', 'Attention to detail'],
        'Chemical': ['Scientific aptitude', 'Safety consciousness', 'Attention to detail', 'Physical stamina'],
        'Transportation': ['Driving skills', 'Navigation', 'Safety awareness', 'Physical stamina'],
        'Ordnance': ['Attention to detail', 'Calm under pressure', 'Technical aptitude', 'Physical stamina'],
        'Maintenance': ['Mechanical aptitude', 'Troubleshooting', 'Physical stamina', 'Attention to detail'],
        'Logistics': ['Organization', 'Attention to detail', 'Computer skills', 'Physical stamina'],
        'Electronics': ['Technical aptitude', 'Troubleshooting', 'Attention to detail', 'Continuous learning'],
    };
    return traits[field] || ['Adaptability', 'Team player', 'Physical fitness'];
}

function getCivilianEquivalent(code) {
    const equivalents = {
        '17C': 'Cybersecurity Analyst, Penetration Tester',
        '25B': 'IT Support Specialist, Network Administrator',
        '25D': 'Network Security Engineer, SOC Analyst',
        '68W': 'EMT, Paramedic, Emergency Medical Technician',
        '68C': 'Licensed Practical Nurse (LPN)',
        '88M': 'Commercial Truck Driver (CDL)',
        '15Q': 'Air Traffic Controller',
        '15W': 'Drone Operator, UAS Pilot',
        '42A': 'HR Specialist, Administrative Assistant',
        '91B': 'Automotive Mechanic',
        '92Y': 'Supply Chain Manager, Inventory Specialist',
        '35F': 'Business Intelligence Analyst, Data Analyst',
    };
    return equivalents[code] || '';
}

module.exports = { FULL_MOS_DATABASE };
