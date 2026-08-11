import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Bot, LogOut, Sparkles, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { CareerChatbot } from "@/components/ai/CareerChatbot";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user) return { user: data.user };
    } catch {
      // Fallback
    }

    const demo = typeof localStorage !== "undefined" ? localStorage.getItem("careersetu_demo_user") : null;
    if (demo) {
      return { user: JSON.parse(demo) };
    }

    // Auto-initialize demo user if visiting directly
    const defaultUser = {
      id: "demo-user-id",
      full_name: "Aditi Kulkarni",
      email: "student@careersetu.ai",
      city: "Pune",
      current_education: "btech_cs",
    };
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("careersetu_demo_user", JSON.stringify(defaultUser));
    }
    return { user: defaultUser };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showChatbot, setShowChatbot] = useState(false);

  let userName = "Student";
  if (typeof localStorage !== "undefined") {
    const demo = localStorage.getItem("careersetu_demo_user");
    if (demo) {
      try {
        userName = JSON.parse(demo).full_name || "Student";
      } catch {}
    }
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("careersetu_demo_user");
    }
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", search: { mode: "login" }, replace: true });
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" aria-label="CareerSetu dashboard">
              <Logo />
            </Link>
            <Badge variant="outline" className="hidden sm:inline-flex border-primary/20 text-primary text-xs bg-primary/5">
              Dashboard Portal
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChatbot(true)}
              className="h-9 rounded-xl gap-1.5 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-semibold"
            >
              <Bot className="size-4" />
              <span className="hidden sm:inline">Ask AI Assistant</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl relative" aria-label="Notifications">
                  <Bell className="size-4 text-muted-foreground" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-2xl p-4">
                <DropdownMenuLabel className="font-bold flex items-center justify-between text-xs">
                  <span>Exam Notifications</span>
                  <Badge variant="secondary" className="text-[10px]">3 New</Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-xl bg-accent/50">
                    <p className="font-medium">UPSC CSE 2026 Registration Open</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Apply before deadline</p>
                  </div>
                  <div className="p-2 rounded-xl bg-accent/50">
                    <p className="font-medium">GATE 2027 Syllabus Updated</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">2 new AI subtopics added</p>
                  </div>
                  <div className="p-2 rounded-xl bg-accent/50">
                    <p className="font-medium">New Scholarship Match</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Maharashtra EBC Freeship</p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 rounded-xl gap-2 px-2.5">
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-xs">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline text-xs font-semibold truncate max-w-28">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2">
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Logged in as <strong className="text-foreground block font-medium truncate">{userName}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem onSelect={signOut} className="rounded-xl text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <Outlet />

      {/* Floating AI Chatbot Dialog */}
      {showChatbot && (
        <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
          <DialogContent className="max-w-md p-0 border-0 bg-transparent shadow-none">
            <CareerChatbot onClose={() => setShowChatbot(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
