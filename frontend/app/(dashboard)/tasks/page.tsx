'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Trash2, Pencil, Plus } from 'lucide-react';
import api from '@/lib/api';
import { Task, TaskListResponse } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import AddTaskModal from '@/components/tasks/AddTaskModal';

type Tab = 'all' | 'todo' | 'in_progress' | 'completed' | 'urgent';

const PRIORITY_COLORS: Record<string, { color: string; bg: string }> = {
  low:    { color: '#10B981', bg: '#10B98120' },
  medium: { color: '#3B82F6', bg: '#3B82F620' },
  high:   { color: '#F59E0B', bg: '#F59E0B20' },
  urgent: { color: '#EF4444', bg: '#EF444420' },
};

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  todo:        { color: '#9CA3AF', bg: '#9CA3AF20' },
  in_progress: { color: '#3B82F6', bg: '#3B82F620' },
  completed:   { color: '#10B981', bg: '#10B98120' },
};

function Badge({ label, colorConfig }: { label: string; colorConfig: { color: string; bg: string } }) {
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize"
      style={{ color: colorConfig.color, background: colorConfig.bg }}
    >
      {label.replace('_', ' ')}
    </span>
  );
}

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [tab, setTab] = useState<Tab>('all');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<keyof Task>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (user?.email === 'demo@weboin.com') setIsDemoMode(true);
  }, [user]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, size: 10 };
      if (tab !== 'all' && tab !== 'urgent') params.status = tab;
      if (tab === 'urgent') params.priority = 'urgent';
      const res = await api.get<TaskListResponse>('/tasks', { params });
      setTasks(res.data.items);
      setTotal(res.data.total);
      setPages(res.data.pages);
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [tab, page]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Debounced client-side search filter
  const filtered = tasks.filter((t) =>
    search.length < 2 || t.title.toLowerCase().includes(search.toLowerCase())
  );

  // Client-side sort
  const sorted = [...filtered].sort((a, b) => {
    const va = String(a[sortField] ?? '');
    const vb = String(b[sortField] ?? '');
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  const handleSort = (field: keyof Task) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleDelete = async (id: string) => {
    if (isDemoMode) {
      alert('Sign up to manage your tasks.');
      return;
    }
    if (!confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const TABS: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'todo', label: 'Todo' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'urgent', label: 'Urgent' },
  ];

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] shrink-0">
          <h1 className="text-[17px] font-semibold text-white">My Tasks</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-full pl-9 pr-4 py-2 text-[12px] text-white placeholder-gray-600 outline-none focus:border-[#3A3A3A] w-52 transition-all"
              />
            </div>
            <button className="flex items-center gap-1.5 border border-[#2A2A2A] text-gray-400 hover:text-white text-[12px] px-3 py-2 rounded-full transition-all hover:border-[#3A3A3A]">
              <Filter size={13} /> Filter
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-[12px] font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <Plus size={14} /> Add Task
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 pb-2 border-b border-[#1A1A1A] shrink-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                tab === t.key
                  ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/30'
                  : 'text-gray-500 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {t.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-gray-600 self-center">{total} tasks</span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-gray-500 text-[13px]">Loading tasks...</div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-gray-600">
              <p className="text-[13px]">No tasks found.</p>
              <button onClick={() => setModalOpen(true)} className="text-[#8B5CF6] text-[12px] hover:underline">+ Create your first task</button>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  {[
                    { key: 'title' as keyof Task, label: 'Title' },
                    { key: 'priority' as keyof Task, label: 'Priority' },
                    { key: 'status' as keyof Task, label: 'Status' },
                    { key: 'due_date' as keyof Task, label: 'Due Date' },
                    { key: 'created_at' as keyof Task, label: 'Created' },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="text-left py-2 pr-4 text-[10px] font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-1">
                        {col.label}
                        <ArrowUpDown size={10} className={sortField === col.key ? 'text-[#8B5CF6]' : ''} />
                      </span>
                    </th>
                  ))}
                  <th className="text-right py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-[#111] hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="py-3 pr-4 text-[13px] text-white font-medium max-w-[240px] truncate">
                      {task.title}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge label={task.priority} colorConfig={PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium} />
                    </td>
                    <td className="py-3 pr-4">
                      <Badge label={task.status} colorConfig={STATUS_COLORS[task.status] || STATUS_COLORS.todo} />
                    </td>
                    <td className="py-3 pr-4 text-[12px] text-gray-500">
                      {task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB') : '—'}
                    </td>
                    <td className="py-3 pr-4 text-[12px] text-gray-600">
                      {new Date(task.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-500 hover:text-white transition-colors">
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-[#1A1A1A] shrink-0">
            <span className="text-[11px] text-gray-500">Page {page} of {pages}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#3A3A3A] disabled:opacity-40 transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page === pages}
                className="w-8 h-8 rounded-full border border-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#3A3A3A] disabled:opacity-40 transition-all"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={() => fetchTasks()}
        isDemoMode={isDemoMode}
      />
    </>
  );
}
