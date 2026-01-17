'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTranslation } from '@/lib/mos-translations';
import Header from '@/components/Header';
import RecruitResumeBuilder from '@/components/RecruitResumeBuilder';
import {
    getUserProfile,
    saveResumeData,
    saveRecruitResumeData,
    mergeLinkedInToResume,
    mergeSurveyToResume,
    hasSurveyData,
    hasLinkedInData,
    type UserProfile,
    type ResumeData as ProfileResumeData,
    type HighSchoolResumeData
} from '@/lib/user-profile-store';

interface ResumeData {
    // Personal
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    linkedin?: string;
    // Military
    branch: string;
    rank: string;
    mos: string;
    yearsServed: string;
    separationDate: string;
    clearance: string;
    // Experience bullets
    bullets: string[];
    // Certifications
    certifications: string[];
    // Education
    education: string;
    // Objective
    objective: string;
}

// Template-based bullet generators
const BULLET_TEMPLATES = {
    leadership: [
        'Led cross-functional team of {count} personnel in mission-critical operations with 100% accountability',
        'Supervised and mentored {count} personnel, ensuring professional development and mission readiness',
        'Managed daily operations for team of {count}, achieving unit objectives ahead of schedule',
    ],
    accountability: [
        'Maintained accountability for ${value} in equipment and supplies with zero loss or discrepancies',
        'Managed inventory valued at ${value}, conducting regular audits and maintaining accurate records',
        'Oversaw property book valued at ${value}, ensuring full accountability during multiple inspections',
    ],
    training: [
        'Developed and delivered training programs for {count} personnel, improving team proficiency by {percent}%',
        'Trained and certified {count} soldiers on equipment operation and safety procedures',
        'Created SOPs and training materials adopted across the organization',
    ],
    operations: [
        'Coordinated logistics for operations supporting {count}+ personnel in austere environments',
        'Planned and executed missions with zero safety incidents across {count} operations',
        'Managed 24/7 operations center, processing {count}+ daily communications',
    ],
    technical: [
        'Maintained {count} vehicle/equipment fleet at 95%+ operational readiness',
        'Performed preventive maintenance and repairs on systems valued at ${value}',
        'Troubleshot and resolved technical issues, reducing downtime by {percent}%',
    ],
};

const TEMPLATES = [
    { id: 'professional', name: 'Professional', description: 'Clean and corporate-friendly' },
    { id: 'federal', name: 'Federal/GS', description: 'USAJobs and federal resume format' },
    { id: 'technical', name: 'Technical', description: 'Skills-focused for IT/Engineering' },
];

