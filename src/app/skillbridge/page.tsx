'use client';

import { useState } from 'react';
import Link from 'next/link';

// Real SkillBridge partner data
interface SkillBridgeProgram {
    company: string;
    industry: string;
    locations: string[];
    duration: string;
    roles: string[];
    description: string;
    url: string;
    hiringRate: string;
}

const SKILLBRIDGE_PROGRAMS: SkillBridgeProgram[] = [
    // ============================================
    // TECHNOLOGY
    // ============================================
    { company: 'Amazon', industry: 'Technology', locations: ['Nationwide', 'Remote'], duration: '12 weeks', roles: ['Operations Manager', 'IT Support', 'Cloud Support'], description: 'Amazon Military programs offer hands-on experience in operations and technology.', url: 'https://www.amazon.jobs/en/military', hiringRate: '90%+' },
    { company: 'Microsoft', industry: 'Technology', locations: ['Redmond, WA', 'Remote'], duration: '16-20 weeks', roles: ['Software Engineer', 'Cloud Solutions Architect', 'Program Manager'], description: 'Microsoft MSSA provides cloud and software training with direct hiring pipeline.', url: 'https://military.microsoft.com/mssa/', hiringRate: '95%+' },
    { company: 'Google', industry: 'Technology', locations: ['Mountain View, CA', 'Remote'], duration: '12 weeks', roles: ['IT Support', 'Data Center Tech', 'Cloud Architect'], description: 'Google IT Support Certificate program and direct hiring pathways.', url: 'https://careers.google.com/programs/veterans/', hiringRate: '88%+' },
    { company: 'Salesforce', industry: 'Technology', locations: ['San Francisco, CA', 'Remote'], duration: '12 weeks', roles: ['Sales Development', 'Customer Success', 'Developer'], description: 'Vetforce program provides free Salesforce training and certification.', url: 'https://veterans.force.com/', hiringRate: '80%+' },
    { company: 'Oracle', industry: 'Technology', locations: ['Austin, TX', 'Remote'], duration: '12 weeks', roles: ['Cloud Engineer', 'DBA', 'Software Developer'], description: 'Enterprise software leader with cloud computing opportunities.', url: 'https://www.oracle.com/careers/military-veterans/', hiringRate: '85%+' },
    { company: 'IBM', industry: 'Technology', locations: ['Armonk, NY', 'Remote'], duration: '12-16 weeks', roles: ['Cloud Engineer', 'AI Specialist', 'Cybersecurity'], description: 'Tech giant with strong veteran hiring and AI/cloud focus.', url: 'https://www.ibm.com/impact/veterans', hiringRate: '84%+' },
    { company: 'Cisco', industry: 'Technology', locations: ['San Jose, CA', 'Remote'], duration: '12 weeks', roles: ['Network Engineer', 'Sales Engineer', 'Cybersecurity'], description: 'Networking leader with CCNA training and certification support.', url: 'https://www.cisco.com/c/en/us/about/careers/military-veterans.html', hiringRate: '86%+' },
    { company: 'Verizon', industry: 'Telecommunications', locations: ['Nationwide'], duration: '12 weeks', roles: ['Network Engineer', 'Sales', 'Technical Support'], description: 'Veteran-focused hiring with network engineering career paths.', url: 'https://www.verizon.com/about/careers/military', hiringRate: '82%+' },
    { company: 'AT&T', industry: 'Telecommunications', locations: ['Nationwide'], duration: '12 weeks', roles: ['Network Technician', 'Sales', 'Cybersecurity'], description: 'Telecommunications training with immediate placement opportunities.', url: 'https://www.att.jobs/military', hiringRate: '83%+' },
    { company: 'Comcast', industry: 'Telecommunications', locations: ['Philadelphia', 'Nationwide'], duration: '12 weeks', roles: ['Technician', 'Network Engineer', 'Sales'], description: 'Media and telecom giant with technical career paths.', url: 'https://jobs.comcast.com/military', hiringRate: '82%+' },

    // ============================================
    // DEFENSE / AEROSPACE
    // ============================================
    { company: 'Lockheed Martin', industry: 'Defense / Aerospace', locations: ['Texas', 'Colorado', 'Florida'], duration: '12-24 weeks', roles: ['Systems Engineer', 'Project Manager', 'Security Analyst'], description: 'Defense industry leader. Security clearance highly valued.', url: 'https://www.lockheedmartinjobs.com/military-veterans', hiringRate: '85%+' },
    { company: 'Northrop Grumman', industry: 'Defense / Aerospace', locations: ['California', 'Virginia', 'Maryland'], duration: '12-20 weeks', roles: ['Systems Engineer', 'Program Manager', 'Cybersecurity'], description: 'Defense contractor with extensive SkillBridge partnerships.', url: 'https://www.northropgrumman.com/careers/military-veterans/', hiringRate: '87%+' },
    { company: 'Raytheon', industry: 'Defense / Aerospace', locations: ['Arizona', 'Texas', 'Massachusetts'], duration: '12-20 weeks', roles: ['Systems Engineer', 'Cybersecurity', 'Program Manager'], description: 'Major defense contractor with veteran hiring programs.', url: 'https://www.rtx.com/careers/military-veterans', hiringRate: '86%+' },
    { company: 'Boeing', industry: 'Defense / Aerospace', locations: ['Seattle, WA', 'St. Louis, MO'], duration: '12-16 weeks', roles: ['Aircraft Mechanic', 'Engineer', 'Quality Inspector'], description: 'Aerospace giant with A&P license pathway.', url: 'https://jobs.boeing.com/military', hiringRate: '85%+' },
    { company: 'L3Harris', industry: 'Defense / Aerospace', locations: ['Florida', 'New York', 'Texas'], duration: '12-16 weeks', roles: ['Systems Engineer', 'RF Engineer', 'Program Manager'], description: 'Defense communications leader. Clearance highly valued.', url: 'https://www.l3harris.com/careers/veterans', hiringRate: '87%+' },
    { company: 'General Dynamics', industry: 'Defense / Aerospace', locations: ['Virginia', 'Connecticut', 'Michigan'], duration: '12-16 weeks', roles: ['Systems Engineer', 'IT Specialist', 'Shipbuilder'], description: 'Defense contractor specializing in naval systems.', url: 'https://www.gd.com/careers/transitioning-military', hiringRate: '87%+' },
    { company: 'BAE Systems', industry: 'Defense / Aerospace', locations: ['Virginia', 'New Hampshire'], duration: '12-16 weeks', roles: ['Engineer', 'Program Manager', 'Technician'], description: 'British defense giant with significant US operations.', url: 'https://www.baesystems.com/en-us/careers/veterans', hiringRate: '85%+' },
    { company: 'Huntington Ingalls', industry: 'Defense / Aerospace', locations: ['Virginia', 'Mississippi'], duration: '12-20 weeks', roles: ['Shipbuilder', 'Welder', 'Electrician', 'Engineer'], description: "America's largest shipbuilder. Navy veterans valued.", url: 'https://jobs.huntingtoningalls.com/veterans', hiringRate: '88%+' },
    { company: 'SpaceX', industry: 'Aerospace', locations: ['Hawthorne, CA', 'Texas', 'Florida'], duration: '12-20 weeks', roles: ['Technician', 'Engineer', 'Mission Operations'], description: 'Commercial space leader with military precision skills.', url: 'https://www.spacex.com/careers', hiringRate: '80%+' },

    // ============================================
    // GOVERNMENT CONSULTING
    // ============================================
    { company: 'Booz Allen Hamilton', industry: 'Government Consulting', locations: ['DC Metro', 'Nationwide'], duration: '12 weeks', roles: ['Cybersecurity Analyst', 'Data Scientist', 'Consultant'], description: 'Defense and intelligence consulting. Clearance valued.', url: 'https://www.boozallen.com/careers/military.html', hiringRate: '88%+' },
    { company: 'Deloitte', industry: 'Consulting', locations: ['Major US cities', 'Remote'], duration: '12-16 weeks', roles: ['Consultant', 'Analyst', 'Cyber Analyst'], description: 'CORE Leadership Program for those leaving the service.', url: 'https://www2.deloitte.com/us/en/pages/about-deloitte/articles/military.html', hiringRate: '85%+' },
    { company: 'PwC', industry: 'Consulting', locations: ['Major US cities', 'Remote'], duration: '12-16 weeks', roles: ['Associate', 'Consultant', 'Risk Advisory'], description: 'Big Four consulting with structured veteran programs.', url: 'https://www.pwc.com/us/en/about-us/diversity/veterans.html', hiringRate: '85%+' },
    { company: 'Accenture Federal', industry: 'Government Consulting', locations: ['DC Metro', 'Remote'], duration: '12-16 weeks', roles: ['Consultant', 'Cybersecurity', 'Cloud Architect'], description: 'Federal consulting with strong veteran support.', url: 'https://www.accenture.com/us-en/careers/military-veterans', hiringRate: '88%+' },
    { company: 'SAIC', industry: 'Government Consulting', locations: ['DC Metro', 'Nationwide'], duration: '12 weeks', roles: ['Systems Engineer', 'Cybersecurity', 'IT Specialist'], description: 'Federal contractor with extensive cleared veteran hiring.', url: 'https://jobs.saic.com/military', hiringRate: '88%+' },
    { company: 'Leidos', industry: 'Government Consulting', locations: ['DC Metro', 'San Diego'], duration: '12-16 weeks', roles: ['Systems Engineer', 'Software Developer', 'Analyst'], description: 'Major federal contractor with strong veteran culture.', url: 'https://careers.leidos.com/military', hiringRate: '86%+' },
    { company: 'ManTech', industry: 'Government Consulting', locations: ['DC Metro', 'Nationwide'], duration: '12 weeks', roles: ['Cybersecurity', 'Intel Analyst', 'IT Specialist'], description: 'Defense and intel contractor. TS/SCI positions.', url: 'https://www.mantech.com/careers/veterans', hiringRate: '89%+' },

    // ============================================
    // FINANCIAL SERVICES
    // ============================================
    { company: 'JPMorgan Chase', industry: 'Financial Services', locations: ['New York', 'Delaware', 'Texas'], duration: '12 weeks', roles: ['Banking Associate', 'Operations', 'Technology'], description: 'Military Pathways program with mentorship.', url: 'https://careers.jpmorgan.com/us/en/military', hiringRate: '90%+' },
    { company: 'USAA', industry: 'Financial Services', locations: ['San Antonio, TX', 'Phoenix, AZ'], duration: '12 weeks', roles: ['Claims Adjuster', 'IT Support', 'Financial Advisor'], description: 'Military-focused company with strong veteran culture.', url: 'https://www.usaajobs.com/content/military/', hiringRate: '92%+' },
    { company: 'Bank of America', industry: 'Financial Services', locations: ['Charlotte, NC', 'Nationwide'], duration: '12 weeks', roles: ['Operations', 'IT', 'Risk Management'], description: 'Banking leader with structured military career placement program.', url: 'https://careers.bankofamerica.com/military', hiringRate: '85%+' },
    { company: 'Wells Fargo', industry: 'Financial Services', locations: ['San Francisco', 'Charlotte'], duration: '12 weeks', roles: ['Banker', 'Operations', 'Technology'], description: 'Banking services with veteran mentorship programs.', url: 'https://www.wellsfargo.com/about/careers/military/', hiringRate: '83%+' },
    { company: 'Capital One', industry: 'Financial Services', locations: ['McLean, VA', 'Remote'], duration: '12 weeks', roles: ['Software Engineer', 'Data Analyst', 'Cybersecurity'], description: 'Tech-forward bank with strong engineering culture.', url: 'https://www.capitalonecareers.com/military', hiringRate: '86%+' },

    // ============================================
    // LOGISTICS / TRANSPORTATION
    // ============================================
    { company: 'FedEx', industry: 'Logistics / Transportation', locations: ['Memphis, TN', 'Nationwide'], duration: '12 weeks', roles: ['Operations Manager', 'Logistics Coordinator', 'Fleet Manager'], description: 'Logistics and operations training with clear advancement.', url: 'https://careers.fedex.com/military', hiringRate: '85%+' },
    { company: 'UPS', industry: 'Logistics / Transportation', locations: ['Louisville, KY', 'Nationwide'], duration: '12 weeks', roles: ['Operations Supervisor', 'Driver', 'Logistics Manager'], description: 'Logistics leader with CDL training programs.', url: 'https://www.jobs-ups.com/military', hiringRate: '84%+' },

    // ============================================
    // AVIATION
    // ============================================
    { company: 'Delta Air Lines', industry: 'Aviation', locations: ['Atlanta, GA', 'Nationwide'], duration: '12 weeks', roles: ['Pilot', 'Aircraft Mechanic', 'Operations'], description: 'Airline with strong military pilot career pathways.', url: 'https://www.deltajobs.net/veterans', hiringRate: '90%+' },
    { company: 'United Airlines', industry: 'Aviation', locations: ['Chicago, IL', 'Nationwide'], duration: '12 weeks', roles: ['Pilot', 'Technician', 'Operations'], description: 'Military-friendly airline with pilot training pathways.', url: 'https://www.united.com/military', hiringRate: '88%+' },
    { company: 'American Airlines', industry: 'Aviation', locations: ['Dallas, TX', 'Nationwide'], duration: '12 weeks', roles: ['Pilot', 'Mechanic', 'Operations'], description: 'Aviation careers with ATP flight training partnerships.', url: 'https://jobs.aa.com/military', hiringRate: '87%+' },

    // ============================================
    // HEALTHCARE
    // ============================================
    { company: 'CVS Health', industry: 'Healthcare', locations: ['Nationwide'], duration: '10-12 weeks', roles: ['Pharmacy Technician', 'Store Manager', 'Healthcare Ops'], description: 'Healthcare retail with pharmacy certification programs.', url: 'https://jobs.cvshealth.com/military-veterans', hiringRate: '80%+' },
    { company: 'Johnson & Johnson', industry: 'Healthcare', locations: ['New Brunswick, NJ', 'Nationwide'], duration: '12 weeks', roles: ['Sales', 'Manufacturing', 'R&D', 'Quality'], description: 'Healthcare giant with medical device opportunities.', url: 'https://www.careers.jnj.com/military', hiringRate: '84%+' },
    { company: 'UnitedHealth Group', industry: 'Healthcare', locations: ['Minneapolis, MN', 'Remote'], duration: '12 weeks', roles: ['Healthcare Ops', 'IT', 'Clinical', 'Analytics'], description: 'Healthcare company with growing tech and clinical roles.', url: 'https://careers.unitedhealthgroup.com/military-and-veterans', hiringRate: '83%+' },
    { company: 'Humana', industry: 'Healthcare', locations: ['Louisville, KY', 'Remote'], duration: '12 weeks', roles: ['Case Manager', 'IT', 'Operations', 'Claims'], description: 'Health insurance with VA/Tricare experience valued.', url: 'https://careers.humana.com/military/', hiringRate: '85%+' },

    // ============================================
    // RETAIL
    // ============================================
    { company: 'Home Depot', industry: 'Retail', locations: ['Atlanta, GA', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Operations', 'Supply Chain'], description: 'Retail leader with clear management career paths.', url: 'https://careers.homedepot.com/career-areas/military/', hiringRate: '88%+' },
    { company: 'Lowes', industry: 'Retail', locations: ['Charlotte, NC', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Distribution', 'IT'], description: 'Home improvement retailer with veteran hiring commitment.', url: 'https://talent.lowes.com/us/en/military', hiringRate: '86%+' },
    { company: 'Walmart', industry: 'Retail', locations: ['Bentonville, AR', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Logistics', 'E-commerce'], description: 'World largest retailer with extensive veteran programs.', url: 'https://careers.walmart.com/military', hiringRate: '92%+' },
    { company: 'Target', industry: 'Retail', locations: ['Minneapolis, MN', 'Nationwide'], duration: '12 weeks', roles: ['Store Leader', 'Distribution', 'Technology'], description: 'Retail company with leadership development focus.', url: 'https://corporate.target.com/careers/internships/veterans', hiringRate: '85%+' },

    // ============================================
    // AUTOMOTIVE / ENERGY
    // ============================================
    { company: 'Tesla', industry: 'Automotive / Energy', locations: ['Fremont, CA', 'Austin, TX'], duration: '12 weeks', roles: ['Manufacturing Tech', 'Electrician', 'Service Tech'], description: 'EV and energy leader actively recruiting military talent.', url: 'https://www.tesla.com/careers', hiringRate: '82%+' },
    { company: 'Ford Motor Company', industry: 'Automotive / Energy', locations: ['Dearborn, MI', 'Kentucky'], duration: '12 weeks', roles: ['Manufacturing', 'Quality Engineer', 'Supply Chain', 'IT'], description: 'American automotive icon with veteran workforce programs.', url: 'https://corporate.ford.com/careers/veteran-programs.html', hiringRate: '85%+' },
    { company: 'General Motors', industry: 'Automotive / Energy', locations: ['Detroit, MI', 'Texas', 'Nationwide'], duration: '12 weeks', roles: ['Manufacturing', 'Engineering', 'IT', 'Operations'], description: 'Major automaker with strong veteran hiring initiatives.', url: 'https://www.gm.com/company/careers', hiringRate: '84%+' },
    { company: 'ExxonMobil', industry: 'Automotive / Energy', locations: ['Houston, TX', 'Louisiana'], duration: '12-16 weeks', roles: ['Process Operator', 'Engineer', 'Safety Manager', 'Technician'], description: 'Energy giant with excellent veteran pipeline programs.', url: 'https://corporate.exxonmobil.com/careers', hiringRate: '86%+' },
    { company: 'Chevron', industry: 'Automotive / Energy', locations: ['Houston, TX', 'California'], duration: '12 weeks', roles: ['Operations Technician', 'Engineer', 'IT', 'Safety'], description: 'Energy company with extensive veteran career support.', url: 'https://careers.chevron.com/military', hiringRate: '85%+' },

    // ============================================
    // UTILITIES
    // ============================================
    { company: 'Duke Energy', industry: 'Utilities', locations: ['Charlotte, NC', 'Florida', 'Indiana'], duration: '12 weeks', roles: ['Lineman', 'Power Plant Operator', 'Engineer', 'IT'], description: 'Major utility with strong apprenticeship programs.', url: 'https://www.duke-energy.com/careers', hiringRate: '88%+' },
    { company: 'Southern Company', industry: 'Utilities', locations: ['Atlanta, GA', 'Alabama', 'Mississippi'], duration: '12 weeks', roles: ['Power Plant', 'Transmission', 'IT', 'Operations'], description: 'Energy utility with veteran-friendly culture.', url: 'https://www.southerncompany.com/careers.html', hiringRate: '87%+' },
    { company: 'NextEra Energy', industry: 'Utilities', locations: ['Florida', 'Nationwide'], duration: '12 weeks', roles: ['Wind Technician', 'Solar Tech', 'Engineer', 'Operations'], description: 'Leading renewable energy company with growth opportunities.', url: 'https://www.nexteraenergy.com/careers.html', hiringRate: '84%+' },

    // ============================================
    // MANUFACTURING
    // ============================================
    { company: 'Caterpillar', industry: 'Manufacturing', locations: ['Peoria, IL', 'Texas', 'Nationwide'], duration: '12 weeks', roles: ['Technician', 'Welder', 'Machinist', 'Engineer'], description: 'Heavy equipment manufacturer with strong veteran programs.', url: 'https://www.caterpillar.com/careers', hiringRate: '86%+' },
    { company: 'John Deere', industry: 'Manufacturing', locations: ['Moline, IL', 'Iowa', 'Wisconsin'], duration: '12 weeks', roles: ['Technician', 'Manufacturing', 'Engineer', 'IT'], description: 'Agricultural equipment leader with veteran hiring focus.', url: 'https://www.deere.com/careers/veterans', hiringRate: '85%+' },
    { company: 'GE Aerospace', industry: 'Manufacturing', locations: ['Cincinnati, OH', 'Massachusetts'], duration: '12-16 weeks', roles: ['Manufacturing Tech', 'Engineer', 'Quality', 'Supply Chain'], description: 'Aviation engine manufacturer with military SkillBridge partnerships.', url: 'https://www.ge.com/careers/military', hiringRate: '88%+' },
    { company: 'Honeywell', industry: 'Manufacturing', locations: ['Charlotte, NC', 'Phoenix, AZ'], duration: '12 weeks', roles: ['Engineer', 'Technician', 'IT', 'Operations'], description: 'Diversified technology and manufacturing company.', url: 'https://careers.honeywell.com/military', hiringRate: '85%+' },
    { company: '3M', industry: 'Manufacturing', locations: ['St. Paul, MN', 'Nationwide'], duration: '12 weeks', roles: ['Manufacturing', 'Engineer', 'Sales', 'IT'], description: 'Innovation company with veteran career pathways.', url: 'https://www.3m.com/3M/en_US/careers-us/', hiringRate: '83%+' },

    // ============================================
    // ADDITIONAL TECH
    // ============================================
    { company: 'Dell Technologies', industry: 'Technology', locations: ['Round Rock, TX', 'Remote'], duration: '12 weeks', roles: ['Sales', 'IT Support', 'Engineer', 'Project Manager'], description: 'Tech hardware giant with military recruiting programs.', url: 'https://jobs.dell.com/military', hiringRate: '84%+' },
    { company: 'HP Inc', industry: 'Technology', locations: ['Palo Alto, CA', 'Houston, TX'], duration: '12 weeks', roles: ['Engineer', 'Sales', 'IT', 'Operations'], description: 'Computing company with veteran placement support.', url: 'https://www.hp.com/us-en/jobs/military.html', hiringRate: '82%+' },
    { company: 'Intel', industry: 'Technology', locations: ['Santa Clara, CA', 'Oregon', 'Arizona'], duration: '12-16 weeks', roles: ['Engineer', 'Manufacturing', 'IT', 'Project Manager'], description: 'Semiconductor leader with veteran hiring programs.', url: 'https://www.intel.com/content/www/us/en/jobs/military.html', hiringRate: '83%+' },
    { company: 'Palantir', industry: 'Technology', locations: ['Denver, CO', 'DC Metro'], duration: '12 weeks', roles: ['Forward Deployed Engineer', 'Solutions Architect', 'Mission Manager'], description: 'Defense tech company highly values military experience.', url: 'https://www.palantir.com/careers/', hiringRate: '90%+' },
    { company: 'Anduril', industry: 'Technology', locations: ['Costa Mesa, CA', 'DC Metro'], duration: '12 weeks', roles: ['Engineer', 'Mission Systems', 'Operations'], description: 'Defense tech startup founded by military veterans.', url: 'https://www.anduril.com/careers', hiringRate: '92%+' },
    { company: 'Shield AI', industry: 'Technology', locations: ['San Diego, CA', 'Dallas, TX'], duration: '12 weeks', roles: ['Engineer', 'Test Pilot', 'Systems', 'Operations'], description: 'Defense AI company building autonomous systems.', url: 'https://www.shield.ai/careers', hiringRate: '91%+' },
    { company: 'Rebellion Defense', industry: 'Technology', locations: ['Washington, DC', 'Remote'], duration: '12 weeks', roles: ['Engineer', 'Product Manager', 'Mission Systems'], description: 'Defense software startup with veteran founders.', url: 'https://rebelliondefense.com/careers', hiringRate: '90%+' },

    // ============================================
    // CONSTRUCTION
    // ============================================
    { company: 'Turner Construction', industry: 'Construction', locations: ['Nationwide'], duration: '12 weeks', roles: ['Project Engineer', 'Superintendent', 'Safety Manager', 'Estimator'], description: 'Leading construction company with veteran hiring programs.', url: 'https://www.turnerconstruction.com/careers', hiringRate: '86%+' },
    { company: 'Kiewit', industry: 'Construction', locations: ['Omaha, NE', 'Nationwide'], duration: '12 weeks', roles: ['Project Manager', 'Superintendent', 'Engineer', 'Safety'], description: 'Infrastructure contractor with strong veteran culture.', url: 'https://www.kiewit.com/work-with-us/', hiringRate: '88%+' },
    { company: 'Bechtel', industry: 'Construction', locations: ['San Francisco', 'Nationwide'], duration: '12-16 weeks', roles: ['Project Manager', 'Engineer', 'Construction Manager', 'Safety'], description: 'Global engineering and construction company.', url: 'https://www.bechtel.com/careers/', hiringRate: '85%+' },
    { company: 'Fluor', industry: 'Construction', locations: ['Irving, TX', 'Nationwide'], duration: '12 weeks', roles: ['Project Manager', 'Engineer', 'Construction', 'Maintenance'], description: 'Engineering and construction with federal contract work.', url: 'https://careers.fluor.com/', hiringRate: '87%+' },
    { company: 'Black & Veatch', industry: 'Construction', locations: ['Kansas City', 'Nationwide'], duration: '12 weeks', roles: ['Engineer', 'Project Manager', 'Construction Manager'], description: 'Infrastructure company specializing in utilities.', url: 'https://careers.bv.com/', hiringRate: '84%+' },

    // ============================================
    // EDUCATION / TRAINING
    // ============================================
    { company: 'Hiring Our Heroes', industry: 'Education / Training', locations: ['Remote', 'Nationwide'], duration: '12 weeks', roles: ['Various Partner Companies', 'Corporate Fellowships'], description: 'Premier fellowship program connecting to 100+ employers.', url: 'https://www.hiringourheroes.org/', hiringRate: '90%+' },
    { company: 'American Corporate Partners', industry: 'Education / Training', locations: ['Remote'], duration: '12 months', roles: ['Career Mentorship', 'Networking', 'Professional Development'], description: 'Free mentorship program with Fortune 500 companies.', url: 'https://www.acp-usa.org/', hiringRate: 'N/A - Mentorship' },
    { company: 'MedCerts', industry: 'Education / Training', locations: ['Remote'], duration: '8-16 weeks', roles: ['Medical Coding', 'Healthcare IT', 'Pharmacy Tech'], description: 'Healthcare certification training for veterans.', url: 'https://medcerts.com/for-military', hiringRate: '85%+' },

    // ============================================
    // FOOD / BEVERAGE
    // ============================================
    { company: 'PepsiCo', industry: 'Food / Beverage', locations: ['Nationwide'], duration: '12 weeks', roles: ['Driver', 'Operations', 'Supply Chain', 'Sales'], description: 'Food and beverage giant with CDL programs.', url: 'https://www.pepsicojobs.com/main/jobs?keywords=military', hiringRate: '83%+' },
    { company: 'Coca-Cola', industry: 'Food / Beverage', locations: ['Atlanta, GA', 'Nationwide'], duration: '12 weeks', roles: ['Driver', 'Merchandiser', 'Operations', 'Sales'], description: 'Beverage company with veteran CDL training.', url: 'https://www.coca-colacompany.com/careers', hiringRate: '82%+' },
    { company: 'Starbucks', industry: 'Food / Beverage', locations: ['Seattle, WA', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Operations', 'Roasting Plant'], description: 'Coffee leader with veteran hiring initiatives.', url: 'https://www.starbucks.com/careers/military', hiringRate: '85%+' },
    { company: 'Anheuser-Busch', industry: 'Food / Beverage', locations: ['St. Louis, MO', 'Nationwide'], duration: '12 weeks', roles: ['Brewing', 'Distribution', 'Sales', 'Operations'], description: 'Brewery with strong veteran hiring culture.', url: 'https://www.anheuser-busch.com/careers', hiringRate: '84%+' },

    // ============================================
    // INSURANCE
    // ============================================
    { company: 'State Farm', industry: 'Insurance', locations: ['Bloomington, IL', 'Nationwide'], duration: '12 weeks', roles: ['Claims Adjuster', 'Agent', 'Underwriter', 'IT'], description: 'Insurance leader with veteran career paths.', url: 'https://www.statefarm.com/careers/military', hiringRate: '83%+' },
    { company: 'Allstate', industry: 'Insurance', locations: ['Northbrook, IL', 'Nationwide'], duration: '12 weeks', roles: ['Claims', 'Sales', 'Operations', 'IT'], description: 'Insurance company with veteran programs.', url: 'https://allstate.jobs/military/', hiringRate: '82%+' },
    { company: 'Liberty Mutual', industry: 'Insurance', locations: ['Boston, MA', 'Nationwide'], duration: '12 weeks', roles: ['Claims Adjuster', 'Underwriter', 'IT', 'Sales'], description: 'Global insurer with veteran career readiness support.', url: 'https://jobs.libertymutualgroup.com/veterans/', hiringRate: '84%+' },
    { company: 'Progressive', industry: 'Insurance', locations: ['Mayfield, OH', 'Nationwide'], duration: '12 weeks', roles: ['Claims', 'Customer Service', 'IT', 'Data Analytics'], description: 'Innovative insurer with remote work options.', url: 'https://www.progressive.com/careers/', hiringRate: '81%+' },

    // ============================================
    // HOSPITALITY
    // ============================================
    { company: 'Marriott', industry: 'Hospitality', locations: ['Bethesda, MD', 'Worldwide'], duration: '12 weeks', roles: ['Hotel Manager', 'Operations', 'Security', 'Food & Beverage'], description: 'Hotel chain with veteran-friendly culture.', url: 'https://marriottcorporation.com/careers-for-military-veterans/', hiringRate: '80%+' },
    { company: 'Hilton', industry: 'Hospitality', locations: ['McLean, VA', 'Worldwide'], duration: '12 weeks', roles: ['Hotel Manager', 'Operations', 'Security', 'Culinary'], description: 'Hospitality leader with Operation Opportunity program.', url: 'https://jobs.hilton.com/us/en/military', hiringRate: '82%+' },
    { company: 'Hyatt', industry: 'Hospitality', locations: ['Chicago, IL', 'Worldwide'], duration: '12 weeks', roles: ['Hotel Operations', 'Manager', 'Engineering', 'Security'], description: 'Hotel company with veteran career paths.', url: 'https://careers.hyatt.com/', hiringRate: '81%+' },

    // ============================================
    // GOVERNMENT
    // ============================================
    { company: 'Department of Veteran Affairs', industry: 'Government', locations: ['Nationwide'], duration: '12 weeks', roles: ['Healthcare', 'IT', 'Administration', 'Benefits'], description: 'Federal agency dedicated to veteran care. Priority hiring.', url: 'https://www.vacareers.va.gov/', hiringRate: '95%+' },
    { company: 'Department of Homeland Security', industry: 'Government', locations: ['Nationwide'], duration: '12 weeks', roles: ['CBP Officer', 'TSA', 'Cybersecurity', 'Intelligence'], description: 'Federal agency with extensive veteran hiring authorities.', url: 'https://www.dhs.gov/careers/veterans', hiringRate: '90%+' },
    { company: 'FBI', industry: 'Government', locations: ['Nationwide'], duration: '12 weeks', roles: ['Special Agent', 'Intelligence Analyst', 'IT Specialist', 'Forensics'], description: 'Federal law enforcement with strong military hiring.', url: 'https://www.fbi.gov/careers/veterans', hiringRate: '88%+' },
    { company: 'NSA', industry: 'Government', locations: ['Fort Meade, MD', 'Nationwide'], duration: '12-16 weeks', roles: ['Cybersecurity', 'Intelligence Analyst', 'Linguist', 'Engineer'], description: 'Intelligence agency seeking cleared military talent.', url: 'https://www.nsa.gov/careers/', hiringRate: '92%+' },
    { company: 'USPS', industry: 'Government', locations: ['Nationwide'], duration: '12 weeks', roles: ['Mail Carrier', 'Operations', 'Driver', 'Supervisor'], description: 'Federal employer with veteran preference hiring.', url: 'https://about.usps.com/careers/', hiringRate: '90%+' },
    { company: 'CIA', industry: 'Government', locations: ['Langley, VA', 'Worldwide'], duration: '12-16 weeks', roles: ['Operations Officer', 'Analyst', 'Engineer', 'Linguist'], description: 'Intelligence agency highly valuing military backgrounds.', url: 'https://www.cia.gov/careers/', hiringRate: '85%+' },
    { company: 'DEA', industry: 'Government', locations: ['Arlington, VA', 'Nationwide'], duration: '12 weeks', roles: ['Special Agent', 'Intelligence Analyst', 'Diversion Investigator'], description: 'Federal law enforcement with veteran preference.', url: 'https://www.dea.gov/careers', hiringRate: '87%+' },
    { company: 'Secret Service', industry: 'Government', locations: ['Washington, DC', 'Nationwide'], duration: '12 weeks', roles: ['Special Agent', 'Uniformed Division', 'IT', 'Intelligence'], description: 'Protective agency with strong veteran hiring.', url: 'https://www.secretservice.gov/careers', hiringRate: '86%+' },

    // ============================================
    // RETAIL (Additional)
    // ============================================
    { company: 'Walmart', industry: 'Retail', locations: ['Bentonville, AR', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Distribution', 'Logistics', 'IT'], description: 'Largest employer with Veterans Welcome Home program.', url: 'https://careers.walmart.com/military', hiringRate: '90%+' },
    { company: 'Target', industry: 'Retail', locations: ['Minneapolis, MN', 'Nationwide'], duration: '12 weeks', roles: ['Store Leader', 'Distribution', 'Supply Chain', 'IT'], description: 'Retail leader with strong veteran hiring initiatives.', url: 'https://corporate.target.com/careers/military', hiringRate: '85%+' },
    { company: "Lowe's", industry: 'Retail', locations: ['Mooresville, NC', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Supply Chain', 'Pro Sales', 'Installer'], description: 'Home improvement retailer actively recruiting veterans.', url: 'https://talent.lowes.com/us/en/military', hiringRate: '88%+' },

    // ============================================
    // TRUCKING / CDL
    // ============================================
    { company: 'Schneider', industry: 'Trucking / CDL', locations: ['Green Bay, WI', 'Nationwide'], duration: '6-12 weeks', roles: ['CDL Driver', 'Fleet Manager', 'Operations', 'Dispatcher'], description: 'Leading trucking company with military CDL training.', url: 'https://schneiderjobs.com/military', hiringRate: '95%+' },
    { company: 'Werner Enterprises', industry: 'Trucking / CDL', locations: ['Omaha, NE', 'Nationwide'], duration: '6-12 weeks', roles: ['CDL Driver', 'Operations', 'Safety', 'Maintenance'], description: 'Trucking company with paid CDL training for veterans.', url: 'https://www.werner.com/military', hiringRate: '94%+' },
    { company: 'J.B. Hunt', industry: 'Trucking / CDL', locations: ['Lowell, AR', 'Nationwide'], duration: '6-12 weeks', roles: ['CDL Driver', 'Intermodal', 'Fleet Manager', 'Operations'], description: 'Leading trucking company with military transition programs.', url: 'https://www.jbhunt.com/military', hiringRate: '93%+' },
    { company: 'CRST International', industry: 'Trucking / CDL', locations: ['Cedar Rapids, IA', 'Nationwide'], duration: '4-8 weeks', roles: ['CDL Driver', 'Team Driver', 'Operations'], description: 'Trucking company offering paid CDL training.', url: 'https://crst.com/military', hiringRate: '92%+' },
    { company: 'Swift Transportation', industry: 'Trucking / CDL', locations: ['Phoenix, AZ', 'Nationwide'], duration: '6-12 weeks', roles: ['CDL Driver', 'Fleet Manager', 'Safety', 'Dispatcher'], description: 'Large carrier with military driver programs.', url: 'https://www.swifttrans.com/military', hiringRate: '91%+' },

    // ============================================
    // CONSULTING (Additional)
    // ============================================
    { company: 'KPMG', industry: 'Consulting', locations: ['New York, NY', 'Nationwide'], duration: '12 weeks', roles: ['Consultant', 'Audit', 'Tax', 'Advisory'], description: 'Big 4 firm with veteran recruiting programs.', url: 'https://www.kpmg.us/careers/military.html', hiringRate: '82%+' },
    { company: 'Ernst & Young (EY)', industry: 'Consulting', locations: ['New York, NY', 'Nationwide'], duration: '12 weeks', roles: ['Consultant', 'Audit', 'Tax', 'Technology'], description: 'Big 4 firm actively recruiting military talent.', url: 'https://www.ey.com/en_us/careers/military', hiringRate: '83%+' },

    // ============================================
    // PHARMA / MEDICAL DEVICES
    // ============================================
    { company: 'Medtronic', industry: 'Medical Devices', locations: ['Minneapolis, MN', 'Nationwide'], duration: '12 weeks', roles: ['Sales Rep', 'Field Service', 'Engineering', 'Quality'], description: 'Medical device leader with veteran-friendly culture.', url: 'https://www.medtronic.com/us-en/about/careers/military.html', hiringRate: '84%+' },
    { company: 'Abbott', industry: 'Medical Devices', locations: ['Abbott Park, IL', 'Nationwide'], duration: '12 weeks', roles: ['Sales', 'Manufacturing', 'Engineering', 'Quality'], description: 'Healthcare company with veteran hiring programs.', url: 'https://www.abbott.com/careers.html', hiringRate: '82%+' },
    { company: 'Pfizer', industry: 'Pharmaceutical', locations: ['New York, NY', 'Nationwide'], duration: '12 weeks', roles: ['Sales Rep', 'Manufacturing', 'Research', 'Quality'], description: 'Leading pharma company with veteran initiatives.', url: 'https://www.pfizer.com/about/careers', hiringRate: '81%+' },
    { company: 'Merck', industry: 'Pharmaceutical', locations: ['Kenilworth, NJ', 'Nationwide'], duration: '12 weeks', roles: ['Sales', 'Manufacturing', 'Research', 'IT'], description: 'Pharma giant with veteran hiring programs.', url: 'https://www.merck.com/careers/', hiringRate: '80%+' },
    { company: 'Boston Scientific', industry: 'Medical Devices', locations: ['Marlborough, MA', 'Nationwide'], duration: '12 weeks', roles: ['Sales', 'Field Service', 'Manufacturing', 'Quality'], description: 'Medical device company with veteran focus.', url: 'https://www.bostonscientific.com/en-US/careers.html', hiringRate: '83%+' },

    // ============================================
    // TELECOMMUNICATIONS (Additional)
    // ============================================
    { company: 'T-Mobile', industry: 'Telecommunications', locations: ['Bellevue, WA', 'Nationwide'], duration: '12 weeks', roles: ['Store Manager', 'Network Engineer', 'Sales', 'IT'], description: 'Telecom leader with veteran hiring commitment.', url: 'https://www.t-mobile.com/careers/military', hiringRate: '85%+' },
    { company: 'Charter/Spectrum', industry: 'Telecommunications', locations: ['Stamford, CT', 'Nationwide'], duration: '12 weeks', roles: ['Technician', 'Network Ops', 'Sales', 'Customer Service'], description: 'Cable/internet company actively hiring veterans.', url: 'https://jobs.spectrum.com/military', hiringRate: '84%+' },

    // ============================================
    // AVIATION (Additional)
    // ============================================
    { company: 'Southwest Airlines', industry: 'Aviation', locations: ['Dallas, TX', 'Nationwide'], duration: '12 weeks', roles: ['Pilot', 'Maintenance', 'Operations', 'Customer Service'], description: 'Veteran-friendly airline with military pilot programs.', url: 'https://careers.southwestair.com/military', hiringRate: '88%+' },
    { company: 'JetBlue', industry: 'Aviation', locations: ['Long Island City, NY', 'Nationwide'], duration: '12 weeks', roles: ['Pilot', 'Maintenance', 'Operations', 'Ground Ops'], description: 'Airline with Gateway Select pilot program for military.', url: 'https://www.jetblue.com/jobs', hiringRate: '86%+' },
    { company: 'Republic Airways', industry: 'Aviation', locations: ['Indianapolis, IN', 'Nationwide'], duration: '12-16 weeks', roles: ['Pilot', 'Maintenance', 'Operations'], description: 'Regional airline with military pilot pathway.', url: 'https://www.rfrp.com/', hiringRate: '85%+' },
];

const INDUSTRIES = ['All', 'Technology', 'Defense / Aerospace', 'Financial Services', 'Logistics / Transportation', 'Trucking / CDL', 'Consulting', 'Government Consulting', 'Telecommunications', 'Healthcare', 'Medical Devices', 'Pharmaceutical', 'Aviation', 'Retail', 'Government', 'Automotive / Energy', 'Utilities', 'Manufacturing', 'Construction', 'Education / Training', 'Food / Beverage', 'Insurance', 'Hospitality', 'Aerospace'];

export default function SkillBridgePage() {
    const [search, setSearch] = useState('');
    const [industry, setIndustry] = useState('All');
    const [selectedProgram, setSelectedProgram] = useState<SkillBridgeProgram | null>(null);

    const filteredPrograms = SKILLBRIDGE_PROGRAMS.filter(p => {
        const matchesSearch = p.company.toLowerCase().includes(search.toLowerCase()) ||
            p.roles.some(r => r.toLowerCase().includes(search.toLowerCase()));
        const matchesIndustry = industry === 'All' || p.industry.includes(industry);
        return matchesSearch && matchesIndustry;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">🎖️</div>
                    <span className="text-xl font-bold text-white">Caprica</span>
                </Link>
                <Link href="/veterans" className="text-slate-300 hover:text-white">← Back</Link>
            </nav>

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400 mb-4">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            DoD SkillBridge Authorized • {SKILLBRIDGE_PROGRAMS.length} Partners
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">SkillBridge Programs</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Intern with civilian companies during your last 180 days of service.
                            Get paid military salary while preparing for your next career.
                        </p>
                    </div>

                    {/* Eligibility Box */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-xl p-6 mb-8">
                        <h2 className="text-lg font-semibold text-white mb-3">Am I Eligible?</h2>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-slate-300">Within 180 days of separation</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-slate-300">Commander approval required</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span className="text-slate-300">Honorable discharge expected</span>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search companies or roles..."
                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400"
                        />
                        <select
                            value={industry}
                            onChange={e => setIndustry(e.target.value)}
                            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
                        >
                            {INDUSTRIES.map(i => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </div>

                    {/* Programs Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                        {filteredPrograms.map((program, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedProgram(program)}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6 cursor-pointer hover:border-amber-500/50 transition"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{program.company}</h3>
                                        <p className="text-sm text-slate-400">{program.industry}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">
                                        {program.hiringRate} hire rate
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-3">
                                    {program.roles.slice(0, 3).map((role, j) => (
                                        <span key={j} className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded">
                                            {role}
                                        </span>
                                    ))}
                                    {program.roles.length > 3 && (
                                        <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded">
                                            +{program.roles.length - 3} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                    <span>📍 {program.locations[0]}</span>
                                    <span>⏱️ {program.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No results */}
                    {filteredPrograms.length === 0 && (
                        <div className="text-center py-12 text-slate-400">
                            No programs found. Try adjusting your search.
                        </div>
                    )}

                    {/* Program Detail Modal */}
                    {selectedProgram && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                            <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{selectedProgram.company}</h2>
                                            <p className="text-slate-400">{selectedProgram.industry}</p>
                                        </div>
                                        <button onClick={() => setSelectedProgram(null)} className="text-slate-400 hover:text-white text-2xl">
                                            ×
                                        </button>
                                    </div>

                                    <p className="text-slate-300 mb-6">{selectedProgram.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="p-4 bg-slate-700/50 rounded-lg">
                                            <div className="text-sm text-slate-400">Duration</div>
                                            <div className="text-white font-medium">{selectedProgram.duration}</div>
                                        </div>
                                        <div className="p-4 bg-slate-700/50 rounded-lg">
                                            <div className="text-sm text-slate-400">Hire Rate</div>
                                            <div className="text-green-400 font-medium">{selectedProgram.hiringRate}</div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-medium text-white mb-2">Locations</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProgram.locations.map((loc, i) => (
                                                <span key={i} className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                                                    {loc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-medium text-white mb-2">Available Roles</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProgram.roles.map((role, i) => (
                                                <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded text-sm">
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={selectedProgram.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-3 bg-amber-500 text-slate-900 rounded-lg font-semibold text-center hover:bg-amber-400"
                                    >
                                        Apply at {selectedProgram.company} →
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* How It Works */}
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-semibold text-white mb-4">How SkillBridge Works</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            {[
                                { step: '1', title: 'Find a Program', desc: 'Browse approved employers' },
                                { step: '2', title: 'Get Approval', desc: 'Work with your command' },
                                { step: '3', title: 'Start Training', desc: 'Keep military pay & benefits' },
                                { step: '4', title: 'Get Hired', desc: 'Secure your civilian role' },
                            ].map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold mx-auto mb-2">
                                        {item.step}
                                    </div>
                                    <div className="font-medium text-white">{item.title}</div>
                                    <div className="text-sm text-slate-400">{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <a
                            href="https://skillbridge.osd.mil/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50 transition"
                        >
                            <h3 className="font-semibold text-white mb-2">Official SkillBridge Site</h3>
                            <p className="text-sm text-slate-400">Full program directory and eligibility info</p>
                        </a>
                        <a
                            href="https://www.hiringourheroes.org/fellowships/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 bg-slate-800 border border-slate-700 rounded-xl hover:border-amber-500/50 transition"
                        >
                            <h3 className="font-semibold text-white mb-2">Hiring Our Heroes Fellowships</h3>
                            <p className="text-sm text-slate-400">12-week corporate fellowship programs</p>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
