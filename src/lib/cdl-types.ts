// Candidate Profile Types for CDL Platform
// Focused on trucking/driving with CDL-specific fields

export interface CandidateProfile {
    // Basic Info
    id: string;
    email: string;
    name: string;
    phone?: string;
    location: {
        city: string;
        state: string;
        zip?: string;
    };

    // CDL Specific
    cdl: {
        class: 'A' | 'B' | 'C' | 'permit' | 'none';
        endorsements: CDLEndorsement[];
        restrictions: string[];
        expiresAt?: Date;
        state?: string;
    };

    // Experience
    experience: {
        years: number;
        totalMiles?: number;
        companies: PreviousEmployer[];
    };

    // Preferences
    preferences: {
        jobType: JobType[];
        minPay?: number;
        payType?: 'hourly' | 'salary' | 'perMile';
        homeTime: HomeTimePreference;
        maxAwayDays?: number;
        willingToRelocate: boolean;
        teamDriving?: boolean;
    };

    // Equipment Preferences
    equipment: {
        trailerTypes: TrailerType[];
        transmissionPref?: 'automatic' | 'manual' | 'either';
    };

    // Veteran Status
    veteran: {
        isVeteran: boolean;
        branch?: 'Army' | 'Navy' | 'Air Force' | 'Marines' | 'Coast Guard' | 'Space Force';
        mos?: string;
        dischargeYear?: number;
        serviceYears?: number;
    };

    // Safety & Compliance
    safety: {
        accidents3Years: number;
        violations3Years: number;
        dwi?: boolean;
        canPassDrugTest: boolean;
    };

    // Assessment Results
    assessments?: {
        aptitude?: {
            score: number;
            takenAt: Date;
        };
        safety?: {
            score: number;
            takenAt: Date;
        };
    };

    // Status
    status: 'active' | 'hired' | 'paused' | 'inactive';
    jobAlerts: boolean;
    alertFrequency: 'daily' | 'weekly' | 'instant';

    // Timestamps
    createdAt: Date;
    updatedAt: Date;
    lastActiveAt: Date;
}

export type CDLEndorsement =
    | 'H' // Hazmat
    | 'N' // Tank
    | 'P' // Passenger
    | 'S' // School Bus
    | 'T' // Double/Triple Trailers
    | 'X'; // Hazmat + Tank combo

export type JobType =
    | 'OTR'
    | 'Regional'
    | 'Local'
    | 'Dedicated'
    | 'LTL'
    | 'Dry Van'
    | 'Flatbed'
    | 'Reefer'
    | 'Tanker'
    | 'Hazmat'
    | 'Team'
    | 'Owner Operator';

export type HomeTimePreference =
    | 'daily'      // Home every day
    | 'weekly'     // Home weekends
    | 'biweekly'   // Home every 2 weeks
    | 'monthly'    // Home once a month
    | 'flexible';  // Don't care

export type TrailerType =
    | 'Dry Van'
    | 'Reefer'
    | 'Flatbed'
    | 'Tanker'
    | 'Auto Carrier'
    | 'Livestock'
    | 'Hopper'
    | 'Lowboy';

export interface PreviousEmployer {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    current?: boolean;
    reasonLeft?: string;
}

// Job types
export interface CDLJob {
    id: string;
    source: string;
    sourceId?: string;

    // Basic
    title: string;
    company: string;
    location: string;
    description: string;
    url?: string;

    // Requirements
    cdlClass: 'A' | 'B' | 'C';
    endorsements?: CDLEndorsement[];
    minExperience?: number; // years

    // Compensation
    payType: 'perMile' | 'hourly' | 'salary' | 'percentage';
    payMin?: number;
    payMax?: number;
    payUnit?: string; // "per mile", "per hour", etc.
    signingBonus?: number;

    // Job Details
    jobType: JobType;
    trailerType?: TrailerType;
    homeTime?: HomeTimePreference;
    averageMilesWeek?: number;

    // Benefits
    benefits?: string[];

    // Veteran
    veteranFriendly?: boolean;

    // Status
    status: 'active' | 'filled' | 'expired';
    postedAt: Date;
    expiresAt?: Date;