export default function ResumeBuilderPage() {
    const router = useRouter();
    const [step, setStep] = useState(0); // Start at step 0 (import)
    const [resumeType, setResumeType] = useState<'veteran' | 'recruit' | null>(null);
    const [template, setTemplate] = useState('professional');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [importSource, setImportSource] = useState<'none' | 'survey' | 'linkedin' | 'manual'>('none');
    const [isLoading, setIsLoading] = useState(true);
    const [linkedInFile, setLinkedInFile] = useState<File | null>(null);
    const [isParsingLinkedIn, setIsParsingLinkedIn] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const [data, setData] = useState<ResumeData>({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        branch: '',
        rank: '',
        mos: '',
        yearsServed: '',
        separationDate: '',
        clearance: '',
        bullets: [],
        certifications: [],
        education: '',
        objective: '',
    });
    const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    // Load saved profile data on mount
    useEffect(() => {
        const profile = getUserProfile();
        setUserProfile(profile);

        // If we have survey data, pre-select that import source
        if (profile?.survey?.completedAt) {
            setImportSource('survey');
        }

        // If we have saved resume data, pre-fill the form
        if (profile?.resume) {
            setData(prev => ({
                ...prev,
                name: profile.resume?.name || prev.name,
                email: profile.resume?.email || prev.email,
                phone: profile.resume?.phone || prev.phone,
                city: profile.resume?.city || prev.city,
                state: profile.resume?.state || prev.state,
                branch: profile.resume?.branch || prev.branch,
                rank: profile.resume?.rank || prev.rank,
                mos: profile.resume?.mos || prev.mos,
                yearsServed: profile.resume?.yearsServed || prev.yearsServed,
                separationDate: profile.resume?.separationDate || prev.separationDate,
                clearance: profile.resume?.clearance || prev.clearance,
                certifications: profile.resume?.certifications || prev.certifications,
                education: profile.resume?.education || prev.education,
                objective: profile.resume?.objective || prev.objective,
            }));
            if (profile.resume.bullets?.length) {
                setGeneratedBullets(profile.resume.bullets);
            }
        }

        setIsLoading(false);
    }, []);

    // Import data from survey
    const importFromSurvey = () => {
        if (!userProfile?.survey) return;

        const surveyData = mergeSurveyToResume(userProfile.survey);
        setData(prev => ({
            ...prev,
            ...surveyData,
        }));
        setImportSource('survey');
        setStep(1);
    };

    // Handle LinkedIn PDF upload
    const handleLinkedInUpload = async (file: File) => {
        setLinkedInFile(file);
        setIsParsingLinkedIn(true);

        try {
            // Create FormData to send the file
            const formData = new FormData();
            formData.append('resume', file);

            // Call API to parse the PDF/text
            const response = await fetch('/api/resume/parse', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                const parsed = result.data;
                const linkedInData = {
                    name: parsed.name || '',
                    email: parsed.email || '',
                    phone: parsed.phone || '',
                    location: parsed.location || '',
                    summary: parsed.summary || '',
                    skills: parsed.skills || [],
                    experience: parsed.experience || [],
                    education: parsed.education || [],
                    certifications: parsed.certifications || [],
                };

                const mergedData = mergeLinkedInToResume(linkedInData);
                setData(prev => ({
                    ...prev,
                    ...mergedData,
                }));
                setImportSource('linkedin');
                setStep(1);
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Failed to parse LinkedIn data. Please try again or enter manually.');
            }
        } catch (error) {
            console.error('Error parsing LinkedIn:', error);
            alert('Error reading file. Please try again or enter manually.');
        } finally {
            setIsParsingLinkedIn(false);
        }
    };

    // Start fresh (manual entry)
    const startManual = () => {
        setImportSource('manual');
        setStep(1);
    };

    // Generate PDF for recruit resume
    const generateRecruitPDF = (recruitData: HighSchoolResumeData): string => {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>${recruitData.name || 'Resume'} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Georgia', 'Times New Roman', serif; 
            line-height: 1.5; 
            color: #1a1a1a;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { font-size: 24px; margin-bottom: 4px; }
        .header p { font-size: 11px; color: #444; }
        h2 { font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #666; margin: 16px 0 8px; padding-bottom: 4px; letter-spacing: 1px; }
        .section { margin-bottom: 16px; }
        ul { margin-left: 20px; font-size: 11px; }
        li { margin-bottom: 4px; }
        .skills { font-size: 11px; }
        @media print {
            body { padding: 0.25in; }
            @page { margin: 0.5in; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${recruitData.name || 'Your Name'}</h1>
        <p>${[recruitData.city, recruitData.state].filter(Boolean).join(', ')} | ${recruitData.phone || ''} | ${recruitData.email || ''}</p>
    </div>

    <section class="section">
        <h2>Objective</h2>
        <p style="font-size: 11px;">${recruitData.objective}</p>
    </section>

    <section class="section">
        <h2>Education</h2>
        <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <strong>${recruitData.schoolName}</strong>
            <span>Expected ${recruitData.graduationYear}</span>
        </div>
        ${recruitData.gpa ? `<p style="font-size: 11px;">GPA: ${recruitData.gpa}</p>` : ''}
        ${recruitData.relevantCourses.length > 0 ? `<p style="font-size: 11px;">Relevant Coursework: ${recruitData.relevantCourses.join(', ')}</p>` : ''}
    </section>

    ${recruitData.bullets.length > 0 ? `
    <section class="section">
        <h2>Leadership & Activities</h2>
        <ul>
            ${recruitData.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>
    </section>
    ` : ''}

    ${(recruitData.skills.length > 0 || recruitData.certifications.length > 0) ? `
    <section class="section">
        <h2>Skills & Certifications</h2>
        <p class="skills">
            ${[...recruitData.skills, ...recruitData.certifications].join(' • ')}
            ${recruitData.languages.length > 0 ? ` • Languages: ${recruitData.languages.join(', ')}` : ''}
        </p>
    </section>
    ` : ''}
</body>
</html>`;
    };

    const mosTranslation = data.mos ? getTranslation(data.mos) : null;

    const generateBullets = () => {
        const bullets: string[] = [];

        // Add MOS-specific skills if available
        if (mosTranslation) {
            bullets.push(`Served as ${mosTranslation.title} (${mosTranslation.code}) in the U.S. ${data.branch}, specializing in ${mosTranslation.careerField.toLowerCase()} operations`);

            // Add transferable skills
            const skills = mosTranslation.transferableSkills.slice(0, 3).join(', ');
            bullets.push(`Demonstrated expertise in ${skills}`);
        }

        // Add generic leadership bullets based on rank
        if (['SSG', 'SFC', 'MSG', '1SG', 'SGM', 'E-6', 'E-7', 'E-8', 'E-9'].some(r => data.rank.includes(r))) {
            bullets.push('Led and mentored team of 10+ personnel, ensuring mission readiness and professional development');
            bullets.push('Conducted performance evaluations and maintained documentation for personnel actions');
        }

        // Equipment accountability
        bullets.push('Maintained 100% accountability for assigned equipment and resources valued at $1M+');

        // Training
        bullets.push('Developed and delivered training programs, improving team proficiency and operational effectiveness');

        // Mission execution
        bullets.push('Planned and executed complex operations in high-pressure environments with zero safety incidents');

        // Clearance if applicable
        if (data.clearance && data.clearance !== 'none') {
            bullets.push(`Held active ${data.clearance.toUpperCase()} security clearance with proven ability to handle classified information`);
        }

        setGeneratedBullets(bullets);
        setData({ ...data, bullets });
    };

    const addCertification = (cert: string) => {
        if (cert && !data.certifications.includes(cert)) {
            setData({ ...data, certifications: [...data.certifications, cert] });
        }
    };

    const removeCertification = (cert: string) => {
        setData({ ...data, certifications: data.certifications.filter(c => c !== cert) });
    };

    const exportToPDF = () => {
        // Generate clean HTML for PDF export
        const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>${data.name || 'Resume'} - Military Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Georgia', 'Times New Roman', serif; 
            line-height: 1.5; 
            color: #1a1a1a;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
        }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 12px; margin-bottom: 16px; }
        .header h1 { font-size: 24px; margin-bottom: 4px; }
        .header p { font-size: 11px; color: #444; }
        .clearance { color: #0066cc; font-weight: 600; font-size: 11px; margin-top: 4px; }
        h2 { font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #666; margin: 16px 0 8px; padding-bottom: 4px; letter-spacing: 1px; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
        .job-title { font-weight: bold; }
        .job-date { font-size: 11px; color: #666; }
        .job-org { font-size: 11px; color: #444; margin-bottom: 8px; }
        ul { margin-left: 20px; font-size: 11px; }
        li { margin-bottom: 4px; }
        .skills { font-size: 11px; }
        .certs { font-size: 11px; }
        @media print {
            body { padding: 0.25in; }
            @page { margin: 0.5in; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${data.name || 'Your Name'}</h1>
        <p>${[data.city, data.state].filter(Boolean).join(', ')} | ${data.phone || ''} | ${data.email || ''}${data.linkedin ? ` | ${data.linkedin}` : ''}</p>
        ${data.clearance && data.clearance !== 'none' ? `<p class="clearance">Active ${data.clearance} Security Clearance</p>` : ''}
    </div>

    ${data.objective ? `
    <section>
        <h2>Objective</h2>
        <p style="font-size: 11px;">${data.objective}</p>
    </section>
    ` : ''}

    <section>
        <h2>Professional Experience</h2>
        <div class="job-header">
            <span class="job-title">${mosTranslation?.title || data.mos || 'Military Professional'}</span>
            <span class="job-date">${data.yearsServed ? `${data.yearsServed} years` : ''}</span>
        </div>
        <div class="job-org">U.S. ${data.branch || 'Military'} | ${data.rank || ''}</div>
        <ul>
            ${generatedBullets.map(bullet => `<li>${bullet}</li>`).join('\n')}
        </ul>
    </section>

    ${data.education ? `
    <section>
        <h2>Education</h2>
        <p style="font-size: 11px;">${data.education}</p>
    </section>
    ` : ''}
</body>
</html>`;

        // Open new window and print
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(resumeHTML);
            printWindow.document.close();
            printWindow.focus();

            // Delay print to allow styles to load
            setTimeout(() => {
                printWindow.print();
            }, 250);
        } else {
            alert('Please allow popups to export your resume as PDF.');
        }

        // Save resume data to profile
        saveResumeData({
            ...data,
            bullets: generatedBullets,
        } as ProfileResumeData);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const handleSaveToProfile = () => {
        setSaveStatus('saving');
        saveResumeData({
            ...data,
            bullets: generatedBullets,
        } as ProfileResumeData);
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header variant="minimal" backLink={{ href: '/veterans', label: 'Back' }} />

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-brand-navy mb-2">Military Resume Builder</h1>
                        <p className="text-gray-600">Translate your military experience into civilian terms</p>
                    </div>

                    {/* Progress Steps */}
                    {step > 0 && (
                        <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
                            {['Info', 'Service', 'Bullets', 'Preview'].map((s, i) => (
                                <button
                                    key={s}
                                    onClick={() => setStep(i + 1)}
                                    className={`flex items - center gap - 2 px - 3 sm: px - 4 py - 2 rounded - lg text - sm transition - all ${step === i + 1 ? 'bg-brand-navy text-white font-semibold shadow-md' :
                                        step > i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                                        } `}
                                >
                                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                                        {step > i + 1 ? '✓' : i + 1}
                                    </span>
                                    <span className="hidden sm:inline">{s}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
                            <p className="text-slate-400">Loading your data...</p>
                        </div>
                    )}

                    {/* Step 0: User Type Selection & Import Data */}
                    {!isLoading && step === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            {/* User Type Selection */}
                            {!resumeType && (
                                <>
                                    <h2 className="text-xl font-bold text-brand-navy mb-2">Who Are You?</h2>
                                    <p className="text-gray-500 mb-8">We'll customize your resume experience</p>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <button
                                            onClick={() => setResumeType('veteran')}
                                            className="p-8 rounded-xl border-2 bg-white border-gray-100 hover:border-brand-navy hover:shadow-md text-left transition-all group"
                                        >
                                            <div className="text-4xl mb-4">🎖️</div>
                                            <h3 className="font-bold text-brand-navy text-xl mb-2">I'm a Veteran</h3>
                                            <p className="text-gray-600">
                                                Placing into a civilian career. Translate your military experience.
                                            </p>
                                            <div className="mt-4 text-brand-navy font-semibold group-hover:translate-x-1 transition-transform">
                                                Build My Resume →
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setResumeType('recruit')}
                                            className="p-8 rounded-xl border-2 bg-white border-gray-100 hover:border-brand-gold hover:shadow-md text-left transition-all group"
                                        >
                                            <div className="text-4xl mb-4">🎓</div>
                                            <h3 className="font-bold text-brand-navy text-xl mb-2">High School / Recruit</h3>
                                            <p className="text-gray-600">
                                                Preparing for military service. Build your first resume.
                                            </p>
                                            <div className="mt-4 text-brand-gold font-semibold group-hover:translate-x-1 transition-transform">
                                                Build My First Resume →
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Veteran Import Options */}
                            {resumeType === 'veteran' && (
                                <>
                                    <div className="flex items-center gap-2 mb-6">
                                        <button onClick={() => setResumeType(null)} className="text-gray-500 hover:text-brand-navy font-bold">← Back</button>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-brand-navy font-bold">🎖️ Veteran Resume</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-navy mb-2">Import Your Data</h2>
                                    <p className="text-gray-600 mb-8 font-medium">Start faster by importing your existing information or enter manually.</p>

                                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                                        {/* Survey Import */}
                                        <button
                                            onClick={importFromSurvey}
                                            disabled={!userProfile?.survey?.completedAt}
                                            className={`p - 8 rounded - xl border text - left transition - all ${userProfile?.survey?.completedAt
                                                ? 'bg-white border-green-500 shadow-sm hover:shadow-md'
                                                : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                                                } `}
                                        >
                                            <div className="text-3xl mb-4">📊</div>
                                            <h3 className="font-bold text-brand-navy mb-2">From Career Survey</h3>
                                            <p className="text-sm text-gray-600">
                                                {userProfile?.survey?.completedAt
                                                    ? `Import data from your completed survey`
                                                    : 'Complete the career survey first'}
                                            </p>
                                            {userProfile?.survey?.completedAt && (
                                                <span className="inline-block mt-3 text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200">
                                                    ✓ COMPLETED
                                                </span>
                                            )}
                                        </button>

                                        {/* LinkedIn Import */}
                                        <label
                                            className="p-8 rounded-xl border-2 bg-white border-blue-100 hover:border-brand-navy hover:shadow-md text-left cursor-pointer transition-all"
                                        >
                                            <div className="text-3xl mb-4">💼</div>
                                            <h3 className="font-bold text-brand-navy mb-2">From LinkedIn</h3>
                                            <p className="text-sm text-gray-600">
                                                Upload your LinkedIn PDF export
                                            </p>
                                            <input
                                                type="file"
                                                accept=".pdf,.txt"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleLinkedInUpload(file);
                                                }}
                                                className="hidden"
                                            />
                                            {isParsingLinkedIn && (
                                                <span className="inline-block mt-3 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200 animate-pulse">
                                                    PARSING...
                                                </span>
                                            )}
                                        </label>

                                        {/* Manual Entry */}
                                        <button
                                            onClick={startManual}
                                            className="p-8 rounded-xl border-2 bg-white border-gray-100 hover:border-brand-gold hover:shadow-md text-left transition-all group"
                                        >
                                            <div className="text-3xl mb-4">✏️</div>
                                            <h3 className="font-bold text-brand-navy mb-2">Start Fresh</h3>
                                            <p className="text-sm text-gray-600">
                                                Enter your information manually
                                            </p>
                                            <div className="mt-4 text-brand-gold font-semibold group-hover:translate-x-1 transition-transform">
                                                Go →
                                            </div>
                                        </button>
                                    </div>

                                    {/* MOS Recommendations from Survey */}
                                    {userProfile?.recommendedMOS && userProfile.recommendedMOS.length > 0 && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8 shadow-inner">
                                            <h4 className="text-sm font-bold text-brand-navy mb-3 uppercase tracking-wider">Your Top MOS Matches</h4>
                                            <div className="flex flex-wrap gap-3">
                                                {userProfile.recommendedMOS.slice(0, 4).map(mos => (
                                                    <span key={mos.code} className="px-4 py-2 bg-white border border-brand-gold/30 text-brand-navy rounded-lg text-sm font-semibold shadow-sm">
                                                        <span className="text-brand-gold">{mos.code}</span> • {mos.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Help Text */}
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                                        <h4 className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-2">
                                            <span className="text-lg">💡</span> How to export from LinkedIn
                                        </h4>
                                        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-2">
                                            <li>Go to LinkedIn → Settings → Data privacy</li>
                                            <li>Click "Get a copy of your data"</li>
                                            <li>Download and upload the PDF here</li>
                                        </ol>
                                    </div>
                                </>
                            )}

                            {/* Recruit Resume Builder */}
                            {resumeType === 'recruit' && (
                                <RecruitResumeBuilder
                                    initialData={userProfile?.survey ? {
                                        name: userProfile.survey.name,
                                        email: userProfile.survey.email,
                                    } : undefined}
                                    onComplete={(recruitData) => {
                                        saveRecruitResumeData(recruitData);
                                        // Generate PDF
                                        const resumeHTML = generateRecruitPDF(recruitData);
                                        const printWindow = window.open('', '_blank');
                                        if (printWindow) {
                                            printWindow.document.write(resumeHTML);
                                            printWindow.document.close();
                                            printWindow.focus();
                                            setTimeout(() => printWindow.print(), 250);
                                        }
                                    }}
                                    onBack={() => setResumeType(null)}
                                />
                            )}
                        </div>
                    )}

                    {/* Step 1: Personal Info (Veterans only) */}
                    {resumeType === 'veteran' && step === 1 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-brand-navy mb-6">Personal Information</h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData({ ...data, name: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={e => setData({ ...data, phone: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn (optional)</label>
                                    <input
                                        type="text"
                                        value={data.linkedin || ''}
                                        onChange={e => setData({ ...data, linkedin: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="linkedin.com/in/johnsmith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData({ ...data, city: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="San Diego"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={e => setData({ ...data, state: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="CA"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button onClick={() => setStep(2)} className="px-6 py-2 bg-brand-navy text-white rounded-lg font-bold hover:bg-brand-navy-dark transition-all shadow-md">
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Military Service */}
                    {resumeType === 'veteran' && step === 2 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-brand-navy mb-6">Military Service</h2>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Branch</label>
                                    <select
                                        value={data.branch}
                                        onChange={e => setData({ ...data, branch: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                    >
                                        <option value="">Select</option>
                                        <option value="Army">Army</option>
                                        <option value="Navy">Navy</option>
                                        <option value="Air Force">Air Force</option>
                                        <option value="Marines">Marine Corps</option>
                                        <option value="Coast Guard">Coast Guard</option>
                                        <option value="Space Force">Space Force</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rank at Separation</label>
                                    <input
                                        type="text"
                                        value={data.rank}
                                        onChange={e => setData({ ...data, rank: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="e.g., E-5, SSG, Captain"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Primary MOS/Rate/AFSC</label>
                                    <input
                                        type="text"
                                        value={data.mos}
                                        onChange={e => setData({ ...data, mos: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="e.g., 11B, 17C, OS"
                                    />
                                    {mosTranslation && (
                                        <p className="text-green-600 text-sm mt-1 font-semibold">✓ {mosTranslation.title}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Years of Service</label>
                                    <input
                                        type="text"
                                        value={data.yearsServed}
                                        onChange={e => setData({ ...data, yearsServed: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="e.g., 4, 6, 20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Security Clearance</label>
                                    <select
                                        value={data.clearance}
                                        onChange={e => setData({ ...data, clearance: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                    >
                                        <option value="">Select</option>
                                        <option value="none">None</option>
                                        <option value="Secret">Secret</option>
                                        <option value="Top Secret">Top Secret</option>
                                        <option value="TS/SCI">TS/SCI</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Education</label>
                                    <input
                                        type="text"
                                        value={data.education}
                                        onChange={e => setData({ ...data, education: e.target.value })}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                        placeholder="e.g., Some College, Bachelor's"
                                    />
                                </div>
                            </div>

                            {/* Certifications */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-gray-700 mb-3">Certifications</label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {data.certifications.map(cert => (
                                        <span key={cert} className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm flex items-center gap-2 font-medium">
                                            {cert}
                                            <button onClick={() => removeCertification(cert)} className="text-green-400 hover:text-green-600">×</button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {['Security+', 'Network+', 'A+', 'CDL', 'NREMT', 'PMP', 'AWS Certified'].map(cert => (
                                        <button
                                            key={cert}
                                            onClick={() => addCertification(cert)}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            + {cert}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button onClick={() => setStep(1)} className="text-gray-500 hover:text-brand-navy font-medium">← Back</button>
                                <button
                                    onClick={() => { generateBullets(); setStep(3); }}
                                    className="px-8 py-2 bg-brand-gold text-white rounded-lg font-bold hover:bg-brand-gold-light transition-all shadow-md"
                                >
                                    Generate Bullets →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Experience Bullets */}
                    {resumeType === 'veteran' && step === 3 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-brand-navy mb-2">Experience Bullets</h2>
                            <p className="text-gray-500 text-sm mb-8">Edit or add bullets to describe your experience in civilian terms</p>

                            <div className="space-y-4 mb-8">
                                {generatedBullets.map((bullet, i) => (
                                    <div key={i} className="flex gap-3">
                                        <span className="text-brand-gold mt-2 font-bold">•</span>
                                        <textarea
                                            value={bullet}
                                            onChange={e => {
                                                const newBullets = [...generatedBullets];
                                                newBullets[i] = e.target.value;
                                                setGeneratedBullets(newBullets);
                                                setData({ ...data, bullets: newBullets });
                                            }}
                                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm resize-none focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                            rows={2}
                                        />
                                        <button
                                            onClick={() => {
                                                const newBullets = generatedBullets.filter((_, idx) => idx !== i);
                                                setGeneratedBullets(newBullets);
                                                setData({ ...data, bullets: newBullets });
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    const newBullets = [...generatedBullets, 'New accomplishment or responsibility'];
                                    setGeneratedBullets(newBullets);
                                    setData({ ...data, bullets: newBullets });
                                }}
                                className="mb-8 text-brand-navy font-bold text-sm hover:text-brand-gold transition-colors flex items-center gap-2"
                            >
                                <span className="text-lg">+</span> Add another bullet
                            </button>

                            <div className="flex justify-between">
                                <button onClick={() => setStep(2)} className="text-gray-500 hover:text-brand-navy font-medium">← Back</button>
                                <button onClick={() => setStep(4)} className="px-8 py-2 bg-brand-navy text-white rounded-lg font-bold hover:bg-brand-navy-dark transition-all shadow-md">
                                    Preview Resume →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Preview */}
                    {resumeType === 'veteran' && step === 4 && (
                        <div>
                            {/* Template Selection */}
                            <div className="flex gap-4 mb-8">
                                {TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTemplate(t.id)}
                                        className={`flex-1 p-5 rounded-xl border-2 text-left transition-all ${template === t.id ? 'border-brand-gold bg-brand-gold/5 shadow-md' : 'border-gray-200 bg-white hover:border-brand-navy'
                                            }`}
                                    >
                                        <div className={`font-bold mb-1 ${template === t.id ? 'text-brand-gold' : 'text-brand-navy'}`}>{t.name}</div>
                                        <div className="text-xs text-gray-500 font-medium">{t.description}</div>
                                    </button>
                                ))}
                            </div>

                            {/* Resume Preview */}
                            <div className="bg-white text-slate-900 rounded-xl p-10 mb-8 shadow-2xl border border-gray-100">
                                {/* Header */}
                                <div className="text-center border-b-2 border-gray-100 pb-6 mb-6">
                                    <h1 className="text-3xl font-bold text-brand-navy mb-2">{data.name || 'Your Name'}</h1>
                                    <p className="text-gray-600 font-medium">
                                        {[data.city, data.state].filter(Boolean).join(', ')} | {data.phone} | {data.email}
                                        {data.linkedin && ` | ${data.linkedin}`}
                                    </p>
                                    {data.clearance && data.clearance !== 'none' && (
                                        <p className="text-blue-700 font-bold text-sm mt-2 uppercase tracking-wide">
                                            Active {data.clearance} Security Clearance
                                        </p>
                                    )}
                                </div>

                                {/* Objective */}
                                {data.objective && (
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Objective</h2>
                                        <p className="text-sm text-gray-800 leading-relaxed">{data.objective}</p>
                                    </div>
                                )}

                                {/* Experience */}
                                <div className="mb-6">
                                    <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Professional Experience</h2>
                                    <div>
                                        <div className="flex justify-between items-start mb-0.5">
                                            <strong className="text-brand-navy">{mosTranslation?.title || data.mos || 'Military Professional'}</strong>
                                            <span className="text-xs font-bold text-gray-500">{data.yearsServed} years</span>
                                        </div>
                                        <div className="text-xs font-bold text-brand-gold mb-3">U.S. {data.branch || 'Military'} | {data.rank || ''}</div>
                                        <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-2">
                                            {generatedBullets.map((bullet, i) => (
                                                <li key={i}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Skills */}
                                {mosTranslation && (
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Skills</h2>
                                        <p className="text-sm text-gray-800">{mosTranslation.transferableSkills.join(' • ')}</p>
                                    </div>
                                )}

                                {/* Certifications */}
                                {data.certifications.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Certifications</h2>
                                        <p className="text-sm text-gray-800">{data.certifications.join(' • ')}</p>
                                    </div>
                                )}

                                {/* Education */}
                                {data.education && (
                                    <div>
                                        <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Education</h2>
                                        <p className="text-sm text-gray-800">{data.education}</p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center">
                                <button onClick={() => setStep(3)} className="text-gray-500 hover:text-brand-navy font-bold transition-colors">← Edit Bullets</button>
                                <div className="flex gap-4 items-center">
                                    {saveStatus === 'saved' && (
                                        <span className="text-green-600 font-bold text-sm animate-pulse mr-2">✓ Saved to Profile</span>
                                    )}
                                    <button
                                        onClick={handleSaveToProfile}
                                        disabled={saveStatus === 'saving'}
                                        className="px-6 py-2 bg-white text-brand-navy rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
                                    >
                                        {saveStatus === 'saving' ? 'Saving...' : 'Save to Profile'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedBullets.join('\n'));
                                            alert('Bullets copied to clipboard!');
                                        }}
                                        className="px-6 py-2 bg-gray-100 text-brand-navy rounded-lg font-bold hover:bg-gray-200 transition-all border border-gray-200"
                                    >
                                        Copy Bullets
                                    </button>
                                    <button onClick={exportToPDF} className="px-8 py-3 bg-brand-gold text-white rounded-lg font-bold hover:bg-brand-gold-light transition-all shadow-lg transform hover:-translate-y-0.5">
                                        Export PDF Resume
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
