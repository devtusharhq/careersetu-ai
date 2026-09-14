import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, KeyRound, Loader2, Mail, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeStudentMfaLogin, getUserByEmail, createAndDispatchMfaCode } from "@/lib/auth/rbac";
import { maskEmail } from "@/lib/auth/crypto";

export const Route = createFileRoute("/student/verify-mfa")({
  head: () => ({
    meta: [
      { title: "Verify Your Email — CareerSetu AI" },
      { name: "description", content: "Enter the 6-digit email verification code to access your student dashboard." },
    ],
  }),
  component: StudentVerifyMfaPage,
});

function StudentVerifyMfaPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [maskedDisplay, setMaskedDisplay] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600s)
  const [resendCooldown, setResendCooldown] = useState(30);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  useEffect(() => {
    let storedEmail = "";
    if (typeof sessionStorage !== "undefined") {
      storedEmail = sessionStorage.getItem("careersetu_pending_student_email") || "";
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
      storedEmail = "aditi.kulkarni@gmail.com";
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
      toast.error("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      const result = await completeStudentMfaLogin(email, otpCode.trim());

      if (!result.success) {
        toast.error(result.error || "Invalid or expired verification code.");
        setLoading(false);
        return;
      }

      toast.success(`Welcome back, ${result.user?.name || "Student"}!`);
      // Redirect to student portal dashboard
      navigate({ to: "/dashboard" as any });
    } catch (err) {
      toast.error("Verification error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    const user = getUserByEmail(email);
    if (!user) {
      toast.error("No pending student account found. Please sign in again.");
      return;
    }

    const dispatch = await createAndDispatchMfaCode(user, "LOGIN");
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

    toast.success("New verification code dispatched to your email.");
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-sky-500/20">
      <div className="mx-auto w-full max-w-md pt-8">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo />
        </Link>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Mail className="size-5" />
                </span>
                <div>
                  <h1 className="text-xl font-bold font-display text-white">Verify Your Email</h1>
                  <p className="text-xs text-slate-400">Step 2: Enter 6-digit code</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/student/login" as any })}
                className="h-8 px-2 text-xs text-slate-400 hover:text-white"
              >
                <ArrowLeft className="size-3.5 mr-1" /> Back
              </Button>
            </div>

            {/* Email Dispatch Info */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-xs">
              <p className="text-slate-400">
                We sent a 6-digit verification code to your registered email address:
              </p>
              <p className="font-mono font-bold text-sky-300 text-sm">{maskedDisplay || "student@careersetu.ai"}</p>
            </div>

            {/* Dev Mode Simulation Banner */}
            {devOtp && (
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-sky-300/80 block uppercase font-bold tracking-wider">
                    Dev Email Simulation:
                  </span>
                  <span className="text-base font-mono font-bold tracking-widest text-sky-300">{devOtp}</span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setOtpCode(devOtp);
                    toast.success("Code auto-filled!");
                  }}
                  className="h-7 px-2.5 text-[11px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-lg cursor-pointer"
                >
                  Auto-fill Code
                </Button>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label className="text-xs text-slate-300 font-semibold">6-Digit Verification Code</Label>
                  <span className="text-[11px] font-mono text-slate-400">
                    Expires in <strong className="text-amber-400">{formatTimer(timeLeft)}</strong>
                  </span>
                </div>
                <Input
                  type="text"
                  required
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="• • • • • •"
                  className="bg-slate-950 border-slate-700 text-white rounded-xl h-12 text-center text-xl tracking-[0.5em] font-mono focus-visible:ring-sky-500 font-bold"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading || otpCode.length !== 6 || timeLeft <= 0}
                  className="w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Verifying Code & Creating Session...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4 mr-2" />
                      Verify Code & Open Dashboard
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendCooldown > 0}
                  className={`font-semibold cursor-pointer ${
                    resendCooldown > 0 ? "text-slate-600 cursor-not-allowed" : "text-sky-400 hover:underline"
                  }`}
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>

      <footer className="text-center text-[11px] text-slate-500 py-4">
        CareerSetu AI Student Verification • Cryptographic Multi-Factor Authentication
      </footer>
    </div>
  );
}
