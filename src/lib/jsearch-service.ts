import { MOS_KEYWORDS } from './job-aggregator';
import { MOCK_JOBS_DB } from './mock-jobs-database';

export interface JSearchJob {
    job_id: string;
    employer_name: string;
    employer_logo?: string;
    employer_website?: string; // Added
    job_publisher?: string; // Added
    job_employment_type?: string; // Added
    job_title: string;
    job_description: string;
    job_is_remote: boolean;
    job_city?: string;
    job_state?: string;
    job_country?: string; // Added
    job_latitude?: number; // Added
    job_longitude?: number; // Added
    job_benefits?: string[]; // Added
    job_google_link?: string; // Added
    job_offer_expiration_datetime_utc?: string; // Added
    job_required_experience?: { // Added
        no_experience_required: boolean;
        required_experience_in_months: number;
        experience_mentioned: boolean;
        experience_preferred: boolean;
    };
    job_naics_code?: string; // Added
    job_naics_name?: string; // Added
    job_posted_at_datetime_utc: string;
    job_apply_link: string;
}

export interface JSearchResponse {
    status: string;
    request_id: string;
    parameters?: { query: string; page: number; num_pages: number; }; // Added
    data: JSearchJob[];
}

// MOCK_JOBS constant removed as per instruction

export async function searchJobs(query: string, numCode: string = '1'): Promise<JSearchResponse> {
    // Smart check: Use mock if explicitly requested OR if no API key is present
    const hasApiKey = !!process.env.RAPIDAPI_KEY;
    const forceMock = process.env.NEXT_PUBLIC_USE_MOCK_JSEARCH === 'true';
    const isMock = forceMock || !hasApiKey;

    if (!isMock && !hasApiKey) {
        console.warn("⚠️ JSearch Service: No RAPIDAPI_KEY found. Falling back to mock data implicitly.");
    }

    console.log(`🔧 JSearch Service Initialized: Mode=${isMock ? 'MOCK' : 'LIVE'} (ForceMock=${forceMock}, HasKey=${hasApiKey})`);

    if (isMock) {
        console.log(`🔍 [MOCK] JSearch Query: "${query}"`);
        // Return 50+ rich mock jobs

        // Convert internal mock DB structure to JSearch API structure
        const mockData: JSearchJob[] = MOCK_JOBS_DB.map(job => ({
            job_id: job.job_id,
            job_title: job.job_title,
            employer_name: job.employer_name,
            employer_logo: job.employer_logo || 'https://via.placeholder.com/150',
            employer_website: job.job_apply_link,
            job_publisher: "LinkedIn",
            job_employment_type: "FULLTIME",
            job_apply_link: job.job_apply_link,
            job_description: job.job_description,
            job_is_remote: false,
            job_posted_at_datetime_utc: job.job_posted_at_datetime_utc,
            job_city: job.job_city,
            job_state: job.job_state,
            job_country: "US",
            job_latitude: 0,
            job_longitude: 0,
            job_benefits: [],
            job_google_link: "",
            job_offer_expiration_datetime_utc: new Date(Date.now() + 86400000).toISOString(),
            job_required_experience: {
                no_experience_required: false,
                required_experience_in_months: 24,
                experience_mentioned: true,
                experience_preferred: true
            },
            job_naics_code: "541512",
            job_naics_name: "Computer Systems Design Services"
        }));

        return {
            status: "OK",
            request_id: "mock-req-123",
            parameters: { query, page: 1, num_pages: 1 },
            data: mockData
        };
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) throw new Error("RAPIDAPI_KEY is missing via env variables");

    const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${numCode}&num_pages=1`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    });

    if (!response.ok) {
        throw new Error(`JSearch API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
