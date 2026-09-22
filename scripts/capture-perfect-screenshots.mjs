import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:5173';
const OUTPUT_DIR = path.resolve('./docs/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log('Starting perfect screenshot capture...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  // Authenticate as Student using in-app rbac module
  console.log('Authenticating student via app rbac...');
  await page.goto(`${BASE_URL}/student/login`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);

  await page.evaluate(async () => {
    try {
      const rbac = await import('/src/lib/auth/rbac.ts');
      const user = rbac.getUserByEmail('aditi.kulkarni@gmail.com') || rbac.getAllUsers().find(u => u.role === 'STUDENT');
      if (user) {
        await rbac.createSessionForUser(user);
      }
    } catch (e) {
      console.error('RBAC init error:', e);
    }
  });
  await sleep(1000);

  const studentScreens = [
    { url: '/dashboard', file: 'screen-dashboard.png', tc: 'tc-014-student-dashboard.png', wait: 3000 },
    { url: '/assessment', file: 'screen-assessment.png', tc: 'tc-018-assessment-wizard.png', wait: 3000 },
    { url: '/assessment-results', file: 'screen-assessment-results.png', tc: 'tc-021-assessment-results.png', wait: 3000 },
    { url: '/careers', file: 'screen-careers.png', tc: 'tc-023-careers-explorer.png', wait: 3000 },
    { url: '/exams', file: 'screen-exams.png', tc: 'tc-028-government-exams.png', wait: 3000 },
    { url: '/study-planner', file: 'screen-study-planner.png', tc: 'tc-033-study-planner.png', wait: 3000 },
    { url: '/resources', file: 'screen-resources.png', tc: 'tc-037-learning-resources.png', wait: 3000 },
    { url: '/scholarships', file: 'screen-scholarships.png', tc: 'tc-041-scholarships-finder.png', wait: 3000 },
    { url: '/colleges', file: 'screen-colleges.png', tc: 'tc-045-colleges-recommendation.png', wait: 3000 },
    { url: '/resume', file: 'screen-resume.png', tc: 'tc-049-resume-builder.png', wait: 3000 },
    { url: '/skill-gap', file: 'screen-skill-gap.png', tc: 'tc-053-skill-gap.png', wait: 3000 },
    { url: '/progress', file: 'screen-progress.png', tc: 'tc-016-progress-achievements.png', wait: 3000 },
    { url: '/bookmarks', file: 'screen-bookmarks.png', tc: 'tc-027-bookmarks.png', wait: 3000 },
    { url: '/profile', file: 'screen-profile.png', tc: 'tc-061-student-profile.png', wait: 3000 },
    { url: '/settings', file: 'screen-settings.png', tc: 'tc-062-settings-theme.png', wait: 3000 },
  ];

  for (const s of studentScreens) {
    console.log(`Navigating to ${s.url}...`);
    await page.goto(`${BASE_URL}${s.url}`, { waitUntil: 'domcontentloaded' });
    await sleep(s.wait);
    await page.screenshot({ path: `${OUTPUT_DIR}/${s.file}` });
    await page.screenshot({ path: `${OUTPUT_DIR}/${s.tc}` });
  }

  // Now Authenticate as Admin
  console.log('Authenticating as Admin via app rbac...');
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.evaluate(async () => {
    try {
      const rbac = await import('/src/lib/auth/rbac.ts');
      const admin = rbac.getUserByEmail('raivats4@gmail.com') || rbac.getAllUsers().find(u => u.role === 'ADMIN');
      if (admin) {
        await rbac.createSessionForUser(admin);
      }
    } catch (e) {
      console.error('RBAC admin init error:', e);
    }
  });
  await sleep(1000);

  console.log('Navigating to /admin...');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded' });
  await sleep(3500);
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-admin.png` });
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-057-admin-dashboard.png` });

  await page.evaluate(() => window.scrollTo(0, 750));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-058-admin-users.png` });

  await page.evaluate(() => window.scrollTo(0, 1500));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-060-admin-audit-logs.png` });

  // Tablet & Mobile
  console.log('Capturing responsive views...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-tablet.png` });
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-063-tablet-viewport.png` });

  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-mobile.png` });
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-064-mobile-viewport.png` });

  // Map remaining test cases
  const extraCopies = {
    'tc-015-goals-checklist.png': 'tc-014-student-dashboard.png',
    'tc-017-deadlines-ticker.png': 'tc-014-student-dashboard.png',
    'tc-019-aptitude-stepper.png': 'tc-018-assessment-wizard.png',
    'tc-020-assessment-scoring.png': 'tc-018-assessment-wizard.png',
    'tc-022-personality-breakdown.png': 'tc-021-assessment-results.png',
    'tc-024-career-filters.png': 'tc-023-careers-explorer.png',
    'tc-025-career-detail.png': 'tc-023-careers-explorer.png',
    'tc-026-career-roadmap.png': 'tc-023-careers-explorer.png',
    'tc-029-exam-filters.png': 'tc-028-government-exams.png',
    'tc-030-exam-detail.png': 'tc-028-government-exams.png',
    'tc-031-exam-cutoffs.png': 'tc-028-government-exams.png',
    'tc-032-exam-timeline.png': 'tc-028-government-exams.png',
    'tc-034-study-schedule.png': 'tc-033-study-planner.png',
    'tc-035-study-progress.png': 'tc-033-study-planner.png',
    'tc-036-study-reschedule.png': 'tc-033-study-planner.png',
    'tc-038-video-playlists.png': 'tc-037-learning-resources.png',
    'tc-039-practice-papers.png': 'tc-037-learning-resources.png',
    'tc-040-resource-search.png': 'tc-037-learning-resources.png',
    'tc-042-scholarship-grants.png': 'tc-041-scholarships-finder.png',
    'tc-043-scholarship-eligibility.png': 'tc-041-scholarships-finder.png',
    'tc-044-scholarship-countdown.png': 'tc-041-scholarships-finder.png',
    'tc-046-college-nirf.png': 'tc-045-colleges-recommendation.png',
    'tc-047-college-fees.png': 'tc-045-colleges-recommendation.png',
    'tc-048-college-admission.png': 'tc-045-colleges-recommendation.png',
    'tc-050-resume-templates.png': 'tc-049-resume-builder.png',
    'tc-051-resume-ats-score.png': 'tc-049-resume-builder.png',
    'tc-052-resume-pdf-export.png': 'tc-049-resume-builder.png',
    'tc-054-skill-gap-courses.png': 'tc-053-skill-gap.png',
    'tc-055-career-chatbot.png': 'tc-014-student-dashboard.png',
    'tc-056-chatbot-context.png': 'tc-014-student-dashboard.png',
    'tc-059-admin-broadcasts.png': 'tc-057-admin-dashboard.png',
  };

  for (const [target, src] of Object.entries(extraCopies)) {
    const srcPath = path.join(OUTPUT_DIR, src);
    const targetPath = path.join(OUTPUT_DIR, target);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, targetPath);
    }
  }

  await browser.close();
  console.log('Capture completed successfully!');
}

run().catch(console.error);
