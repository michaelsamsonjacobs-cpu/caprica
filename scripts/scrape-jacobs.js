// Jacobs Careers Job Scraper
// Scrapes all job listings from careers.jacobs.com

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://careers.jacobs.com/en_US/careers/SearchJobs/';
const JOBS_PER_PAGE = 10;
const OUTPUT_DIR = path.join(__dirname, '../data/positions/imports');

async function scrapeJobList(page, offset = 0) {
    const url = `${BASE_URL}?listFilterMode=1&jobRecordsPerPage=${JOBS_PER_PAGE}&jobOffset=${offset}`;
    console.log(`Scraping page at offset ${offset}...`);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the job listings to load
    await page.waitForSelector('article.article--result', { timeout: 10000 }).catch(() => {
        console.log('  No article.article--result found, page may have no results');
    });

    // Give extra time for dynamic content
    await new Promise(r => setTimeout(r, 2000));

    // Extract job cards from the page
    const jobs = await page.evaluate(() => {
        const results = [];

        // Find all job article containers
        const jobArticles = document.querySelectorAll('article.article--result');

        jobArticles.forEach(article => {
            try {
                // Get title and URL
                const titleLink = article.querySelector('h3.article__header__text__title a.link');
                const title = titleLink?.textContent?.trim() || '';
                const url = titleLink?.href || '';

                // Get subtitle with location | job ID | department info
                const subtitle = article.querySelector('.article__header__text__subtitle');
                const subtitleText = subtitle?.textContent?.trim() || '';

                // Parse the pipe-separated subtitle
                const parts = subtitleText.split('|').map(p => p.trim());
                const location = parts[0] || '';
                const jobId = parts[1] || '';
                const department = parts[2] || '';
                const category = parts[3] || '';

                if (title) {
                    results.push({
                        title,
                        url,
                        location,
                        jobId,
                        department,
                        category
                    });
                }
            } catch (e) {
                console.error('Error parsing job article:', e);
            }
        });

        return results;
    });

    console.log(`  Found ${jobs.length} jobs on this page`);
    return jobs;
}

