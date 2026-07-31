import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Compass, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lovable } from "@/integrations/lovable/index";
import { supabase } from "@/integrations/supabase/client";
import { EDUCATION_LEVELS, GENDERS, INDIAN_STATES, LANGUAGES } from "@/lib/options";

const title = "Log in or sign up — CareerSetu";
const description =
  "Create your CareerSetu account to start the AI career assessment, track exams and get a personalized study plan.";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    mode: search['mode'] === "signup" ? ("signup" as const) : ("login" as const),
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AuthPage;
});

const signupSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Enter a 10 digit phone number"),
  age: z.coerce.number().int().min(12, "Age must be 12 or above").max(60),
  gender: z.string().min(1, "Select your gender"),
  state: z.string().min(1, "Select your state"),
  city: z.string().trim().min(2, "Enter your city").max(60),
  current_education: z.string().min(1, "Select your current education"),
  preferred_language: z.string().min(1, "Select a language"),
});

function GoogleButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full rounded-xl"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        const result = await lovable.auth.signInWithOAuth("google", {
          redirect_uri: window.location.origin + "/dashboard",
        });
        if (result.error) {
          toast.error(result.error.message);
          setLoading(false);
        }
      }}
    >
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
      {label}
    </Button>
  );
}

function AuthPage() {
  const { mode } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailSent, setEmailSent] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? "").trim(),
      password: String(form.get("password") ?? ""),
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  }

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = signupSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const { email, password, ...meta } = parsed.data;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + "/dashboard",
        data: { ...meta, age: String(meta.age) },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      setEmailSent(true);
      return;
    }
    toast.success("Account created!");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="gradient-soft min-h-dvh px-4 py-10">
      <div className="mx-auto max-w-lg">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="gradient-brand grid size-9 place-items-center rounded-xl text-primary-foreground shadow-glow">
            <Compass className="size-5" />
          </span>
          <span className="font-display text-xl font-bold">CareerSetu</span>
        </Link>

        <Card className="glass rounded-3xl p-6 sm:p-8">
          {emailSent ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold">Check your email</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                We sent you a confirmation link. Click it to activate your CareerSetu account and
                start your assessment.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setEmailSent(false)}>
                Back
              </Button>
            </div>
          ) : (
            <Tabs
              value={mode}
              onValueChange={(v) =>
                navigate({ to: "/auth", search: { mode: v === "signup" ? "signup" : "login" } })
              }
            >
              <TabsList className="grid w-full grid-cols-2 rounded-xl">
                <TabsTrigger value="login" className="rounded-lg">
                  Log in
                </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg">
                  Sign up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Continue your career journey where you left off.
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="h-11 rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="gradient-brand h-11 w-full rounded-xl text-primary-foreground shadow-glow hover:opacity-90"
                  >
                    {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                    Log in
                  </Button>
                </form>
                <Divider />
                <GoogleButton label="Continue with Google" />
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about yourself so we can personalize your guidance.
                </p>
                <form className="mt-6 space-y-4" onSubmit={handleSignup} noValidate>
                  <Field label="Full name" name="full_name" error={errors['full_name']}>
                    <Input
                      id="full_name"
                      name="full_name"
                      placeholder="Aditi Kulkarni"
                      className="h-11 rounded-xl"
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email" name="email" error={errors['email']}>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Password" name="password" error={errors['password']}>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone number" name="phone" error={errors['phone']}>
                      <Input
                        id="phone"
                        name="phone"
                        inputMode="numeric"
                        placeholder="9876543210"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Age" name="age" error={errors['age']}>
                      <Input
                        id="age"
                        name="age"
                        inputMode="numeric"
                        placeholder="17"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Gender" name="gender" error={errors['gender']}>
                      <SelectField name="gender" placeholder="Select gender" options={GENDERS} />
                    </Field>
                    <Field label="State" name="state" error={errors['state']}>
                      <SelectField
                        name="state"
                        placeholder="Select state"
                        options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="City" name="city" error={errors['city']}>
                      <Input id="city" name="city" placeholder="Pune" className="h-11 rounded-xl" />
                    </Field>
                    <Field
                      label="Current education"
                      name="current_education"
                      error={errors['current_education']}
                    >
                      <SelectField
                        name="current_education"
                        placeholder="Select level"
                        options={EDUCATION_LEVELS}
                      />
                    </Field>
                  </div>

                  <Field
                    label="Preferred language"
                    name="preferred_language"
                    error={errors['preferred_language']}
                  >
                    <SelectField
                      name="preferred_language"
                      placeholder="Select language"
                      options={LANGUAGES}
                      defaultValue="english"
                    />
                  </Field>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="gradient-brand h-11 w-full rounded-xl text-primary-foreground shadow-glow hover:opacity-90"
                  >
                    {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                    Create account
                  </Button>
                </form>
                <Divider />
                <GoogleButton label="Sign up with Google" />
              </TabsContent>
            </Tabs>
          )}
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SelectField({
  name,
  placeholder,
  options,
  defaultValue,
}: {
  name: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id={name} className="h-11 w-full rounded-xl">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-72">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
