// MOS Database Scraper
// Scrapes military occupational specialties from mosdb.com and enriches with ASVAB/bonus data

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://mosdb.com';
const OUTPUT_DIR = path.join(__dirname, '../data/positions/imports');

// Official ASVAB line score requirements (from army.com and goarmy.com)
// Format: { MOS: { GT, CL, CO, EL, FA, GM, MM, OF, SC, ST } }
const ASVAB_REQUIREMENTS = {
    // Combat Arms
    '11B': { CO: 87 },  // Infantryman
    '11C': { CO: 87 },  // Indirect Fire Infantryman
    '12B': { CO: 87 },  // Combat Engineer
    '13B': { FA: 93 },  // Cannon Crewmember
    '13F': { FA: 96 },  // Fire Support Specialist
    '19D': { CO: 87 },  // Cavalry Scout
    '19K': { CO: 87 },  // M1 Armor Crewman

    // Intelligence
    '35F': { ST: 101 }, // Intelligence Analyst
    '35M': { ST: 101 }, // Human Intelligence Collector
    '35N': { ST: 112 }, // Signals Intelligence Analyst
    '35P': { ST: 91, SK: 91 }, // Cryptologic Linguist

    // Cyber & IT
    '17C': { ST: 112, GT: 110 }, // Cyber Operations Specialist
    '25B': { EL: 98 },  // Information Technology Specialist
    '25S': { EL: 92 },  // Satellite Communication Systems Operator
    '25U': { EL: 98 },  // Signal Support Systems Specialist

    // Medical
    '68W': { ST: 101, GT: 107 }, // Combat Medic Specialist
    '68C': { ST: 105 }, // Practical Nursing Specialist
    '68D': { ST: 107 }, // Operating Room Specialist

    // Aviation
    '15T': { MM: 104 }, // UH-60 Helicopter Repairer
    '15U': { MM: 104 }, // CH-47 Helicopter Repairer
    '15W': { EL: 93 },  // UAV Operator

    // Logistics
    '88M': { CL: 90 },  // Motor Transport Operator (Truck Driver)
    '92A': { CL: 90 },  // Automated Logistical Specialist
    '92Y': { CL: 90 },  // Unit Supply Specialist

    // Admin & HR
    '42A': { CL: 90 },  // Human Resources Specialist
    '27D': { CL: 95 },  // Paralegal Specialist

    // Special Forces (requires additional selection)
    '18X': { GT: 110 }, // Special Forces Candidate
};

// Current bonuses (sample - these change frequently)
const BONUSES = {
    '17C': { amount: 50000, note: 'Cyber critical shortage' },
    '35P': { amount: 40000, note: 'Language bonus varies' },
    '68W': { amount: 30000, note: 'Critical medical' },
    '11B': { amount: 20000, note: 'Infantry quick ship' },
    '35F': { amount: 25000, note: 'Intel demand' },
};

async function scrapeArmyMOS(page) {
    console.log('Scraping Army MOS list...');
    await page.goto(`${BASE_URL}/army`, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('table', { timeout: 10000 }).catch(() => { });

    const mosList = await page.evaluate(() => {
        const rows = document.querySelectorAll('table tbody tr');
        const results = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                const link = cells[0].querySelector('a');
                results.push({
                    code: cells[0].textContent?.trim() || '',
                    title: cells[1].textContent?.trim() || '',
                    rank: cells[2].textContent?.trim() || '',
                    url: link?.href || ''
                });
            }
        });

        return results;
    });

    console.log(`  Found ${mosList.length} Army MOS codes`);
    return mosList;
}

async function scrapeMOSDetail(page, mos) {
    if (!mos.url) return mos;

    try {
        console.log(`  Scraping detail: ${mos.code} - ${mos.title.substring(0, 40)}...`);
        await page.goto(mos.url, { waitUntil: 'networkidle2', timeout: 30000 });

        const detail = await page.evaluate(() => {
            const content = document.querySelector('.post-content, .entry-content, main');
            return {
                description: content?.textContent?.trim().substring(0, 3000) || ''
            };
        });

        return { ...mos, ...detail };
    } catch (error) {
        console.error(`  Error scraping ${mos.code}:`, error.message);
        return mos;
    }
}

