import api from './api';
import { Task, TaskCreate, TaskListResponse, TaskUpdate } from './types';

// We need to add TaskCreate and TaskUpdate to types.ts or just define them here
// For now, let's keep it simple

export interface TaskStats {
  total: number;
  completed: number;
  in_progress: number;
  todo: number;
  urgent: number;
  completion_rate: number;
  overdue: number;
  by_priority: Record<string, number>;
}

export const taskService = {
  async getTasks(params?: {
    status?: string;
    completed?: boolean;
    page?: number;
    size?: number;
  }): Promise<TaskListResponse> {
    const response = await api.get<TaskListResponse>('/tasks', { params });
    return response.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getStats(): Promise<TaskStats> {
    const response = await api.get<TaskStats>('/tasks/stats');
    return response.data;
  },

  async getCalendarTasks(weekStart?: string): Promise<Record<string, Task[]>> {
    const response = await api.get<Record<string, Task[]>>('/tasks/calendar', {
      params: { week_start: weekStart }
    });
    return response.data;
  }
};
