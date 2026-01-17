// Script to extract and review ASVAB questions from DOCX files
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const asvabDir = path.join(__dirname, '../data/asvab');

async function extractDocx(filePath) {
    try {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return null;
    }
}

async function main() {
    const files = fs.readdirSync(asvabDir).filter(f => f.endsWith('.docx'));

    console.log(`Found ${files.length} ASVAB files\n`);

    for (const file of files) {
        const filePath = path.join(asvabDir, file);
        console.log(`\n${'='.repeat(60)}`);
        console.log(`FILE: ${file}`);
        console.log('='.repeat(60));

        const content = await extractDocx(filePath);
        if (content) {
            console.log(content.substring(0, 3000)); // First 3000 chars
            console.log('\n... [truncated]');
        }
    }
}

main();
