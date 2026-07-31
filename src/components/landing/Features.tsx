import {
  Brain,
  Briefcase,
  CalendarCheck,
  FileText,
  GraduationCap,
  Landmark,
  Library,
  MessageSquareHeart,
  Target,
  Wallet,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Career Assessment",
    desc: "50 adaptive questions across interests, personality, reasoning and creativity.",
  },
  {
    icon: Target,
    title: "Career Recommendations",
    desc: "Compatibility scores with salary, demand, skills and a step-by-step roadmap.",
  },
  {
    icon: Landmark,
    title: "Government Exam Finder",
    desc: "UPSC, SSC, GATE, ISRO, RBI and more — eligibility, pattern and cutoffs.",
  },
  {
    icon: CalendarCheck,
    title: "AI Study Planner",
    desc: "Daily, weekly and monthly plans that reschedule themselves when you miss a task.",
  },
  {
    icon: Library,
    title: "Learning Resources",
    desc: "Curated books, videos, PDFs, mock tests and current affairs per exam.",
  },
  {
    icon: Wallet,
    title: "Scholarship Finder",
    desc: "Matched to your state, income, category and marks with live deadlines.",
  },
  {
    icon: GraduationCap,
    title: "College Recommendations",
    desc: "Government and private colleges with fees, placements and admission process.",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "Professional resume, CV and cover letter templates you can export as PDF.",
  },
  {
    icon: MessageSquareHeart,
    title: "AI Career Chatbot",
    desc: "Ask anything — streams, eligibility, exams, scholarships — in your language.",
  },
];

const stats = [
  { value: "100+", label: "Career paths" },
  { value: "20+", label: "Government exams" },
  { value: "50", label: "Assessment questions" },
  { value: "3", label: "Languages supported" },
];

const categories = [
  { icon: Brain, name: "Technology", roles: "AI Engineer · Cloud · Cyber Security" },
  { icon: GraduationCap, name: "Healthcare", roles: "Doctor · Physiotherapist · Nursing" },
  { icon: Briefcase, name: "Management", roles: "MBA · Product · Operations" },
  { icon: Landmark, name: "Civil Services", roles: "IAS · IPS · IFS" },
  { icon: Wallet, name: "Commerce", roles: "CA · CS · Economist" },
  { icon: FileText, name: "Law", roles: "Advocate · Patent Analyst" },
  { icon: Library, name: "Science & Research", roles: "ISRO · DRDO · Data Science" },
  { icon: MessageSquareHeart, name: "Creative & Media", roles: "Design · Journalism · Film" },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Everything inside</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">One platform for your entire journey</h2>
        <p className="mt-4 text-muted-foreground">
          From choosing a stream after Class 10 to cracking a government exam after graduation.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="hover-lift glass arch-accent overflow-hidden rounded-[1.25rem] p-6">
            <span className="gradient-brand grid size-11 place-items-center rounded-xl text-primary-foreground shadow-glow">
              <f.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="gradient-brand shadow-elegant grid gap-8 rounded-3xl px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-primary-foreground">
            <p className="font-display text-4xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-sm opacity-85">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Categories() {
  return (
    <section id="careers" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">Career categories</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Explore where you fit best</h2>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Card
            key={c.name}
            className="hover-lift rounded-2xl border-border/70 bg-card p-5 shadow-soft"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
              <c.icon className="size-5" />
            </span>
            <h3 className="mt-4 font-semibold">{c.name}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.roles}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
