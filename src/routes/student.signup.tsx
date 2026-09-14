import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerStudentUser } from "@/lib/auth/rbac";
import { evaluatePasswordStrength } from "@/lib/auth/crypto";

export const Route = createFileRoute("/student/signup")({
  head: () => ({
    meta: [
      { title: "Student Registration — CareerSetu AI" },
      { name: "description", content: "Create your CareerSetu student account and start personalized career discovery." },
    ],
  }),
  component: StudentSignupPage,
});

function StudentSignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    age: "18",
    gender: "Male",
    state: "Maharashtra",
    city: "Pune",
    education: "Class 12 (Science)",
    preferred_language: "English",
  });

  const passwordStrength = evaluatePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!passwordStrength.isValid) {
      toast.error("Please create a stronger password (minimum 10 characters with uppercase, lowercase, and numbers).");
      return;
    }

    setLoading(true);

    try {
      const result = await registerStudentUser({
        name: formData.name.trim(),
        full_name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        state: formData.state,
        city: formData.city,
        education: formData.education,
        current_education: formData.education,
        preferred_language: formData.preferred_language,
      });

      if (!result.success) {
        toast.error(result.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      // Store pending verification email
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("careersetu_pending_student_email", formData.email.trim().toLowerCase());
      }

      toast.success("Account registered! A verification code has been dispatched to your email.");

      navigate({
        to: "/student/verify-mfa" as any,
      });
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 antialiased selection:bg-sky-500/20">
      <div className="mx-auto w-full max-w-xl pt-6 pb-10">
        <Link to="/" className="mb-6 flex justify-center items-center gap-2" aria-label="CareerSetu home">
          <Logo />
        </Link>

        <Card className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <span className="grid size-10 place-items-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                <UserPlus className="size-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold font-display text-white">Create Student Account</h1>
                <p className="text-xs text-slate-400">Join CareerSetu for personalized AI career guidance</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Full Name *</Label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tanvi Deshmukh"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Email Address *</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Password *</Label>
                  <Input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Confirm Password *</Label>
                  <Input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••••••"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>
              </div>

              {/* Password Strength Meter */}
              {formData.password && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Password Security:</span>
                    <span className={`text-[11px] font-bold ${passwordStrength.isValid ? "text-emerald-400" : "text-amber-400"}`}>
                      {passwordStrength.isValid ? "Strong Password" : "Needs Improvement"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${passwordStrength.score >= 1 ? "bg-red-500" : "bg-transparent"}`} />
                    <div className={`h-full ${passwordStrength.score >= 2 ? "bg-amber-500" : "bg-transparent"}`} />
                    <div className={`h-full ${passwordStrength.score >= 3 ? "bg-blue-500" : "bg-transparent"}`} />
                    <div className={`h-full ${passwordStrength.score >= 4 ? "bg-emerald-500" : "bg-transparent"}`} />
                  </div>
                  {!passwordStrength.isValid && passwordStrength.feedback.length > 0 && (
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {passwordStrength.feedback[0]}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Age</Label>
                  <Input
                    type="number"
                    min={12}
                    max={60}
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Gender</Label>
                  <Select value={formData.gender} onValueChange={(val) => setFormData({ ...formData, gender: val })}>
                    <SelectTrigger className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">State</Label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Maharashtra"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">City</Label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Pune"
                    className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs focus-visible:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Current Education</Label>
                  <Select value={formData.education} onValueChange={(val) => setFormData({ ...formData, education: val })}>
                    <SelectTrigger className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs">
                      <SelectValue placeholder="Select Education" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                      <SelectItem value="Class 10">Class 10</SelectItem>
                      <SelectItem value="Class 12 (Science)">Class 12 (Science)</SelectItem>
                      <SelectItem value="Class 12 (Commerce)">Class 12 (Commerce)</SelectItem>
                      <SelectItem value="Class 12 (Arts)">Class 12 (Arts)</SelectItem>
                      <SelectItem value="Diploma">Diploma / Polytechnic</SelectItem>
                      <SelectItem value="Graduate (B.Tech CS)">Graduate (B.Tech / B.E.)</SelectItem>
                      <SelectItem value="Graduate (B.Sc IT)">Graduate (B.Sc / BCA)</SelectItem>
                      <SelectItem value="Graduate (Commerce/B.Com)">Graduate (Commerce)</SelectItem>
                      <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-slate-300 font-semibold mb-1.5 block">Preferred Language</Label>
                  <Select value={formData.preferred_language} onValueChange={(val) => setFormData({ ...formData, preferred_language: val })}>
                    <SelectTrigger className="bg-slate-950/80 border-slate-700 text-white rounded-xl h-10 text-xs">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800 text-white">
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Creating Account & Generating MFA OTP...
                    </>
                  ) : (
                    <>
                      Create Account & Verify Email
                      <ArrowRight className="size-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="pt-2 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link to="/student/login" className="text-sky-400 font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
