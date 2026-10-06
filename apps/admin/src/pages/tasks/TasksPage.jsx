// =============================================================================
// src/pages/tasks/TasksPage.jsx — Tasks Kanban Board (Smooth Drag-and-Drop, No Mock Data)
// =============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Clock, 
  History, 
  Calendar, 
  CheckCircle2, 
  Pin, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  Check, 
  ArrowRight,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const FALLBACK_MEMBERS = [
  { team_member_id: '28c9dcbc-94eb-4d8c-a15c-19e486249b14', name: 'Thanu', role: 'Designer' },
  { team_member_id: '437ccc82-fcc5-4966-901b-68d8eec40868', name: 'Chaitu', role: 'Admin' },
  { team_member_id: '780186b7-0207-412e-a8dc-829df203ba16', name: 'Farru', role: 'Developer' },
];

export default function TasksPage({ onOpenAddTask, onEditTask }) {
  const { tasks, updateTask, deleteTask, teamMembers } = useData();

  const allMembers = (teamMembers && teamMembers.length > 0) ? teamMembers : FALLBACK_MEMBERS;
  const columns = ['Thanu', 'Chaitu', 'Farru'];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  // Local card action menu state
  const [activeMenuId, setActiveMenuId] = useState(null);
  // Local pinned tasks set persisted in localStorage
  const [pinnedTaskIds, setPinnedTaskIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ahvaan_pinned_tasks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Use ONLY genuine database tasks — no mock/dummy fallback tasks per user instruction
  const allTasks = tasks || [];

  // KPI Metrics calculated from real tasks
  const overdueCount = allTasks.filter(t => t.status === 'Overdue' || (t.status !== 'Completed' && t.due_at && new Date(t.due_at) < new Date())).length;
  const inProgressCount = allTasks.filter(t => t.status === 'In Progress').length;
  const upcomingCount = allTasks.filter(t => t.status === 'Pending').length;
  const completedCount = allTasks.filter(t => t.status === 'Completed').length;

  // Filter tasks
  const filteredTasks = allTasks.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q || (t.task_title || '').toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Toggle Pin
  const togglePin = (taskId) => {
    setPinnedTaskIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(taskId)) copy.delete(taskId);
      else copy.add(taskId);
      try {
        localStorage.setItem('ahvaan_pinned_tasks', JSON.stringify([...copy]));
      } catch (err) {
        console.warn('Failed to persist pinned tasks', err);
      }
      return copy;
    });
    setActiveMenuId(null);
  };

  // Status Change
  const handleStatusChange = async (taskId, newStatus) => {
    setActiveMenuId(null);
    if (!UUID_REGEX.test(taskId)) return;
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    setActiveMenuId(null);
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    if (!UUID_REGEX.test(taskId)) return;
    try {
      await deleteTask(taskId);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete task');
    }
  };

  // Smooth Drag & Drop Handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colName) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colName) setDragOverCol(colName);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverCol(null);
  };

  const handleDrop = async (e, targetMemberName) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = draggedTaskId || e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    if (!UUID_REGEX.test(taskId)) {
      setDraggedTaskId(null);
      return;
    }

    const memberObj = allMembers.find(m => m.name.toLowerCase() === targetMemberName.toLowerCase());
    const memberId = memberObj?.team_member_id || memberObj?.id;

    try {
      await updateTask(taskId, {
        assigned_to: memberId,
        assigned_to_name: targetMemberName,
      });
    } catch (err) {
      console.error('Drag and drop assignment failed:', err);
    } finally {
      setDraggedTaskId(null);
    }
  };

  // Helper to determine styling based on status and completion
  const getCardStyle = (task) => {
    const isCompleted = task.status === 'Completed';
    const isOverdue = !isCompleted && (task.status === 'Overdue' || (task.due_at && new Date(task.due_at) < new Date()));

    if (isCompleted) {
      return {
        cardBg: 'bg-slate-50 border-slate-200/90 opacity-80',
        titleCls: 'line-through text-slate-400 font-semibold',
        descCls: 'line-through text-slate-400',
        badge: 'bg-slate-200 text-slate-700',
        statusLabel: 'Completed',
        isCompleted: true,
      };
    }

    if (isOverdue || task.priority === 'Urgent') {
      return {
        cardBg: 'bg-[#FFF5F5] border-red-100 hover:border-red-200',
        titleCls: 'font-bold text-slate-900',
        descCls: 'text-slate-600',
        badge: 'bg-rose-500 text-white',
        statusLabel: 'Overdue',
        isCompleted: false,
      };
    }

    if (task.status === 'In Progress') {
      return {
        cardBg: 'bg-[#F0FDF4] border-emerald-100 hover:border-emerald-200',
        titleCls: 'font-bold text-slate-900',
        descCls: 'text-slate-600',
        badge: 'bg-emerald-500 text-white',
        statusLabel: 'In Progress',
        isCompleted: false,
      };
    }

    return {
      cardBg: 'bg-[#F5F8FF] border-blue-100 hover:border-blue-200',
      titleCls: 'font-bold text-slate-900',
      descCls: 'text-slate-600',
      badge: 'bg-blue-600 text-white',
      statusLabel: 'Pending',
      isCompleted: false,
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay on top of deliverables, track assignments, and drag tasks between team members.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenAddTask && onOpenAddTask()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* ── 4 KPI Metric Cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overdue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Overdue Tasks</p>
            <p className="text-2xl font-bold text-slate-900">{overdueCount}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: In Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">In Progress</p>
            <p className="text-2xl font-bold text-slate-900">{inProgressCount}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Upcoming / Pending */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Upcoming Tasks</p>
            <p className="text-2xl font-bold text-slate-900">{upcomingCount}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Completed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">Completed Tasks</p>
            <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ── Filters Bar ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── 3 Column Kanban Board: Thanu | Chaitu | Farru ──────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((colName) => {
          // Get tasks assigned to this column
          const colTasks = filteredTasks.filter((t) => {
            const assignedName = (t.assigned_to_name || t.team_members?.name || '').toLowerCase();
            return assignedName.includes(colName.toLowerCase());
          });

          const isOver = dragOverCol === colName;

          return (
            <div
              key={colName}
              onDragOver={(e) => handleDragOver(e, colName)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, colName)}
              className={`flex flex-col rounded-2xl p-4 transition-all duration-200 ${
                isOver 
                  ? 'bg-blue-50/70 border-2 border-dashed border-blue-500 scale-[1.01]' 
                  : 'bg-slate-100/60 border border-slate-200/70'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {colName.charAt(0)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{colName}</h3>
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
                    {colTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenAddTask && onOpenAddTask(colName)}
                  title={`Add task assigned to ${colName}`}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tasks List / Column Body */}
              <div className="space-y-3 flex-1 min-h-[350px]">
                {colTasks.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-slate-200/90 rounded-2xl bg-white/50">
                    <p className="text-xs font-medium text-slate-400">No tasks assigned yet</p>
                    <button
                      type="button"
                      onClick={() => onOpenAddTask && onOpenAddTask(colName)}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Task</span>
                    </button>
                  </div>
                ) : (
                  colTasks.map((t) => {
                    const style = getCardStyle(t);
                    const isPinned = pinnedTaskIds.has(t.task_id);
                    const isMenuOpen = activeMenuId === t.task_id;

                    return (
                      <div
                        key={t.task_id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.task_id)}
                        className={`rounded-2xl p-4 border transition-all duration-150 shadow-xs hover:shadow-md cursor-grab active:cursor-grabbing relative ${style.cardBg}`}
                      >
                        {/* Top: Status badge & Priority badge & Pin / Menu */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${style.badge}`}>
                              {style.statusLabel}
                            </span>
                            {/* Clean Color Indicator without text label: Red (High/Urgent), Yellow (Medium), Green (Low) */}
                            <span 
                              title={`Priority: ${t.priority || 'Medium'}`}
                              className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs ring-1 ring-white/80 ${
                                (t.priority || '').toLowerCase() === 'high' || (t.priority || '').toLowerCase() === 'urgent'
                                  ? 'bg-rose-500'
                                  : (t.priority || '').toLowerCase() === 'low'
                                  ? 'bg-emerald-500'
                                  : 'bg-amber-400'
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => togglePin(t.task_id)}
                              className={`p-1 rounded-md transition-colors cursor-pointer ${
                                isPinned ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-blue-600' : ''}`} />
                            </button>

                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(isMenuOpen ? null : t.task_id);
                                }}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                              >
                                <MoreVertical className="w-3.5 h-3.5" />
                              </button>

                              {isMenuOpen && (
                                <div
                                  ref={menuRef}
                                  className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-200/90 py-1.5 z-50 text-xs text-left animate-in fade-in-50 zoom-in-95 duration-100"
                                >
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(t.task_id, t.status === 'Completed' ? 'In Progress' : 'Completed')}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{t.status === 'Completed' ? 'Mark Incomplete' : 'Mark Completed'}</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      if (onEditTask) onEditTask(t);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5 text-slate-400" />
                                    <span>Edit Task</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTask(t.task_id)}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-rose-600 hover:bg-rose-50 transition-colors font-medium border-t border-slate-100 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                    <span>Delete Task</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className={`text-xs mb-1.5 ${style.titleCls}`}>
                          {t.task_title}
                        </h4>
                        {t.description && (
                          <p className={`text-[11px] leading-relaxed mb-3 line-clamp-2 ${style.descCls}`}>
                            {t.description}
                          </p>
                        )}

                        {/* Due Date & Assignment info */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/50">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{t.due_at ? new Date(t.due_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'No date'}</span>
                          </div>

                          {t.priority && (
                            <span className="font-semibold text-[10px] text-slate-500 uppercase">
                              {t.priority}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
