#!/usr/bin/env node
/**
 * Veteran-Friendly Job Scraper
 * Fetches jobs from top veteran-hiring companies
 * Uses career page APIs where available, falls back to web scraping
 */

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Target companies with their job search URLs and strategies
const TARGETS = [
    // DEFENSE CONTRACTORS (High clearance jobs)
    {
        name: 'Lockheed Martin',
        searchUrl: 'https://www.lockheedmartinjobs.com/search-jobs/veteran',
        strategy: 'api', // Use their job API
        industry: 'Defense',
        clearanceJobs: true,
    },
    {
        name: 'Booz Allen Hamilton',
        searchUrl: 'https://careers.boozallen.com/jobs/search?q=&team=All+Teams&loc=All+Locations&k=veteran',
        strategy: 'scrape',
        industry: 'Defense',
        clearanceJobs: true,
    },
    {
        name: 'CACI',
        searchUrl: 'https://careers.caci.com/global/en/search-results?keywords=',
        strategy: 'scrape',
        industry: 'Defense',
        clearanceJobs: true,
    },

    // TECH (High paying)
    {
        name: 'Amazon',
        searchUrl: 'https://www.amazon.jobs/en/search?base_query=&loc_query=&latitude=&longitude=&loc_group_id=&invalid_location=false&country=USA&city=&region=&county=&is_military=true',
        strategy: 'api',
        industry: 'Tech',
        clearanceJobs: false,
    },
    {
        name: 'Microsoft',
        searchUrl: 'https://careers.microsoft.com/us/en/search-results?keywords=veterans',
        strategy: 'scrape',
        industry: 'Tech',
        clearanceJobs: false,
    },
    {
        name: 'Google',
        searchUrl: 'https://careers.google.com/jobs/results/?employment_type=FULL_TIME&location=United%20States&q=',
        strategy: 'scrape',
        industry: 'Tech',
        clearanceJobs: false,
    },

    // FINANCIAL (Stable)
    {
        name: 'USAA',
        searchUrl: 'https://www.usaajobs.com/search-jobs',
        strategy: 'scrape',
        industry: 'Financial',
        clearanceJobs: false,
    },
    {
        name: 'JPMorgan Chase',
        searchUrl: 'https://careers.jpmorgan.com/us/en/search-results?keywords=&activeTab=0',
        strategy: 'scrape',
        industry: 'Financial',
        clearanceJobs: false,
    },

    // HEALTHCARE
    {
        name: 'HCA Healthcare',
        searchUrl: 'https://careers.hcahealthcare.com/search/?q=&sortColumn=referencedate&sortDirection=desc',
        strategy: 'scrape',
        industry: 'Healthcare',
        clearanceJobs: false,
    },

    // TRANSPORTATION (CDL friendly)
    {
        name: 'FedEx',
        searchUrl: 'https://careers.fedex.com/jobs?keywords=&page=1&sortBy=relevance&categories=Ground%20Operations',
        strategy: 'scrape',
        industry: 'Logistics',
        clearanceJobs: false,
    },
    {
        name: 'UPS',
        searchUrl: 'https://www.jobs-ups.com/search-jobs/military/1187/1',
        strategy: 'scrape',
        industry: 'Logistics',
        clearanceJobs: false,
    },
];

// Indeed search for veteran jobs
const INDEED_SEARCHES = [
    { query: 'veteran', location: 'United States', sort: 'date' },
    { query: 'security clearance', location: 'Washington DC', sort: 'date' },
    { query: 'TS/SCI', location: 'United States', sort: 'salary' },
    { query: 'military experience', location: 'United States', sort: 'date' },
    { query: 'SkillBridge', location: 'United States', sort: 'date' },
];

class VetJobScraper {
    constructor() {
        this.browser = null;
        this.jobs = [];
    }

