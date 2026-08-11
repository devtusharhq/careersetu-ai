import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Award,
  BookOpen,
  Bookmark,
  CalendarClock,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Landmark,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { educationLabel } from "@/lib/options";
import { getMyProfile } from "@/lib/profile.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — CareerSetu" },
      {
        name: "description",
        content:
          "Your personalized CareerSetu dashboard: career match score, assessment progress, saved exams, deadlines and study plan.",
      },
      { property: "og:title", content: "Dashboard — CareerSetu" },
      {
        property: "og:description",
        content: "Track your career match score, study progress and upcoming exam deadlines.",
      },
    ],
  }),
  component: Dashboard,
});

const DEFAULT_INTERESTS = [
  { area: "Technology", score: 92 },
  { area: "Science", score: 78 },
  { area: "Management", score: 64 },
  { area: "Commerce", score: 48 },
  { area: "Arts", score: 35 },
  { area: "Law", score: 42 },
];

const INITIAL_CAREERS = [
  { id: "1", name: "AI & Machine Learning Engineer", match: 94, salary: "₹12 - ₹35 LPA", demand: "Very High" },
  { id: "2", name: "Cloud Architect & DevOps", match: 88, salary: "₹10 - ₹28 LPA", demand: "High" },
  { id: "3", name: "Data Scientist & Analyst", match: 85, salary: "₹9 - ₹24 LPA", demand: "High" },
  { id: "4", name: "IAS Officer (Civil Services)", match: 81, salary: "₹7 - ₹18 LPA + Perks", demand: "Prestigious" },
];

const INITIAL_EXAMS = [
  { id: "e1", name: "GATE CS (Computer Science)", window: "Feb 2027", category: "Engineering", saved: true },
  { id: "e2", name: "ISRO Scientist/Engineer ICRB", window: "Nov 2026", category: "Engineering", saved: true },
  { id: "e3", name: "UPSC Civil Services (Prelims)", window: "May 2027", category: "Civil Services", saved: true },
  { id: "e4", name: "JEE Advanced 2026", window: "May 2026", category: "Engineering", saved: false },
  { id: "e5", name: "NEET UG Medical 2026", window: "May 2026", category: "Medical", saved: false },
  { id: "e6", name: "SSC CGL Tier 1", window: "Sep 2026", category: "Civil Services", saved: false },
];

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "When solving a complex problem, what is your preferred approach?",
    options: [
      { text: "Write code, algorithm or build software", scores: { Technology: 25, Science: 15 } },
      { text: "Analyze data, numbers, financial trends", scores: { Commerce: 25, Management: 15 } },
      { text: "Manage people, strategy and team execution", scores: { Management: 25, Law: 10 } },
      { text: "Research scientific theories or nature", scores: { Science: 25, Arts: 10 } },
    ],
  },
  {
    id: 2,
    question: "Which work environment excites you most?",
    options: [
      { text: "Tech startup / IT Innovation lab", scores: { Technology: 25 } },
      { text: "Government office / Policy & administration", scores: { Law: 20, Management: 15 } },
      { text: "Research laboratory / Hospital", scores: { Science: 25 } },
      { text: "Corporate finance / Investment firm", scores: { Commerce: 25 } },
    ],
  },
  {
    id: 3,
    question: "What type of subjects did you enjoy most in high school/college?",
    options: [
      { text: "Mathematics & Computer Studies", scores: { Technology: 20, Science: 15 } },
      { text: "Physics, Chemistry & Biology", scores: { Science: 25 } },
      { text: "Economics, Accounting & Business", scores: { Commerce: 25, Management: 15 } },
      { text: "History, Civics, Literature & Law", scores: { Arts: 25, Law: 20 } },
    ],
  },
];

