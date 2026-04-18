export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in_progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string | null;
  
  // UI and timeline specifically mapped fields
  project_category: string | null;
  start_time: string | null;
  end_time: string | null;
  progress: number;
  team_members: string[] | null;
  accent_color: string | null;
  link: string | null;
  
  // Optional stats for special blocks
  stats_budget: string | null;
  stats_people: number | null;
  stats_comments: number | null;
  sub_tasks: string[] | null;

  created_at: string;
  updated_at: string;
  completed_at: string | null;
  user_id: string;
}

export interface TaskListResponse {
  items: Task[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