    async init() {
        console.log('🎖️ Veteran Job Scraper Starting...\n');
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

    // Scrape Indeed for veteran jobs
    async scrapeIndeed(query, location) {
        console.log(`📋 Searching Indeed: "${query}" in ${location}...`);
        const page = await this.browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        try {
            const url = `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}&l=${encodeURIComponent(location)}&sort=date`;
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForSelector('.job_seen_beacon, .jobsearch-ResultsList', { timeout: 10000 });

            const content = await page.content();
            const $ = cheerio.load(content);

            const jobs = [];
            $('.job_seen_beacon, .jobCard_mainContent').each((i, el) => {
                const title = $(el).find('.jobTitle span, h2.jobTitle').text().trim();
                const company = $(el).find('.companyName, [data-testid="company-name"]').text().trim();
                const location = $(el).find('.companyLocation, [data-testid="text-location"]').text().trim();

                if (title && company) {
                    jobs.push({
                        title,
                        company,
                        location,
                        source: 'Indeed',
                        searchQuery: query,
                        veteranFriendly: true,
                        scrapedAt: new Date().toISOString(),
                    });
                }
            });

            console.log(`   Found ${jobs.length} jobs from Indeed for "${query}"`);
            return jobs;

        } catch (error) {
            console.error(`   Error searching Indeed: ${error.message}`);
            return [];
        } finally {
            await page.close();
        }
    }

    // Scrape LinkedIn veteran jobs
    async scrapeLinkedIn() {
        console.log('💼 Searching LinkedIn for veteran jobs...');
        const page = await this.browser.newPage();

        try {
            // LinkedIn public job search
            const url = 'https://www.linkedin.com/jobs/search/?keywords=veteran&location=United%20States';
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            const content = await page.content();
            const $ = cheerio.load(content);

            const jobs = [];
            $('.jobs-search__results-list li, .base-card').each((i, el) => {
                const title = $(el).find('.base-search-card__title, h3').text().trim();
                const company = $(el).find('.base-search-card__subtitle, h4').text().trim();
                const location = $(el).find('.job-search-card__location').text().trim();

                if (title && company) {
                    jobs.push({
                        title,
                        company,
                        location,
                        source: 'LinkedIn',
                        veteranFriendly: true,
                        scrapedAt: new Date().toISOString(),
                    });
                }
            });

            console.log(`   Found ${jobs.length} jobs from LinkedIn`);
            return jobs;

        } catch (error) {
            console.error(`   Error searching LinkedIn: ${error.message}`);
            return [];
        } finally {
            await page.close();
        }
    }

    // Scrape specific company careers page
    async scrapeCompanyPage(target) {
        console.log(`🏢 Scraping ${target.name}...`);
        const page = await this.browser.newPage();

        try {
            await page.goto(target.searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForTimeout(2000); // Wait for dynamic content

            const content = await page.content();
            const $ = cheerio.load(content);

            const jobs = [];
            // Generic selectors that work across many job boards
            $('[class*="job"], [class*="Job"], [class*="position"], [class*="opening"], [data-job], .search-result').each((i, el) => {
                let title = $(el).find('[class*="title"], h2, h3, a').first().text().trim();
                let location = $(el).find('[class*="location"], [class*="Location"]').first().text().trim();

                // Clean up title
                title = title.replace(/\n/g, ' ').replace(/\s+/g, ' ').substring(0, 100);

                if (title && title.length > 3 && !title.includes('Sign in') && !title.includes('Login')) {
                    jobs.push({
                        title,
                        company: target.name,
                        location: location || 'Various',
                        source: target.name,
                        industry: target.industry,
                        clearanceRequired: target.clearanceJobs,
                        veteranFriendly: true,
                        scrapedAt: new Date().toISOString(),
                    });
                }
            });

            console.log(`   Found ${jobs.length} jobs from ${target.name}`);
            return jobs.slice(0, 20); // Limit per company

        } catch (error) {
            console.error(`   Error scraping ${target.name}: ${error.message}`);
            return [];
        } finally {
            await page.close();
        }
    }

    async scrapeAll() {
        // Indeed searches
        for (const search of INDEED_SEARCHES) {
            const jobs = await this.scrapeIndeed(search.query, search.location);
            this.jobs.push(...jobs);
            await this.sleep(2000); // Rate limiting
        }

        // LinkedIn
        const linkedInJobs = await this.scrapeLinkedIn();
        this.jobs.push(...linkedInJobs);

        // Company-specific scraping
        for (const target of TARGETS) {
            const jobs = await this.scrapeCompanyPage(target);
            this.jobs.push(...jobs);
            await this.sleep(2000);
        }

        return this.jobs;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    deduplicate(jobs) {
        const seen = new Set();
        return jobs.filter(job => {
            const key = `${job.title.toLowerCase().substring(0, 30)}-${job.company.toLowerCase()}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    async saveJobs(jobs) {
        const outputDir = path.join(__dirname, '../data/positions/imports');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, 'veteran_jobs.json');
        fs.writeFileSync(outputPath, JSON.stringify(jobs, null, 2));
        console.log(`\n✅ Saved ${jobs.length} veteran-friendly jobs to ${outputPath}`);
    }
}

async function main() {
    const scraper = new VetJobScraper();

    try {
        await scraper.init();
        const allJobs = await scraper.scrapeAll();
        const uniqueJobs = scraper.deduplicate(allJobs);
        await scraper.saveJobs(uniqueJobs);

        console.log('\n📊 Summary:');
        console.log(`   Total jobs: ${uniqueJobs.length}`);

        // Group by source
        const bySource = {};
        uniqueJobs.forEach(job => {
            bySource[job.source] = (bySource[job.source] || 0) + 1;
        });
        console.log('   By source:', bySource);

        // Group by industry
        const byIndustry = {};
        uniqueJobs.forEach(job => {
            if (job.industry) {
                byIndustry[job.industry] = (byIndustry[job.industry] || 0) + 1;
            }
        });
        console.log('   By industry:', byIndustry);

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await scraper.close();
    }
}

main();
