// =============================================================================
// src/pages/tasks/AddTaskModal.jsx — Create Task Modal
// Related Client / Order field permanently deleted per user instruction
// =============================================================================
import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CUSTOMIZATION } from '../../config/customization';

const FALLBACK_MEMBERS = [
  { team_member_id: '28c9dcbc-94eb-4d8c-a15c-19e486249b14', name: 'Thanu', role: 'Designer' },
  { team_member_id: '437ccc82-fcc5-4966-901b-68d8eec40868', name: 'Chaitu', role: 'Admin' },
  { team_member_id: '780186b7-0207-412e-a8dc-829df203ba16', name: 'Farru', role: 'Developer' },
];

export default function AddTaskModal({ isOpen, onClose, defaultMemberName }) {
  const { teamMembers, addTask } = useData();

  const memberList = (teamMembers && teamMembers.length > 0) ? teamMembers : FALLBACK_MEMBERS;

  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (defaultMemberName && typeof defaultMemberName === 'string') {
        const found = memberList.find(m => m.name.toLowerCase() === defaultMemberName.toLowerCase());
        setAssignedTo(found?.team_member_id || memberList[0]?.team_member_id || '');
      } else if (!assignedTo && memberList.length > 0) {
        setAssignedTo(memberList[0].team_member_id);
      }
      setError('');
    }
  }, [memberList, isOpen, defaultMemberName]);

  if (!isOpen) return null;

  const effectiveAssignedTo = assignedTo || memberList[0]?.team_member_id;
  const selectedMember = memberList.find(m => m.team_member_id === effectiveAssignedTo) || memberList[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setError('Task Title is required.');
      return;
    }
    if (!dueDate) {
      setError('Due Date is required.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await addTask({
        task_title: taskTitle.trim(),
        description: description.trim(),
        assigned_to: effectiveAssignedTo,
        assigned_to_name: selectedMember?.name || 'Thanu',
        priority,
        status: 'In Progress',
        due_at: new Date(dueDate).toISOString(),
      });

      setTaskTitle('');
      setDescription('');
      setDueDate('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 border border-slate-100 z-[201] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Add Task</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Create a new task and assign it to a team member.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Booking flow UI ideas"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details, notes, or reference links..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* Assigned Member */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Assign To Team Member <span className="text-rose-500">*</span>
            </label>
            <select
              value={effectiveAssignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {memberList.map((m) => (
                <option key={m.team_member_id} value={m.team_member_id}>
                  {m.name} ({m.role || 'Member'})
                </option>
              ))}
            </select>
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Priority <span className="text-rose-500">*</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Note: Related Client / Order dropdown is completely removed per user instruction */}

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
