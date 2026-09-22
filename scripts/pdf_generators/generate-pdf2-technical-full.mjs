import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.resolve('./docs/screenshots');
const OUTPUT_PDF_2 = path.resolve('../CareerSetu_AI_Technical_Project_Documentation.pdf');
const OUTPUT_PDF_2_LOCAL = path.resolve('./CareerSetu_AI_Technical_Project_Documentation.pdf');

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

// 22 Screen Definitions for Chapter 14 (Dedicated 1 page per screen)
const UI_SCREENS = [
  { id: "14.1", title: "Public Landing Page Hero & Navigation (`/`)", file: "screen-landing.png", desc: "Public entrance featuring educational value proposition, dynamic hero graphics, and quick-action assessment triggers." },
  { id: "14.2", title: "First-Party Student Login & Credentials (`/student/login`)", file: "screen-student-login.png", desc: "Sovereign student authentication gateway with PBKDF2 password derivation and examiner demo account quick-fill presets." },
  { id: "14.3", title: "Two-Factor Authentication (2FA) OTP Challenge (`/student/verify-mfa`)", file: "screen-student-mfa.png", desc: "6-digit cryptographic time-based verification modal with auto-advancing segmented inputs and 10-minute expiry countdown." },
  { id: "14.4", title: "Student Onboarding & Registration Form (`/student/signup`)", file: "screen-student-signup.png", desc: "Multi-field registration workflow collecting education level (Class 10/12/Graduate), state domicile, and preferred language." },
  { id: "14.5", title: "Student Executive Cockpit Dashboard (`/dashboard`)", file: "screen-dashboard.png", desc: "Central operational dashboard displaying real-time KPI scorecards, today's goals, aptitude radar, and upcoming exam tickers." },
  { id: "14.6", title: "50-Question Adaptive Career Assessment Wizard (`/assessment`)", file: "screen-assessment.png", desc: "Psychometric question wizard presenting 4 multiple-choice options per question with real-time domain weight accumulation." },
  { id: "14.7", title: "Psychometric Assessment Results & Radar Analysis (`/assessment-results`)", file: "screen-assessment-results.png", desc: "Comprehensive aptitude breakdown featuring an interactive 6-axis Recharts Radar Chart, personality traits, and top matches." },
  { id: "14.8", title: "Searchable 100+ Career Explorer Hub (`/careers`)", file: "screen-careers.png", desc: "Searchable multi-industry career directory filterable by salary tier, education prerequisites, and public/private sector." },
  { id: "14.9", title: "Central & State Government Examination Directory (`/exams`)", file: "screen-exams.png", desc: "Government exam portal cataloging 20+ competitive exams (UPSC, SSC, GATE, Defence, Banking) with eligibility criteria." },
  { id: "14.10", title: "Personalized AI Study Planner & Focus Schedules (`/study-planner`)", file: "screen-study-planner.png", desc: "Dynamic study timetable generator breaking syllabus into daily focus slots with automated missed task rescheduling." },
  { id: "14.11", title: "Curated Learning Resources Library (`/resources`)", file: "screen-resources.png", desc: "Centralized study materials hub organizing standard reference textbooks, curated YouTube playlists, and solved test papers." },
  { id: "14.12", title: "National & State Scholarship Discovery Desk (`/scholarships`)", file: "screen-scholarships.png", desc: "Financial aid portal filterable by family income tier, category, gender eligibility, and National Scholarship Portal links." },
  { id: "14.13", title: "College Recommendations & Placement Intelligence (`/colleges`)", file: "screen-colleges.png", desc: "Higher education directory classified by NIRF rank, average placement CTCs (₹ LPA), semester fees, and entrance cutoffs." },
  { id: "14.14", title: "Real-Time AI ATS Resume & CV Builder (`/resume`)", file: "screen-resume.png", desc: "Interactive two-column workspace pairing structured form inputs with a live dynamic vector preview canvas and PDF export." },
  { id: "14.15", title: "Vocational Skill Gap Analysis Engine (`/skill-gap`)", file: "screen-skill-gap.png", desc: "Differential competency analyzer highlighting possessed vs missing skills for target roles with certified course roadmaps." },
  { id: "14.16", title: "Student Progress & Milestone Tracking Dashboard (`/progress`)", file: "screen-progress.png", desc: "Long-term educational analytics tracking assessment history, study streaks, completed certifications, and roadmap badges." },
  { id: "14.17", title: "Saved Bookmarks & Target Exam Watchlist (`/bookmarks`)", file: "screen-bookmarks.png", desc: "Unified favorites repository consolidating bookmarked careers, target government examinations, and saved scholarship grants." },
  { id: "14.18", title: "Student Profile & Educational Credentials Center (`/profile`)", file: "screen-profile.png", desc: "Profile management desk for updating academic status, target career preferences, domicile details, and password security." },
  { id: "14.19", title: "Super Administrator Governance Console (`/admin`)", file: "screen-admin.png", desc: "Administrative cockpit displaying platform-wide student metrics, active users table, broadcast editors, and audit trail logs." },
  { id: "14.20", title: "Tablet Viewport Layout Adaptation (`768x1024`)", file: "screen-tablet.png", desc: "Responsive 2-column tablet layout demonstrating fluid card reflow, touch slider interaction, and collapsed navigation rail." },
  { id: "14.21", title: "Mobile Smartphone Single-Column Experience (`375x812`)", file: "screen-mobile.png", desc: "Mobile-optimized vertical layout featuring full-width touch targets, slide-out drawer, and bottom quick-action navigation bar." },
  { id: "14.22", title: "Graceful 404 Route Interception & Recovery (`/404`)", file: "screen-404.png", desc: "Styled error page catching non-existent endpoints and providing a direct 'Go Home' CTA to restore student navigation." }
];

console.log('Building full technical documentation HTML...');
