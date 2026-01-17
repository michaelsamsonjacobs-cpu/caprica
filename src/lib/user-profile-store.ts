// User Profile Store
// Persists user data across pages using localStorage
// Connects explore survey results with resume builder

export interface SurveyData {
    name: string;
    email: string;
    interests: string[];
    hasASVAB: boolean;
    estimatedGT: number;
    completedAt?: string;
}

export interface MilitaryData {
    branch: string;
    rank: string;
    mos: string;
    yearsServed: string;
    separationDate: string;
    clearance: string;
}

export interface LinkedInData {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    skills: string[];
    experience: {
        title: string;
        company: string;
        duration: string;
        description: string;
    }[];
    education: {
        degree: string;
        institution: string;
        year: string;
    }[];
    certifications: string[];
}

export interface ResumeData {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    linkedin?: string;
    branch: string;
    rank: string;
    mos: string;
    yearsServed: string;
    separationDate: string;
    clearance: string;
    bullets: string[];
    certifications: string[];
    education: string;
    objective: string;
    // Target position for tailoring
    targetPosition?: {
        title: string;
        company?: string;
        requiredSkills: string[];
        description?: string;
    };
}

// High School / Recruit Resume Data
export interface ActivityEntry {
    type: 'jrotc' | 'sports' | 'club' | 'work' | 'volunteer' | 'other';
    name: string;
    role?: string;
    duration: string;
    description: string;
}

export interface HighSchoolResumeData {
    // Personal
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;

    // Education
    schoolName: string;
    graduationYear: string;
    gpa?: string;
    relevantCourses: string[];

    // Activities & Experience
    activities: ActivityEntry[];

    // Skills & Achievements
    skills: string[];
    achievements: string[];
    certifications: string[];
    languages: string[];

    // Military Interest
    asvabScore?: number;
    targetBranch?: string;
    targetMOS?: string;

    // Generated
    bullets: string[];
    objective: string;
}

export interface AssessmentResults {
    bullets: string[];
    matches: {
        category: string;
        match: number;
        roles: string[];
    }[];
    completedAt: string;
}

export interface UserProfile {
    survey?: SurveyData;
    military?: MilitaryData;
    linkedIn?: LinkedInData;
    resume?: ResumeData;
    recruitResume?: HighSchoolResumeData;
    assessmentResults?: AssessmentResults;
    leadSubmitted?: boolean;
    recommendedMOS?: {
        code: string;
        title: string;
        match: number;
    }[];
    updatedAt: string;
}

const STORAGE_KEY = 'caprica_user_profile';

// Get the full user profile
export function getUserProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error reading user profile:', e);
        return null;
    }
}

// Save the full user profile
export function saveUserProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return;
    try {
        profile.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
        console.error('Error saving user profile:', e);
    }
}

// Update just the survey data
export function saveSurveyData(survey: SurveyData): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.survey = { ...survey, completedAt: new Date().toISOString() };
    saveUserProfile(profile);
}

// Update just the military data
export function saveMilitaryData(military: MilitaryData): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.military = military;
    saveUserProfile(profile);
}

// Update LinkedIn data (from PDF parsing)
export function saveLinkedInData(linkedIn: LinkedInData): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.linkedIn = linkedIn;
    saveUserProfile(profile);
}

// Update resume data
export function saveResumeData(resume: ResumeData): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.resume = resume;
    saveUserProfile(profile);
}

// Save recommended MOS from explore page
export function saveRecommendedMOS(recommendations: { code: string; title: string; match: number }[]): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.recommendedMOS = recommendations;
    saveUserProfile(profile);
}

// Save assessment results
export function saveAssessmentResults(results: AssessmentResults): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.assessmentResults = results;
    saveUserProfile(profile);
}

// Save recruiter lead status
export function saveLeadStatus(submitted: boolean): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.leadSubmitted = submitted;
    saveUserProfile(profile);
}

// Clear all stored data
export function clearUserProfile(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

// Check if survey has been completed
export function hasSurveyData(): boolean {
    const profile = getUserProfile();
    return !!(profile?.survey?.completedAt);
}

// Check if LinkedIn data has been imported
export function hasLinkedInData(): boolean {
    const profile = getUserProfile();
    return !!(profile?.linkedIn?.name);
}

// Merge LinkedIn data with resume form
export function mergeLinkedInToResume(linkedIn: LinkedInData): Partial<ResumeData> {
    const [city, state] = (linkedIn.location || '').split(',').map(s => s.trim());
    return {
        name: linkedIn.name || '',
        email: linkedIn.email || '',
        phone: linkedIn.phone || '',
        city: city || '',
        state: state || '',
        certifications: linkedIn.certifications || [],
        education: linkedIn.education?.[0]?.degree
            ? `${linkedIn.education[0].degree} - ${linkedIn.education[0].institution}`
            : '',
        objective: linkedIn.summary || '',
    };
}

// Merge survey data with resume form
export function mergeSurveyToResume(survey: SurveyData): Partial<ResumeData> {
    return {
        name: survey.name || '',
        email: survey.email || '',
    };
}

// Update recruit resume data
export function saveRecruitResumeData(recruitResume: HighSchoolResumeData): void {
    const profile = getUserProfile() || { updatedAt: new Date().toISOString() };
    profile.recruitResume = recruitResume;
    saveUserProfile(profile);
}

// Merge survey data to recruit resume
export function mergeSurveyToRecruitResume(survey: SurveyData): Partial<HighSchoolResumeData> {
    return {
        name: survey.name || '',
        email: survey.email || '',
    };
}

export default {
    getUserProfile,
    saveUserProfile,
    saveSurveyData,
    saveMilitaryData,
    saveLinkedInData,
    saveResumeData,
    saveRecruitResumeData,
    saveRecommendedMOS,
    saveAssessmentResults,
    saveLeadStatus,
    clearUserProfile,
    hasSurveyData,
    hasLinkedInData,
    mergeLinkedInToResume,
    mergeSurveyToResume,
    mergeSurveyToRecruitResume,
};
