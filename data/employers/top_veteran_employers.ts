export interface EmployerProfile {
    name: string;
    industry: string;
    description: string;
    veteranProgramUrl?: string;
    logo?: string; // Placeholder for logo path
}

export const TOP_VETERAN_EMPLOYERS: EmployerProfile[] = [
    // --- Technology & Telecom ---
    {
        name: "Amazon / AWS",
        industry: "Technology",
        description: "Massive veteran hiring initiatives (AWS Apprenticeships, Ops roles).",
        veteranProgramUrl: "https://www.amazon.jobs/en/landing_pages/military"
    },
    {
        name: "Verizon",
        industry: "Telecommunications",
        description: "Consistently ranked #1 for veteran hiring in telecom.",
        veteranProgramUrl: "https://www.verizon.com/about/careers/veterans"
    },
    {
        name: "Microsoft",
        industry: "Technology",
        description: "Famous for the MSSA (Software & Systems Academy) training program.",
        veteranProgramUrl: "https://military.microsoft.com/"
    },
    {
        name: "Cisco",
        industry: "Technology",
        description: "Strong cyber training pipelines for vets (CyberVetsUSA).",
        veteranProgramUrl: "https://www.cisco.com/c/m/en_us/about/csr/impact/education/veterans-program.html"
    },
    {
        name: "Salesforce",
        industry: "Technology",
        description: "Vetforce program provides free training and certification.",
        veteranProgramUrl: "https://veterans.force.com/"
    },

    // --- Financial Services ---
    {
        name: "JPMorgan Chase",
        industry: "Finance",
        description: "Founding member of the Veteran Jobs Mission (100k+ hires).",
        veteranProgramUrl: "https://www.jpmorganchase.com/impact/people/military-veterans"
    },
    {
        name: "USAA",
        industry: "Finance / Insurance",
        description: "Built by the military, for the military. The gold standard culture.",
        veteranProgramUrl: "https://www.usaajobs.com/military/"
    },
    {
        name: "Capital One",
        industry: "Finance",
        description: "Strong ERGs and mentorship for transitioning vets.",
        veteranProgramUrl: "https://www.capitalonecareers.com/military"
    },
    {
        name: "Citi",
        industry: "Finance",
        description: "Citi Salutes program focuses on employment and community support.",
        veteranProgramUrl: "https://www.citigroup.com/citi/citizen/community/citisalutes/"
    },

    // --- Logistics & Operations ---
    {
        name: "Walmart",
        industry: "Retail / Logistics",
        description: "Veterans Welcome Home Commitment guarantees a job offer to eligible vets.",
        veteranProgramUrl: "https://careers.walmart.com/us/military"
    },
    {
        name: "FedEx",
        industry: "Logistics",
        description: "Founder Fred Smith is a Marine; deep DNA of hiring vets.",
        veteranProgramUrl: "https://careers.fedex.com/military"
    },
    {
        name: "Union Pacific",
        industry: "Transportation",
        description: "Railroads operate like the military; huge hiring demand.",
        veteranProgramUrl: "https://up.jobs/veterans/index.htm"
    },
    {
        name: "BNSF Railway",
        industry: "Transportation",
        description: "Consistently top-ranked for military friendly culture.",
        veteranProgramUrl: "https://jobs.bnsf.com/us/en/military"
    },

    // --- Healthcare ---
    {
        name: "Johnson & Johnson",
        industry: "Healthcare",
        description: "Strong bridge programs for military medics and corpsmen.",
        veteranProgramUrl: "https://www.careers.jnj.com/talent-community/veterans"
    },
    {
        name: "HCA Healthcare",
        industry: "Healthcare",
        description: "Largest hospital system in the US, actively hiring clinical and non-clinical vets.",
        veteranProgramUrl: "https://careers.hcahealthcare.com/pages/military"
    },

    // --- Energy & Manufacturing ---
    {
        name: "General Electric (GE)",
        industry: "Manufacturing",
        description: "Junior Officer Leadership Program (JOLP) is elite.",
        veteranProgramUrl: "https://jobs.gecareers.com/global/en/veterans"
    },
    {
        name: "Dominion Energy",
        industry: "Energy",
        description: "Troops to Energy Jobs partner; values technical discipline.",
        veteranProgramUrl: "https://careers.dominionenergy.com/content/Military/"
    },
    {
        name: "NextEra Energy",
        industry: "Energy",
        description: "Huge recruiter of Navy Nukes and technical rates.",
        veteranProgramUrl: "https://www.nexteraenergy.com/careers/veterans.html"
    },

    // --- Consulting / Professional Services ---
    {
        name: "Deloitte",
        industry: "Consulting",
        description: "CORE leadership program helps vets translate skills to business.",
        veteranProgramUrl: "https://www2.deloitte.com/us/en/pages/about-deloitte/articles/veteran-employment-program.html"
    },
    {
        name: "Accenture",
        industry: "Consulting",
        description: "Dedicated military recruiting team and fast-track tech training.",
        veteranProgramUrl: "https://www.accenture.com/us-en/careers/local/veterans"
    }
];
