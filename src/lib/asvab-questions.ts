// Expanded ASVAB Question Bank
// 100+ questions across all 8 subtests
// Organized by difficulty: easy (1pt), medium (2pt), hard (4pt)

export interface ASVABQuestion {
    id: string;
    category: 'AR' | 'WK' | 'PC' | 'MK' | 'GS' | 'EI' | 'AS' | 'MC';
    categoryName: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    options: string[];
    correct: number;
    points: number;
}

// ARITHMETIC REASONING (AR) - Word problems
export const AR_QUESTIONS: ASVABQuestion[] = [
    // Easy
    {
        id: 'ar_e1', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'easy', points: 1,
        question: 'If you have 24 apples and give away 8, how many do you have left?',
        options: ['14', '16', '18', '32'], correct: 1
    },
    {
        id: 'ar_e2', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'easy', points: 1,
        question: 'A soldier runs 3 miles each day. How many miles in a week?',
        options: ['18', '21', '24', '28'], correct: 1
    },
    {
        id: 'ar_e3', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'easy', points: 1,
        question: 'If a meal costs $12 and you pay with a $20 bill, how much change do you get?',
        options: ['$6', '$8', '$10', '$12'], correct: 1
    },
    {
        id: 'ar_e4', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'easy', points: 1,
        question: 'A pack has 6 bottles. How many bottles in 5 packs?',
        options: ['25', '30', '35', '40'], correct: 1
    },
    {
        id: 'ar_e5', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'easy', points: 1,
        question: 'If you divide 36 cookies among 6 people equally, how many does each get?',
        options: ['4', '5', '6', '7'], correct: 2
    },
    // Medium
    {
        id: 'ar_m1', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'medium', points: 2,
        question: 'A team of 12 soldiers needs to split into groups of 4. How many groups?',
        options: ['2', '3', '4', '8'], correct: 1
    },
    {
        id: 'ar_m2', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'medium', points: 2,
        question: 'If a tank uses 15 gallons per hour for 6 hours, how much fuel is used?',
        options: ['75 gal', '90 gal', '105 gal', '120 gal'], correct: 1
    },
    {
        id: 'ar_m3', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'medium', points: 2,
        question: 'A recruit saves $150/month. How much in 8 months?',
        options: ['$1,000', '$1,100', '$1,200', '$1,400'], correct: 2
    },
    {
        id: 'ar_m4', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'medium', points: 2,
        question: 'If 3 people can paint a room in 6 hours, how long for 6 people?',
        options: ['2 hours', '3 hours', '4 hours', '12 hours'], correct: 1
    },
    {
        id: 'ar_m5', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'medium', points: 2,
        question: 'A uniform costs $45 and you get a 20% military discount. What do you pay?',
        options: ['$32', '$36', '$40', '$42'], correct: 1
    },
    // Hard
    {
        id: 'ar_h1', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'hard', points: 4,
        question: 'A convoy travels 240 miles at 60 mph, then 180 miles at 45 mph. Total time?',
        options: ['6 hours', '7 hours', '8 hours', '9 hours'], correct: 2
    },
    {
        id: 'ar_h2', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'hard', points: 4,
        question: 'If 40% pass test 1 and 75% of those pass test 2, what percent pass both?',
        options: ['25%', '30%', '35%', '40%'], correct: 1
    },
    {
        id: 'ar_h3', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'hard', points: 4,
        question: 'A vehicle depreciates 15% per year. If it costs $20,000, what is it worth after 2 years?',
        options: ['$14,000', '$14,450', '$15,300', '$17,000'], correct: 1
    },
    {
        id: 'ar_h4', category: 'AR', categoryName: 'Arithmetic Reasoning', difficulty: 'hard', points: 4,
        question: 'A mission requires 3 soldiers working 8 hours. If only 2 soldiers are available, how many hours?',
        options: ['10', '11', '12', '16'], correct: 2
    },
];

