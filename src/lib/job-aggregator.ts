import { searchJobs, JSearchJob } from './jsearch-service';
export { searchJobs };

export interface AggregatedJob {
    id: string;
    title: string;
    company: string;
    location: string;
    logo?: string;
    description: string;
    postedAt: string;
    applyUrl: string;
    // Caprica Enriched Data
    recommendedMOS: string[];
    clearanceLevel?: string;
    // UI Helpers
    mosMatch?: string[];
    clearance?: string;
    veteranPreference?: boolean;
    remote?: boolean;
    salary?: string;
}

// Simple keyword mapping for Auto-Tagging
export const MOS_KEYWORDS: Record<string, string[]> = {
    '17C': ['cyber', 'security', 'infosec', 'network defense', 'hacker', 'penetration', 'forensics', 'digital'],
    '11B': ['security', 'protection', 'police', 'guard', 'defense', 'patrol', 'surveillance', 'tactical'],
    '35F': ['analyst', 'intelligence', 'clearance', 'top secret', 'ts/sci', 'threat', 'reporting', 'geospatial'],
    '25B': ['help desk', 'it specialist', 'network admin', 'system admin', 'technical support', 'cloud', 'infrastructure'],
    '68W': ['medical', 'emt', 'paramedic', 'healthcare', 'nurse', 'emergency', 'care', 'first aid', 'clinical'],
    '92G': ['culinary', 'cook', 'food', 'nutrition', 'chef', 'management', 'hospitality'],
    '88M': ['logistics', 'driver', 'transportation', 'fleet', 'delivery', 'supply chain', 'warehouse'],
    '31B': ['law enforcement', 'security', 'patrol', 'safety', 'compliance', 'investigation', 'private police']
};

function autoTagMOS(title: string, description: string): string[] {
    const text = (title.toLowerCase() + " " + description.toLowerCase());
    const matches = new Set<string>();

    for (const [mos, keywords] of Object.entries(MOS_KEYWORDS)) {
        if (keywords.some(k => text.includes(k.toLowerCase()))) {
            matches.add(mos);
        }
    }

    // Default tag for all jobs to ensure they show up in broad searches
    if (matches.size === 0) matches.add('Any');

    return Array.from(matches);
}

function detectClearance(text: string): string | undefined {
    const t = text.toLowerCase();
    if (t.includes('ts/sci') || t.includes('top secret') || t.includes('sci-eligible')) return 'TS/SCI';
    if (t.includes('secret') || t.includes('clearance required') || t.includes('adjudicat')) return 'Secret';
    return undefined;
}

export async function runJobIngestion(queries: string[]): Promise<AggregatedJob[]> {
    const allJobs: AggregatedJob[] = [];

    for (const query of queries) {
        try {
            const response = await searchJobs(query);
            const enriched: AggregatedJob[] = response.data.map(job => ({
                id: job.job_id,
                title: job.job_title,
                company: job.employer_name,
                location: `${job.job_city || ''}, ${job.job_state || ''}`.replace(/^, /, ''),
                logo: job.employer_logo,
                description: job.job_description,
                postedAt: job.job_posted_at_datetime_utc,
                applyUrl: job.job_apply_link,
                recommendedMOS: autoTagMOS(job.job_title, job.job_description),
                clearanceLevel: detectClearance(job.job_description)
            }));

            allJobs.push(...enriched);
        } catch (error) {
            console.error(`Failed to ingest query "${query}":`, error);
        }
    }

    return allJobs;
}
