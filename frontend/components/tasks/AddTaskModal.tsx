'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import VoiceMicButton from '@/components/voice/VoiceMicButton';

type Priority = 'low' | 'medium' | 'high' | 'urgent';
type Status = 'todo' | 'in_progress' | 'completed';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
  isDemoMode?: boolean;
}

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  low:    { label: 'Low',    color: '#10B981', bg: '#10B98120' },
  medium: { label: 'Medium', color: '#3B82F6', bg: '#3B82F620' },
  high:   { label: 'High',   color: '#F59E0B', bg: '#F59E0B20' },
  urgent: { label: 'Urgent', color: '#EF4444', bg: '#EF444420' },
};

const STATUS_OPTIONS: { value: Status; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function AddTaskModal({ open, onClose, onCreated, isDemoMode }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [status, setStatus] = useState<Status>('todo');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Design');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [accentColor, setAccentColor] = useState('#69B1FF');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [filled, setFilled] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setTitle(''); setDescription(''); setPriority('medium');
      setStatus('todo'); setDueDate(new Date().toISOString().split('T')[0]); 
      setCategory('Design'); setStartTime('09:00'); setEndTime('10:00');
      setAccentColor('#69B1FF'); setError(''); setFilled(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleVoiceParsed = (parsed: any) => {
    setTitle(parsed.title || '');
    setDescription(parsed.description || '');
    setPriority((parsed.priority as Priority) || 'medium');
    if (parsed.due_date) setDueDate(parsed.due_date);
    setFilled(true);
    setTimeout(() => setFilled(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Title is required.'); return; }
    setIsSubmitting(true); setError('');

    try {
      // Combine date and time
      const dateStr = dueDate || new Date().toISOString().split('T')[0];
      const startDateTime = new Date(`${dateStr}T${startTime}:00`).toISOString();
      const endDateTime = new Date(`${dateStr}T${endTime}:00`).toISOString();

      await api.post('/tasks', {
        title: title.trim(),
        description: description || null,
        priority,
        status,
        due_date: dateStr,
        project_category: category,
        start_time: startDateTime,
        end_time: endDateTime,
        accent_color: accentColor,
        progress: status === 'completed' ? 100 : status === 'in_progress' ? 50 : 0
      });
      onCreated();
      onClose();
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-[600px] rounded-3xl border border-[#2A2A2A] overflow-hidden shadow-2xl my-8"
        style={{ background: '#121212' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#1F1F1F]">
          <h2 className="text-[18px] font-bold text-white tracking-tight">Create New Objective</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1F1F1F] text-gray-400 hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="px-8 py-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2A2A]">

            {/* Title */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.1em]">Target Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are we focusing on today?"
                className="w-full bg-[#181818] border border-[#2A2A2A] rounded-2xl px-5 py-4 text-[15px] text-white placeholder-gray-700 outline-none focus:border-[#06B6D4] transition-all"
              />
            </div>

            {/* Category + Priority Row */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-2">
                 <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.1em]">Project Cluster</label>
                 <select
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   className="w-full bg-[#181818] border border-[#2A2A2A] rounded-2xl px-5 py-3.5 text-[14px] text-white outline-none focus:border-[#06B6D4] appearance-none"
                 >
                   <option value="Design">Design Portfolio</option>
                   <option value="Development">Software Development</option>
                   <option value="Marketing">Growth & Marketing</option>
                   <option value="Management">Business Ops</option>
                 </select>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.1em]">Set Urgency</label>
                 <div className="flex gap-1.5 p-1 bg-[#181818] rounded-2xl border border-[#2A2A2A]">
                    {(['low', 'medium', 'high', 'urgent'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                          priority === p 
                            ? (p === 'urgent' ? 'bg-red-500 text-white' : p === 'high' ? 'bg-orange-500 text-white' : 'bg-white text-black')
                            : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                 </div>
               </div>
            </div>

            {/* Time mapping */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.1em]">Schedule Timeline</label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-[#06B6D4]"
                  style={{ colorScheme: 'dark' }}
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-[#06B6D4]"
                  style={{ colorScheme: 'dark' }}
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[13px] text-white outline-none focus:border-[#06B6D4]"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            </div>

            {/* Voice & Color row */}
            <div className="flex items-center justify-between p-4 bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl">
               <div className="flex items-center gap-4">
                  <VoiceMicButton onParsed={handleVoiceParsed} />
                  <div className="h-8 w-[1px] bg-[#1F1F1F]" />
                  <div className="flex items-center gap-2">
                    {(['#69B1FF', '#FFD666', '#FF85C0', '#B37FEB', '#A7F3D0']).map(c => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccentColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${accentColor === c ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
               </div>
               {filled && <span className="text-[10px] font-bold text-green-400">SYNCED BY VOICE</span>}
            </div>

            {error && (
              <p className="text-[12px] text-red-500 font-bold bg-red-500/5 px-4 py-3 rounded-xl border border-red-500/20 text-center uppercase tracking-wider">
                Error: {error}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-8 py-6 border-t border-[#1F1F1F] bg-[#0F0F0F]">
            <button
              type="button"
              onClick={onClose}
              className="text-[13px] font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white text-[14px] font-black px-10 py-3.5 rounded-2xl transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/10 active:scale-95"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Deploy Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
