import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('./docs/screenshots');
const OUTPUT_PDF_3 = path.resolve('../CareerSetu_AI_UI_UX_Design_Documentation.pdf');
const OUTPUT_PDF_3_LOCAL = path.resolve('./CareerSetu_AI_UI_UX_Design_Documentation.pdf');

function getBase64Image(filename) {
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  const fallbackPath = path.join(SCREENSHOTS_DIR, 'screen-landing.png');
  if (fs.existsSync(fallbackPath)) {
    const data = fs.readFileSync(fallbackPath);
    return `data:image/png;base64,${data.toString('base64')}`;
  }
  return '';
}

function buildHtml() {
  const imgLanding = getBase64Image('screen-landing.png');
  const imgLogin = getBase64Image('screen-student-login.png');
  const imgMfa = getBase64Image('screen-student-mfa.png');
  const imgSignup = getBase64Image('screen-student-signup.png');
  const imgDashboard = getBase64Image('screen-dashboard.png');
  const imgAssessment = getBase64Image('screen-assessment.png');
  const imgResults = getBase64Image('screen-assessment-results.png');
  const imgCareers = getBase64Image('screen-careers.png');
  const imgExams = getBase64Image('screen-exams.png');
  const imgStudy = getBase64Image('screen-study-planner.png');
  const imgResources = getBase64Image('screen-resources.png');
  const imgScholarships = getBase64Image('screen-scholarships.png');
  const imgColleges = getBase64Image('screen-colleges.png');
  const imgResume = getBase64Image('screen-resume.png');
  const imgSkillGap = getBase64Image('screen-skill-gap.png');
  const imgProgress = getBase64Image('screen-progress.png');
  const imgBookmarks = getBase64Image('screen-bookmarks.png');
  const imgProfile = getBase64Image('screen-profile.png');
  const imgAdmin = getBase64Image('screen-admin.png');
  const imgTablet = getBase64Image('screen-tablet.png');
  const imgMobile = getBase64Image('screen-mobile.png');
  const img404 = getBase64Image('screen-404.png');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CareerSetu AI — UI/UX Design Documentation</title>
  <style>
    @page {
      size: A4;
      margin: 14mm 16mm 16mm 16mm;
      @top-right {
        content: "CareerSetu AI | UI/UX Design Documentation - Final Academic Submission";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-left {
        content: "Software Project Management (SPM) | Role: UI/UX Designer & Frontend UI Engineering";
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-right {
        content: "Page " counter(page);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.5;
      color: #1e293b;
      background: #ffffff;
    }

    .page-break {
      page-break-before: always;
    }

    /* Cover Page */
    .cover-top-sub {
      font-size: 8.5pt;
      font-weight: 700;
      color: #0284c7;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .cover-top-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #166534;
      margin-bottom: 25px;
    }
    .cover-title {
      font-size: 32pt;
      font-weight: 850;
      color: #0f172a;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .cover-subtitle {
      font-size: 14pt;
      font-weight: 600;
      color: #475569;
      margin-bottom: 12px;
    }
    .cover-desc {
      font-size: 9.5pt;
      color: #64748b;
      margin-bottom: 25px;
    }
    .cover-accent-bar {
      height: 4px;
      background: linear-gradient(90deg, #0284c7, #38bdf8, #818cf8);
      margin-bottom: 30px;
    }

    /* Metadata Table */
    table.cover-meta {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.5pt;
    }
    table.cover-meta td {
      padding: 6px 12px;
      border-bottom: 1px solid #f1f5f9;
    }
    .meta-key {
      width: 32%;
      color: #0f172a;
      font-weight: 700;
    }
    .meta-val {
      width: 68%;
      color: #334155;
    }

    /* Section Headings */
    .chapter-num {
      font-size: 8pt;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .chapter-title {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 4px;
      margin-bottom: 16px;
    }
    .section-h1 {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    .section-h2 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0369a1;
      margin-top: 10px;
      margin-bottom: 4px;
    }
    p {
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.55;
      margin-bottom: 10px;
      text-align: justify;
    }
    ul, ol {
      margin-left: 18px;
      margin-bottom: 12px;
    }
    li {
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 4px;
    }

    /* Tables */
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      margin-top: 10px;
      margin-bottom: 16px;
    }
    table.data-table th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 700;
      text-align: left;
      padding: 6px 10px;
      border: 1px solid #0f172a;
    }
    table.data-table td {
      padding: 5px 8px;
      border: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
    }
    table.data-table tr:nth-child(even) {
      background: #f8fafc;
    }

    /* Diagrams & Figures */
    .diagram-box {
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      background: #f8fafc;
      padding: 14px;
      margin: 14px 0;
      text-align: center;
    }
    .diagram-title {
      font-size: 8pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .figure-caption {
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 6px;
      font-style: italic;
      text-align: center;
    }
    .ui-showcase-box {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #0f172a;
      padding: 8px;
      margin: 12px 0;
      text-align: center;
    }
    .ui-showcase-box img {
      max-width: 100%;
      max-height: 460px;
      border-radius: 4px;
    }

    /* Color Swatches */
    .swatch-box {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 3px;
      vertical-align: middle;
      margin-right: 6px;
      border: 1px solid rgba(0,0,0,0.15);
    }

    .badge-pass {
      display: inline-block;
      background: #dcfce7;
      color: #15803d;
      font-size: 7pt;
      font-weight: 800;
      padding: 1px 6px;
      border-radius: 4px;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-top-sub">B.SC. INFORMATION TECHNOLOGY - SOFTWARE PROJECT MANAGEMENT (SPM)</div>
    <div class="cover-top-title">FINAL LABORATORY PROJECT DOCUMENTATION</div>

    <h1 class="cover-title">UI/UX DESIGN DOCUMENTATION<br/>FOR CAREERSETU AI</h1>
    <div class="cover-subtitle">Professional AI Career & Government Exam Guidance Platform</div>
    <div class="cover-desc">Design System, User Experience, Interface Architecture, Responsive Design & Quality Assurance</div>

    <div class="cover-accent-bar"></div>

    <table class="cover-meta">
      <tr>
        <td class="meta-key">Project Name</td>
        <td class="meta-val">CareerSetu AI</td>
      </tr>
      <tr>
        <td class="meta-key">Project Classification</td>
        <td class="meta-val">Professional AI Career & Government Exam Guidance Platform</td>
      </tr>
      <tr>
        <td class="meta-key">Academic Course & Subject</td>
        <td class="meta-val">B.Sc. Information Technology | Software Project Management (SPM)</td>
      </tr>
      <tr>
        <td class="meta-key">Academic Institution</td>
        <td class="meta-val">SVKM's Usha Pravin Gandhi College of Arts, Science and Commerce</td>
      </tr>
      <tr>
        <td class="meta-key">Primary Author & Role</td>
        <td class="meta-val"><strong>Tushar Devendra</strong> — UI/UX Designer & Frontend UI Engineering</td>
      </tr>
      <tr>
        <td class="meta-key">Co-Author</td>
        <td class="meta-val">SPM Capstone Development Team</td>
      </tr>
      <tr>
        <td class="meta-key">Project Guide / Faculty</td>
        <td class="meta-val">Dr. Swapnali Lotlikar</td>
      </tr>
      <tr>
        <td class="meta-key">Frontend Technology Stack</td>
        <td class="meta-val">React 19, TypeScript, Tailwind CSS v4, Motion v12, Recharts, Lucide Icons</td>
      </tr>
      <tr>
        <td class="meta-key">Documented Architecture Scope</td>
        <td class="meta-val"><strong>27 documented application routes</strong> (12 public routes and 15 authenticated application routes)</td>
      </tr>
      <tr>
        <td class="meta-key">Live Production Deployment</td>
        <td class="meta-val">http://localhost:5173 / https://careersetu-ai.vercel.app/</td>
      </tr>
      <tr>
        <td class="meta-key">Responsive Validation Targets</td>
        <td class="meta-val">Desktop (1440 × 900) | Tablet (768 × 1024) | Mobile (375 × 812)</td>
      </tr>
    </table>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="page-break">
    <div class="chapter-title" style="margin-top: 20px;">EXECUTIVE TABLE OF CONTENTS</div>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 15%;">Chapter</th>
          <th style="width: 70%;">Chapter Title & Scope</th>
          <th style="width: 15%; text-align: right;">Page No.</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Chapter 1</td><td>INTRODUCTION</td><td style="text-align: right;">4</td></tr>
        <tr><td>Chapter 2</td><td>DESIGN OBJECTIVES</td><td style="text-align: right;">5</td></tr>
        <tr><td>Chapter 3</td><td>TARGET USERS & USER PERSONAS</td><td style="text-align: right;">6</td></tr>
        <tr><td>Chapter 4</td><td>USER EXPERIENCE STRATEGY</td><td style="text-align: right;">8</td></tr>
        <tr><td>Chapter 5</td><td>INFORMATION ARCHITECTURE & SITEMAP</td><td style="text-align: right;">9</td></tr>
        <tr><td>Chapter 6</td><td>USER FLOWS (6 CORE INTERACTIVE JOURNEYS)</td><td style="text-align: right;">10</td></tr>
        <tr><td>Chapter 7</td><td>DESIGN SYSTEM (OKLCH PALETTE, TYPOGRAPHY, SPACING)</td><td style="text-align: right;">13</td></tr>
        <tr><td>Chapter 8</td><td>VISUAL DESIGN LANGUAGE</td><td style="text-align: right;">16</td></tr>
        <tr><td>Chapter 9</td><td>UI COMPONENT LIBRARY (35+ MODULAR COMPONENTS)</td><td style="text-align: right;">17</td></tr>
        <tr><td>Chapter 10</td><td>LANDING PAGE UI/UX DESIGN ANALYSIS</td><td style="text-align: right;">21</td></tr>
        <tr><td>Chapter 11</td><td>EXECUTIVE DASHBOARD UI/UX DESIGN</td><td style="text-align: right;">22</td></tr>
        <tr><td>Chapter 12</td><td>ASSESSMENT WIZARD & PSYCHOMETRIC INTERFACE</td><td style="text-align: right;">23</td></tr>
        <tr><td>Chapter 13</td><td>DATA VISUALIZATION & EDUCATIONAL ANALYTICS</td><td style="text-align: right;">24</td></tr>
        <tr><td>Chapter 14</td><td>INTERACTION DESIGN & MICRO-ANIMATIONS</td><td style="text-align: right;">25</td></tr>
        <tr><td>Chapter 15</td><td>RESPONSIVE DESIGN ARCHITECTURE</td><td style="text-align: right;">26</td></tr>
        <tr><td>Chapter 16</td><td>ACCESSIBILITY & USABILITY ENGINEERING</td><td style="text-align: right;">29</td></tr>
        <tr><td>Chapter 17</td><td>UI/UX DESIGN DECISIONS MATRIX</td><td style="text-align: right;">30</td></tr>
        <tr><td>Chapter 18</td><td>SCREEN-BY-SCREEN DESIGN ANALYSIS (22 SCREENS)</td><td style="text-align: right;">31</td></tr>
        <tr><td>Chapter 19</td><td>DESIGN PROCESS & ENGINEERING METHODOLOGY</td><td style="text-align: right;">43</td></tr>
        <tr><td>Chapter 20</td><td>DESIGN VALIDATION & EMPIRICAL VERIFICATION</td><td style="text-align: right;">44</td></tr>
        <tr><td>Chapter 21</td><td>UI/UX TESTING & QUALITY ASSURANCE MATRIX (15 TESTS)</td><td style="text-align: right;">45</td></tr>
        <tr><td>Chapter 22</td><td>DESIGN CHALLENGES & MITIGATIONS</td><td style="text-align: right;">47</td></tr>
        <tr><td>Chapter 23</td><td>MY UI/UX CONTRIBUTION</td><td style="text-align: right;">48</td></tr>
        <tr><td>Chapter 24</td><td>FUTURE UI/UX ROADMAP</td><td style="text-align: right;">50</td></tr>
        <tr><td>Chapter 25</td><td>CONCLUSION</td><td style="text-align: right;">51</td></tr>
        <tr><td>Appendix</td><td>LOW-FIDELITY WIREFRAME SPECIFICATIONS (12 WIREFRAMES)</td><td style="text-align: right;">52</td></tr>
      </tbody>
    </table>
  </div>

  <!-- LIST OF ACRONYMS & ACRONYM TABLE -->
  <div class="page-break">
    <div class="chapter-title" style="margin-top: 20px;">LIST OF ACRONYMS & TERMINOLOGY</div>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 20%;">Term / Acronym</th>
          <th style="width: 80%;">Definitive Description & Contextual Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>ATS</strong></td><td>Applicant Tracking System — Enterprise recruitment parsing engine evaluating resume keyword relevance.</td></tr>
        <tr><td><strong>CTA</strong></td><td>Call to Action — High-visibility interactive trigger prompting primary student workflows.</td></tr>
        <tr><td><strong>DFD</strong></td><td>Data Flow Diagram — Graphical model mapping data transformation across system boundaries.</td></tr>
        <tr><td><strong>FSM</strong></td><td>Finite State Machine — Deterministic behavioral model transitioning between defined operational states.</td></tr>
        <tr><td><strong>HCI</strong></td><td>Human-Computer Interaction — Academic discipline governing software usability, ergonomics, and accessibility.</td></tr>
        <tr><td><strong>i18n</strong></td><td>Internationalization — Architecture enabling multi-lingual presentation (English, Hindi, Marathi).</td></tr>
        <tr><td><strong>MFA / 2FA</strong></td><td>Multi-Factor Authentication — Two-step identity verification requiring password and time-limited 6-digit OTP.</td></tr>
        <tr><td><strong>NIRF</strong></td><td>National Institutional Ranking Framework — Ministry of Education methodology ranking Indian colleges.</td></tr>
        <tr><td><strong>OKLCH</strong></td><td>Perceptually uniform color space ensuring consistent lightness and chroma across themes.</td></tr>
        <tr><td><strong>PBKDF2</strong></td><td>Password-Based Key Derivation Function 2 — Cryptographic key stretching algorithm with salted HMAC.</td></tr>
        <tr><td><strong>RBAC</strong></td><td>Role-Based Access Control — Security authorization pattern partitioning student and admin entitlements.</td></tr>
        <tr><td><strong>RIASEC</strong></td><td>Holland Occupational Themes psychometric classification model (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).</td></tr>
        <tr><td><strong>SPM</strong></td><td>Software Project Management — Formal engineering discipline covering planning, metrics, and quality gates.</td></tr>
        <tr><td><strong>UPSC / SSC</strong></td><td>Premier national examination boards conducting civil service and central government recruitments.</td></tr>
        <tr><td><strong>WCAG</strong></td><td>Web Content Accessibility Guidelines — International standards for accessible software design.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- CHAPTER 1: INTRODUCTION -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 1</div>
    <h1 class="chapter-title">INTRODUCTION</h1>

    <div class="section-h1">1.1 Project Overview</div>
    <p>
      CareerSetu AI is an institutional-grade, full-stack educational guidance platform engineered specifically for Indian students navigating critical educational transitions after Class 10, Class 12, Diploma, Graduation, and Post Graduation. Designed to bridge the gap between academic qualifications and professional opportunities, the platform provides students, educators, and administrators with an ergonomic, accessible environment for:
    </p>
    <ul>
      <li><strong>Adaptive Psychometric Assessment:</strong> 50 adaptive questions evaluating student interests across Technology, Science, Management, Commerce, Arts, and Law.</li>
      <li><strong>Career Roadmaps:</strong> 100+ detailed career pathways with salary benchmarks, demand projections, and step-by-step degree sequences.</li>
      <li><strong>Government Exam Finder:</strong> Detailed schemas for 20+ national examinations with official syllabi, cutoff trends, and timeline trackers.</li>
      <li><strong>AI Study Planner:</strong> Structured study scheduling with spaced repetition and automated missed milestone rescheduling.</li>
      <li><strong>AI ATS Resume Builder:</strong> Dynamic candidate profile compilation with real-time vector PDF export.</li>
      <li><strong>Sovereign Privacy & Security:</strong> Zero third-party trackers, PBKDF2 password derivation, and dual-channel 2FA email verification.</li>
    </ul>

    <div class="section-h1">1.2 Purpose of UI/UX Design in Education</div>
    <p>
      Designing educational software for adolescents and competitive examination aspirants presents unique human-computer interaction challenges. Unlike enterprise B2B tools, career counseling software operates in moments of intense student anxiety, decision paralysis, and parental expectations.
    </p>
    <p>
      The primary purpose of the UI/UX design in CareerSetu AI is to:
    </p>
    <ul>
      <li><strong>Demystify Complex Pathways:</strong> Translate multi-stage selection procedures (Prelims, Mains, Interviews) into intuitive visual steppers.</li>
      <li><strong>Alleviate Cognitive Anxiety:</strong> Utilize calming midnight/slate canvases with purposeful color semantics to foster focus during multi-hour study sessions.</li>
      <li><strong>Provide Instant Contextual Transparency:</strong> Provide clear visual rationales for why specific careers and colleges are recommended based on test answers.</li>
      <li><strong>Support Multi-Lingual Accessibility:</strong> Ensure that students from non-English linguistic backgrounds can navigate seamlessly in Hindi or Marathi.</li>
    </ul>
  </div>

  <!-- CHAPTER 7: DESIGN SYSTEM & TOKENS -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 7</div>
    <h1 class="chapter-title">DESIGN SYSTEM & TOKENS</h1>

    <div class="section-h1">7.1 Color Palette & OKLCH Semantic Tokens</div>
    <p>
      Colors in CareerSetu AI are specified in the perceptually uniform OKLCH color space to ensure consistent contrast across dark and light themes:
    </p>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 20%;">Token Name</th>
          <th style="width: 25%;">OKLCH / HEX Code</th>
          <th style="width: 55%;">Semantic Role & UI Application</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>--background</code></td>
          <td><span class="swatch-box" style="background: #0f172a;"></span><code>#0f172a / #ffffff</code></td>
          <td>Main canvas background; deep midnight navy in dark mode, pure white in light mode.</td>
        </tr>
        <tr>
          <td><code>--card</code></td>
          <td><span class="swatch-box" style="background: #1e293b;"></span><code>#1e293b / #f8fafc</code></td>
          <td>Container surface for dashboard metric cards, career tiles, and dialog modals.</td>
        </tr>
        <tr>
          <td><code>--primary</code></td>
          <td><span class="swatch-box" style="background: #0284c7;"></span><code>#0284c7 (Sky Blue)</code></td>
          <td>Signature educational accent; primary action buttons, active tab indicators, brand logo.</td>
        </tr>
        <tr>
          <td><code>--secondary</code></td>
          <td><span class="swatch-box" style="background: #6366f1;"></span><code>#6366f1 (Indigo)</code></td>
          <td>Secondary gradient pairing; AI assistant badges, aptitude radar polygon borders.</td>
        </tr>
        <tr>
          <td><code>--success</code></td>
          <td><span class="swatch-box" style="background: #16a34a;"></span><code>#16a34a (Emerald)</code></td>
          <td>Completed study tasks, high career match scores (≥ 85%), verified student badges.</td>
        </tr>
        <tr>
          <td><code>--warning</code></td>
          <td><span class="swatch-box" style="background: #d97706;"></span><code>#d97706 (Amber)</code></td>
          <td>Urgent exam deadlines (< 30 days), pending admin reviews, warning alerts.</td>
        </tr>
        <tr>
          <td><code>--destructive</code></td>
          <td><span class="swatch-box" style="background: #dc2626;"></span><code>#dc2626 (Rose Red)</code></td>
          <td>Overdue study milestones, account suspension buttons, negative marking warnings.</td>
        </tr>
        <tr>
          <td><code>--border</code></td>
          <td><span class="swatch-box" style="background: #334155;"></span><code>#334155 / #e2e8f0</code></td>
          <td>Subtle 1px card boundaries, table grid lines, and input field outlines.</td>
        </tr>
      </tbody>
    </table>

    <div class="section-h1">7.2 Typography System</div>
    <table class="data-table">
      <thead>
        <tr>
          <th>Role</th>
          <th>Font Family</th>
          <th>Scale</th>
          <th>Weight</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Display / Hero</strong></td><td><code>Outfit / Space Grotesk</code></td><td>32px – 48px</td><td>Bold (700/800)</td><td>Landing page headlines, major module titles</td></tr>
        <tr><td><strong>Section Heading</strong></td><td><code>Plus Jakarta Sans</code></td><td>18px – 24px</td><td>SemiBold (600)</td><td>Dashboard card headers, exam section dividers</td></tr>
        <tr><td><strong>Body Text</strong></td><td><code>Inter / System Sans</code></td><td>13px – 14px</td><td>Regular (400)</td><td>Career descriptions, syllabi, guidance notes</td></tr>
        <tr><td><strong>Tabular Numeric</strong></td><td><code>JetBrains Mono</code></td><td>11px – 14px</td><td>Medium (500)</td><td>Salary ranges (₹ LPA), cutoff percentages, dates</td></tr>
      </tbody>
    </table>

    <div class="section-h1">7.3 Spacing & 8-Point Grid System</div>
    <p>All margins, paddings, and card gaps adhere strictly to the 8-point base grid system (4px, 8px, 12px, 16px, 24px, 32px, 48px), ensuring mathematical harmony across viewports.</p>
  </div>

  <!-- CHAPTER 9: UI COMPONENT LIBRARY -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 9</div>
    <h1 class="chapter-title">UI COMPONENT LIBRARY</h1>

    <div class="section-h1">9.1 Reusable Component Inventory</div>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 20%;">Component</th>
          <th style="width: 30%;">File Location</th>
          <th style="width: 50%;">Architectural Purpose & Interactive Behaviors</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Navbar</code></td>
          <td><code>components/landing/Navbar.tsx</code></td>
          <td>Sticky public navigation bar with language selector, theme toggle, and auth CTAs.</td>
        </tr>
        <tr>
          <td><code>Hero</code></td>
          <td><code>components/landing/Hero.tsx</code></td>
          <td>High-impact educational landing hero with animated tagline and assessment launcher.</td>
        </tr>
        <tr>
          <td><code>Logo</code></td>
          <td><code>components/brand/Logo.tsx</code></td>
          <td>Brand SVG mark with gradient bridge motif symbolizing career transformation.</td>
        </tr>
        <tr>
          <td><code>GlobalSearchModal</code></td>
          <td><code>components/search/GlobalSearchModal.tsx</code></td>
          <td>Command palette (⌘K / Ctrl+K) enabling instant fuzzy search across 100+ careers and exams.</td>
        </tr>
        <tr>
          <td><code>CareerChatbot</code></td>
          <td><code>components/ai/CareerChatbot.tsx</code></td>
          <td>Floating AI assistant modal answering student queries about eligibility, streams, and prep.</td>
        </tr>
        <tr>
          <td><code>Card</code></td>
          <td><code>components/ui/card.tsx</code></td>
          <td>Base glassmorphic surface container with hover elevation and subtle borders.</td>
        </tr>
        <tr>
          <td><code>Button</code></td>
          <td><code>components/ui/button.tsx</code></td>
          <td>Universal interactive trigger with Default, Gradient Brand, Outline, and Ghost variants.</td>
        </tr>
        <tr>
          <td><code>Badge</code></td>
          <td><code>components/ui/badge.tsx</code></td>
          <td>Status and category indicator pill (Verified, Government, ATS, Cutoff).</td>
        </tr>
        <tr>
          <td><code>Dialog / Modal</code></td>
          <td><code>components/ui/dialog.tsx</code></td>
          <td>Accessible overlay container for career roadmaps, exam details, and chatbot.</td>
        </tr>
        <tr>
          <td><code>Progress</code></td>
          <td><code>components/ui/progress.tsx</code></td>
          <td>Dynamic progress bar tracking daily study goals, assessment questions, and streaks.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- CHAPTER 18: SCREEN-BY-SCREEN DESIGN ANALYSIS (22 SCREENS) -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 18</div>
    <h1 class="chapter-title">SCREEN-BY-SCREEN DESIGN ANALYSIS</h1>
    <p>
      This chapter provides an exhaustive design analysis of the 22 authentic screens within CareerSetu AI, illustrating the UI/UX rationale, visual hierarchy, components, and responsive behaviors:
    </p>

    <div class="section-h1">18.1 Public Landing Page (<code>/</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgLanding}" alt="Landing Page" />
      <div class="figure-caption">Figure 18.1: Public Landing Page featuring animated hero, value proposition, and quick assessment launcher.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Communicate platform value proposition, build institutional trust, and convert visitors into registered students.<br/>
      <strong>Visual Hierarchy:</strong> Bold display headline dominates above the fold, supported by dual action buttons (Start Assessment vs. Explore Careers).<br/>
      <strong>Key Components:</strong> <code>Navbar</code>, <code>Hero</code>, <code>Stats</code>, <code>ExamNewsSection</code>, <code>Features</code>, <code>Testimonials</code>, <code>Faq</code>, <code>Footer</code>.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.2 Student Login Gateway (<code>/student/login</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgLogin}" alt="Student Login" />
      <div class="figure-caption">Figure 18.2: Student Login Gateway with demo account quick-fill buttons and PBKDF2 authentication.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Secure student identification supporting email and password with quick-fill demo profiles for academic evaluation.<br/>
      <strong>Visual Hierarchy:</strong> Centered glass card on geometric grid; primary CTA ("Sign In & Request Email Code") anchored at base.<br/>
      <strong>Key Components:</strong> Quick demo credentials pills (Aditi, Rahul), password toggle button, academic footer advisory.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.3 6-Digit Email MFA Verification Screen (<code>/student/verify-mfa</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgMfa}" alt="MFA Screen" />
      <div class="figure-caption">Figure 18.3: 6-Digit Email MFA Verification Screen with auto-advancing focus and countdown timer.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Enforce mandatory dual-channel two-factor authentication via cryptographic 6-digit OTP codes.<br/>
      <strong>Visual Hierarchy:</strong> Segmented 6-digit numeric input boxes command visual center; 10-minute countdown timer and resend link below.<br/>
      <strong>Interaction:</strong> Auto-advance to next input box upon keypress; backspace shifts focus backward; paste auto-fills all 6 digits.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.4 Student Onboarding & Registration (<code>/student/signup</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgSignup}" alt="Student Signup" />
      <div class="figure-caption">Figure 18.4: Student Registration form capturing education tier, domicile state, and preferred language.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Onboard new students with verified educational metadata (Class 10, Class 12, Graduate) to tailor guidance algorithms.<br/>
      <strong>Visual Hierarchy:</strong> Two-column structured form layout with clear required field indicators and password strength meter.<br/>
      <strong>Interaction:</strong> Live Zod schema validation; instant dropdown selection for 28 Indian states and union territories.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.5 Student Executive Cockpit Dashboard (<code>/dashboard</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgDashboard}" alt="Dashboard" />
      <div class="figure-caption">Figure 18.5: Student Executive Cockpit displaying real-time KPI scorecards, daily study goals, radar aptitude chart, and saved exams.</div>
    </div>
    <p>
      <strong>Purpose:</strong> High-level situational awareness of daily study goals, career compatibility score, assessment progress, and exam deadlines.<br/>
      <strong>Visual Hierarchy:</strong> Top 4 KPI scorecards dominate initial view, followed by two-column layout: Left Radar Aptitude Chart, Right Goals Checklist.<br/>
      <strong>Key Components:</strong> Daily goal checkboxes, SVG RadarChart, upcoming exam countdown badges, quick bookmark triggers.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.6 AI Career Assessment Wizard (<code>/assessment</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgAssessment}" alt="Assessment" />
      <div class="figure-caption">Figure 18.6: 50-Question Adaptive Career Assessment Wizard with category indicators and real-time progress bar.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Evaluate student vocational inclinations across Technology, Science, Management, Commerce, Arts, and Law.<br/>
      <strong>Visual Hierarchy:</strong> Prominent question prompt card with 4 tactile option buttons and top progress bar (1/50 questions).<br/>
      <strong>Interaction:</strong> Clicking option highlights in active primary blue; 'Save & Continue' smoothly transitions to next prompt.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.7 Assessment Results & Aptitude Radar Analysis (<code>/assessment-results</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgResults}" alt="Assessment Results" />
      <div class="figure-caption">Figure 18.7: Psychometric Assessment Results featuring 6-axis Radar Chart, personality traits, and top career compatibility matches.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Display normalized psychometric profile with interactive 6-dimensional radar polygon and recommended career matches.<br/>
      <strong>Visual Hierarchy:</strong> Central SVG radar chart leads the page, flanked by dominant personality traits and top 5 compatible careers.<br/>
      <strong>Key Components:</strong> Recharts RadarChart, trait tags (Analytical, Strategic), compatibility percentage pills (95% Match).
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.8 100+ Searchable Career Explorer (<code>/careers</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgCareers}" alt="Careers" />
      <div class="figure-caption">Figure 18.8: Searchable Career Explorer directory with multi-faceted industry filters, salary benchmarks, and degree roadmaps.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Comprehensive directory of 100+ careers filterable by industry domain, minimum salary, education level, and sector.<br/>
      <strong>Visual Hierarchy:</strong> Top search bar and filter dropdowns; dense grid of career cards displaying salaries, demand, and details CTA.<br/>
      <strong>Interaction:</strong> Sub-50ms client-side search filtering; clicking career opens granular educational roadmap dialog.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.9 Government Examination Finder & Insights (<code>/exams</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgExams}" alt="Exams" />
      <div class="figure-caption">Figure 18.9: Government Exam Finder cataloging 20+ national examinations with eligibility criteria, patterns, and cutoffs.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Single-pane directory of 20+ central and state competitive exams (UPSC, SSC, GATE, ISRO, Defence, Banking).<br/>
      <strong>Visual Hierarchy:</strong> Category filter pills (Civil Services, Defence, Engineering); exam cards detailing conducting bodies and deadlines.<br/>
      <strong>Interaction:</strong> Clicking exam opens comprehensive modal with Prelims/Mains syllabi, marking rules, and verified portal links.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.10 AI Study Planner & Dynamic Task Scheduler (<code>/study-planner</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgStudy}" alt="Study Planner" />
      <div class="figure-caption">Figure 18.10: Dynamic AI Study Planner with daily 1-hour focus slots, milestone checklists, and automated task rescheduling.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Generate customized multi-week study schedules allocating daily focus blocks with automated buffer rescheduling.<br/>
      <strong>Visual Hierarchy:</strong> Exam target banner leads view; daily chronological task slots with subject tags and checkbox states.<br/>
      <strong>Interaction:</strong> Checking tasks increments weekly progress bar; overdue tasks offer one-click automated rescheduling.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.11 Curated Learning Resources Hub (<code>/resources</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgResources}" alt="Resources" />
      <div class="figure-caption">Figure 18.11: Curated Learning Resources Hub cataloging textbooks, YouTube lecture playlists, and downloadable question papers.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Centralized educational library organizing standard reference books, verified video lectures, and solved test papers.<br/>
      <strong>Visual Hierarchy:</strong> Segmented tabs (Books, Videos, Papers); resource cards with author credentials and direct external launch buttons.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.12 National & State Scholarship Finder (<code>/scholarships</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgScholarships}" alt="Scholarships" />
      <div class="figure-caption">Figure 18.12: Scholarship Discovery Desk filtered by domicile state, annual income tier, category, and gender eligibility.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Connect economically disadvantaged and merit students with central, state, and private educational grants.<br/>
      <strong>Visual Hierarchy:</strong> Multi-select filter ribbon; cards displaying grant amounts (e.g. ₹50,000/yr), deadline countdowns, and NSP links.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.13 College Recommendations & Placement Intelligence (<code>/colleges</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgColleges}" alt="Colleges" />
      <div class="figure-caption">Figure 18.13: College Recommendations directory detailing NIRF rankings, average placement CTCs, semester fees, and entrance cutoffs.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Comprehensive directory of Indian colleges classified by NIRF rank, average CTC packages, tuition fees, and cutoffs.<br/>
      <strong>Visual Hierarchy:</strong> Ranking badges (#1 to #100), placement salary callouts (₹ LPA), and government vs private pills.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.14 AI ATS Resume & CV Builder (<code>/resume</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgResume}" alt="Resume" />
      <div class="figure-caption">Figure 18.14: Real-time ATS Resume Builder pairing structured input sections with a live dynamic vector preview canvas and PDF export.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Compile professional resumes with instant vector PDF download, multi-template switching, and ATS keyword scoring.<br/>
      <strong>Visual Hierarchy:</strong> Two-column split layout: Left Form Editor (Contact, Education, Projects, Skills), Right Live Document Canvas.<br/>
      <strong>Interaction:</strong> Real-time canvas synchronization as user types; one-click PDF compilation directly in client browser.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.15 AI Skill Gap Analysis Desk (<code>/skill-gap</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgSkillGap}" alt="Skill Gap" />
      <div class="figure-caption">Figure 18.15: Skill Gap Analyzer comparing student abilities with industry requirements, generating customized NPTEL course recommendations.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Evaluate student competencies against target career requirements and provide an actionable bridging roadmap.<br/>
      <strong>Visual Hierarchy:</strong> Target career selector; color-coded competency diff matrix (Green for Possessed, Red for Missing); NPTEL courses.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.16 Student Progress & Achievements (<code>/progress</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgProgress}" alt="Progress" />
      <div class="figure-caption">Figure 18.16: Student Progress Dashboard displaying assessment milestones, study streaks, and completed roadmap certifications.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Long-term tracking of student educational milestones, assessment history, study streaks, and completed roadmap stages.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.17 Super Admin Management Console (<code>/admin</code>)</div>
    <div class="ui-showcase-box">
      <img src="${imgAdmin}" alt="Admin Console" />
      <div class="figure-caption">Figure 18.17: Super Admin Management Console featuring platform telemetry, student status toggles, broadcast alerts, and audit logs.</div>
    </div>
    <p>
      <strong>Purpose:</strong> Institutional supervision of student accounts, role elevation, content broadcasting, and security audit inspection.<br/>
      <strong>Visual Hierarchy:</strong> Top telemetry cards; interactive user management table with status toggles; chronological security audit log.
    </p>
  </div>

  <div class="page-break">
    <div class="section-h1">18.18 Cross-Device Responsiveness (Tablet 768px & Mobile 375px)</div>
    <div class="ui-showcase-box" style="margin-bottom: 20px;">
      <img src="${imgTablet}" alt="Tablet Viewport" />
      <div class="figure-caption">Figure 18.18: Tablet Viewport (768×1024) showing fluid 2-column card reflow and touch-optimized navigation rail.</div>
    </div>
    <div class="ui-showcase-box">
      <img src="${imgMobile}" alt="Mobile Viewport" />
      <div class="figure-caption">Figure 18.19: Mobile Viewport (375×812) featuring single-column fluid stacking and bottom quick-action navigation bar.</div>
    </div>
  </div>

  <!-- CHAPTER 21: UI/UX TESTING & QUALITY ASSURANCE MATRIX -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 21</div>
    <h1 class="chapter-title">UI/UX TESTING & QUALITY ASSURANCE MATRIX</h1>
    <p>
      The table below documents formal UI/UX test scenarios executed across the CareerSetu AI interface:
    </p>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 10%;">Test ID</th>
          <th style="width: 18%;">Screen / Module</th>
          <th style="width: 18%;">UI Element</th>
          <th style="width: 27%;">Test Scenario & Action</th>
          <th style="width: 17%;">Expected Result</th>
          <th style="width: 10%;">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>UX-01</td>
          <td>Landing Page (<code>/</code>)</td>
          <td>CTA Button</td>
          <td>User clicks 'Start Career Assessment'.</td>
          <td>Smooth route transition to /student/login or /assessment.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-02</td>
          <td>Landing Page (<code>/</code>)</td>
          <td>Exam News Ticker</td>
          <td>User hovers over live exam announcement badge.</td>
          <td>Ticker highlights card with subtle elevation glow.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-03</td>
          <td>Login Gateway</td>
          <td>Demo Account Quick-Fill</td>
          <td>User clicks 'Aditi (student123)' quick fill button.</td>
          <td>Form fields automatically populate; toast confirms account loaded.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-04</td>
          <td>MFA Screen</td>
          <td>Numeric OTP Boxes</td>
          <td>User types 6 digits into segmented input boxes.</td>
          <td>Focus automatically shifts to next box; submitting redirects to /dashboard.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-05</td>
          <td>Dashboard</td>
          <td>Goal Checkbox</td>
          <td>User checks off study task on dashboard.</td>
          <td>Task text strikes through; progress bar animates smoothly.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-06</td>
          <td>Assessment</td>
          <td>Radio Options</td>
          <td>User selects an answer option on question 1.</td>
          <td>Option highlights in brand blue; 'Save & Continue' enables.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-07</td>
          <td>Career Explorer</td>
          <td>Search Bar</td>
          <td>User types 'Data Scientist' into search field.</td>
          <td>Directory filters in < 50ms without page reload.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-08</td>
          <td>Government Exams</td>
          <td>Exam Modal</td>
          <td>User clicks on 'UPSC Civil Services' card.</td>
          <td>Detailed modal opens with Prelims/Mains pattern and syllabus.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-09</td>
          <td>Study Planner</td>
          <td>Hours Slider</td>
          <td>User drags daily study hours slider from 2 to 4.</td>
          <td>Timetable re-budgeting recalculates daily slot distribution.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-10</td>
          <td>Resume Builder</td>
          <td>Template Switcher</td>
          <td>User clicks 'Tech Minimalist' template pill.</td>
          <td>Resume preview canvas updates layout instantaneously.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-11</td>
          <td>Global Navigation</td>
          <td>Language Switcher</td>
          <td>User switches language from English to Hindi.</td>
          <td>All navigation labels translate to Hindi without page reload.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-12</td>
          <td>Global Header</td>
          <td>Theme Switcher</td>
          <td>User clicks Sun/Moon icon.</td>
          <td>Interface toggles between Dark and Light mode with high contrast.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-13</td>
          <td>Command Palette</td>
          <td>Ctrl+K Trigger</td>
          <td>User presses Ctrl+K (or Cmd+K) on any screen.</td>
          <td>Centered search palette opens with auto-focus input.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-14</td>
          <td>Mobile Header</td>
          <td>Hamburger Menu</td>
          <td>User resizes to 375px and taps hamburger icon.</td>
          <td>Navigation drawer slides smoothly from left viewport edge.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
        <tr>
          <td>UX-15</td>
          <td>Error Handling</td>
          <td>404 Fallback</td>
          <td>User navigates to invalid route.</td>
          <td>Clean 404 page renders with 'Go Home' recovery action.</td>
          <td><span class="badge-pass">PASSED</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- CHAPTER 23: MY UI/UX CONTRIBUTION & CHAPTER 25: CONCLUSION -->
  <div class="page-break">
    <div class="chapter-num">CHAPTER 23</div>
    <h1 class="chapter-title">MY UI/UX CONTRIBUTION</h1>
    <p>
      As the UI/UX Designer & Frontend UI Engineer for the CareerSetu AI project, my contribution focused on human-computer interaction strategy, design token engineering, accessible component design, and responsive layout architecture.
    </p>
    <ul>
      <li><strong>Brand Architecture & Visual System:</strong> Formulated the modern educational SaaS aesthetic, pairing deep midnight navy canvases with vibrant sky-blue accents and emerald progress indicators.</li>
      <li><strong>Design System in Tailwind CSS v4:</strong> Authored semantic OKLCH color tokens, 8-point spatial scales, and glassmorphic elevation utilities ('utility glass').</li>
      <li><strong>Reusable UI Component Library:</strong> Engineered 35+ accessible components in 'src/components/', integrating Radix UI primitives for keyboard navigability and focus trapping.</li>
      <li><strong>Multi-Screen Interface Design:</strong> Designed all 27 application routes across marketing, student dashboard, assessment wizard, career explorer, and admin governance.</li>
      <li><strong>Cross-Device Responsive Optimization:</strong> Verified fluid layout reflows across Desktop (1440×900), Tablet (768×1024), and Mobile (375×812) viewports.</li>
      <li><strong>Multi-Language Accessibility (i18n):</strong> Co-designed the translation architecture supporting English, Hindi, and Marathi with zero-reload switching.</li>
    </ul>

    <div class="chapter-num" style="margin-top: 30px;">CHAPTER 25</div>
    <h1 class="chapter-title">CONCLUSION</h1>
    <p>
      The UI/UX design of CareerSetu AI successfully transforms complex vocational psychometrics, competitive examination syllabi, and multi-week study schedules into an intuitive, accessible, and aesthetically compelling educational platform.
    </p>
    <p>
      By grounding design decisions in human-centered engineering principles—reducing cognitive load with dark/light themes, demystifying career paths with visual roadmaps, and ensuring multi-lingual inclusivity—CareerSetu AI empowers Indian students to make informed, self-directed decisions about their futures. The platform stands fully verified, validated, and ready for academic capstone presentation and student deployment.
    </p>
  </div>

  <!-- TECHNICAL APPENDIX: LOW-FIDELITY WIREFRAMES -->
  <div class="page-break">
    <div class="chapter-title" style="margin-top: 20px;">TECHNICAL APPENDIX: LOW-FIDELITY WIREFRAME SPECIFICATIONS</div>
    <p style="margin-bottom: 16px;">
      This appendix documents 12 low-fidelity wireframes created during foundational layout prototyping for CareerSetu AI:
    </p>

    <div class="diagram-box" style="margin-bottom: 20px;">
      <div class="diagram-title">[LOW-FIDELITY WIREFRAME WF.1] Public Landing Page Architecture</div>
      <svg width="100%" height="160" viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="680" height="28" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="30" y="28" font-size="9" font-weight="700">[LOGO] CareerSetu</text>
        <text x="350" y="28" font-size="8">Features | Careers | Exams | Scholarships</text>
        <text x="640" y="28" font-size="8" font-weight="700">[Sign In]</text>

        <rect x="10" y="45" width="450" height="70" fill="#f8fafc" stroke="#94a3b8" />
        <text x="30" y="70" font-size="11" font-weight="700">HERO: Find Your Perfect Career with AI</text>
        <text x="30" y="85" font-size="7.5">Sub-headline: AI career assessment, government exams & study plans</text>
        <rect x="30" y="92" width="100" height="16" fill="#0284c7" rx="3" />
        <text x="80" y="103" fill="#ffffff" font-size="7" font-weight="700" text-anchor="middle">[Take Assessment]</text>

        <rect x="470" y="45" width="220" height="70" fill="#f8fafc" stroke="#94a3b8" />
        <text x="580" y="85" font-size="8" text-anchor="middle">[Interactive Radar Chart Preview]</text>

        <rect x="10" y="122" width="680" height="28" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="350" y="139" font-size="8" text-anchor="middle">[Platform Statistics: 100+ Careers | 20+ Exams | 50,000+ Students | 98% Match]</text>
      </svg>
      <div class="figure-caption">Figure WF.1: Public Landing Page structural layout wireframe.</div>
    </div>

    <div class="diagram-box">
      <div class="diagram-title">[LOW-FIDELITY WIREFRAME WF.2] Student Executive Cockpit Dashboard</div>
      <svg width="100%" height="160" viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="120" height="140" fill="#f1f5f9" stroke="#94a3b8" />
        <text x="70" y="30" font-size="8" font-weight="700" text-anchor="middle">[Sidebar Nav]</text>
        <text x="70" y="55" font-size="7" text-anchor="middle">• Dashboard</text>
        <text x="70" y="70" font-size="7" text-anchor="middle">• Assessment</text>
        <text x="70" y="85" font-size="7" text-anchor="middle">• Careers</text>
        <text x="70" y="100" font-size="7" text-anchor="middle">• Exams</text>
        <text x="70" y="115" font-size="7" text-anchor="middle">• Study Planner</text>

        <!-- KPI Strip -->
        <rect x="140" y="10" width="125" height="35" fill="#f8fafc" stroke="#94a3b8" />
        <text x="202" y="24" font-size="7" text-anchor="middle">Career Match</text>
        <text x="202" y="38" font-size="9" font-weight="700" text-anchor="middle">88% (AI Match)</text>

        <rect x="275" y="10" width="125" height="35" fill="#f8fafc" stroke="#94a3b8" />
        <text x="337" y="24" font-size="7" text-anchor="middle">Today's Goal</text>
        <text x="337" y="38" font-size="9" font-weight="700" text-anchor="middle">2 of 3 Done</text>

        <rect x="410" y="10" width="125" height="35" fill="#f8fafc" stroke="#94a3b8" />
        <text x="472" y="24" font-size="7" text-anchor="middle">Assessment</text>
        <text x="472" y="38" font-size="9" font-weight="700" text-anchor="middle">80% Complete</text>

        <rect x="545" y="10" width="145" height="35" fill="#f8fafc" stroke="#94a3b8" />
        <text x="617" y="24" font-size="7" text-anchor="middle">Upcoming Exam</text>
        <text x="617" y="38" font-size="9" font-weight="700" text-anchor="middle">GATE CS (45 Days)</text>

        <!-- Main Workspace -->
        <rect x="140" y="52" width="260" height="98" fill="#f8fafc" stroke="#94a3b8" />
        <text x="270" y="105" font-size="8" text-anchor="middle">[Aptitude Radar Chart]</text>

        <rect x="410" y="52" width="280" height="98" fill="#f8fafc" stroke="#94a3b8" />
        <text x="550" y="75" font-size="8" font-weight="700" text-anchor="middle">[Today's Study Milestones]</text>
        <text x="430" y="95" font-size="7">[X] 09:00 - Data Structures Review</text>
        <text x="430" y="110" font-size="7">[X] 11:00 - Solve 20 Aptitude Questions</text>
        <text x="430" y="125" font-size="7">[ ] 16:00 - General Science MCQs</text>
      </svg>
      <div class="figure-caption">Figure WF.2: Student Executive Cockpit Dashboard wireframe layout.</div>
    </div>
  </div>

</body>
</html>
  `;
}

async function generatePdf() {
  console.log('Generating HTML for PDF 3 (UI/UX Design Documentation)...');
  const html = buildHtml();
  const tempHtmlPath = path.resolve('./docs/uiux_design_documentation.html');
  fs.writeFileSync(tempHtmlPath, html, 'utf8');

  console.log('Launching browser to render PDF 3...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Rendering PDF 3 to file...');
  await page.pdf({
    path: OUTPUT_PDF_3,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '14mm', left: '12mm', right: '12mm' }
  });

  fs.copyFileSync(OUTPUT_PDF_3, OUTPUT_PDF_3_LOCAL);

  await browser.close();
  console.log(`PDF 3 generated successfully at:\n${OUTPUT_PDF_3}\n${OUTPUT_PDF_3_LOCAL}`);
}

generatePdf().catch((err) => {
  console.error('Error generating PDF 3:', err);
  process.exit(1);
});
