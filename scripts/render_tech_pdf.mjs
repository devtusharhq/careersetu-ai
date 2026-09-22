
import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/HP/Desktop/careersetu-ai-main/careersetu-ai-main/docs/technical_documentation_full.html', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2500));
  
  await page.pdf({
    path: 'C:\\Users\\HP\\Desktop\\careersetu-ai-main\\CareerSetu_AI_Technical_Project_Documentation.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '14mm', left: '12mm', right: '12mm' }
  });
  
  fs.copyFileSync('C:\\Users\\HP\\Desktop\\careersetu-ai-main\\CareerSetu_AI_Technical_Project_Documentation.pdf', 'C:\\Users\\HP\\Desktop\\careersetu-ai-main\\careersetu-ai-main\\CareerSetu_AI_Technical_Project_Documentation.pdf');
  await browser.close();
  console.log('Technical Documentation PDF generated successfully!');
}
run().catch(console.error);
