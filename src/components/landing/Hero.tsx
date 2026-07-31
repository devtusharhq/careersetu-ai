import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Sparkles, Star } from "lucide-react";

import heroImage from "@/assets/hero-career.png";
import { Button } from "@/components/ui/button";

const trustPoints = ["50-question AI assessment", "100+ career paths", "20+ govt exams"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-soft absolute inset-0 -z-10" />
      <div className="absolute -top-32 left-1/4 -z-10 size-[28rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-24 top-24 -z-10 size-[24rem] rounded-full bg-violet/20 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:pt-24 lg:pb-28">
        <div className="animate-fade-up">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <Sparkles className="size-4 text-primary" />
            AI guidance for Class 10 to Post Graduate students
          </span>

          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-6xl">
            Find Your Perfect <span className="text-gradient">Career with AI</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Take an AI Career Assessment, discover careers, explore government exams, receive
            personalized study plans, and build your future confidently.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="gradient-brand h-12 rounded-xl px-6 text-base text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              asChild
            >
              <Link to="/auth" search={{ mode: "signup" }}>
                Start Career Assessment
                <ArrowRight className="ml-1 size-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-border bg-card/70 px-6 text-base backdrop-blur"
            >
              <Compass className="mr-1 size-5" />
              Explore Careers
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Star className="size-4 text-primary" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div className="animate-float">
            <img
              src={heroImage}
              alt="Illustration of an AI career dashboard with charts, a compass and study material"
              width={1280}
              height={1024}
              className="mx-auto w-full max-w-xl drop-shadow-2xl"
            />
          </div>

          <div className="glass absolute bottom-4 left-0 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="text-xs text-muted-foreground">Career match score</p>
            <p className="text-gradient font-display text-2xl font-bold">92%</p>
          </div>
          <div className="glass absolute top-6 right-0 hidden rounded-2xl px-4 py-3 sm:block">
            <p className="text-xs text-muted-foreground">Recommended exam</p>
            <p className="font-display text-sm font-semibold">UPSC CSE 2027</p>
          </div>
        </div>
      </div>
    </section>
  );
}