    // Scraped metadata
    scrapedAt: Date;
}

// Match result
export interface CDLMatch {
    candidateId: string;
    jobId: string;

    overallScore: number;

    breakdown: {
        cdlMatch: number;        // CDL class + endorsements
        experienceMatch: number; // Years of experience
        locationMatch: number;   // Proximity to job
        payMatch: number;        // Meets pay expectations
        homeTimeMatch: number;   // Home time preferences
        equipmentMatch: number;  // Trailer type experience
    };

    matchedAt: Date;
    viewed: boolean;
    applied: boolean;
    savedByCandidate: boolean;
}

// Scoring weights for CDL matching
export const CDL_MATCH_WEIGHTS = {
    cdlMatch: 0.25,        // Must have right CDL
    experienceMatch: 0.20, // Experience matters
    locationMatch: 0.15,   // Practical consideration
    payMatch: 0.20,        // Compensation alignment
    homeTimeMatch: 0.15,   // Lifestyle fit
    equipmentMatch: 0.05,  // Nice to have
};

// Utility functions
export function calculateCDLMatch(
    candidate: CandidateProfile,
    job: CDLJob
): number {
    let score = 0;

    // CDL Class Match (must have or higher)
    const cdlOrder = ['none', 'permit', 'C', 'B', 'A'];
    const candidateCDL = cdlOrder.indexOf(candidate.cdl.class);
    const jobCDL = cdlOrder.indexOf(job.cdlClass);

    if (candidateCDL >= jobCDL) {
        score += CDL_MATCH_WEIGHTS.cdlMatch * 100;
    } else {
        // Critical mismatch - reduce score significantly
        score -= 20;
    }

    // Endorsement match
    if (job.endorsements) {
        const hasAll = job.endorsements.every(e =>
            candidate.cdl.endorsements.includes(e)
        );
        if (!hasAll) {
            score -= 15; // Missing required endorsements
        }
    }

    // Experience match
    const expRequired = job.minExperience || 0;
    if (candidate.experience.years >= expRequired) {
        score += CDL_MATCH_WEIGHTS.experienceMatch * 100;
    } else {
        const ratio = candidate.experience.years / Math.max(expRequired, 1);
        score += CDL_MATCH_WEIGHTS.experienceMatch * ratio * 100;
    }

    // Pay match
    if (candidate.preferences.minPay && job.payMin) {
        if (job.payMin >= candidate.preferences.minPay) {
            score += CDL_MATCH_WEIGHTS.payMatch * 100;
        } else {
            const ratio = job.payMin / candidate.preferences.minPay;
            score += CDL_MATCH_WEIGHTS.payMatch * ratio * 100;
        }
    } else {
        score += CDL_MATCH_WEIGHTS.payMatch * 50; // Neutral
    }

    // Home time match
    const homeTimePref = candidate.preferences.homeTime;
    const jobHomeTime = job.homeTime;

    const homeTimeScore = getHomeTimeCompatibility(homeTimePref, jobHomeTime);
    score += CDL_MATCH_WEIGHTS.homeTimeMatch * homeTimeScore;

    // Location (simplified - would use actual geo calculation)
    score += CDL_MATCH_WEIGHTS.locationMatch * 70; // Default reasonable

    // Equipment match
    if (job.trailerType && candidate.equipment.trailerTypes.includes(job.trailerType)) {
        score += CDL_MATCH_WEIGHTS.equipmentMatch * 100;
    } else {
        score += CDL_MATCH_WEIGHTS.equipmentMatch * 50;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
}

function getHomeTimeCompatibility(
    pref: HomeTimePreference | undefined,
    job: HomeTimePreference | undefined
): number {
    if (!pref || !job || pref === 'flexible') return 80;

    const order = ['daily', 'weekly', 'biweekly', 'monthly'];
    const prefIndex = order.indexOf(pref);
    const jobIndex = order.indexOf(job);

    if (jobIndex <= prefIndex) {
        return 100; // Job offers same or better home time
    } else {
        const diff = jobIndex - prefIndex;
        return Math.max(20, 100 - (diff * 30));
    }
}
