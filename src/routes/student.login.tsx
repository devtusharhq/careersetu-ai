import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, GraduationCap, Loader2, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { setCurrentUser, AppUser } from "@/lib/auth/rbac";

export const Route = createFileRoute("/student/login")({
  head: () => ({
    meta: [
      { title: "Student Sign In — CareerSetu AI" },
      { name: "description", content: "Access your personalized career journey, assessment, study plans, and government exam tracker." },
    ],
  }),
  component: StudentLoginPage,
});

function StudentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("aditi.kulkarni@gmail.com");
  const [password, setPassword] = useState("student123");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your student email");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const studentUser: AppUser = {
        id: "student-" + Date.now(),
        email: email.trim(),
        full_name: email.includes("aditi") ? "Aditi Kulkarni" : "Student User",
        role: "STUDENT",
        phone: "9876543210",
        state: "Maharashtra",
        city: "Pune",
        current_education: "Graduate (B.Tech CS)",
        status: "ACTIVE",
        registeredAt: "2026-03-01T00:00:00.000Z",
        lastActive: new Date().toISOString(),
      };
      setCurrentUser(studentUser);
      toast.success("Welcome back to your CareerSetu student journey!");
      navigate({ to: "/dashboard" });
    }, 300);
  };

  return (
    <div className="gradient-soft min-h-dvh flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-primary/20">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo size="lg" />
        </Link>

        <Card className="rounded-3xl p-6 sm:p-8 glass shadow-2xl border-border/80">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground">CareerSetu Student</h1>
              <p className="text-xs text-muted-foreground">Access your personalized career journey</p>
            </div>
          </div>

          <form onSubmit={handleStudentLogin} className="space-y-4">
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Student Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold mb-1.5 block">Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="rounded-xl h-10 text-xs"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl gradient-brand text-primary-foreground font-bold text-xs shadow-glow cursor-pointer"
              >
                {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <ArrowRight className="size-4 mr-2" />}
                Sign In to Student Portal
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-border/80 text-center space-y-2">
            <Link to="/auth" search={{ mode: "signup" }} className="text-xs text-primary font-semibold hover:underline block">
              Don't have an account? Register as a Student →
            </Link>
            <Link to="/admin/login" className="text-[11px] text-muted-foreground hover:text-foreground block">
              Are you an Administrator? Access Admin Console
            </Link>
          </div>
        </Card>
      </div>

      <footer className="text-center text-[11px] text-muted-foreground py-4">
        CareerSetu AI • India's Leading AI Career & Government Exam Guidance Platform
      </footer>
    </div>
  );
}
