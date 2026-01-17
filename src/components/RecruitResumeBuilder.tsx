'use client';

import { useState } from 'react';
import { type HighSchoolResumeData, type ActivityEntry } from '@/lib/user-profile-store';

// Activity type options
const ACTIVITY_TYPES = [
    { value: 'jrotc', label: 'JROTC', icon: '🎖️' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'club', label: 'Club/Organization', icon: '🏛️' },
    { value: 'work', label: 'Part-time Job', icon: '💼' },
    { value: 'volunteer', label: 'Volunteer Work', icon: '🤝' },
    { value: 'other', label: 'Other', icon: '📋' },
] as const;

// Common course suggestions
const COURSE_SUGGESTIONS = [
    'JROTC', 'Computer Science', 'Auto Shop', 'Welding', 'Woodworking',
    'Electronics', 'Healthcare/CNA', 'Criminal Justice', 'Business',
    'Graphic Design', 'Culinary Arts', 'Agriculture', 'Engineering',
];

// Common certifications for HS students
const CERT_SUGGESTIONS = [
    'CPR/First Aid', 'Lifeguard', "Driver's License", 'Food Handler',
    'Microsoft Office', 'OSHA 10', 'Forklift', 'ServSafe',
];

// Skill suggestions
const SKILL_SUGGESTIONS = [
    'Leadership', 'Teamwork', 'Communication', 'Problem Solving',
    'Time Management', 'Physical Fitness', 'First Aid', 'Public Speaking',
    'Computer Skills', 'Customer Service', 'Bilingual',
];

interface RecruitResumeBuilderProps {
    initialData?: Partial<HighSchoolResumeData>;
    onComplete: (data: HighSchoolResumeData) => void;
    onBack: () => void;
}

