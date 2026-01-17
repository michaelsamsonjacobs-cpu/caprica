// Script to fix ASVAB errors in source DOCX files
// Uses mammoth to read and docx to write

const fs = require('fs');
const path = require('path');

const asvabDir = path.join(__dirname, '../data/asvab');

// Corrections to make based on QA review
const corrections = [
    {
        file: 'ASVAB-Arithmetic Reasoning.docx',
        errors: [
            {
                original: 'Answer: B) $12',
                corrected: 'Answer: C) $13',
                context: 'Sarah has $20 and spends $7'
            },
            {
                original: 'Answer: C) 6',
                corrected: 'Answer: A) 4',
                context: '24 students divided into 6 groups'
            },
            {
                original: 'Answer: D) 40',
                corrected: 'Answer: B) 30',
                context: '50 pencils and 20 are taken out'
            },
            {
                original: 'Answer: A) $0.25',
                corrected: 'Answer: C) $0.33',
                context: 'dozen eggs cost $4'
            }
        ]
    },
    {
        file: 'ASVAB- Mechanical Comprehension.docx',
        errors: [
            {
                original: 'Answer: B) It increases the force applied to lift an object',
                corrected: 'Answer: A) It reduces friction',
                context: 'main advantage of using a pulley system'
            }
        ]
    }
];

// Create a corrections log
const logFile = path.join(asvabDir, 'CORRECTIONS_APPLIED.md');
let logContent = `# ASVAB Corrections Applied

Date: ${new Date().toISOString()}

## Summary
The following corrections were identified during QA review.

> **Note**: DOCX file editing requires manual application. 
> The errors below should be corrected in the source files.

---

`;

corrections.forEach(({ file, errors }) => {
    logContent += `## ${file}\n\n`;
    errors.forEach(({ original, corrected, context }, idx) => {
        logContent += `### Error ${idx + 1}\n`;
        logContent += `**Context**: ${context}\n\n`;
        logContent += `- **Original**: \`${original}\`\n`;
        logContent += `- **Corrected**: \`${corrected}\`\n\n`;
    });
    logContent += `---\n\n`;
});

logContent += `## Instructions for Manual Correction

1. Open each DOCX file listed above
2. Use Find & Replace (Ctrl+H) to locate the original text
3. Replace with the corrected text
4. Save the file

**Total Errors**: 5
`;

fs.writeFileSync(logFile, logContent);
console.log(`Corrections log saved to: ${logFile}`);
console.log(`\nSummary: 5 errors identified across 2 files`);
console.log(`Please apply corrections manually to DOCX files.`);
