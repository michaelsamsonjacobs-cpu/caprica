export interface MockJob {
    job_id: string;
    job_title: string;
    employer_name: string;
    employer_logo?: string;
    job_city: string;
    job_state: string;
    job_description: string;
    job_apply_link: string;
    job_min_salary: number;
    job_max_salary: number;
    job_posted_at_datetime_utc: string;
}

const BASE_DESC = "This role is perfect for veterans transitioning into civilian careers. We value the discipline, leadership, and technical skills you acquired during your service.";

export const MOCK_JOBS_DB: MockJob[] = [
    // --- TECH / CYBER (17C, 25B, CT, IT) ---
    {
        job_id: "m-tech-1",
        job_title: "Information Security Analyst II",
        employer_name: "Amazon Web Services (AWS)",
        job_city: "Herndon",
        job_state: "VA",
        job_description: `${BASE_DESC} You will monitor networks for security breaches, investigate violations, and implement security standards. Requires active Secret clearance or eligibility.`,
        job_apply_link: "https://www.amazon.jobs/en/landing_pages/military",
        job_min_salary: 110000,
        job_max_salary: 145000,
        job_posted_at_datetime_utc: new Date(Date.now() - 1000000).toISOString()
    },
    {
        job_id: "m-tech-2",
        job_title: "Network Operations Engineer",
        employer_name: "Cisco Systems",
        job_city: "Research Triangle Park",
        job_state: "NC",
        job_description: `${BASE_DESC} Manage enterprise network infrastructure. Ideal for former 25B/25N or equivalent. CCNA preferred but not required for veterans with 4+ years experience.`,
        job_apply_link: "https://jobs.cisco.com/",
        job_min_salary: 95000,
        job_max_salary: 130000,
        job_posted_at_datetime_utc: new Date(Date.now() - 2500000).toISOString()
    },
    {
        job_id: "m-tech-3",
        job_title: "Cyber Threat Hunter",
        employer_name: "Microsoft",
        job_city: "Redmond",
        job_state: "WA",
        job_description: `${BASE_DESC} focus on advanced threat detection. Microsoft Systems and Software Academy (MSSA) graduates highly encouraged to apply.`,
        job_apply_link: "https://military.microsoft.com/",
        job_min_salary: 125000,
        job_max_salary: 165000,
        job_posted_at_datetime_utc: new Date(Date.now() - 500000).toISOString()
    },
    {
        job_id: "m-tech-4",
        job_title: "Field Service Technician (Data Center)",
        employer_name: "Google",
        job_city: "Moncks Corner",
        job_state: "SC",
        job_description: `${BASE_DESC} maintain server hardware and cooling systems. Experience with electrical systems or HVAC (Navy Nukes/MM) is a huge plus.`,
        job_apply_link: "https://careers.google.com/jobs/",
        job_min_salary: 75000,
        job_max_salary: 95000,
        job_posted_at_datetime_utc: new Date(Date.now() - 7200000).toISOString()
    },
    {
        job_id: "m-tech-5",
        job_title: "Systems Administrator",
        employer_name: "Lockheed Martin",
        job_city: "Orlando",
        job_state: "FL",
        job_description: `${BASE_DESC} Support simulation and training systems. Secret clearance required. Great fit for Air Force 3D0X2.`,
        job_apply_link: "https://www.lockheedmartinjobs.com/military",
        job_min_salary: 85000,
        job_max_salary: 110000,
        job_posted_at_datetime_utc: new Date(Date.now() - 3600000).toISOString()
    },
    {
        job_id: "m-tech-6",
        job_title: "Cloud Support Associate",
        employer_name: "Oracle",
        job_city: "Austin",
        job_state: "TX",
        job_description: `${BASE_DESC} Entry-level cloud support role. We offer a 12-week bootcamp for veterans to upskill in OCI (Oracle Cloud Infrastructure).`,
        job_apply_link: "https://www.oracle.com/corporate/careers/diversity-inclusion/veterans/",
        job_min_salary: 70000,
        job_max_salary: 90000,
        job_posted_at_datetime_utc: new Date(Date.now() - 4000000).toISOString()
    },

    // --- LOGISTICS / OPERATIONS (88M, 92A, LS) ---
    {
        job_id: "m-log-1",
        job_title: "Operations Manager",
        employer_name: "Amazon",
        job_city: "Murfreesboro",
        job_state: "TN",
        job_description: `${BASE_DESC} Lead a team of 100+ associates in a fulfillment center. Your NCO/Officer leadership experience is explicitly what we are hiring for.`,
        job_apply_link: "https://www.amazon.jobs/en/landing_pages/military",
        job_min_salary: 85000,
        job_max_salary: 120000,
        job_posted_at_datetime_utc: new Date(Date.now() - 900000).toISOString()
    },
    {
        job_id: "m-log-2",
        job_title: "Supply Chain Coordinator",
        employer_name: "Boeing",
        job_city: "St. Louis",
        job_state: "MO",
        job_description: `${BASE_DESC} Manage complex aerospace supply chains. 92A/LS experience preferred.`,
        job_apply_link: "https://jobs.boeing.com/veterans",
        job_min_salary: 75000,
        job_max_salary: 95000,
        job_posted_at_datetime_utc: new Date(Date.now() - 1800000).toISOString()
    },
    {
        job_id: "m-log-3",
        job_title: "Transportation Supervisor",
        employer_name: "Walmart Supply Chain",
        job_city: "Bentonville",
        job_state: "AR",
        job_description: `${BASE_DESC} oversee fleet operations. 88M experience translates directly.`,
        job_apply_link: "https://careers.walmart.com/us/military",
        job_min_salary: 65000,
        job_max_salary: 85000,
        job_posted_at_datetime_utc: new Date(Date.now() - 600000).toISOString()
    },
    {
        job_id: "m-log-4",
        job_title: "Logistics Analyst",
        employer_name: "Northrop Grumman",
        job_city: "San Diego",
        job_state: "CA",
        job_description: `${BASE_DESC} Analyze supply chain efficiency for defense programs. Clearance helpful.`,
        job_apply_link: "https://www.northropgrumman.com/careers/military-veterans",
        job_min_salary: 80000,
        job_max_salary: 105000,
        job_posted_at_datetime_utc: new Date(Date.now() - 8600000).toISOString()
    },
    {
        job_id: "m-log-5",
        job_title: "Warehouse Operations Supervisor",
        employer_name: "Home Depot",
        job_city: "Atlanta",
        job_state: "GA",
        job_description: `${BASE_DESC} Lead warehouse teams. strong operational leadership needed.`,
        job_apply_link: "https://careers.homedepot.com/military",
        job_min_salary: 60000,
        job_max_salary: 80000,
        job_posted_at_datetime_utc: new Date(Date.now() - 1200000).toISOString()
    },
    {
        job_id: "m-log-6",
        job_title: "Train Crew / Conductor Trainee",
        employer_name: "Union Pacific",
        job_city: "Omaha",
        job_state: "NE",
        job_description: `${BASE_DESC} Operate trains and ensures safe transport of goods. Military safety culture matches perfectly.`,
        job_apply_link: "https://up.jobs/veterans/index.htm",
        job_min_salary: 70000,
        job_max_salary: 95000,
        job_posted_at_datetime_utc: new Date(Date.now() - 5500000).toISOString()
    },

    // --- MEDICAL (68W, HM, 4N) ---
    {
        job_id: "m-med-1",
        job_title: "Emergency Room Technician",
        employer_name: "HCA Healthcare",
        job_city: "Nashville",
        job_state: "TN",
        job_description: `${BASE_DESC} 68W/Corpsman skills directly applicable. State licensing assistance provided.`,
        job_apply_link: "https://careers.hcahealthcare.com/pages/military",
        job_min_salary: 45000,
        job_max_salary: 65000,
        job_posted_at_datetime_utc: new Date(Date.now() - 300000).toISOString()
    },
    {
        job_id: "m-med-2",
        job_title: "Biomedical Equipment Technician",
        employer_name: "GE Healthcare",
        job_city: "Chicago",
        job_state: "IL",
        job_description: `${BASE_DESC} Repair and maintain medical imaging equipment. Great for 68A.`,
        job_apply_link: "https://jobs.gecareers.com/global/en/veterans",
        job_min_salary: 65000,
        job_max_salary: 90000,
        job_posted_at_datetime_utc: new Date(Date.now() - 4500000).toISOString()
    },
    {
        job_id: "m-med-3",
        job_title: "Clinical Project Assistant",
        employer_name: "Johnson & Johnson",
        job_city: "New Brunswick",
        job_state: "NJ",
        job_description: `${BASE_DESC} Support clinical trials. Organization and attention to detail required.`,
        job_apply_link: "https://www.careers.jnj.com/talent-community/veterans",
        job_min_salary: 70000,
        job_max_salary: 95000,
        job_posted_at_datetime_utc: new Date(Date.now() - 2000000).toISOString()
    },
    {
        job_id: "m-med-4",
        job_title: "Safety Specialist",
        employer_name: "Pfizer",
        job_city: "New York",
        job_state: "NY",
        job_description: `${BASE_DESC} Ensure workplace safety and compliance.`,
        job_apply_link: "https://www.pfizer.com/careers/en/veterans",
        job_min_salary: 80000,
        job_max_salary: 110000,
        job_posted_at_datetime_utc: new Date(Date.now() - 6500000).toISOString()
    },
    {
        job_id: "m-med-5",
        job_title: "Patient Care Coordinator",
        employer_name: "UnitedHealth Group",
        job_city: "Minnetonka",
        job_state: "MN",
        job_description: `${BASE_DESC} Coordinate care for complex cases. Medical background preferred.`,
        job_apply_link: "https://careers.unitedhealthgroup.com/culture/diversity-and-inclusion/military-and-veterans/",
        job_min_salary: 55000,
        job_max_salary: 75000,
        job_posted_at_datetime_utc: new Date(Date.now() - 1500000).toISOString()
    },
    {
        job_id: "m-med-6",
        job_title: "Field Medic / Remote Medical Support",
        employer_name: "International SOS",
        job_city: "Houston",
        job_state: "TX",
        job_description: `${BASE_DESC} Provide medical support in remote locations. Combat medic experience highly valued.`,
        job_apply_link: "https://www.internationalsos.com/careers",
        job_min_salary: 85000,
        job_max_salary: 120000,
        job_posted_at_datetime_utc: new Date(Date.now() - 9500000).toISOString()
    },

    // --- SKILLBRIDGE / INTERNSHIPS ---
    {
        job_id: "m-sb-1",
        job_title: "SkillBridge Fellow - Software Engineering",
        employer_name: "Hiring Our Heroes",
        job_city: "Remote",
        job_state: "US",
        job_description: `${BASE_DESC} 12-week fellowship for transitioning service members. Hosts include Salesforce, Boeing, and more.`,
        job_apply_link: "https://www.hiringourheroes.org/fellowships/",
        job_min_salary: 45000,
        job_max_salary: 65000,
        job_posted_at_datetime_utc: new Date(Date.now() - 100000).toISOString()
    },
    {
        job_id: "m-sb-2",
        job_title: "Military Intern - Finance",
        employer_name: "JPMorgan Chase",
        job_city: "New York",
        job_state: "NY",
        job_description: `${BASE_DESC} 6-month internship leading to full time analytics roles.`,
        job_apply_link: "https://www.jpmorganchase.com/impact/people/military-veterans",
        job_min_salary: 70000,
        job_max_salary: 90000,
        job_posted_at_datetime_utc: new Date(Date.now() - 200000).toISOString()
    },
    {
        job_id: "m-sb-3",
        job_title: "Solar Installation Supervisor (Training)",
        employer_name: "Tesla",
        job_city: "Fremont",
        job_state: "CA",
        job_description: `${BASE_DESC} Learn to lead solar installation crews.`,
        job_apply_link: "https://www.tesla.com/careers/vets",
        job_min_salary: 75000,
        job_max_salary: 100000,
        job_posted_at_datetime_utc: new Date(Date.now() - 3000000).toISOString()
    },
    {
        job_id: "m-sb-4",
        job_title: "Project Management Fellow",
        employer_name: "Deloitte",
        job_city: "Arlington",
        job_state: "VA",
        job_description: `${BASE_DESC} Gain PMP hours and consulting experience.`,
        job_apply_link: "https://www2.deloitte.com/us/en/pages/about-deloitte/articles/veteran-employment-program.html",
        job_min_salary: 80000,
        job_max_salary: 110000,
        job_posted_at_datetime_utc: new Date(Date.now() - 4000000).toISOString()
    },
    {
        job_id: "m-sb-5",
        job_title: "Operations Leadership Program",
        employer_name: "General Electric",
        job_city: "Cincinnati",
        job_state: "OH",
        job_description: `${BASE_DESC} 2-year rotational program for Junior Officers.`,
        job_apply_link: "https://jobs.gecareers.com/global/en/veterans",
        job_min_salary: 95000,
        job_max_salary: 125000,
        job_posted_at_datetime_utc: new Date(Date.now() - 5000000).toISOString()
    },
    {
        job_id: "m-sb-6",
        job_title: "Cybersecurity Apprentice",
        employer_name: "IBM",
        job_city: "Durham",
        job_state: "NC",
        job_description: `${BASE_DESC} No degree required. Paid apprenticeship for veterans.`,
        job_apply_link: "https://www.ibm.com/us-en/employment/veterans/",
        job_min_salary: 55000,
        job_max_salary: 70000,
        job_posted_at_datetime_utc: new Date(Date.now() - 6000000).toISOString()
    }
];
