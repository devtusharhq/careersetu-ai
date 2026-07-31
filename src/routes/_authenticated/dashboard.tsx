import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import {
  Award,
  BookOpen,
  Bookmark,
  CalendarClock,
  GraduationCap,
  Landmark,
  Sparkles,
  Target,
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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

const interests = [
  { area: "Technology", score: 92 },
  { area: "Science", score: 78 },
  { area: "Management", score: 64 },
  { area: "Commerce", score: 48 },
  { area: "Arts", score: 35 },
  { area: "Law", score: 42 },
];

const studyProgress = [
  { week: "W1", hours: 8 },
  { week: "W2", hours: 12 },
  { week: "W3", hours: 10 },
  { week: "W4", hours: 16 },
  { week: "W5", hours: 14 },
  { week: "W6", hours: 19 },
];

const assessmentScores = [
  { name: "Logical", score: 84 },
  { name: "Verbal", score: 71 },
  { name: "Quant", score: 66 },
  { name: "GK", score: 58 },
];

const savedCareers = [
  { name: "AI Engineer", match: 94 },
  { name: "Cloud Engineer", match: 88 },
  { name: "Data Scientist", match: 85 },
];

const savedExams = [
  { name: "GATE CS", window: "Feb 2027" },
  { name: "ISRO Scientist/Engineer", window: "Aug 2026" },
  { name: "UPSC CSE", window: "May 2027" },
];

const deadlines = [
  { title: "GATE 2027 registration", date: "12 Sep 2026" },
  { title: "NSP scholarship application", date: "30 Sep 2026" },
  { title: "ISRO ICRB application", date: "08 Oct 2026" },
];

const scholarships = [
  { name: "National Scholarship Portal — Merit", amount: "₹20,000/yr" },
  { name: "Maharashtra EBC Freeship", amount: "Full tuition" },
];

const tasks = [
  { title: "Aptitude: 20 questions", done: true },
  { title: "Current affairs: 30 min", done: true },
  { title: "DBMS revision: 1 hour", done: false },
  { title: "Mock test section 2", done: false },
];

const notifications = [
  { title: "New scholarship matched in Maharashtra", time: "2h ago" },
  { title: "GATE registration opens next week", time: "1d ago" },
  { title: "Your study plan was rescheduled", time: "3d ago" },
];

function Dashboard() {
  const fetchProfile = useServerFn(getMyProfile);
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
  });

  const firstName = (profile?.full_name || "").split(" ")[0] || "there";
  const doneTasks = tasks.filter((t) => t.done).length;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="sr-only">Your CareerSetu dashboard</h1>

      {/* Welcome */}
      <Card className="gradient-brand shadow-elegant overflow-hidden rounded-3xl border-0 p-6 sm:p-8">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64 bg-primary-foreground/20" />
            <Skeleton className="h-4 w-80 bg-primary-foreground/20" />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
              <Badge className="bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/20">
                <Sparkles className="mr-1 size-3.5" />
                {educationLabel(profile?.current_education)}
                {profile?.city ? ` · ${profile.city}` : ""}
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-primary-foreground">
                Welcome back, {firstName}
              </h2>
              <p className="mt-2 max-w-lg text-sm text-primary-foreground/85">
                You are 68% through your AI career assessment. Finish it to unlock your full career
                match report and exam shortlist.
              </p>
            </div>
            <Button size="lg" variant="secondary" className="h-12 rounded-xl font-semibold">
              Continue assessment
            </Button>
          </div>
        )}
      </Card>

      {/* Stat row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Target} label="Career match score" value="92%" hint="AI Engineer" />
        <StatCard
          icon={GraduationCap}
          label="Assessment progress"
          value="34/50"
          hint="68% complete"
        />
        <StatCard icon={Bookmark} label="Saved careers" value={String(savedCareers.length)} hint="Bookmarked" />
        <StatCard icon={Landmark} label="Saved exams" value={String(savedExams.length)} hint="Tracking" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Charts */}
        <Card className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="font-semibold">Career interests</h3>
          <p className="text-xs text-muted-foreground">From your assessment answers so far</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={interests} outerRadius="72%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="area" tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
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

        {/* Today's goal */}
        <Card className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Today's goal</h3>
            <Badge variant="secondary">
              {doneTasks}/{tasks.length}
            </Badge>
          </div>
          <Progress value={(doneTasks / tasks.length) * 100} className="mt-4" />
          <ul className="mt-4 space-y-3">
            {tasks.map((t) => (
              <li key={t.title} className="flex items-center gap-3 text-sm">
                <span
                  className={
                    t.done
                      ? "grid size-5 place-items-center rounded-full bg-success text-success-foreground"
                      : "size-5 rounded-full border border-border"
                  }
                >
                  {t.done ? "✓" : ""}
                </span>
                <span className={t.done ? "text-muted-foreground line-through" : ""}>{t.title}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" className="mt-5 w-full rounded-xl">
            Open study planner
          </Button>
        </Card>

        <Card className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Study progress</h3>
          <p className="text-xs text-muted-foreground">Hours studied per week</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyProgress}>
                <defs>
                  <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="var(--chart-2)"
                  fill="url(#studyFill)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Assessment scores</h3>
          <p className="text-xs text-muted-foreground">Section-wise performance</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentScores}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="score" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5">
          <h3 className="font-semibold">Learning progress</h3>
          <div className="mt-5 space-y-4">
            {[
              { name: "Python for Data", value: 72 },
              { name: "Quantitative Aptitude", value: 55 },
              { name: "Indian Polity", value: 38 },
            ].map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{c.name}</span>
                  <span className="text-muted-foreground">{c.value}%</span>
                </div>
                <Progress value={c.value} className="mt-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Lists */}
        <ListCard
          icon={Bookmark}
          title="Saved careers"
          items={savedCareers.map((c) => ({ primary: c.name, secondary: `${c.match}% match` }))}
        />
        <ListCard
          icon={Landmark}
          title="Saved government exams"
          items={savedExams.map((e) => ({ primary: e.name, secondary: e.window }))}
        />
        <ListCard
          icon={CalendarClock}
          title="Upcoming deadlines"
          items={deadlines.map((d) => ({ primary: d.title, secondary: d.date }))}
        />
        <ListCard
          icon={Wallet}
          title="Scholarships for you"
          items={scholarships.map((s) => ({ primary: s.name, secondary: s.amount }))}
        />
        <ListCard
          icon={BookOpen}
          title="Notifications"
          items={notifications.map((n) => ({ primary: n.title, secondary: n.time }))}
        />
        <ListCard
          icon={Award}
          title="Achievements"
          items={[
            { primary: "7-day study streak", secondary: "Earned" },
            { primary: "First assessment section", secondary: "Earned" },
            { primary: "Mock test rank top 20%", secondary: "In progress" },
          ]}
        />
      </div>
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
    <Card className="hover-lift glass rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold">{value}</p>
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
    <Card className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-primary" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={i.primary} className="flex items-start justify-between gap-3 text-sm">
              <span className="min-w-0 flex-1">{i.primary}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{i.secondary}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
