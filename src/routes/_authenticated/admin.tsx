import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Briefcase,
  Database,
  GraduationCap,
  Landmark,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CAREERS_DATA } from "@/lib/data/careers-data";
import { EXAMS_DATA } from "@/lib/data/exams-data";
import { SCHOLARSHIPS_DATA } from "@/lib/data/scholarships-data";
import { ASSESSMENT_QUESTIONS } from "@/lib/data/assessment-questions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Management Portal — CareerSetu" },
      {
        name: "description",
        content: "CareerSetu Administrator Dashboard for managing career records, exam notifications, and platform analytics.",
      },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [careersList, setCareersList] = useState(CAREERS_DATA);
  const [examsList, setExamsList] = useState(EXAMS_DATA);
  const [newCareerTitle, setNewCareerTitle] = useState("");
  const [newCareerDomain, setNewCareerDomain] = useState("Technology");

  const handleDeleteCareer = (id: string) => {
    setCareersList((prev) => prev.filter((c) => c.id !== id));
    toast.success("Career entry deleted from directory");
  };

  const handleDeleteExam = (id: string) => {
    setExamsList((prev) => prev.filter((e) => e.id !== id));
    toast.success("Exam notification deleted");
  };

  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareerTitle.trim()) return;

    const newEntry: any = {
      id: "custom-" + Date.now(),
      name: newCareerTitle.trim(),
      domain: newCareerDomain,
      salary: "₹10 - ₹25 LPA",
      minSalaryLPA: 10,
      maxSalaryLPA: 25,
      demand: "High",
      educationRequired: "Graduate",
      sector: "Private",
      workType: "Hybrid",
      description: "Custom career profile added via administrator control panel.",
      responsibilities: ["Core domain execution", "Strategic milestone delivery"],
      requiredSkills: ["Domain Expertise", "Analytical Thinking"],
      degrees: ["Bachelor's Degree"],
      topColleges: ["Top Indian Universities"],
      topRecruiters: ["Leading Corporates"],
      futureScope: "Positive market outlook.",
      roadmap: [{ stage: "Stage 1", title: "Foundation", desc: "Build domain basics." }],
      tags: ["Admin Created", "New"],
    };

    setCareersList([newEntry, ...careersList]);
    setNewCareerTitle("");
    toast.success(`Published ${newEntry.name} to live directory!`);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-amber-500/10 text-amber-500">
              <Shield className="size-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground">
              CareerSetu Admin Management Control
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Publish careers, manage exam timelines, and monitor real-time platform student metrics.
          </p>
        </div>

        <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs py-1">
          🔐 Administrator Authorization Verified
        </Badge>
      </div>

      {/* Analytics KPI Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="glass p-4 rounded-2xl border-border text-center space-y-1 bg-card/90">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Total Students</span>
          <p className="text-2xl font-bold text-foreground">12,450+</p>
        </Card>

        <Card className="glass p-4 rounded-2xl border-border text-center space-y-1 bg-card/90">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Assessments Taken</span>
          <p className="text-2xl font-bold text-primary">8,920</p>
        </Card>

        <Card className="glass p-4 rounded-2xl border-border text-center space-y-1 bg-card/90">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Active Careers</span>
          <p className="text-2xl font-bold text-emerald-500">{careersList.length}</p>
        </Card>

        <Card className="glass p-4 rounded-2xl border-border text-center space-y-1 bg-card/90">
          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Exams Tracked</span>
          <p className="text-2xl font-bold text-blue-500">{examsList.length}</p>
        </Card>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="careers" className="space-y-4">
        <TabsList className="rounded-2xl p-1 bg-accent/60 w-full sm:w-auto">
          <TabsTrigger value="careers" className="rounded-xl text-xs font-semibold gap-1.5">
            <Briefcase className="size-3.5" /> Manage Careers ({careersList.length})
          </TabsTrigger>
          <TabsTrigger value="exams" className="rounded-xl text-xs font-semibold gap-1.5">
            <Landmark className="size-3.5" /> Manage Exams ({examsList.length})
          </TabsTrigger>
          <TabsTrigger value="questions" className="rounded-xl text-xs font-semibold gap-1.5">
            <Database className="size-3.5" /> Questions ({ASSESSMENT_QUESTIONS.length})
          </TabsTrigger>
        </TabsList>

        {/* Careers Management */}
        <TabsContent value="careers" className="space-y-4">
          {/* Quick Add Career */}
          <form onSubmit={handleAddCareer}>
            <Card className="p-4 rounded-2xl border-border/80 bg-accent/30 flex flex-col sm:flex-row items-center gap-3">
              <Input
                value={newCareerTitle}
                onChange={(e) => setNewCareerTitle(e.target.value)}
                placeholder="New Career Title (e.g. Quantitative Risk Analyst)"
                className="rounded-xl h-9 text-xs flex-1 bg-background"
                required
              />
              <select
                value={newCareerDomain}
                onChange={(e) => setNewCareerDomain(e.target.value)}
                className="h-9 px-3 rounded-xl border border-border text-xs bg-background text-foreground"
              >
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Management">Management</option>
                <option value="Business & Finance">Business & Finance</option>
                <option value="Law & Policy">Law & Policy</option>
              </select>
              <Button type="submit" size="sm" className="gradient-brand text-primary-foreground font-bold rounded-xl text-xs shrink-0">
                <Plus className="size-3.5 mr-1" /> Add Career
              </Button>
            </Card>
          </form>

          {/* Careers Table */}
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-accent/40">
                  <th className="p-3 font-bold">Career Name</th>
                  <th className="p-3 font-bold">Domain</th>
                  <th className="p-3 font-bold">Salary Range</th>
                  <th className="p-3 font-bold">Demand</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {careersList.map((c) => (
                  <tr key={c.id} className="border-b border-border/40 hover:bg-accent/20">
                    <td className="p-3 font-semibold text-foreground">{c.name}</td>
                    <td className="p-3 text-muted-foreground">{c.domain}</td>
                    <td className="p-3 text-emerald-500 font-bold">{c.salary}</td>
                    <td className="p-3 text-foreground">{c.demand}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteCareer(c.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Exams Management */}
        <TabsContent value="exams" className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border bg-accent/40">
                  <th className="p-3 font-bold">Exam Name</th>
                  <th className="p-3 font-bold">Conducting Body</th>
                  <th className="p-3 font-bold">Status</th>
                  <th className="p-3 font-bold">Last Updated</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {examsList.map((e) => (
                  <tr key={e.id} className="border-b border-border/40 hover:bg-accent/20">
                    <td className="p-3 font-semibold text-foreground">{e.name}</td>
                    <td className="p-3 text-muted-foreground">{e.conductingBody}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-[10px]">{e.status}</Badge>
                    </td>
                    <td className="p-3 font-mono text-muted-foreground">{e.lastUpdated}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteExam(e.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Assessment Questions View */}
        <TabsContent value="questions" className="space-y-4">
          <div className="space-y-2">
            {ASSESSMENT_QUESTIONS.slice(0, 10).map((q) => (
              <div key={q.id} className="p-3 rounded-xl bg-card border border-border flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  Q{q.id}. {q.text}
                </span>
                <Badge variant="secondary" className="text-[10px] shrink-0 ml-2">
                  {q.category} · Weight: {q.weight}
                </Badge>
              </div>
            ))}
            <p className="text-xs text-muted-foreground text-center pt-2">
              Showing 10 of {ASSESSMENT_QUESTIONS.length} adaptive database questions.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
