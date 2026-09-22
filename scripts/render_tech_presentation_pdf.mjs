import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('Launching Chrome to render Technology Stack Presentation Guide PDF...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  const htmlPath = path.resolve('docs/technology_stack_presentation.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
  
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2000));

  const outputDocPdf = path.resolve('Project Documentation/CareerSetu_AI_Technology_Stack_Presentation_Guide.pdf');
  const outputRootPdf = path.resolve('CareerSetu_AI_Technology_Stack_Presentation_Guide.pdf');
  const outputParentPdf = path.resolve('../CareerSetu_AI_Technology_Stack_Presentation_Guide.pdf');

  await page.pdf({
    path: outputDocPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '12mm', left: '12mm', right: '12mm' }
  });

  console.log(`Saved PDF to: ${outputDocPdf}`);

  fs.copyFileSync(outputDocPdf, outputRootPdf);
  console.log(`Saved PDF to: ${outputRootPdf}`);

  try {
    fs.copyFileSync(outputDocPdf, outputParentPdf);
    console.log(`Saved PDF to: ${outputParentPdf}`);
  } catch (e) {
    console.warn('Could not copy to parent folder:', e.message);
  }

  await browser.close();
  console.log('Technology Stack Presentation Guide PDF generated successfully!');
}

run().catch(console.error);
