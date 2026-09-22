import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_URL = 'http://127.0.0.1:5173';

const STUDENT_SESSION = {
  id: "s0000000-0000-0000-0000-000000000001",
  name: "Aditi Kulkarni",
  full_name: "Aditi Kulkarni",
  email: "aditi.kulkarni@gmail.com",
  role: "STUDENT",
  is_active: true,
  email_verified: true,
};

async function test() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  await page.goto(`${BASE_URL}/student/login`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((s) => {
    localStorage.setItem('careersetu_auth_session', JSON.stringify(s));
    localStorage.setItem('careersetu_demo_user', JSON.stringify(s));
    localStorage.setItem('careersetu_student_token', 'cs_demo_student_token_valid');
  }, STUDENT_SESSION);

  console.log('Navigating to /dashboard...');
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 3000));
  
  const content = await page.evaluate(() => document.body.innerText);
  console.log('PAGE CONTENT LENGTH:', content.length);
  console.log('PAGE CONTENT PREVIEW:', content.slice(0, 300));

  await browser.close();
}

test().catch(console.error);
