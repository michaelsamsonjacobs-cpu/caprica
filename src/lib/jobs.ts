// Real veteran job data loader
// Loads scraped jobs from data files

import { promises as fs } from 'fs';
import path from 'path';

export interface VeteranJob {
    id: string;
    title: string;
    company: string;
    location: string;
    source: string;
    veteranFriendly: boolean;
    salary?: string;
    clearance?: string;
    mosMatch?: string[];
    url?: string;
    scrapedAt: string;
}

// Clean up duplicated titles from scraping artifacts
function cleanTitle(title: string): string {
    // Some scraped titles are duplicated like "Park RangerPark Ranger"
    const len = title.length;
    if (len % 2 === 0) {
        const half = title.slice(0, len / 2);
        if (half === title.slice(len / 2)) {
            return half;
        }
    }
    return title;
}

// Load jobs from scraped JSON files
export async function loadVeteranJobs(): Promise<VeteranJob[]> {
    const dataDir = path.join(process.cwd(), 'data', 'positions', 'imports');
    const jobs: VeteranJob[] = [];

    try {
        // Load veteran jobs
        const veteranJobsPath = path.join(dataDir, 'veteran_jobs.json');
        const veteranJobsData = await fs.readFile(veteranJobsPath, 'utf-8');
        const veteranJobs = JSON.parse(veteranJobsData);

        for (let i = 0; i < veteranJobs.length; i++) {
            const job = veteranJobs[i];
            // Skip jobs with masked/asterisk data
            if (job.title.includes('*')) continue;

            jobs.push({
                id: `vet-${i}`,
                title: cleanTitle(job.title),
                company: job.company,
                location: job.location,
                source: job.source,
                veteranFriendly: true,
                scrapedAt: job.scrapedAt,
            });
        }

        // Load Jacobs jobs if available
        try {
            const jacobsPath = path.join(dataDir, 'jacobs_jobs.json');
            const jacobsData = await fs.readFile(jacobsPath, 'utf-8');
            const jacobsJobs = JSON.parse(jacobsData);

            for (let i = 0; i < jacobsJobs.length; i++) {
                const job = jacobsJobs[i];
                jobs.push({
                    id: `jacobs-${i}`,
                    title: cleanTitle(job.title || job.name),
                    company: 'Jacobs',
                    location: job.location || 'Various',
                    source: 'Jacobs',
                    veteranFriendly: true,
                    clearance: job.clearance,
                    scrapedAt: job.scrapedAt || new Date().toISOString(),
                });
            }
        } catch { }

    } catch (error) {
        console.error('Error loading jobs:', error);
    }

    return jobs;
}

// Match jobs based on user preferences
export function matchJobsToPreferences(
    jobs: VeteranJob[],
    preferences: {
        mos?: string;
        branch?: string;
        clearanceLevel?: string;
        preferredLocations?: string[];
        remoteOnly?: boolean;
    }
): VeteranJob[] {
    return jobs.filter(job => {
        // Location filter
        if (preferences.preferredLocations && preferences.preferredLocations.length > 0) {
            const hasMatch = preferences.preferredLocations.some(loc =>
                job.location.toLowerCase().includes(loc.toLowerCase())
            );
            // Don't filter out if no match - just prioritize later
        }

        // Clearance filter
        if (preferences.clearanceLevel && preferences.clearanceLevel !== 'None') {
            // Keep all jobs since most don't have clearance data
        }

        return true; // Return all for now, can add stricter filtering later
    });
}
