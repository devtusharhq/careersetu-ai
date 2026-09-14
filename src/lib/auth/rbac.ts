// Role-Based Access Control (RBAC) & Security Layer for CareerSetu AI

export type UserRole = "STUDENT" | "ADMIN";

export type Permission =
  | "MANAGE_USERS"
  | "MANAGE_CAREERS"
  | "MANAGE_EXAMS"
  | "MANAGE_SCHOLARSHIPS"
  | "MANAGE_COLLEGES"
  | "MANAGE_QUESTIONS"
  | "MANAGE_RESOURCES"
  | "MANAGE_SKILLS"
  | "MANAGE_NOTIFICATIONS"
  | "VIEW_ANALYTICS"
  | "ACCESS_ADMIN"
  | "VIEW_STUDENT_DASHBOARD"
  | "TAKE_ASSESSMENT"
  | "CREATE_STUDY_PLAN"
  | "EDIT_OWN_PROFILE"
  | "EXPORT_RESUME";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  STUDENT: [
    "VIEW_STUDENT_DASHBOARD",
    "TAKE_ASSESSMENT",
    "CREATE_STUDY_PLAN",
    "EDIT_OWN_PROFILE",
    "EXPORT_RESUME",
  ],
  ADMIN: [
    "MANAGE_USERS",
    "MANAGE_CAREERS",
    "MANAGE_EXAMS",
    "MANAGE_SCHOLARSHIPS",
    "MANAGE_COLLEGES",
    "MANAGE_QUESTIONS",
    "MANAGE_RESOURCES",
    "MANAGE_SKILLS",
    "MANAGE_NOTIFICATIONS",
    "VIEW_ANALYTICS",
    "ACCESS_ADMIN",
    "VIEW_STUDENT_DASHBOARD",
    "TAKE_ASSESSMENT",
    "CREATE_STUDY_PLAN",
    "EDIT_OWN_PROFILE",
    "EXPORT_RESUME",
  ],
};

export interface AppUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  age?: string;
  gender?: string;
  state?: string;
  city?: string;
  current_education?: string;
  preferred_language?: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  registeredAt: string;
  lastActive: string;
}

export interface AuditLogEntry {
  id: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details: string;
  timestamp: string;
}

export type ContentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

// Seeded Initial Users (Students + Verified Admins)
const INITIAL_USERS: AppUser[] = [
  {
    id: "admin-master-1",
    email: "admin@careersetu.ai",
    full_name: "Tushar Devendra (Lead Admin)",
    role: "ADMIN",
    phone: "9876500001",
    state: "Maharashtra",
    city: "Mumbai",
    status: "ACTIVE",
    registeredAt: "2026-01-10T10:00:00.000Z",
    lastActive: new Date().toISOString(),
  },
  {
    id: "admin-master-2",
    email: "ops@careersetu.ai",
    full_name: "Platform Ops Admin",
    role: "ADMIN",
    phone: "9876500002",
    state: "Delhi",
    city: "New Delhi",
    status: "ACTIVE",
    registeredAt: "2026-02-01T12:00:00.000Z",
    lastActive: new Date().toISOString(),
  },
  {
    id: "student-1",
    email: "aditi.kulkarni@gmail.com",
    full_name: "Aditi Kulkarni",
    role: "STUDENT",
    phone: "9876543210",
    age: "20",
    gender: "Female",
    state: "Maharashtra",
    city: "Pune",
    current_education: "Graduate (B.Tech CS)",
    preferred_language: "English",
    status: "ACTIVE",
    registeredAt: "2026-03-01T09:30:00.000Z",
    lastActive: new Date().toISOString(),
  },
  {
    id: "student-2",
    email: "rahul.sharma@gmail.com",
    full_name: "Rahul Sharma",
    role: "STUDENT",
    phone: "9811223344",
    age: "18",
    gender: "Male",
    state: "Uttar Pradesh",
    city: "Lucknow",
    current_education: "Class 12 (Science)",
    preferred_language: "Hindi",
    status: "ACTIVE",
    registeredAt: "2026-03-05T14:20:00.000Z",
    lastActive: new Date().toISOString(),
  },
  {
    id: "student-3",
    email: "priya.patil@outlook.com",
    full_name: "Priya Patil",
    role: "STUDENT",
    phone: "9822334455",
    age: "21",
    gender: "Female",
    state: "Maharashtra",
    city: "Nagpur",
    current_education: "Graduate (B.Sc IT)",
    preferred_language: "Marathi",
    status: "ACTIVE",
    registeredAt: "2026-03-08T11:15:00.000Z",
    lastActive: new Date().toISOString(),
  },
];

