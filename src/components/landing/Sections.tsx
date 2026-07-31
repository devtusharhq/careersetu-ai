import { Link } from "@tanstack/react-router";
import { Compass, Quote } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "I was confused between BSc IT and Diploma. The assessment showed a 94% match with Cloud Engineering and gave me a clear roadmap.",
    name: "Aditi Kulkarni",
    meta: "Class 12 · Pune",
  },
  {
    quote:
      "The study planner rebuilt my schedule every time I missed a day. I finally cleared SSC CGL Tier 1.",
    name: "Rahul Verma",
    meta: "Graduate · Lucknow",
  },
  {
    quote:
      "Scholarship finder alone saved my year — it matched three Maharashtra scholarships I never knew existed.",
    name: "Sneha Patil",
    meta: "Diploma · Nashik",
  },
];

const faqs = [
  {
    q: "Who is CareerSetu for?",
    a: "Students after Class 10, Class 12, Diploma, Graduation and Post Graduation who want clarity on careers, streams and government exams.",
  },
  {
    q: "How does the AI Career Assessment work?",
    a: "You answer 50 adaptive questions across interests, personality, reasoning and creativity. We then generate interest scores, a personality summary, your learning style and top career matches.",
  },
  {
    q: "Which government exams are covered?",
    a: "UPSC, SSC CGL and CHSL, MPSC, GATE, DRDO, ISRO, RBI Grade B, SEBI, NABARD, RRB, IB ACIO, CDS, AFCAT, CAPF, ESIC and major PSU recruitments.",
  },
  {
    q: "Is it available in Hindi and Marathi?",
    a: "Yes. You pick your preferred language — English, Hindi or Marathi — while creating your account.",
  },
  {
    q: "Do I need to pay to start?",
    a: "No. The career assessment, career explorer and exam finder are free to start with.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20">
      <div className="gradient-soft absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Student stories
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Guidance that changed decisions</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover-lift glass rounded-2xl p-6">
              <Quote className="size-6 text-primary" />
              <p className="mt-4 text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-6">
                <p className="font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.meta}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-primary uppercase">FAQ</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Questions students ask</h2>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-border/70">
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="gradient-brand shadow-elegant rounded-3xl px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
          Your career deserves a plan, not a guess
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
          Start the AI assessment and get your match score, exam shortlist and study plan in minutes.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8 h-12 rounded-xl px-7 text-base font-semibold"
          asChild
        >
          <Link to="/auth" search={{ mode: "signup" }}>Start Career Assessment</Link>
        </Button>
      </div>
    </section>
  );
}

export function Footer() {
  const columns = [
    { title: "Platform", items: ["Career Assessment", "Career Explorer", "Government Exams", "Study Planner"] },
    { title: "Resources", items: ["Scholarships", "Colleges", "Learning Resources", "Resume Builder"] },
    { title: "Company", items: ["About", "Contact", "Privacy", "Terms"] },
  ];

  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="gradient-brand grid size-9 place-items-center rounded-xl text-primary-foreground">
              <Compass className="size-5" />
            </span>
            <span className="font-display text-lg font-bold">CareerSetu</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            AI career and government exam guidance built for Indian students — from Class 10 to Post
            Graduation.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#features" className="transition-colors hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CareerSetu. Made for Indian students.
      </div>
    </footer>
  );
}