function enrichMOS(mos) {
    const code = mos.code;

    // Add ASVAB requirements
    const asvab = ASVAB_REQUIREMENTS[code];
    if (asvab) {
        mos.asvabRequirements = asvab;
        mos.minimumScore = Object.values(asvab)[0];
        mos.asvabCategory = Object.keys(asvab)[0];
    }

    // Add bonus info
    const bonus = BONUSES[code];
    if (bonus) {
        mos.signingBonus = bonus.amount;
        mos.bonusNote = bonus.note;
    }

    // Add career field category
    const codePrefix = code.substring(0, 2);
    const careerFields = {
        '11': 'Infantry',
        '12': 'Engineer',
        '13': 'Field Artillery',
        '14': 'Air Defense Artillery',
        '15': 'Aviation',
        '17': 'Cyber',
        '18': 'Special Forces',
        '19': 'Armor',
        '25': 'Signal',
        '27': 'Paralegal',
        '31': 'Military Police',
        '35': 'Military Intelligence',
        '36': 'Finance',
        '37': 'Psychological Operations',
        '38': 'Civil Affairs',
        '42': 'Human Resources',
        '56': 'Chaplain',
        '68': 'Medical',
        '74': 'Chemical',
        '79': 'Recruiting',
        '88': 'Transportation',
        '89': 'Explosive Ordnance Disposal',
        '91': 'Mechanical Maintenance',
        '92': 'Supply/Logistics',
        '94': 'Electronic Maintenance',
    };
    mos.careerField = careerFields[codePrefix] || 'Other';

    // Add ideal candidate traits based on career field
    const traits = {
        'Infantry': ['Physical fitness', 'Leadership', 'Team player', 'Resilience'],
        'Cyber': ['Analytical thinking', 'Problem-solving', 'Technical aptitude', 'Attention to detail'],
        'Military Intelligence': ['Analytical skills', 'Critical thinking', 'Attention to detail', 'Language aptitude'],
        'Medical': ['Compassion', 'Quick decision-making', 'Physical stamina', 'Medical interest'],
        'Signal': ['Technical aptitude', 'Problem-solving', 'Communication skills'],
        'Aviation': ['Mechanical aptitude', 'Attention to detail', 'Physical coordination'],
    };
    mos.idealTraits = traits[mos.careerField] || ['Adaptability', 'Team player', 'Physical fitness'];

    return mos;
}

async function scrapeAllMOS(maxJobs = 50) {
    console.log('Starting MOS database scraper...\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // Get Army MOS list
    let mosList = await scrapeArmyMOS(page);
    mosList = mosList.slice(0, maxJobs);

    console.log(`\nScraping details for ${mosList.length} MOS codes...\n`);

    // Get details for each
    const enrichedMOS = [];
    for (let i = 0; i < mosList.length; i++) {
        const mos = mosList[i];
        const detailed = await scrapeMOSDetail(page, mos);
        const enriched = enrichMOS(detailed);
        enrichedMOS.push(enriched);

        if ((i + 1) % 10 === 0) {
            console.log(`  Progress: ${i + 1}/${mosList.length}`);
        }

        await new Promise(r => setTimeout(r, 500));
    }

    await browser.close();

    // Save results
    const outputPath = path.join(OUTPUT_DIR, 'army_mos.json');
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(enrichedMOS, null, 2));

    // Summary
    const withAsvab = enrichedMOS.filter(m => m.asvabRequirements);
    const withBonus = enrichedMOS.filter(m => m.signingBonus);

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Done! Scraped ${enrichedMOS.length} MOS codes`);
    console.log(`Saved to: ${outputPath}`);
    console.log(`\nEnrichment Summary:`);
    console.log(`  - With ASVAB requirements: ${withAsvab.length}`);
    console.log(`  - With signing bonuses: ${withBonus.length}`);
    console.log('='.repeat(50));

    return enrichedMOS;
}

// Run if called directly
if (require.main === module) {
    const maxJobs = parseInt(process.argv[2]) || 50;
    scrapeAllMOS(maxJobs).catch(console.error);
}

module.exports = { scrapeAllMOS };
