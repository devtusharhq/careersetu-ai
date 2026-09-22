import os
import base64
import subprocess

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
SCREENSHOTS_DIR = os.path.join(ROOT_DIR, "docs", "screenshots")
HTML_OUT = os.path.join(ROOT_DIR, "docs", "technical_full.html")
PDF_OUT_1 = os.path.abspath(os.path.join(ROOT_DIR, "..", "CareerSetu_AI_Technical_Project_Documentation.pdf"))
PDF_OUT_2 = os.path.join(ROOT_DIR, "CareerSetu_AI_Technical_Project_Documentation.pdf")

def get_base64_img(filename):
    p = os.path.join(SCREENSHOTS_DIR, filename)
    if os.path.exists(p):
        with open(p, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    fallback = os.path.join(SCREENSHOTS_DIR, "screen-landing.png")
    if os.path.exists(fallback):
        with open(fallback, "rb") as f:
            return f"data:image/png;base64,{base64.b64encode(f.read()).decode('utf-8')}"
    return ""

# Preload images
img_landing = get_base64_img("screen-landing.png")
img_login = get_base64_img("screen-student-login.png")
img_mfa = get_base64_img("screen-student-mfa.png")
img_signup = get_base64_img("screen-student-signup.png")
img_dashboard = get_base64_img("screen-dashboard.png")
img_assessment = get_base64_img("screen-assessment.png")
img_results = get_base64_img("screen-assessment-results.png")
img_careers = get_base64_img("screen-careers.png")
img_exams = get_base64_img("screen-exams.png")
img_study = get_base64_img("screen-study-planner.png")
img_resources = get_base64_img("screen-resources.png")
img_scholarships = get_base64_img("screen-scholarships.png")
img_colleges = get_base64_img("screen-colleges.png")
img_resume = get_base64_img("screen-resume.png")
img_skill_gap = get_base64_img("screen-skill-gap.png")
img_progress = get_base64_img("screen-progress.png")
img_bookmarks = get_base64_img("screen-bookmarks.png")
img_profile = get_base64_img("screen-profile.png")
img_admin = get_base64_img("screen-admin.png")
img_tablet = get_base64_img("screen-tablet.png")
img_mobile = get_base64_img("screen-mobile.png")
img_404 = get_base64_img("screen-404.png")

print("Generating 65-page Technical Documentation HTML...")

# Write HTML generator logic...
