// CDL Trucking Job Scrapers
// Aggregates driving jobs from major carriers

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Top CDL carriers to scrape
const CARRIERS = [
    {
        name: 'Werner Enterprises',
        url: 'https://www.werner.com/careers/',
        searchUrl: 'https://jobs.werner.com/search-jobs',
        logo: 'werner.png',
    },
    {
        name: 'Schneider',
        url: 'https://schneider.com/company/careers',
        searchUrl: 'https://schneiderjobs.com/truck-driving-jobs',
        logo: 'schneider.png',
    },
    {
        name: 'J.B. Hunt',
        url: 'https://www.jbhunt.com/careers/',
        searchUrl: 'https://jobs.jbhunt.com/',
        logo: 'jbhunt.png',
    },
    {
        name: 'Knight-Swift',
        url: 'https://www.knight-swift.com/drivers/',
        searchUrl: 'https://www.swiftdrivingjobs.com/',
        logo: 'knightswift.png',
    },
    {
        name: 'Old Dominion',
        url: 'https://www.odfl.com/careers',
        searchUrl: 'https://jobs.odfl.com/',
        logo: 'olddom.png',
    },
    {
        name: 'XPO Logistics',
        url: 'https://www.xpo.com/careers',
        searchUrl: 'https://jobs.xpo.com/',
        logo: 'xpo.png',
    },
    {
        name: 'CRST International',
        url: 'https://www.crst.com/careers/',
        searchUrl: 'https://www.crst.com/careers/driver-jobs/',
        logo: 'crst.png',
    },
    {
        name: 'Ryder',
        url: 'https://www.ryder.com/careers',
        searchUrl: 'https://ryder.jobs/',
        logo: 'ryder.png',
    },
    {
        name: 'Penske',
        url: 'https://penske.jobs/',
        searchUrl: 'https://penske.jobs/jobs/?q=driver',
        logo: 'penske.png',
    },
    {
        name: 'Landstar',
        url: 'https://www.landstar.com/',
        searchUrl: 'https://www.landstar.com/Drivers',
        logo: 'landstar.png',
    },
];

// Indeed CDL job search
const INDEED_CDL_URL = 'https://www.indeed.com/jobs?q=CDL+driver&l=';

// Common CDL job types
const CDL_TYPES = [
    'OTR', 'Over the Road',
    'Regional',
    'Local',
    'Dedicated',
    'Tanker',
    'Flatbed',
    'Hazmat',
    'Reefer', 'Refrigerated',
    'Dry Van',
    'LTL',
    'Team Driver',
    'Owner Operator',
];

class CDLJobScraper {
    constructor() {
        this.browser = null;
        this.jobs = [];
    }

    async init() {
        this.browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }

    // Generic Indeed scraper for CDL jobs
    async scrapeIndeedCDL(location = '', maxJobs = 100) {
        console.log(`\n📋 Scraping Indeed CDL jobs for: ${location || 'nationwide'}...`);

        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        const jobs = [];
        let start = 0;

        while (jobs.length < maxJobs) {
            const url = `${INDEED_CDL_URL}${encodeURIComponent(location)}&start=${start}`;

            try {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
                await page.waitForSelector('.job_seen_beacon, .jobsearch-ResultsList', { timeout: 10000 });

                const html = await page.content();
                const $ = cheerio.load(html);

                const jobCards = $('.job_seen_beacon, .resultContent');

                if (jobCards.length === 0) break;

                jobCards.each((i, el) => {
                    const $el = $(el);

                    const title = $el.find('.jobTitle span, h2.jobTitle').text().trim();
                    const company = $el.find('.companyName, [data-testid="company-name"]').text().trim();
                    const location = $el.find('.companyLocation, [data-testid="text-location"]').text().trim();
                    const salary = $el.find('.salary-snippet, .metadata.salary-snippet-container').text().trim();
                    const snippet = $el.find('.job-snippet, .underShelfFooter').text().trim();
                    const link = $el.find('a.jcs-JobTitle').attr('href');

                    if (title && company) {
                        jobs.push({
                            source: 'Indeed',
                            title,
                            company,
                            location,
                            salary: salary || null,
                            description: snippet,
                            url: link ? `https://www.indeed.com${link}` : null,
                            cdlType: detectCDLType(title + ' ' + snippet),
                            endorsements: detectEndorsements(title + ' ' + snippet),
                            scrapedAt: new Date().toISOString(),
                        });
                    }
                });

                start += 10;

                // Rate limiting
                await new Promise(r => setTimeout(r, 2000));

            } catch (error) {
                console.error(`Error on page ${start}:`, error.message);
                break;
            }
        }

        await page.close();
        console.log(`   Found ${jobs.length} CDL jobs from Indeed`);
        return jobs;
    }

