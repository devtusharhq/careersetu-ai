import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  Briefcase,
  Landmark,
  GraduationCap,
  Building2,
  BookOpen,
  ArrowRight,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CAREERS_DATA } from "@/lib/data/careers-data";
import { EXAMS_DATA } from "@/lib/data/exams-data";
import { SCHOLARSHIPS_DATA } from "@/lib/data/scholarships-data";
import { COLLEGES_DATA } from "@/lib/data/colleges-data";
import { RESOURCES_DATA } from "@/lib/data/resources-data";

export function GlobalSearchModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const q = query.toLowerCase().trim();

  const matchingCareers = q
    ? CAREERS_DATA.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 4)
    : CAREERS_DATA.slice(0, 3);

  const matchingExams = q
    ? EXAMS_DATA.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.shortName.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : EXAMS_DATA.slice(0, 2);

  const matchingScholarships = q
    ? SCHOLARSHIPS_DATA.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.provider.toLowerCase().includes(q)
      ).slice(0, 2)
    : SCHOLARSHIPS_DATA.slice(0, 2);

  const matchingColleges = q
    ? COLLEGES_DATA.filter(
        (col) =>
          col.name.toLowerCase().includes(q) ||
          col.city.toLowerCase().includes(q) ||
          col.coursesOffered.some((crs) => crs.toLowerCase().includes(q))
      ).slice(0, 3)
    : COLLEGES_DATA.slice(0, 2);

  const handleSelect = (path: string) => {
    onOpenChange(false);
    navigate({ to: path as any });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-primary/20 shadow-2xl bg-card">
        {/* Search Bar Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-accent/30">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search careers, exams, colleges, scholarships..."
            className="border-0 bg-transparent text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-9"
            autoFocus
          />
          <Badge variant="outline" className="text-[10px] hidden sm:inline-flex text-muted-foreground">
            ESC to close
          </Badge>
        </div>

        {/* Results Body */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {/* Careers */}
          {matchingCareers.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground px-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="size-3.5 text-primary" /> Careers
                </span>
                <span>{matchingCareers.length} results</span>
              </div>
              {matchingCareers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(`/careers`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-accent/80 transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {c.domain} · {c.salary} · {c.demand} Demand
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Government Exams */}
          {matchingExams.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground px-2">
                <span className="flex items-center gap-1.5">
                  <Landmark className="size-3.5 text-blue-500" /> Government & National Exams
                </span>
                <span>{matchingExams.length} results</span>
              </div>
              {matchingExams.map((e) => (
                <button
                  key={e.id}
                  onClick={() => handleSelect(`/exams`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-accent/80 transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {e.name} ({e.shortName})
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {e.conductingBody} · {e.status}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Colleges */}
          {matchingColleges.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground px-2">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-emerald-500" /> Top Colleges
                </span>
                <span>{matchingColleges.length} results</span>
              </div>
              {matchingColleges.map((col) => (
                <button
                  key={col.id}
                  onClick={() => handleSelect(`/colleges`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-accent/80 transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {col.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {col.city}, {col.state} · NIRF #{col.nirfRank}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Scholarships */}
          {matchingScholarships.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground px-2">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="size-3.5 text-amber-500" /> Scholarships
                </span>
                <span>{matchingScholarships.length} results</span>
              </div>
              {matchingScholarships.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelect(`/scholarships`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-accent/80 transition-colors text-left group cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.amount} · Deadline: {s.deadline}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