// INITIAL AUDIT LOGS
const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-1",
    adminEmail: "admin@careersetu.ai",
    action: "CONTENT_PUBLISHED",
    entity: "Career",
    entityId: "ai-ml-engineer",
    details: "Published AI & Machine Learning Engineer profile with updated 2026 salary benchmarks",
    timestamp: "2026-03-10T14:30:00.000Z",
  },
  {
    id: "log-2",
    adminEmail: "admin@careersetu.ai",
    action: "EXAM_UPDATED",
    entity: "Government Exam",
    entityId: "upsc-cse",
    details: "Updated UPSC CSE 2026 notification link and application window dates",
    timestamp: "2026-03-12T09:45:00.000Z",
  },
  {
    id: "log-3",
    adminEmail: "ops@careersetu.ai",
    action: "NOTIFICATION_BROADCAST",
    entity: "Notification",
    details: "Broadcasted AICTE Pragati Scholarship deadline reminder to eligible students",
    timestamp: "2026-03-14T08:00:00.000Z",
  },
];

// USERS REPOSITORY
export function getAllUsers(): AppUser[] {
  if (typeof localStorage === "undefined") return INITIAL_USERS;
  try {
    const raw = localStorage.getItem("careersetu_rbac_users");
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_USERS;
}

export function saveAllUsers(users: AppUser[]) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("careersetu_rbac_users", JSON.stringify(users));
}

export function toggleUserStatus(userId: string): AppUser | null {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) return null;
  const user = users[index];
  if (!user) return null;

  user.status = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
  saveAllUsers(users);
  logAuditEvent("USER_STATUS_CHANGE", "User", userId, `Changed status of ${user.email} to ${user.status}`);
  return user;
}

// CURRENT AUTHENTICATED USER HELPER
export function getCurrentUser(): AppUser {
  if (typeof localStorage === "undefined") return INITIAL_USERS[2]!; // default student
  try {
    const raw = localStorage.getItem("careersetu_demo_user");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        id: parsed.id || "student-current",
        email: parsed.email || "student@careersetu.ai",
        full_name: parsed.full_name || "Student",
        role: parsed.role === "ADMIN" || parsed.role === "admin" ? "ADMIN" : "STUDENT",
        phone: parsed.phone,
        age: parsed.age,
        gender: parsed.gender,
        state: parsed.state,
        city: parsed.city,
        current_education: parsed.current_education,
        preferred_language: parsed.preferred_language,
        status: parsed.status || "ACTIVE",
        registeredAt: parsed.registeredAt || "2026-03-01T00:00:00.000Z",
        lastActive: new Date().toISOString(),
      };
    }
  } catch {}
  return INITIAL_USERS[2]!; // Default student
}

export function setCurrentUser(user: AppUser) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("careersetu_demo_user", JSON.stringify(user));
  
  // Also sync in users list
  const users = getAllUsers();
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = { ...users[existingIdx], ...user, lastActive: new Date().toISOString() };
  } else {
    users.push(user);
  }
  saveAllUsers(users);
}

// PERMISSION VERIFICATION
export function hasPermission(user: AppUser | null | undefined, permission: Permission): boolean {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.includes(permission);
}

export function isAdmin(user: AppUser | null | undefined): boolean {
  return user?.role === "ADMIN";
}

export function isStudent(user: AppUser | null | undefined): boolean {
  return user?.role === "STUDENT";
}

// AUDIT LOGS
export function getAuditLogs(): AuditLogEntry[] {
  if (typeof localStorage === "undefined") return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem("careersetu_audit_logs");
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_AUDIT_LOGS;
}

export function logAuditEvent(action: string, entity: string, entityId: string | undefined, details: string) {
  const current = getCurrentUser();
  const logs = getAuditLogs();
  const newEntry: AuditLogEntry = {
    id: "audit-" + Date.now(),
    adminEmail: current.role === "ADMIN" ? current.email : "system@careersetu.ai",
    action,
    entity,
    entityId,
    details,
    timestamp: new Date().toISOString(),
  };
  const updated = [newEntry, ...logs].slice(0, 100); // keep last 100
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("careersetu_audit_logs", JSON.stringify(updated));
  }
}