export default function RecruitResumeBuilder({ initialData, onComplete, onBack }: RecruitResumeBuilderProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<HighSchoolResumeData>({
        name: initialData?.name || '',
        email: initialData?.email || '',
        phone: '',
        city: '',
        state: '',
        schoolName: '',
        graduationYear: '',
        gpa: '',
        relevantCourses: [],
        activities: [],
        skills: [],
        achievements: [],
        certifications: [],
        languages: [],
        bullets: [],
        objective: '',
        ...initialData,
    });

    const [newActivity, setNewActivity] = useState<Partial<ActivityEntry>>({
        type: 'jrotc',
        name: '',
        role: '',
        duration: '',
        description: '',
    });

    const updateField = <K extends keyof HighSchoolResumeData>(field: K, value: HighSchoolResumeData[K]) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const addToArray = (field: 'relevantCourses' | 'skills' | 'achievements' | 'certifications' | 'languages', value: string) => {
        if (value && !data[field].includes(value)) {
            updateField(field, [...data[field], value]);
        }
    };

    const removeFromArray = (field: 'relevantCourses' | 'skills' | 'achievements' | 'certifications' | 'languages', value: string) => {
        updateField(field, data[field].filter(v => v !== value));
    };

    const addActivity = () => {
        if (newActivity.name && newActivity.description) {
            const activity: ActivityEntry = {
                type: newActivity.type || 'other',
                name: newActivity.name,
                role: newActivity.role,
                duration: newActivity.duration || '',
                description: newActivity.description,
            };
            updateField('activities', [...data.activities, activity]);
            setNewActivity({ type: 'jrotc', name: '', role: '', duration: '', description: '' });
        }
    };

    const removeActivity = (index: number) => {
        updateField('activities', data.activities.filter((_, i) => i !== index));
    };

    const generateBullets = () => {
        const bullets: string[] = [];

        // Education bullet
        if (data.schoolName) {
            bullets.push(`${data.gpa ? `Maintained ${data.gpa} GPA while ` : ''}Pursuing high school diploma at ${data.schoolName}, expected graduation ${data.graduationYear}`);
        }

        // Generate bullets from activities
        data.activities.forEach(activity => {
            let bullet = '';
            switch (activity.type) {
                case 'jrotc':
                    bullet = activity.role
                        ? `Served as ${activity.role} in JROTC program${activity.duration ? ` (${activity.duration})` : ''}, ${activity.description}`
                        : `Participated in JROTC program, ${activity.description}`;
                    break;
                case 'sports':
                    bullet = activity.role
                        ? `${activity.role} for ${activity.name}${activity.duration ? ` (${activity.duration})` : ''}, ${activity.description}`
                        : `Member of ${activity.name} team, ${activity.description}`;
                    break;
                case 'club':
                    bullet = activity.role
                        ? `${activity.role} of ${activity.name}, ${activity.description}`
                        : `Active member of ${activity.name}, ${activity.description}`;
                    break;
                case 'work':
                    bullet = `Worked as ${activity.role || 'team member'} at ${activity.name}${activity.duration ? ` (${activity.duration})` : ''}, ${activity.description}`;
                    break;
                case 'volunteer':
                    bullet = `Volunteered at ${activity.name}${activity.duration ? ` (${activity.duration})` : ''}, ${activity.description}`;
                    break;
                default:
                    bullet = `${activity.name}: ${activity.description}`;
            }
            bullets.push(bullet);
        });

        updateField('bullets', bullets);

        // Generate objective
        const objective = `Motivated ${data.graduationYear ? `Class of ${data.graduationYear}` : 'high school'} graduate seeking to serve in the U.S. ${data.targetBranch || 'Military'}. ${data.activities.some(a => a.type === 'jrotc') ? 'JROTC-trained leader with ' : ''}Strong commitment to physical fitness, teamwork, and personal growth.`;
        updateField('objective', objective);
    };

    const handleComplete = () => {
        generateBullets();
        onComplete(data);
    };

    return (
        <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
                {['Info', 'Education', 'Activities', 'Skills', 'Preview'].map((s, i) => (
                    <button
                        key={s}
                        onClick={() => setStep(i + 1)}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm transition-all ${step === i + 1 ? 'bg-brand-gold text-white font-semibold shadow-md' :
                            step > i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                            }`}
                    >
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">
                            {step > i + 1 ? '✓' : i + 1}
                        </span>
                        <span className="hidden sm:inline">{s}</span>
                    </button>
                ))}
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => updateField('name', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="John Smith"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => updateField('email', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="john@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={e => updateField('phone', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="(555) 123-4567"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => updateField('city', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                    placeholder="San Diego"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={e => updateField('state', e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                    placeholder="CA"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button onClick={onBack} className="text-gray-500 hover:text-brand-navy font-medium">← Back</button>
                        <button onClick={() => setStep(2)} className="px-6 py-2 bg-brand-navy text-white rounded-lg font-bold hover:bg-brand-navy-dark transition-all shadow-md">
                            Continue →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Education */}
            {step === 2 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Education</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">High School Name</label>
                            <input
                                type="text"
                                value={data.schoolName}
                                onChange={e => updateField('schoolName', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="San Diego High School"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="text"
                                value={data.graduationYear}
                                onChange={e => updateField('graduationYear', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="2025"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">GPA (optional)</label>
                            <input
                                type="text"
                                value={data.gpa || ''}
                                onChange={e => updateField('gpa', e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                                placeholder="3.5"
                            />
                        </div>
                    </div>

                    {/* Relevant Courses */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Relevant Coursework</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {data.relevantCourses.map(course => (
                                <span key={course} className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm flex items-center gap-2">
                                    {course}
                                    <button onClick={() => removeFromArray('relevantCourses', course)} className="hover:text-white">×</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {COURSE_SUGGESTIONS.filter(c => !data.relevantCourses.includes(c)).slice(0, 8).map(course => (
                                <button
                                    key={course}
                                    onClick={() => addToArray('relevantCourses', course)}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                                >
                                    + {course}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button onClick={() => setStep(1)} className="text-gray-500 hover:text-brand-navy font-medium">← Back</button>
                        <button onClick={() => setStep(3)} className="px-6 py-2 bg-brand-navy text-white rounded-lg font-bold hover:bg-brand-navy-dark transition-all shadow-md">
                            Continue →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Activities */}
            {step === 3 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-brand-navy mb-2">Activities & Experience</h2>
                    <p className="text-gray-500 text-sm mb-6">Add JROTC, sports, clubs, jobs, and volunteer work</p>

                    {/* Existing Activities */}
                    {data.activities.length > 0 && (
                        <div className="space-y-4 mb-6">
                            {data.activities.map((activity, i) => (
                                <div key={i} className="p-5 bg-gray-50 border border-gray-100 rounded-xl flex justify-between items-start shadow-sm">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span>{ACTIVITY_TYPES.find(t => t.value === activity.type)?.icon}</span>
                                            <span className="font-bold text-brand-navy">{activity.name}</span>
                                            {activity.role && <span className="text-brand-gold font-medium">• {activity.role}</span>}
                                        </div>
                                        <p className="text-sm text-gray-700">{activity.description}</p>
                                        {activity.duration && <p className="text-xs text-slate-400 mt-1">{activity.duration}</p>}
                                    </div>
                                    <button onClick={() => removeActivity(i)} className="text-red-400 hover:text-red-300">×</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Activity */}
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8">
                        <h3 className="text-sm font-bold text-brand-navy mb-4 uppercase tracking-wider">Add Activity</h3>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Type</label>
                                <select
                                    value={newActivity.type}
                                    onChange={e => setNewActivity({ ...newActivity, type: e.target.value as ActivityEntry['type'] })}
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all text-sm"
                                >
                                    {ACTIVITY_TYPES.map(t => (
                                        <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={newActivity.name}
                                    onChange={e => setNewActivity({ ...newActivity, name: e.target.value })}
                                    placeholder="e.g., Varsity Football, McDonald's"
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Role (optional)</label>
                                <input
                                    type="text"
                                    value={newActivity.role}
                                    onChange={e => setNewActivity({ ...newActivity, role: e.target.value })}
                                    placeholder="e.g., Team Captain, Crew Member"
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Duration</label>
                                <input
                                    type="text"
                                    value={newActivity.duration}
                                    onChange={e => setNewActivity({ ...newActivity, duration: e.target.value })}
                                    placeholder="e.g., 2023-2025"
                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all text-sm"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-gray-700 mb-1">Description / Accomplishments</label>
                            <textarea
                                value={newActivity.description}
                                onChange={e => setNewActivity({ ...newActivity, description: e.target.value })}
                                placeholder="What did you accomplish? What responsibilities did you have?"
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all text-sm"
                                rows={2}
                            />
                        </div>
                        <button
                            onClick={addActivity}
                            disabled={!newActivity.name || !newActivity.description}
                            className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-bold text-sm disabled:opacity-50 hover:bg-amber-400 transition-all shadow-sm"
                        >
                            + Add Activity
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button onClick={() => setStep(2)} className="text-slate-400 hover:text-white">← Back</button>
                        <button onClick={() => setStep(4)} className="px-6 py-2 bg-amber-500 text-slate-900 rounded-lg font-medium">
                            Continue →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Skills */}
            {step === 4 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-brand-navy mb-6">Skills & Achievements</h2>

                    {/* Skills */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Skills</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm flex items-center gap-2 font-medium">
                                    {skill}
                                    <button onClick={() => removeFromArray('skills', skill)} className="text-green-400 hover:text-green-600">×</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SKILL_SUGGESTIONS.filter(s => !data.skills.includes(s)).map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => addToArray('skills', skill)}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                                >
                                    + {skill}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Certifications</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.certifications.map(cert => (
                                <span key={cert} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-full text-sm flex items-center gap-2 font-medium">
                                    {cert}
                                    <button onClick={() => removeFromArray('certifications', cert)} className="text-amber-400 hover:text-amber-600">×</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {CERT_SUGGESTIONS.filter(c => !data.certifications.includes(c)).map(cert => (
                                <button
                                    key={cert}
                                    onClick={() => addToArray('certifications', cert)}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                                >
                                    + {cert}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Languages (besides English)</label>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.languages.map(lang => (
                                <span key={lang} className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-100 rounded-full text-sm flex items-center gap-2 font-medium">
                                    {lang}
                                    <button onClick={() => removeFromArray('languages', lang)} className="text-purple-400 hover:text-purple-600">×</button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Type a language and press Enter"
                            className="w-full max-w-xs px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    addToArray('languages', (e.target as HTMLInputElement).value);
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }}
                        />
                    </div>

                    {/* Target Branch */}
                    <div className="mb-8">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Target Branch (for recruiter)</label>
                        <select
                            value={data.targetBranch || ''}
                            onChange={e => updateField('targetBranch', e.target.value)}
                            className="w-full max-w-xs px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-brand-navy/20 outline-none transition-all"
                        >
                            <option value="">Select (optional)</option>
                            <option value="Army">Army</option>
                            <option value="Navy">Navy</option>
                            <option value="Air Force">Air Force</option>
                            <option value="Marine Corps">Marine Corps</option>
                            <option value="Coast Guard">Coast Guard</option>
                            <option value="Space Force">Space Force</option>
                        </select>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button onClick={() => setStep(3)} className="text-gray-500 hover:text-brand-navy font-medium">← Back</button>
                        <button onClick={() => { generateBullets(); setStep(5); }} className="px-6 py-2 bg-brand-navy text-white rounded-lg font-bold hover:bg-brand-navy-dark transition-all shadow-md">
                            Preview Resume →
                        </button>
                    </div>
                </div>
            )}

            {/* Step 5: Preview */}
            {step === 5 && (
                <div>
                    <div className="bg-white text-slate-900 rounded-xl p-10 mb-8 shadow-2xl border border-gray-100">
                        {/* Header */}
                        <div className="text-center border-b-2 border-gray-100 pb-6 mb-6">
                            <h1 className="text-3xl font-bold text-brand-navy mb-2">{data.name || 'Your Name'}</h1>
                            <p className="text-gray-600 font-medium">
                                {[data.city, data.state].filter(Boolean).join(', ')} | {data.phone} | {data.email}
                            </p>
                        </div>

                        {/* Objective */}
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Objective</h2>
                            <p className="text-sm text-gray-800 leading-relaxed">{data.objective}</p>
                        </div>

                        {/* Education */}
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Education</h2>
                            <div className="flex justify-between items-start mb-1">
                                <strong className="text-brand-navy">{data.schoolName}</strong>
                                <span className="text-xs font-bold text-gray-500">Expected {data.graduationYear}</span>
                            </div>
                            {data.gpa && <p className="text-xs font-bold text-brand-gold mb-2">GPA: {data.gpa}</p>}
                            {data.relevantCourses.length > 0 && (
                                <p className="text-sm text-gray-700"><span className="font-bold">Relevant Coursework:</span> {data.relevantCourses.join(', ')}</p>
                            )}
                        </div>

                        {/* Activities */}
                        {data.activities.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Leadership & Activities</h2>
                                <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-2">
                                    {data.bullets.slice(1).map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Skills */}
                        {(data.skills.length > 0 || data.certifications.length > 0) && (
                            <div>
                                <h2 className="text-sm font-bold text-brand-navy border-b border-gray-200 pb-1 mb-2 uppercase tracking-widest">Skills & Certifications</h2>
                                <p className="text-sm text-gray-800">
                                    {[...data.skills, ...data.certifications].join(' • ')}
                                    {data.languages.length > 0 && ` • Languages: ${data.languages.join(', ')}`}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <button onClick={() => setStep(4)} className="text-gray-500 hover:text-brand-navy font-bold transition-colors">← Edit Information</button>
                        <div className="flex gap-4">
                            <button
                                onClick={handleComplete}
                                className="px-6 py-2 bg-white text-brand-navy rounded-lg font-bold hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
                            >
                                Save to Profile
                            </button>
                            <button onClick={handleComplete} className="px-8 py-3 bg-brand-gold text-white rounded-lg font-bold hover:bg-brand-gold-light transition-all shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
                                <span>📄</span> Export PDF Resume
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
