export interface Task {
  id: number;
  title: string;
  status: "todo" | "done" | "in-progress";
  createdAt: string;
  description?: string;
  updatedAt?: string;
}