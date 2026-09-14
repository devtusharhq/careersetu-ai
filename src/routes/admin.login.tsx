import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Loader2, Lock, Mail, ShieldAlert, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initiateAdminLogin } from "@/lib/auth/rbac";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Administrator Sign In — CareerSetu AI" },
      { name: "description", content: "Restricted Administrative Gateway with Encrypted Database Verification and Email MFA." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("tysonfire13@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your administrator email.");
      return;
    }

    setLoading(true);

    try {
      const result = await initiateAdminLogin(email, password);

      if (!result.success) {
        toast.error(result.error || "Invalid email or password.");
        setLoading(false);
        return;
      }

      // Store pending admin auth in sessionStorage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("careersetu_pending_admin_email", email.trim().toLowerCase());
        sessionStorage.setItem("careersetu_pending_admin_masked", result.maskedEmail || "");
      }

      // If this is the initial first-time login requiring password setup
      if (result.requiresFirstSetup) {
        toast.info("First-time setup detected. A security authorization code has been sent to your email.");
        navigate({ to: "/admin/first-setup" as any });
        return;
      }

      toast.success(result.isDev ? "Development Mode: 2FA security code dispatched!" : "Administrator 2FA security code dispatched.");
      navigate({ to: "/admin/verify-mfa" as any });
    } catch (err) {
      toast.error("An unexpected error occurred during administrative verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-amber-500/20">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo />
        </Link>

        {/* 3-Stage Security Protocol Indicator */}
        <div className="mb-4 rounded-2xl bg-slate-900/90 border border-slate-800 p-4 space-y-2.5 backdrop-blur-md">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="size-4" /> Secure Administrator Sign-In
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Tier-1 RBAC</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-center">
              <div>1. Credentials</div>
              <div className="text-[9px] opacity-80">Admin Email & Pass</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-center">
              <div>2. Email 2FA</div>
              <div className="text-[9px] opacity-80">Security Code</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-center">
              <div>3. Session</div>
              <div className="text-[9px] opacity-80">Secure Token</div>
            </div>
          </div>
        </div>

        {/* Security Warning Banner */}
        <div className="mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-start gap-3 text-xs text-amber-300">
          <ShieldAlert className="size-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-200">Restricted Administration Gateway</p>
            <p className="mt-0.5 text-amber-300/80 leading-relaxed text-[11px]">
              Access restricted to verified administrators. Protected by SQL RBAC, PBKDF2 encryption, and Email MFA.
            </p>
          </div>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <span className="grid size-10 place-items-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Lock className="size-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold font-display text-white">Administrator Sign In</h1>
                <p className="text-xs text-slate-400">Step 1 of 2: Provide credentials</p>
              </div>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Administrator Email</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tysonfire13@gmail.com"
                  className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-amber-500 font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs text-slate-300 font-semibold">Admin Password</Label>
                  <Link
                    to="/admin/forgot-password"
                    className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-amber-500"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Verifying SQL Authorization & Requesting MFA...
                    </>
                  ) : (
                    <>
                      Sign In & Request 2FA Code
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Quick First-Time Setup / Testing Helper */}
            <div className="pt-4 border-t border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-400 mb-2">Registered Administrator Account:</p>
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail("tysonfire13@gmail.com");
                    toast.info("Selected Primary Administrator (tysonfire13@gmail.com)");
                  }}
                  className="text-[11px] rounded-xl h-7 border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  <KeyRound className="size-3 mr-1 text-amber-400" /> tysonfire13@gmail.com
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/student/login" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to Student Login
          </Link>
        </div>
      </div>

      <footer className="text-center text-[11px] text-slate-500 py-4">
        CareerSetu AI Platform Security System • Multi-Factor Authentication & RBAC Tier 1
      </footer>
    </div>
  );
}