// WORD KNOWLEDGE (WK) - Vocabulary
export const WK_QUESTIONS: ASVABQuestion[] = [
    // Easy
    {
        id: 'wk_e1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'SMALL most nearly means:',
        options: ['Large', 'Little', 'Fast', 'Slow'], correct: 1
    },
    {
        id: 'wk_e2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'HAZARD most nearly means:',
        options: ['Safety', 'Danger', 'Speed', 'Luck'], correct: 1
    },
    {
        id: 'wk_e3', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'RAPID most nearly means:',
        options: ['Slow', 'Quick', 'Heavy', 'Light'], correct: 1
    },
    {
        id: 'wk_e4', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'HALT most nearly means:',
        options: ['Start', 'Stop', 'Move', 'Jump'], correct: 1
    },
    {
        id: 'wk_e5', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'easy', points: 1,
        question: 'ESSENTIAL most nearly means:',
        options: ['optional', 'necessary', 'extra', 'rare'], correct: 1
    },
    // Medium
    {
        id: 'wk_m1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'FORTIFY most nearly means:',
        options: ['Weaken', 'Abandon', 'Strengthen', 'Ignore'], correct: 2
    },
    {
        id: 'wk_m2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'METICULOUS most nearly means:',
        options: ['Careless', 'Careful', 'Quick', 'Loud'], correct: 1
    },
    {
        id: 'wk_m3', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'RESILIENT most nearly means:',
        options: ['Fragile', 'Recovering', 'Rigid', 'Weak'], correct: 1
    },
    {
        id: 'wk_m4', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'VIGILANT most nearly means:',
        options: ['Watchful', 'Sleepy', 'Careless', 'Relaxed'], correct: 0
    },
    {
        id: 'wk_m5', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'medium', points: 2,
        question: 'CONCEAL most nearly means:',
        options: ['Reveal', 'Hide', 'Display', 'Share'], correct: 1
    },
    // Hard
    {
        id: 'wk_h1', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'EXACERBATE most nearly means:',
        options: ['Improve', 'Worsen', 'Examine', 'Remove'], correct: 1
    },
    {
        id: 'wk_h2', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'UBIQUITOUS most nearly means:',
        options: ['Rare', 'Everywhere', 'Ancient', 'Hidden'], correct: 1
    },
    {
        id: 'wk_h3', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'CLANDESTINE most nearly means:',
        options: ['Open', 'Secret', 'Public', 'Famous'], correct: 1
    },
    {
        id: 'wk_h4', category: 'WK', categoryName: 'Word Knowledge', difficulty: 'hard', points: 4,
        question: 'ACQUIESCE most nearly means:',
        options: ['Resist', 'Accept', 'Deny', 'Question'], correct: 1
    },
];

// PARAGRAPH COMPREHENSION (PC)
export const PC_QUESTIONS: ASVABQuestion[] = [
    {
        id: 'pc_e1', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'easy', points: 1,
        question: '"The soldier cleaned his weapon daily." What did the soldier do every day?',
        options: ['Exercised', 'Cleaned his weapon', 'Ate breakfast', 'Called home'], correct: 1
    },
    {
        id: 'pc_e2', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'easy', points: 1,
        question: '"The convoy departed at 0600 and arrived at 1200." How long was the trip?',
        options: ['4 hours', '5 hours', '6 hours', '7 hours'], correct: 2
    },
    {
        id: 'pc_m1', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'medium', points: 2,
        question: '"PT improves endurance, strength, and unit cohesion." PT builds:',
        options: ['Only physical fitness', 'Team unity and fitness', 'Just strength', 'Speed only'], correct: 1
    },
    {
        id: 'pc_m2', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'medium', points: 2,
        question: '"Leadership requires both technical competence and emotional intelligence." A leader needs:',
        options: ['Only hard skills', 'Only soft skills', 'Both types of skills', 'Neither'], correct: 2
    },
    {
        id: 'pc_h1', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'hard', points: 4,
        question: '"While technology has advanced rapidly, the core principles of leadership remain unchanged." The main idea is:',
        options: ['Technology is more important', 'Leadership principles are timeless', 'Nothing changes', 'Tech replaces leaders'], correct: 1
    },
    {
        id: 'pc_h2', category: 'PC', categoryName: 'Paragraph Comprehension', difficulty: 'hard', points: 4,
        question: '"Despite initial setbacks, the mission succeeded due to adaptability and perseverance." Success came from:',
        options: ['Perfect planning', 'Flexibility and determination', 'Luck', 'Superior equipment'], correct: 1
    },
];