async function scrapeJobDetail(page, jobUrl, basicInfo) {
    try {
        console.log(`  Scraping detail: ${basicInfo.title.substring(0, 50)}...`);
        await page.goto(jobUrl, { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for content to load
        await page.waitForSelector('.job-details, .article__body, main', { timeout: 10000 }).catch(() => { });
        await new Promise(r => setTimeout(r, 1000));

        const details = await page.evaluate(() => {
            // Get the main job description - try multiple selectors
            const descriptionEl = document.querySelector('.job-details__body, .article__body, [data-automation-id="jobDescription"], .richText');
            const descriptionText = descriptionEl?.textContent?.trim() || '';
            const descriptionHtml = descriptionEl?.innerHTML || '';

            // Extract key sections
            const extractSection = (text, patterns) => {
                for (const pattern of patterns) {
                    const match = text.match(pattern);
                    if (match) return match[0];
                }
                return '';
            };

            const requirements = extractSection(descriptionText, [
                /(?:Here's What You'll Need|Requirements|Qualifications|What you'll need|Required)[\s\S]*?(?=\n\n|\n(?:[A-Z][a-z]+:)|$)/i
            ]);

            const responsibilities = extractSection(descriptionText, [
                /(?:Your Impact|Responsibilities|What you'll do|Duties)[\s\S]*?(?=\n\n|\n(?:[A-Z][a-z]+:)|$)/i
            ]);

            // Extract skills using common patterns
            const skillPatterns = /(?:python|javascript|java|c\+\+|sql|aws|azure|gcp|kubernetes|docker|react|angular|node|typescript|excel|project management|communication|leadership|engineering|construction|design|analysis|cad|autocad|revit|bim|gis)/gi;
            const skillsFound = new Set();
            const skillMatches = descriptionText.match(skillPatterns);
            if (skillMatches) {
                skillMatches.forEach(m => skillsFound.add(m.toLowerCase()));
            }

            // Get work mode (Remote/Hybrid/Onsite)
            const workModePattern = /(fully remote|remote|hybrid|on-?site|in-?office)/i;
            const workModeMatch = descriptionText.match(workModePattern);
            const workMode = workModeMatch ? workModeMatch[1] : 'Not specified';

            // Get security clearance requirements
            const clearancePattern = /(secret clearance|top secret|ts\/sci|clearance required|security clearance|public trust)/i;
            const clearanceMatch = descriptionText.match(clearancePattern);
            const clearance = clearanceMatch ? clearanceMatch[0] : '';

            // Get education requirements
            const educationPattern = /(bachelor'?s?|master'?s?|phd|associate'?s?|high school|ged|degree in|years? of education)/i;
            const educationMatch = descriptionText.match(educationPattern);
            const education = educationMatch ? educationMatch[0] : '';

            // Get experience requirements
            const experiencePattern = /(\d+\+?\s*(?:to\s*\d+)?\s*years?\s*(?:of)?\s*experience)/i;
            const experienceMatch = descriptionText.match(experiencePattern);
            const experience = experienceMatch ? experienceMatch[0] : '';

            return {
                description: descriptionText.substring(0, 8000), // Limit size
                descriptionHtml: descriptionHtml.substring(0, 15000),
                requirements: requirements.substring(0, 3000),
                responsibilities: responsibilities.substring(0, 3000),
                skills: Array.from(skillsFound).slice(0, 25),
                workMode,
                clearance,
                education,
                experience
            };
        });

        return {
            ...basicInfo,
            ...details,
            scrapedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`  Error scraping ${jobUrl}:`, error.message);
        return {
            ...basicInfo,
            error: error.message,
            scrapedAt: new Date().toISOString()
        };
    }
}

async function scrapeAllJobs(maxJobs = 50) {
    console.log('Starting Jacobs careers scraper...\n');
    console.log(`Target: up to ${maxJobs} jobs\n`);

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    let allJobs = [];
    let offset = 0;
    let hasMore = true;
    let emptyPageCount = 0;

    // Phase 1: Collect job URLs
    console.log('Phase 1: Collecting job listings...\n');

    while (hasMore && allJobs.length < maxJobs && emptyPageCount < 2) {
        const jobs = await scrapeJobList(page, offset);

        if (jobs.length === 0) {
            emptyPageCount++;
            console.log(`  Empty page (${emptyPageCount}/2)`);
        } else {
            emptyPageCount = 0;
            allJobs = allJobs.concat(jobs);
            console.log(`  Total collected: ${allJobs.length}`);
        }

        if (allJobs.length >= maxJobs) {
            hasMore = false;
            allJobs = allJobs.slice(0, maxJobs);
        } else {
            offset += JOBS_PER_PAGE;
            // Be polite - wait between requests
            await new Promise(r => setTimeout(r, 1500));
        }
    }

    console.log(`\nCollected ${allJobs.length} job listings.\n`);

    // Phase 2: Get detailed info for each job
    console.log('Phase 2: Scraping job details...\n');

    const detailedJobs = [];
    for (let i = 0; i < allJobs.length; i++) {
        const job = allJobs[i];
        if (job.url) {
            const detailed = await scrapeJobDetail(page, job.url, job);
            detailedJobs.push(detailed);

            // Progress indicator
            if ((i + 1) % 5 === 0) {
                console.log(`  Progress: ${i + 1}/${allJobs.length}`);
            }

            // Be polite
            await new Promise(r => setTimeout(r, 800));
        }
    }

    await browser.close();

    // Save results
    const outputPath = path.join(OUTPUT_DIR, 'jacobs_jobs.json');
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(detailedJobs, null, 2));

    console.log(`\n${'='.repeat(50)}`);
    console.log(`Done! Scraped ${detailedJobs.length} jobs.`);
    console.log(`Saved to: ${outputPath}`);

    // Summary
    const withDetails = detailedJobs.filter(j => j.description && j.description.length > 100);
    const withErrors = detailedJobs.filter(j => j.error);
    const withClearance = detailedJobs.filter(j => j.clearance);

    console.log(`\nSummary:`);
    console.log(`  - Jobs with full details: ${withDetails.length}`);
    console.log(`  - Jobs requiring clearance: ${withClearance.length}`);
    console.log(`  - Jobs with errors: ${withErrors.length}`);
    console.log('='.repeat(50));

    return detailedJobs;
}

// Run if called directly
if (require.main === module) {
    const maxJobs = parseInt(process.argv[2]) || 30; // Default to 30 jobs
    scrapeAllJobs(maxJobs).catch(console.error);
}

module.exports = { scrapeAllJobs, scrapeJobList, scrapeJobDetail };
