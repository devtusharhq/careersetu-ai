import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Loader2, Lock, Mail, ShieldAlert, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initiateStudentLogin } from "@/lib/auth/rbac";

export const Route = createFileRoute("/student/login")({
  head: () => ({
    meta: [
      { title: "Student Sign In — CareerSetu AI" },
      { name: "description", content: "Sign in to your CareerSetu student account with secure Email MFA verification." },
    ],
  }),
  component: StudentLoginPage,
});

function StudentLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("aditi.kulkarni@gmail.com");
  const [password, setPassword] = useState("student123");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await initiateStudentLogin(email, password);

      if (!result.success) {
        toast.error(result.error || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Store pending auth state for MFA verification screen
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("careersetu_pending_student_email", email.trim().toLowerCase());
        sessionStorage.setItem("careersetu_pending_student_masked", result.maskedEmail || "");
      }

      toast.success(result.isDev ? "Development Mode: Verification code generated!" : "Verification code sent to your registered email.");

      navigate({
        to: "/student/verify-mfa" as any,
      });
    } catch (err) {
      toast.error("An unexpected error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-sky-500/20">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo />
        </Link>

        {/* Security / MFA Notice */}
        <div className="mb-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 p-3.5 flex items-start gap-3 text-xs text-sky-300">
          <Sparkles className="size-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sky-200">Mandatory Email MFA Security</p>
            <p className="mt-0.5 text-sky-300/80 leading-relaxed text-[11px]">
              Every student sign-in requires a 6-digit one-time code sent directly to your registered email address.
            </p>
          </div>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <span className="grid size-10 place-items-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <Mail className="size-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold font-display text-white">Student Sign In</h1>
                <p className="text-xs text-slate-400">Step 1: Enter email & password</p>
              </div>
            </div>

            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Student Email</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@careersetu.ai"
                  className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs text-slate-300 font-semibold">Password</Label>
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Verifying Password & Generating MFA...
                    </>
                  ) : (
                    <>
                      Sign In & Request Email Code
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Quick Demo Pre-fill for Evaluation */}
            <div className="pt-4 border-t border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-400 mb-2">Evaluation Accounts:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("aditi.kulkarni@gmail.com");
                    setPassword("student123");
                    toast.info("Filled Aditi Kulkarni credentials");
                  }}
                  className="text-[11px] rounded-xl h-7 border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <KeyRound className="size-3 mr-1 text-sky-400" /> Aditi (student123)
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("rahul.sharma@gmail.com");
                    setPassword("student123");
                    toast.info("Filled Rahul Sharma credentials");
                  }}
                  className="text-[11px] rounded-xl h-7 border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <KeyRound className="size-3 mr-1 text-sky-400" /> Rahul (student123)
                </Button>
              </div>
            </div>

            {/* Link to Registration */}
            <div className="pt-2 text-center text-xs text-slate-400">
              Don't have a student account yet?{" "}
              <Link to="/student/signup" className="text-sky-400 font-semibold hover:underline">
                Create Student Account
              </Link>
            </div>
          </div>
        </Card>

        {/* Link to Admin Gateway */}
        <div className="mt-6 text-center">
          <Link to="/admin/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            Looking for Administrator Gateway? Click here →
          </Link>
        </div>
      </div>

      <footer className="text-center text-[11px] text-slate-500 py-4">
        CareerSetu AI Student Portal • Protected by PBKDF2 Encryption & Email MFA
      </footer>
    </div>
  );
}
