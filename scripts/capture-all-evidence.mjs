import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:5173';
const OUTPUT_DIR = path.resolve('./docs/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Student demo session payload
const STUDENT_SESSION = {
  id: "s0000000-0000-0000-0000-000000000001",
  name: "Aditi Kulkarni",
  full_name: "Aditi Kulkarni",
  email: "aditi.kulkarni@gmail.com",
  role: "STUDENT",
  phone: "9876543210",
  age: "20",
  gender: "Female",
  state: "Maharashtra",
  city: "Pune",
  education: "Graduate (B.Tech CS)",
  current_education: "Graduate (B.Tech CS)",
  preferred_language: "English",
  is_active: true,
  status: "ACTIVE",
  email_verified: true,
  is_first_login: false,
  created_at: "2026-03-01T09:30:00.000Z",
  registeredAt: "2026-03-01T09:30:00.000Z",
  updated_at: "2026-03-01T09:30:00.000Z",
  last_login_at: new Date().toISOString(),
  lastActive: new Date().toISOString(),
};

// Admin demo session payload
const ADMIN_SESSION = {
  id: "a0000000-0000-0000-0000-000000000001",
  name: "Primary Administrator",
  full_name: "Primary Administrator",
  email: "raivats4@gmail.com",
  role: "ADMIN",
  phone: "9876500001",
  state: "Maharashtra",
  city: "Mumbai",
  is_active: true,
  status: "ACTIVE",
  email_verified: true,
  is_first_login: false,
  created_at: "2026-01-01T00:00:00.000Z",
  registeredAt: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  last_login_at: new Date().toISOString(),
  lastActive: new Date().toISOString(),
};

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);

  async function setStudentAuth() {
    await page.evaluate((session) => {
      localStorage.setItem('careersetu_auth_session', JSON.stringify(session));
      localStorage.setItem('careersetu_demo_user', JSON.stringify(session));
      localStorage.setItem('careersetu_student_token', 'cs_demo_student_token_valid');
    }, STUDENT_SESSION);
  }

  async function setAdminAuth() {
    await page.evaluate((session) => {
      localStorage.setItem('careersetu_auth_session', JSON.stringify(session));
      localStorage.setItem('careersetu_demo_user', JSON.stringify(session));
      localStorage.setItem('careersetu_admin_token', 'cs_demo_admin_token_valid');
    }, ADMIN_SESSION);
  }

  // 1. Landing Page
  console.log('Capturing Landing Page...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-009-landing-hero.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-landing.png`, fullPage: false });

  // Scroll down for stats, features, FAQ
  await page.evaluate(() => window.scrollTo(0, 1000));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-010-stats-news.png`, fullPage: false });

  await page.evaluate(() => window.scrollTo(0, 2200));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-011-features-categories.png`, fullPage: false });

  await page.evaluate(() => window.scrollTo(0, 3400));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-012-testimonials-faq.png`, fullPage: false });

  // 2. Student Signup
  console.log('Capturing Student Signup...');
  await page.goto(`${BASE_URL}/student/signup`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-001-student-signup.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-student-signup.png`, fullPage: false });

  // 3. Student Login
  console.log('Capturing Student Login...');
  await page.goto(`${BASE_URL}/student/login`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-002-student-login.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-student-login.png`, fullPage: false });

  // 4. Student MFA
  console.log('Capturing Student MFA...');
  await page.goto(`${BASE_URL}/student/verify-mfa`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-003-student-mfa.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-student-mfa.png`, fullPage: false });

  // 5. Admin Login & Signup
  console.log('Capturing Admin Login & Signup...');
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-006-admin-login.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-admin-login.png`, fullPage: false });

  await page.goto(`${BASE_URL}/admin/signup`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-005-admin-signup.png`, fullPage: false });

  await page.goto(`${BASE_URL}/admin/forgot-password`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-007-admin-forgot-password.png`, fullPage: false });

  // Now set student authentication and capture authenticated pages
  console.log('Setting student session and capturing student workspace...');
  await page.goto(`${BASE_URL}/student/login`, { waitUntil: 'domcontentloaded' });
  await setStudentAuth();
  await sleep(1000);

  // 6. Student Dashboard
  console.log('Capturing Student Dashboard...');
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-014-student-dashboard.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-dashboard.png`, fullPage: false });

  // 7. Assessment
  console.log('Capturing Assessment Wizard...');
  await page.goto(`${BASE_URL}/assessment`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-018-assessment-wizard.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-assessment.png`, fullPage: false });

  // Assessment Results
  console.log('Capturing Assessment Results...');
  await page.goto(`${BASE_URL}/assessment-results`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-021-assessment-results.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-assessment-results.png`, fullPage: false });

  // 8. Careers
  console.log('Capturing Career Explorer...');
  await page.goto(`${BASE_URL}/careers`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-023-careers-explorer.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-careers.png`, fullPage: false });

  // 9. Exams
  console.log('Capturing Government Exams...');
  await page.goto(`${BASE_URL}/exams`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-028-government-exams.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-exams.png`, fullPage: false });

  // 10. Study Planner
  console.log('Capturing Study Planner...');
  await page.goto(`${BASE_URL}/study-planner`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-033-study-planner.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-study-planner.png`, fullPage: false });

  // 11. Resources
  console.log('Capturing Learning Resources...');
  await page.goto(`${BASE_URL}/resources`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-037-learning-resources.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-resources.png`, fullPage: false });

  // 12. Scholarships
  console.log('Capturing Scholarships...');
  await page.goto(`${BASE_URL}/scholarships`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-041-scholarships-finder.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-scholarships.png`, fullPage: false });

  // 13. Colleges
  console.log('Capturing Colleges...');
  await page.goto(`${BASE_URL}/colleges`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-045-colleges-recommendation.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-colleges.png`, fullPage: false });

  // 14. Resume Builder
  console.log('Capturing Resume Builder...');
  await page.goto(`${BASE_URL}/resume`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-049-resume-builder.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-resume.png`, fullPage: false });

  // 15. Skill Gap Analysis
  console.log('Capturing Skill Gap Analysis...');
  await page.goto(`${BASE_URL}/skill-gap`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-053-skill-gap.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-skill-gap.png`, fullPage: false });

  // 16. Progress
  console.log('Capturing Progress & Achievements...');
  await page.goto(`${BASE_URL}/progress`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-016-progress-achievements.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-progress.png`, fullPage: false });

  // 17. Bookmarks
  console.log('Capturing Bookmarks...');
  await page.goto(`${BASE_URL}/bookmarks`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-027-bookmarks.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-bookmarks.png`, fullPage: false });

  // 18. Profile
  console.log('Capturing Profile...');
  await page.goto(`${BASE_URL}/profile`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-061-student-profile.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-profile.png`, fullPage: false });

  // 19. Settings
  console.log('Capturing Settings...');
  await page.goto(`${BASE_URL}/settings`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-062-settings-theme.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-settings.png`, fullPage: false });

  // 20. Admin Management Console
  console.log('Setting Admin session and capturing Admin Console...');
  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' });
  await setAdminAuth();
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded' });
  await sleep(2500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-057-admin-dashboard.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-admin.png`, fullPage: false });

  // Scroll down to user management table in Admin
  await page.evaluate(() => window.scrollTo(0, 700));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-058-admin-users.png`, fullPage: false });

  // Scroll down to audit logs in Admin
  await page.evaluate(() => window.scrollTo(0, 1600));
  await sleep(1000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-060-admin-audit-logs.png`, fullPage: false });

  // 21. Responsive Viewports: Tablet (768x1024)
  console.log('Capturing Tablet Viewport...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await sleep(2000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-063-tablet-viewport.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-tablet.png`, fullPage: false });

  // 22. Responsive Viewports: Mobile (375x812)
  console.log('Capturing Mobile Viewport...');
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await sleep(2000);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-064-mobile-viewport.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-mobile.png`, fullPage: false });

  // 23. 404 Route Fallback
  console.log('Capturing 404 Fallback...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/non-existent-career-route-404`, { waitUntil: 'domcontentloaded' });
  await sleep(1500);
  await page.screenshot({ path: `${OUTPUT_DIR}/tc-065-route-404.png`, fullPage: false });
  await page.screenshot({ path: `${OUTPUT_DIR}/screen-404.png`, fullPage: false });

  // Map remaining test case screenshot files
  const copyMap = {
    'tc-004-invalid-password.png': 'tc-002-student-login.png',
    'tc-008-route-guard.png': 'tc-002-student-login.png',
    'tc-013-faq-helpdesk.png': 'tc-012-testimonials-faq.png',
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

  for (const [target, src] of Object.entries(copyMap)) {
    const srcPath = path.join(OUTPUT_DIR, src);
    const targetPath = path.join(OUTPUT_DIR, target);
    if (fs.existsSync(srcPath) && !fs.existsSync(targetPath)) {
      fs.copyFileSync(srcPath, targetPath);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
