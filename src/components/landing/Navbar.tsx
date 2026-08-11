import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { label: "Exam News", href: "#exam-news" },
  { label: "Careers", href: "#careers" },
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => {
        const next = !dark;
        document.documentElement.classList.toggle("dark", next);
        setDark(next);
      }}
      className="rounded-xl"
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6 shadow-soft">
        <Link to="/" aria-label="CareerSetu home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex rounded-xl" asChild>
            <Link to="/auth" search={{ mode: "login" }}>
              Log in
            </Link>
          </Button>
          <Button
            size="sm"
            className="gradient-brand hidden text-primary-foreground shadow-glow hover:opacity-90 sm:inline-flex rounded-xl font-semibold"
            asChild
          >
            <Link to="/auth" search={{ mode: "signup" }}>
              Get started
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden rounded-xl">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 rounded-l-3xl p-6">
              <SheetTitle className="text-left font-display font-bold text-lg flex items-center gap-2">
                <Sparkles className="size-4 text-primary" /> Navigation
              </SheetTitle>
              <nav className="mt-6 flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent text-foreground"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="pt-6 mt-4 border-t border-border flex flex-col gap-3">
                  <Button variant="outline" className="w-full rounded-xl" asChild>
                    <Link to="/auth" search={{ mode: "login" }}>
                      Log in
                    </Link>
                  </Button>
                  <Button className="gradient-brand w-full text-primary-foreground rounded-xl shadow-glow" asChild>
                    <Link to="/auth" search={{ mode: "signup" }}>
                      Get started
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
