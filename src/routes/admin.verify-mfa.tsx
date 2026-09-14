import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail, RefreshCw, ShieldAlert, ShieldCheck, Smartphone } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { completeAdminMfaLogin, getUserByEmail, createAndDispatchMfaCode } from "@/lib/auth/rbac";
import { maskEmail } from "@/lib/auth/crypto";

export const Route = createFileRoute("/admin/verify-mfa")({
  head: () => ({
    meta: [
      { title: "Administrator Verification — CareerSetu AI" },
      { name: "description", content: "Enter the 6-digit administrator MFA security code to access the console." },
    ],
  }),
  component: AdminVerifyMfaPage,
});

function AdminVerifyMfaPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("tysonfire13@gmail.com");
  const [maskedDisplay, setMaskedDisplay] = useState("t*********3@gmail.com");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 mins
  const [resendCooldown, setResendCooldown] = useState(30);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  useEffect(() => {
    let storedEmail = "";
    if (typeof sessionStorage !== "undefined") {
      storedEmail = sessionStorage.getItem("careersetu_pending_admin_email") || "";
      const devRecord = sessionStorage.getItem("careersetu_latest_dev_email");
      if (devRecord) {
        try {
          const parsed = JSON.parse(devRecord);
          if (parsed.otpCode) {
            setDevOtp(parsed.otpCode);
          }
        } catch {}
      }
    }

    if (!storedEmail) {
      storedEmail = "tysonfire13@gmail.com";
    }

    setEmail(storedEmail);
    setMaskedDisplay(maskEmail(storedEmail));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim().length !== 6) {
      toast.error("Please enter the complete 6-digit administrator verification code.");
      return;
    }

    setLoading(true);

    try {
      const result = await completeAdminMfaLogin(email, otpCode.trim());

      if (!result.success) {
        toast.error(result.error || "The verification code is incorrect or expired.");
        setLoading(false);
        return;
      }

      toast.success("Administrator session authorized. Redirecting to dashboard...");
      navigate({ to: "/admin/dashboard" as any });
    } catch (err) {
      toast.error("An error occurred while validating security credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    const user = getUserByEmail(email);
    if (!user) {
      toast.error("No administrator account found. Please return to login.");
      return;
    }

    const dispatch = await createAndDispatchMfaCode(user, "ADMIN_LOGIN");
    setResendCooldown(60);
    setTimeLeft(600);

    if (dispatch.isDev && typeof sessionStorage !== "undefined") {
      const devRecord = sessionStorage.getItem("careersetu_latest_dev_email");
      if (devRecord) {
        try {
          const parsed = JSON.parse(devRecord);
          setDevOtp(parsed.otpCode);
        } catch {}
      }
    }

    toast.success("New 2FA code dispatched to administrator email.");
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
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center">
              <div>✓ 1. Credentials</div>
              <div className="text-[9px] opacity-80">Verified</div>
            </div>

            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-center">
              <div>2. Email 2FA</div>
              <div className="text-[9px] opacity-80">Enter Code</div>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-center">
              <div>3. Session</div>
              <div className="text-[9px] opacity-80">Issue Token</div>
            </div>
          </div>
        </div>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Smartphone className="size-5" />
                </span>
                <div>
                  <h1 className="text-lg font-bold font-display text-white">Administrator Verification</h1>
                  <p className="text-xs text-slate-400">Step 2 of 2: Multi-Factor Authentication</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/admin/login" as any })}
                className="h-8 px-2 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="size-3.5 mr-1" /> Back
              </Button>
            </div>

            {/* Notification Notice */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400">
                A security code has been sent to the administrator's registered security email:
              </p>
              <p className="font-mono font-bold text-amber-300 text-sm">{maskedDisplay || "t*********3@gmail.com"}</p>
            </div>

            {/* Dev Mode Simulated Token Display */}
            {devOtp && (
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-300/80 block uppercase font-bold tracking-wider">
                    Dev Email Simulation:
                  </span>
                  <span className="text-base font-mono font-bold tracking-widest text-amber-300">{devOtp}</span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setOtpCode(devOtp);
                    toast.success("2FA code auto-filled!");
                  }}
                  className="h-7 px-2.5 text-[11px] bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg cursor-pointer"
                >
                  Auto-fill Code
                </Button>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs text-slate-300 font-semibold">6-Digit Security Code</Label>
                  <span className="text-[11px] font-mono text-slate-400">
                    Code expires in <strong className="text-amber-400">{formatTimer(timeLeft)}</strong>
                  </span>
                </div>
                <Input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • • • •"
                  className="bg-slate-950 border-slate-700 text-white rounded-xl h-12 text-center text-xl tracking-[0.5em] font-mono focus-visible:ring-amber-500 font-bold"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || otpCode.length !== 6 || timeLeft <= 0}
                  className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Authorizing Administrative Session...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-4 mr-2" />
                      Verify Code & Enter Admin Console
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Didn't receive the security code?</span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className={`font-semibold cursor-pointer ${
                    resendCooldown > 0 ? "text-slate-600 cursor-not-allowed" : "text-amber-400 hover:underline"
                  }`}
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Security Code"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>

      <footer className="text-center text-[11px] text-slate-500 py-4">
        CareerSetu AI Platform Security System • Multi-Factor Authentication & RBAC Tier 1
      </footer>
    </div>
  );
}
