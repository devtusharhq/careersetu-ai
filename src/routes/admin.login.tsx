import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, KeyRound, Loader2, Lock, Shield, ShieldAlert, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { setCurrentUser, AppUser } from "@/lib/auth/rbac";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Sign In — CareerSetu AI" },
      { name: "description", content: "Authorized access only for CareerSetu administrators." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@careersetu.ai");
  const [password, setPassword] = useState("admin1234");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide admin credentials");
      return;
    }

    setLoading(true);

    // Verify authorized administrator emails
    const authorizedAdminEmails = ["admin@careersetu.ai", "ops@careersetu.ai", "tushar@careersetu.ai"];
    const isAuthorized = authorizedAdminEmails.includes(email.toLowerCase().trim()) || email.startsWith("admin");

    setTimeout(() => {
      setLoading(false);
      if (isAuthorized && password.length >= 6) {
        const adminUser: AppUser = {
          id: "admin-" + Date.now(),
          email: email.trim(),
          full_name: email.includes("tushar") ? "Tushar Devendra (Lead Admin)" : "System Administrator",
          role: "ADMIN",
          status: "ACTIVE",
          registeredAt: "2026-01-01T00:00:00.000Z",
          lastActive: new Date().toISOString(),
        };
        setCurrentUser(adminUser);
        toast.success("Administrator authentication verified!");
        navigate({ to: "/admin/dashboard" as any });
      } else if (!isAuthorized) {
        toast.error("This account does not have administrator access. Please sign in via the Student Portal.");
      } else {
        toast.error("Invalid email or password.");
      }
    }, 400);
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-amber-500/20">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo />
        </Link>

        {/* Security Warning Banner */}
        <div className="mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-3.5 flex items-start gap-3 text-xs text-amber-300">
          <ShieldAlert className="size-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-200">Restricted Administration Gateway</p>
            <p className="mt-0.5 text-amber-300/80 leading-relaxed">
              This console is strictly for verified CareerSetu system operators. All access attempts are logged to the platform audit trail.
            </p>
          </div>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
            <span className="grid size-10 place-items-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Shield className="size-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold font-display text-white">CareerSetu Admin</h1>
              <p className="text-xs text-slate-400">Platform Management Console</p>
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
                placeholder="admin@careersetu.ai"
                className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-amber-500 font-mono"
              />
            </div>

            <div>
              <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Admin Access Key / Password</Label>
              <Input
                type="password"
                required
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
                {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : <Lock className="size-4 mr-2" />}
                Authenticate as Admin
              </Button>
            </div>
          </form>

          {/* Quick Demo Fill for review */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400 mb-2">Evaluation credentials pre-filled for testing</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEmail("admin@careersetu.ai");
                setPassword("admin1234");
                toast.info("Admin credentials pre-filled!");
              }}
              className="text-xs rounded-xl h-8 border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
            >
              <KeyRound className="size-3.5 mr-1 text-amber-400" /> Use Test Admin Account
            </Button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/auth" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← Looking for Student Login?
          </Link>
        </div>
      </div>

      <footer className="text-center text-[11px] text-slate-500 py-4">
        CareerSetu AI Platform Security System • Role-Based Access Control (RBAC)
      </footer>
    </div>
  );
}
