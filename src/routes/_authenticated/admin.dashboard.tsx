import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
  component: AdminDashboardRedirect,
});

function AdminDashboardRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/admin" as any, replace: true });
  }, [navigate]);
  return null;
}
