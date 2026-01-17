import { TOP_VETERAN_EMPLOYERS } from '@/../data/employers/top_veteran_employers';

export interface RecruiterContact {
    companyName: string;
    programName: string;
    portalUrl: string;
    description: string;
    targetMOS: string[]; // ['11B', '17C', 'Any']
    regions: string[];
    logoPlaceholder: string;
}

// Transform the simple employer list into a searchable recruiter database
export const RECRUITER_DB: RecruiterContact[] = TOP_VETERAN_EMPLOYERS.map(emp => {
    // Determine likelihood of MOS targets based on industry
    let targets = ['Any'];
    if (emp.industry.includes('Technology')) targets = ['17C', '25B', '25N', '35Q', 'CT', 'IT', 'Any'];
    if (emp.industry.includes('Medical') || emp.industry.includes('Healthcare')) targets = ['68W', '68A', 'HM', '4N', 'Any'];
    if (emp.industry.includes('Logistics') || emp.industry.includes('Transportation')) targets = ['88M', '92A', '92Y', 'LS', 'Any'];
    if (emp.industry.includes('Manufacturing') || emp.industry.includes('Energy')) targets = ['91B', '12B', 'MM', 'EM', 'Any'];

    return {
        companyName: emp.name,
        programName: `${emp.name} Veterans Program`,
        portalUrl: emp.veteranProgramUrl || '#',
        description: emp.description,
        targetMOS: targets,
        regions: ['Nationwide'], // Most large employers are nationwide
        logoPlaceholder: `/logos/${emp.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`
    };
});

export const getRecruitersForMOS = (mosCode: string): RecruiterContact[] => {
    // 1. Exact Matches
    const exact = RECRUITER_DB.filter(r => r.targetMOS.includes(mosCode));

    // 2. Broad 'Any' Matches (if we need to fill space, but usually we want specific ones first)
    const broad = RECRUITER_DB.filter(r => r.targetMOS.includes('Any') && !r.targetMOS.includes(mosCode));

    // Return unique combination, up to 10
    return [...exact, ...broad].slice(0, 10);
};