    // Scrape a carrier's job board
    async scrapeCarrierJobs(carrier, maxJobs = 50) {
        console.log(`\n🚛 Scraping ${carrier.name}...`);

        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        const jobs = [];

        try {
            await page.goto(carrier.searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            await new Promise(r => setTimeout(r, 3000)); // Wait for dynamic content

            const html = await page.content();
            const $ = cheerio.load(html);

            // Generic job card selectors (will need to be customized per carrier)
            const jobSelectors = [
                '.job-listing', '.job-card', '.job-item', '.career-item',
                '[class*="job"]', '[class*="position"]', '[class*="opening"]',
                'article', '.card', '.listing'
            ];

            for (const selector of jobSelectors) {
                const cards = $(selector);
                if (cards.length > 0) {
                    cards.each((i, el) => {
                        if (jobs.length >= maxJobs) return false;

                        const $el = $(el);
                        const text = $el.text();

                        // Look for job-like content
                        if (text.length > 50 && text.length < 2000) {
                            const title = $el.find('h2, h3, h4, .title, [class*="title"]').first().text().trim();
                            const location = $el.find('[class*="location"], .location').text().trim();
                            const link = $el.find('a').first().attr('href');

                            if (title && title.toLowerCase().includes('driver')) {
                                jobs.push({
                                    source: carrier.name,
                                    title,
                                    company: carrier.name,
                                    location: location || 'Various',
                                    salary: extractSalary(text),
                                    description: text.substring(0, 500),
                                    url: link ? new URL(link, carrier.url).href : carrier.searchUrl,
                                    cdlType: detectCDLType(text),
                                    endorsements: detectEndorsements(text),
                                    benefits: extractBenefits(text),
                                    signingBonus: extractSigningBonus(text),
                                    scrapedAt: new Date().toISOString(),
                                });
                            }
                        }
                    });

                    if (jobs.length > 0) break;
                }
            }

        } catch (error) {
            console.error(`Error scraping ${carrier.name}:`, error.message);
        }

        await page.close();
        console.log(`   Found ${jobs.length} jobs from ${carrier.name}`);
        return jobs;
    }

    // Scrape all carriers
    async scrapeAllCarriers() {
        const allJobs = [];

        for (const carrier of CARRIERS) {
            const jobs = await this.scrapeCarrierJobs(carrier);
            allJobs.push(...jobs);

            // Rate limiting between carriers
            await new Promise(r => setTimeout(r, 3000));
        }

        // Also scrape Indeed
        const indeedJobs = await this.scrapeIndeedCDL('', 200);
        allJobs.push(...indeedJobs);

        return allJobs;
    }

    // Save jobs to file
    async saveJobs(jobs, filename = 'cdl_jobs.json') {
        const outputDir = path.join(__dirname, '../data/positions/imports');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, filename);
        fs.writeFileSync(outputPath, JSON.stringify(jobs, null, 2));
        console.log(`\n✅ Saved ${jobs.length} jobs to ${outputPath}`);

        // Also save summary
        const summary = {
            totalJobs: jobs.length,
            bySource: {},
            byType: {},
            scrapedAt: new Date().toISOString(),
        };

        jobs.forEach(job => {
            summary.bySource[job.source] = (summary.bySource[job.source] || 0) + 1;
            if (job.cdlType) {
                summary.byType[job.cdlType] = (summary.byType[job.cdlType] || 0) + 1;
            }
        });

        console.log('\n📊 Summary:');
        console.log(`   Total Jobs: ${summary.totalJobs}`);
        console.log('   By Source:', summary.bySource);
        console.log('   By Type:', summary.byType);

        return summary;
    }
}