function Dashboard() {
  const fetchProfile = useServerFn(getMyProfile);
  const { data: serverProfile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
  });

  // Local state for interactive features
  const [tasks, setTasks] = useState([
    { id: "1", title: "Aptitude: 20 quantitative questions", done: true },
    { id: "2", title: "Current affairs: 30 minutes reading", done: true },
    { id: "3", title: "DBMS & SQL revision: 1 hour", done: false },
    { id: "4", title: "Mock test Section 2 analysis", done: false },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const [savedExamsList, setSavedExamsList] = useState(INITIAL_EXAMS);
  const [examSearch, setExamSearch] = useState("");
  const [interestsData, setInterestsData] = useState(DEFAULT_INTERESTS);
  const [matchScore, setMatchScore] = useState(92);

  // Mini Assessment Modal State
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  // Local storage profile fallback
  const demoProfile = typeof localStorage !== "undefined" ? localStorage.getItem("careersetu_demo_user") : null;
  const parsedDemo = demoProfile ? JSON.parse(demoProfile) : null;

  const profile = serverProfile || parsedDemo || {
    full_name: "Aditi Kulkarni",
    city: "Pune",
    current_education: "btech_cs",
  };

  const firstName = (profile?.full_name || "").split(" ")[0] || "Student";
  const doneTasks = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((doneTasks / (tasks.length || 1)) * 100);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTaskTitle.trim(), done: false },
    ]);
    setNewTaskTitle("");
    toast.success("Task added to Study Planner!");
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveExam = (id: string) => {
    setSavedExamsList((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const next = !e.saved;
          toast.success(next ? `Bookmarked ${e.name}` : `Removed ${e.name}`);
          return { ...e, saved: next };
        }
        return e;
      })
    );
  };

  const handleAssessmentOptionSelect = (optionIndex: number) => {
    const nextAnswers = [...selectedAnswers, optionIndex];
    setSelectedAnswers(nextAnswers);

    if (assessmentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setAssessmentStep((prev) => prev + 1);
    } else {
      // Calculate scores
      const updatedInterests = [...interestsData];
      nextAnswers.forEach((ansIdx, qIdx) => {
        const option = ASSESSMENT_QUESTIONS[qIdx].options[ansIdx];
        Object.entries(option.scores).forEach(([area, points]) => {
          const item = updatedInterests.find((i) => i.area === area);
          if (item) {
            item.score = Math.min(100, item.score + points);
          }
        });
      });

      setInterestsData(updatedInterests);
      setMatchScore(96);
      setIsAssessmentOpen(false);
      setAssessmentStep(0);
      setSelectedAnswers([]);
      toast.success("Assessment complete! Your Career Match Score is now 96%!");
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      <h1 className="sr-only">Your CareerSetu dashboard</h1>

      {/* Welcome Banner */}
      <Card className="gradient-brand shadow-elegant overflow-hidden rounded-3xl border-0 p-6 sm:p-8 text-primary-foreground">
        {isLoading && !serverProfile && !parsedDemo ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64 bg-primary-foreground/20" />
            <Skeleton className="h-4 w-80 bg-primary-foreground/20" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <Sparkles className="size-3.5" />
                {educationLabel(profile?.current_education)}
                {profile?.city ? ` · ${profile.city}` : ""}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {firstName}!
              </h2>
              <p className="max-w-xl text-xs sm:text-sm text-primary-foreground/85 leading-relaxed">
                Your AI career analysis is <strong className="text-white font-bold">{matchScore}% matched</strong> for Technology & Engineering. Complete your 3-question quick quiz to refine your report!
              </p>
            </div>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setIsAssessmentOpen(true)}
              className="h-12 rounded-xl font-bold px-6 shadow-soft shrink-0 hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="mr-2 size-4 text-primary" />
              Take Quick AI Assessment
            </Button>
          </div>
        )}
      </Card>

      {/* Key Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Target} label="Top Match Score" value={`${matchScore}%`} hint="AI & Machine Learning Engineer" />
        <StatCard icon={GraduationCap} label="Assessment Progress" value="45/50" hint="90% complete" />
        <StatCard icon={Bookmark} label="Bookmarked Careers" value={String(INITIAL_CAREERS.length)} hint="Top recommendations" />
        <StatCard icon={Landmark} label="Tracked Govt Exams" value={String(savedExamsList.filter(e => e.saved).length)} hint="Active deadlines" />
      </div>

      {/* Dashboard Tabs for Modules */}
      <Tabs defaultValue="overview" className="w-full space-y-6">
        <TabsList className="flex w-full overflow-x-auto justify-start sm:justify-center rounded-2xl bg-card border border-border p-1.5 scrollbar-none">
          <TabsTrigger value="overview" className="rounded-xl text-xs sm:text-sm font-medium px-4">Overview</TabsTrigger>
          <TabsTrigger value="planner" className="rounded-xl text-xs sm:text-sm font-medium px-4">Study Planner ({doneTasks}/{tasks.length})</TabsTrigger>
          <TabsTrigger value="exams" className="rounded-xl text-xs sm:text-sm font-medium px-4">Government Exams</TabsTrigger>
          <TabsTrigger value="careers" className="rounded-xl text-xs sm:text-sm font-medium px-4">Saved Careers</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Interest Radar Chart */}
            <Card className="glass rounded-2xl p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">Career Interest Spectrum</h3>
                  <p className="text-xs text-muted-foreground">Computed live from your assessment profile</p>
                </div>
                <Badge variant="outline" className="text-xs">Live Analytics</Badge>
              </div>
              <div className="mt-4 h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={interestsData} outerRadius="70%">
                    <PolarGrid stroke="var(--border)" />
                    <PolarAngleAxis dataKey="area" tick={{ fill: "var(--foreground)", fontSize: 12 }} />
                    <Radar
                      dataKey="score"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.35}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        color: "var(--popover-foreground)",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Today's Goal Quick Card */}
            <Card className="glass rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-base">Today's Study Goal</h3>
                  <Badge variant={progressPercent === 100 ? "default" : "secondary"}>
                    {progressPercent}% Complete
                  </Badge>
                </div>
                <Progress value={progressPercent} className="mt-4 h-2.5 rounded-full" />
                <ul className="mt-4 space-y-2.5">
                  {tasks.slice(0, 4).map((t) => (
                    <li
                      key={t.id}
                      onClick={() => toggleTask(t.id)}
                      className="flex items-center gap-3 text-xs sm:text-sm cursor-pointer group"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full transition-colors ${
                          t.done
                            ? "bg-emerald-500 text-white"
                            : "border border-border group-hover:border-primary"
                        }`}
                      >
                        {t.done ? <CheckCircle2 className="size-3.5" /> : null}
                      </span>
                      <span className={t.done ? "text-muted-foreground line-through" : "text-foreground font-medium"}>
                        {t.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsAssessmentOpen(true)}
                className="mt-6 w-full rounded-xl gap-2 border-primary/20 text-xs font-semibold text-primary"
              >
                <Sparkles className="size-4" />
                Retake Career Quiz
              </Button>
            </Card>
          </div>

          {/* Secondary Charts & Lists */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ListCard
              icon={Bookmark}
              title="Top Recommended Careers"
              items={INITIAL_CAREERS.map((c) => ({ primary: c.name, secondary: `${c.match}% match` }))}
            />
            <ListCard
              icon={Landmark}
              title="Tracked Government Exams"
              items={savedExamsList.filter(e => e.saved).map((e) => ({ primary: e.name, secondary: e.window }))}
            />
            <ListCard
              icon={Wallet}
              title="Matched Scholarships"
              items={[
                { primary: "NSP Merit Scholarship 2026", secondary: "₹20,000/yr" },
                { primary: "Maharashtra Freeship Scheme", secondary: "Full Tuition" },
              ]}
            />
          </div>
        </TabsContent>

        {/* STUDY PLANNER TAB */}
        <TabsContent value="planner" className="space-y-6">
          <Card className="glass rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-display">Interactive AI Study Planner</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Manage daily study objectives and track preparation progress.</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {doneTasks} of {tasks.length} Completed
                </Badge>
              </div>
            </div>

            <Progress value={progressPercent} className="mt-4 h-3 rounded-full" />

            {/* Add Task Form */}
            <form onSubmit={addTask} className="mt-6 flex items-center gap-2">
              <Input
                placeholder="Add a new study goal (e.g. Solve 30 Quant questions)..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="h-11 rounded-xl bg-background border-border text-sm"
              />
              <Button type="submit" className="gradient-brand h-11 px-5 rounded-xl text-primary-foreground font-semibold shrink-0 gap-1.5">
                <Plus className="size-4" /> Add Task
              </Button>
            </form>

            {/* Tasks List */}
            <div className="mt-6 space-y-3">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                    t.done
                      ? "bg-accent/30 border-border/40"
                      : "bg-card border-border shadow-xs hover:border-primary/40"
                  }`}
                >
                  <div
                    onClick={() => toggleTask(t.id)}
                    className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full transition-colors ${
                        t.done
                          ? "bg-emerald-500 text-white"
                          : "border-2 border-border"
                      }`}
                    >
                      {t.done ? <CheckCircle className="size-4" /> : null}
                    </span>
                    <span className={`text-sm font-medium ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {t.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTask(t.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive rounded-lg"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* EXAMS TAB */}
        <TabsContent value="exams" className="space-y-6">
          <Card className="glass rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold font-display">Government & Entrance Exam Tracker</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Discover eligibility, schedules, and bookmark exams for your target timeline.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search exam name..."
                  value={examSearch}
                  onChange={(e) => setExamSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl bg-background border-border text-sm"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedExamsList
                .filter((e) => e.name.toLowerCase().includes(examSearch.toLowerCase()))
                .map((exam) => (
                  <Card key={exam.id} className="p-5 rounded-2xl border-border/80 flex flex-col justify-between bg-card hover-lift">
                    <div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-[11px]">{exam.category}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaveExam(exam.id)}
                          className={`h-8 w-8 rounded-full ${exam.saved ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        >
                          <Bookmark className={`size-4 ${exam.saved ? "fill-primary" : ""}`} />
                        </Button>
                      </div>
                      <h4 className="font-bold text-base mt-3">{exam.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                        <CalendarClock className="size-3.5 text-primary" /> Target: <strong className="text-foreground">{exam.window}</strong>
                      </p>
                    </div>
                    <Button
                      variant={exam.saved ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleSaveExam(exam.id)}
                      className="mt-5 w-full rounded-xl text-xs font-semibold"
                    >
                      {exam.saved ? "Bookmarked ✓" : "Track Exam"}
                    </Button>
                  </Card>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* CAREERS TAB */}
        <TabsContent value="careers" className="space-y-6">
          <Card className="glass rounded-3xl p-6">
            <h3 className="text-xl font-bold font-display">AI Recommended Careers</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Top high-growth careers matched to your assessment answers.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {INITIAL_CAREERS.map((career) => (
                <Card key={career.id} className="p-5 rounded-2xl border-border bg-card hover-lift flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary/10 text-primary border-primary/20">{career.match}% Match</Badge>
                      <span className="text-xs text-muted-foreground font-medium">Demand: {career.demand}</span>
                    </div>
                    <h4 className="font-bold text-lg mt-3">{career.name}</h4>
                    <p className="text-xs text-muted-foreground mt-2">
                      Est. Salary: <strong className="text-foreground font-semibold">{career.salary}</strong>
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-5 w-full rounded-xl text-xs font-semibold gap-1.5">
                    View Career Roadmap <ChevronRight className="size-3.5" />
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mini Assessment Quiz Dialog */}
      {isAssessmentOpen && (
        <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
          <DialogContent className="max-w-md rounded-3xl p-6 sm:p-8">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs text-primary border-primary/20">
                  Question {assessmentStep + 1} of {ASSESSMENT_QUESTIONS.length}
                </Badge>
              </div>
              <DialogTitle className="text-lg font-bold font-display">
                {ASSESSMENT_QUESTIONS[assessmentStep].question}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-3">
              {ASSESSMENT_QUESTIONS[assessmentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAssessmentOptionSelect(idx)}
                  className="w-full text-left p-4 rounded-2xl bg-card border border-border/80 hover:border-primary hover:bg-primary/5 transition-all text-xs sm:text-sm font-medium text-foreground flex items-center justify-between group"
                >
                  <span>{option.text}</span>
                  <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="hover-lift glass rounded-2xl p-5 border-border/70">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5 text-primary" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground font-medium">{label}</p>
          <p className="font-display text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
      <p className="mt-3 truncate text-xs text-muted-foreground">{hint}</p>
    </Card>
  );
}

function ListCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Target;
  title: string;
  items: { primary: string; secondary: string }[];
}) {
  return (
    <Card className="glass rounded-2xl p-5 border-border/70">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary shrink-0" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-xs text-muted-foreground">Nothing saved yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.primary} className="flex items-start justify-between gap-3 text-xs">
              <span className="min-w-0 flex-1 font-medium text-foreground truncate">{i.primary}</span>
              <span className="shrink-0 text-muted-foreground font-semibold">{i.secondary}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
