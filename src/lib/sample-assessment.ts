// Sample ASVAB-style assessment with questions from extracted data
// This demonstrates the modular assessment system

import { Assessment, Question } from './assessment-types';

const SAMPLE_QUESTIONS: Question[] = [
    // Arithmetic Reasoning (AR)
    {
        id: 'ar_1',
        type: 'multiple_choice',
        category: 'AR',
        question: 'John has 3 apples and buys 5 more. How many apples does he have in total?',
        options: [
            { id: 'a', text: '5', isCorrect: false },
            { id: 'b', text: '7', isCorrect: false },
            { id: 'c', text: '8', isCorrect: true },
            { id: 'd', text: '9', isCorrect: false },
        ],
        correctAnswer: 'c',
        points: 10,
        required: true,
    },
    {
        id: 'ar_2',
        type: 'multiple_choice',
        category: 'AR',
        question: 'A car travels 60 miles in 2 hours. What is the average speed?',
        options: [
            { id: 'a', text: '30 mph', isCorrect: true },
            { id: 'b', text: '40 mph', isCorrect: false },
            { id: 'c', text: '50 mph', isCorrect: false },
            { id: 'd', text: '60 mph', isCorrect: false },
        ],
        correctAnswer: 'a',
        points: 10,
        required: true,
    },
    {
        id: 'ar_3',
        type: 'multiple_choice',
        category: 'AR',
        question: 'If Sarah has $20 and spends $7, how much money does she have left?',
        options: [
            { id: 'a', text: '$11', isCorrect: false },
            { id: 'b', text: '$12', isCorrect: false },
            { id: 'c', text: '$13', isCorrect: true },
            { id: 'd', text: '$14', isCorrect: false },
        ],
        correctAnswer: 'c',
        points: 10,
        required: true,
    },

    // Word Knowledge (WK)
    {
        id: 'wk_1',
        type: 'multiple_choice',
        category: 'WK',
        question: 'What is the synonym of "happy"?',
        options: [
            { id: 'a', text: 'Sad', isCorrect: false },
            { id: 'b', text: 'Joyful', isCorrect: true },
            { id: 'c', text: 'Angry', isCorrect: false },
            { id: 'd', text: 'Confused', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },
    {
        id: 'wk_2',
        type: 'multiple_choice',
        category: 'WK',
        question: 'What is the opposite of "quick"?',
        options: [
            { id: 'a', text: 'Fast', isCorrect: false },
            { id: 'b', text: 'Slow', isCorrect: true },
            { id: 'c', text: 'Speedy', isCorrect: false },
            { id: 'd', text: 'Agile', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },

    // General Science (GS)
    {
        id: 'gs_1',
        type: 'multiple_choice',
        category: 'GS',
        question: 'Which planet is known as the Red Planet?',
        options: [
            { id: 'a', text: 'Venus', isCorrect: false },
            { id: 'b', text: 'Mars', isCorrect: true },
            { id: 'c', text: 'Jupiter', isCorrect: false },
            { id: 'd', text: 'Saturn', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },
    {
        id: 'gs_2',
        type: 'multiple_choice',
        category: 'GS',
        question: 'What is the main gas found in the Earth\'s atmosphere?',
        options: [
            { id: 'a', text: 'Oxygen', isCorrect: false },
            { id: 'b', text: 'Hydrogen', isCorrect: false },
            { id: 'c', text: 'Nitrogen', isCorrect: true },
            { id: 'd', text: 'Carbon Dioxide', isCorrect: false },
        ],
        correctAnswer: 'c',
        points: 10,
        required: true,
    },

    // Mechanical Comprehension (MC)
    {
        id: 'mc_1',
        type: 'multiple_choice',
        category: 'MC',
        question: 'What is the purpose of a lever?',
        options: [
            { id: 'a', text: 'To increase friction', isCorrect: false },
            { id: 'b', text: 'To lift or move objects using less force', isCorrect: true },
            { id: 'c', text: 'To measure weight', isCorrect: false },
            { id: 'd', text: 'To generate electricity', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },
    {
        id: 'mc_2',
        type: 'multiple_choice',
        category: 'MC',
        question: 'Which type of simple machine is a ramp?',
        options: [
            { id: 'a', text: 'Pulley', isCorrect: false },
            { id: 'b', text: 'Inclined plane', isCorrect: true },
            { id: 'c', text: 'Lever', isCorrect: false },
            { id: 'd', text: 'Wedge', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },

    // Electronics Information (EI)
    {
        id: 'ei_1',
        type: 'multiple_choice',
        category: 'EI',
        question: 'What is the function of a resistor in an electrical circuit?',
        options: [
            { id: 'a', text: 'Increase current flow', isCorrect: false },
            { id: 'b', text: 'Reduce or limit current flow', isCorrect: true },
            { id: 'c', text: 'Store electrical energy', isCorrect: false },
            { id: 'd', text: 'Convert current into voltage', isCorrect: false },
        ],
        correctAnswer: 'b',
        points: 10,
        required: true,
    },
];

export const SAMPLE_ASVAB_ASSESSMENT: Assessment = {
    id: 'asvab_sample_1',
    name: 'ASVAB Practice Test',
    description: 'A 10-question sample covering multiple ASVAB categories to estimate your aptitude.',
    category: 'asvab',
    timeLimit: 15, // 15 minutes
    shuffleQuestions: true,
    showResults: true,
    passingScore: 50,
    questions: SAMPLE_QUESTIONS,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    isTemplate: true,
};

export default SAMPLE_ASVAB_ASSESSMENT;