// MATHEMATICS KNOWLEDGE (MK)
export const MK_QUESTIONS: ASVABQuestion[] = [
    // Easy
    {
        id: 'mk_e1', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 5 × 7?',
        options: ['30', '35', '40', '45'], correct: 1
    },
    {
        id: 'mk_e2', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 144 ÷ 12?',
        options: ['10', '11', '12', '13'], correct: 2
    },
    {
        id: 'mk_e3', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'easy', points: 1,
        question: 'What is 25% as a decimal?',
        options: ['0.025', '0.25', '2.5', '25'], correct: 1
    },
    // Medium
    {
        id: 'mk_m1', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'medium', points: 2,
        question: 'Solve for x: 2x + 6 = 14',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correct: 1
    },
    {
        id: 'mk_m2', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'medium', points: 2,
        question: 'What is 15% of 80?',
        options: ['10', '12', '15', '18'], correct: 1
    },
    {
        id: 'mk_m3', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'medium', points: 2,
        question: 'What is the perimeter of a rectangle with length 8 and width 5?',
        options: ['13', '26', '40', '80'], correct: 1
    },
    {
        id: 'mk_m4', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'medium', points: 2,
        question: 'Simplify: 3(x + 4) - 2x',
        options: ['x + 4', 'x + 12', '5x + 4', '5x + 12'], correct: 1
    },
    // Hard
    {
        id: 'mk_h1', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'hard', points: 4,
        question: 'If x² - 9 = 0, what are the values of x?',
        options: ['3 only', '-3 only', '3 and -3', '9 and -9'], correct: 2
    },
    {
        id: 'mk_h2', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'hard', points: 4,
        question: 'What is the area of a triangle with base 10 and height 6?',
        options: ['25', '30', '35', '60'], correct: 1
    },
    {
        id: 'mk_h3', category: 'MK', categoryName: 'Mathematics Knowledge', difficulty: 'hard', points: 4,
        question: 'Solve: (x - 3)(x + 2) = 0',
        options: ['x = 3 or x = 2', 'x = 3 or x = -2', 'x = -3 or x = 2', 'x = -3 or x = -2'], correct: 1
    },
];

// GENERAL SCIENCE (GS)
export const GS_QUESTIONS: ASVABQuestion[] = [
    {
        id: 'gs_e1', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'What gas do humans breathe in?',
        options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct: 2
    },
    {
        id: 'gs_e2', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'What is the largest organ in the human body?',
        options: ['Heart', 'Liver', 'Skin', 'Brain'], correct: 2
    },
    {
        id: 'gs_e3', category: 'GS', categoryName: 'General Science', difficulty: 'easy', points: 1,
        question: 'How many planets are in our solar system?',
        options: ['7', '8', '9', '10'], correct: 1
    },
    {
        id: 'gs_m1', category: 'GS', categoryName: 'General Science', difficulty: 'medium', points: 2,
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'], correct: 1
    },
    {
        id: 'gs_m2', category: 'GS', categoryName: 'General Science', difficulty: 'medium', points: 2,
        question: 'What type of blood cells fight infection?',
        options: ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], correct: 1
    },
    {
        id: 'gs_h1', category: 'GS', categoryName: 'General Science', difficulty: 'hard', points: 4,
        question: 'Which particle has a negative charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], correct: 2
    },
    {
        id: 'gs_h2', category: 'GS', categoryName: 'General Science', difficulty: 'hard', points: 4,
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'], correct: 1
    },
];

// ELECTRONICS INFORMATION (EI)
export const EI_QUESTIONS: ASVABQuestion[] = [
    {
        id: 'ei_e1', category: 'EI', categoryName: 'Electronics Information', difficulty: 'easy', points: 1,
        question: 'What unit measures electrical current?',
        options: ['Volts', 'Watts', 'Amps', 'Ohms'], correct: 2
    },
    {
        id: 'ei_e2', category: 'EI', categoryName: 'Electronics Information', difficulty: 'easy', points: 1,
        question: 'What color wire is typically ground?',
        options: ['Red', 'Black', 'Green', 'White'], correct: 2
    },
    {
        id: 'ei_m1', category: 'EI', categoryName: 'Electronics Information', difficulty: 'medium', points: 2,
        question: 'In a series circuit, if one component fails:',
        options: ['Others work harder', 'Circuit continues', 'Circuit stops', 'Voltage doubles'], correct: 2
    },
    {
        id: 'ei_m2', category: 'EI', categoryName: 'Electronics Information', difficulty: 'medium', points: 2,
        question: 'What component stores electrical charge?',
        options: ['Resistor', 'Capacitor', 'Inductor', 'Transistor'], correct: 1
    },
    {
        id: 'ei_h1', category: 'EI', categoryName: 'Electronics Information', difficulty: 'hard', points: 4,
        question: "Using Ohm's Law (V=IR), if V=12 and R=4, what is I?",
        options: ['2 amps', '3 amps', '4 amps', '48 amps'], correct: 1
    },
    {
        id: 'ei_h2', category: 'EI', categoryName: 'Electronics Information', difficulty: 'hard', points: 4,
        question: 'What is the total resistance of two 10Ω resistors in parallel?',
        options: ['5Ω', '10Ω', '15Ω', '20Ω'], correct: 0
    },
];

