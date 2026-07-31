import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
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
    >
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center gap-4 rounded-2xl px-4 py-3 sm:px-6">
        <Link to="/" aria-label="CareerSetu home">
          <Logo />
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link to="/auth" search={{ mode: "login" }}>
              Log in
            </Link>
          </Button>
          <Button
            className="gradient-brand hidden text-primary-foreground shadow-glow hover:opacity-90 sm:inline-flex"
            asChild
          >
            <Link to="/auth" search={{ mode: "signup" }}>
              Get started
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-10 flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-accent"
                  >
                    {l.label}
                  </a>
                ))}
                <Button variant="outline" className="mt-4" asChild>
                  <Link to="/auth" search={{ mode: "login" }}>
                    Log in
                  </Link>
                </Button>
                <Button className="gradient-brand text-primary-foreground" asChild>
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Get started
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