// Helper functions
function detectCDLType(text) {
    const lower = text.toLowerCase();

    if (lower.includes('otr') || lower.includes('over the road')) return 'OTR';
    if (lower.includes('regional')) return 'Regional';
    if (lower.includes('local')) return 'Local';
    if (lower.includes('dedicated')) return 'Dedicated';
    if (lower.includes('tanker')) return 'Tanker';
    if (lower.includes('flatbed')) return 'Flatbed';
    if (lower.includes('hazmat')) return 'Hazmat';
    if (lower.includes('reefer') || lower.includes('refrigerat')) return 'Reefer';
    if (lower.includes('dry van')) return 'Dry Van';
    if (lower.includes('ltl')) return 'LTL';
    if (lower.includes('team')) return 'Team Driver';
    if (lower.includes('owner') && lower.includes('operator')) return 'Owner Operator';

    return 'General';
}

function detectEndorsements(text) {
    const endorsements = [];
    const lower = text.toLowerCase();

    if (lower.includes('hazmat') || lower.includes('h endorsement')) endorsements.push('H');
    if (lower.includes('tanker') || lower.includes('n endorsement')) endorsements.push('N');
    if (lower.includes('doubles') || lower.includes('triples') || lower.includes('t endorsement')) endorsements.push('T');
    if (lower.includes('passenger') || lower.includes('p endorsement')) endorsements.push('P');
    if (lower.includes('school bus') || lower.includes('s endorsement')) endorsements.push('S');

    return endorsements;
}

function extractSalary(text) {
    // Look for salary patterns
    const patterns = [
        /\$(\d{1,3},?\d{3})\s*[-–to]\s*\$?(\d{1,3},?\d{3})/i,  // Range
        /\$(\d{1,3},?\d{3})\s*(per year|annually|\/yr)/i,       // Annual
        /\$(\d+\.?\d*)\s*(per mile|\/mile|cpm)/i,               // Per mile
        /(\d+\.?\d*)\s*cents?\s*per\s*mile/i,                   // Cents per mile
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match) {
            return match[0];
        }
    }

    return null;
}

function extractSigningBonus(text) {
    const pattern = /\$(\d{1,3},?\d{3})\s*(sign|bonus)/i;
    const match = text.match(pattern);
    if (match) {
        return parseInt(match[1].replace(',', ''));
    }
    return null;
}

function extractBenefits(text) {
    const benefits = [];
    const lower = text.toLowerCase();

    if (lower.includes('health') || lower.includes('medical')) benefits.push('Health Insurance');
    if (lower.includes('dental')) benefits.push('Dental');
    if (lower.includes('vision')) benefits.push('Vision');
    if (lower.includes('401k') || lower.includes('retirement')) benefits.push('401(k)');
    if (lower.includes('paid time') || lower.includes('pto') || lower.includes('vacation')) benefits.push('PTO');
    if (lower.includes('home weekly') || lower.includes('home daily')) benefits.push('Home Time');
    if (lower.includes('no touch')) benefits.push('No-Touch Freight');
    if (lower.includes('rider')) benefits.push('Rider Program');
    if (lower.includes('pet')) benefits.push('Pet Policy');

    return benefits;
}

// Main execution
async function main() {
    const scraper = new CDLJobScraper();

    try {
        await scraper.init();

        console.log('🚚 Caprica CDL Job Scraper');
        console.log('========================\n');

        // Scrape all sources
        const jobs = await scraper.scrapeAllCarriers();

        // Deduplicate by title + company
        const seen = new Set();
        const uniqueJobs = jobs.filter(job => {
            const key = `${job.title}-${job.company}`.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });

        // Save results
        await scraper.saveJobs(uniqueJobs);

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await scraper.close();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { CDLJobScraper, CARRIERS };