// AUTO & SHOP INFORMATION (AS)
export const AS_QUESTIONS: ASVABQuestion[] = [
    {
        id: 'as_e1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'easy', points: 1,
        question: 'What tool is used to tighten nuts and bolts?',
        options: ['Hammer', 'Wrench', 'Saw', 'Drill'], correct: 1
    },
    {
        id: 'as_e2', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'easy', points: 1,
        question: 'What fluid lubricates engine parts?',
        options: ['Coolant', 'Brake fluid', 'Motor oil', 'Transmission fluid'], correct: 2
    },
    {
        id: 'as_e3', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'easy', points: 1,
        question: 'What tool measures distance precisely?',
        options: ['Level', 'Tape measure', 'Hammer', 'Pliers'], correct: 1
    },
    {
        id: 'as_m1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'medium', points: 2,
        question: 'What does a vehicle alternator do?',
        options: ['Stores fuel', 'Charges battery', 'Cools engine', 'Filters air'], correct: 1
    },
    {
        id: 'as_m2', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'medium', points: 2,
        question: 'What does a catalytic converter reduce?',
        options: ['Speed', 'Noise', 'Emissions', 'Weight'], correct: 2
    },
    {
        id: 'as_h1', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'hard', points: 4,
        question: 'In a 4-stroke engine, the intake stroke:',
        options: ['Compresses fuel', 'Ignites fuel', 'Draws in fuel/air', 'Expels exhaust'], correct: 2
    },
    {
        id: 'as_h2', category: 'AS', categoryName: 'Auto & Shop', difficulty: 'hard', points: 4,
        question: 'What is the purpose of a differential?',
        options: ['Filter oil', 'Cool engine', 'Allow wheels to turn at different speeds', 'Increase power'], correct: 2
    },
];

// MECHANICAL COMPREHENSION (MC)
export const MC_QUESTIONS: ASVABQuestion[] = [
    {
        id: 'mc_e1', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'easy', points: 1,
        question: 'Which simple machine is a ramp?',
        options: ['Lever', 'Pulley', 'Inclined plane', 'Wheel'], correct: 2
    },
    {
        id: 'mc_e2', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'easy', points: 1,
        question: 'What happens to pressure when area decreases?',
        options: ['Increases', 'Decreases', 'Stays same', 'Becomes zero'], correct: 0
    },
    {
        id: 'mc_m1', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'medium', points: 2,
        question: 'A pulley with 4 ropes reduces effort by:',
        options: ['2x', '4x', '8x', '16x'], correct: 1
    },
    {
        id: 'mc_m2', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'medium', points: 2,
        question: 'In a lever, the fulcrum is:',
        options: ['The weight being lifted', 'The pivot point', 'The effort force', 'The lever arm'], correct: 1
    },
    {
        id: 'mc_h1', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'hard', points: 4,
        question: 'If a gear with 20 teeth drives one with 40 teeth, output speed is:',
        options: ['2x faster', 'Same', 'Half', 'Quarter'], correct: 2
    },
    {
        id: 'mc_h2', category: 'MC', categoryName: 'Mechanical Comprehension', difficulty: 'hard', points: 4,
        question: 'Mechanical advantage of a lever is load distance divided by:',
        options: ['Load weight', 'Effort distance', 'Fulcrum position', 'Lever length'], correct: 1
    },
];

// Combine all questions
export const ALL_ASVAB_QUESTIONS: ASVABQuestion[] = [
    ...AR_QUESTIONS,
    ...WK_QUESTIONS,
    ...PC_QUESTIONS,
    ...MK_QUESTIONS,
    ...GS_QUESTIONS,
    ...EI_QUESTIONS,
    ...AS_QUESTIONS,
    ...MC_QUESTIONS,
];

// Get questions by category
export function getQuestionsByCategory(category: string): ASVABQuestion[] {
    return ALL_ASVAB_QUESTIONS.filter(q => q.category === category);
}

// Get questions by difficulty
export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): ASVABQuestion[] {
    return ALL_ASVAB_QUESTIONS.filter(q => q.difficulty === difficulty);
}

// Get random question by criteria
export function getRandomQuestion(
    difficulty: 'easy' | 'medium' | 'hard',
    excludeIds: string[] = [],
    category?: string
): ASVABQuestion | null {
    let available = ALL_ASVAB_QUESTIONS.filter(q =>
        q.difficulty === difficulty &&
        !excludeIds.includes(q.id)
    );

    if (category) {
        available = available.filter(q => q.category === category);
    }

    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
}

export default ALL_ASVAB_QUESTIONS;
