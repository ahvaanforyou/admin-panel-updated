// =============================================================================
// src/pages/tasks/TasksPage.jsx — Tasks Kanban Board (Smooth Drag-and-Drop, No Mock Data)
// =============================================================================
import React, { useState, useRef, useEffect } from 'react';
import { 
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
  Plus
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const FALLBACK_MEMBERS = [
  { team_member_id: '28c9dcbc-94eb-4d8c-a15c-19e486249b14', name: 'Thanu', role: 'Designer' },
  { team_member_id: '437ccc82-fcc5-4966-901b-68d8eec40868', name: 'Chaitu', role: 'Admin' },
  { team_member_id: '780186b7-0207-412e-a8dc-829df203ba16', name: 'Farru', role: 'Developer' },
];

// User Color Palette: Black for Chaitu, Blue for Farru, Teal for Thanu
export const getUserTheme = (name = '') => {
  const n = (name || '').toLowerCase();
  if (n.includes('chaitu')) {
    return {
      name: 'Chaitu',
      initial: 'C',
      headerBg: 'bg-slate-900 text-white shadow-xs',
      badgeBg: 'bg-slate-900 text-white',
      borderHover: 'hover:border-slate-800',
      lightBg: 'bg-slate-100 text-slate-900 border border-slate-200',
    };
  }
  if (n.includes('farru')) {
    return {
      name: 'Farru',
      initial: 'F',
      headerBg: 'bg-blue-600 text-white shadow-xs',
      badgeBg: 'bg-blue-600 text-white',
      borderHover: 'hover:border-blue-500',
      lightBg: 'bg-blue-50 text-blue-700 border border-blue-200',
    };
  }
  // Default: Thanu
  return {
    name: 'Thanu',
    initial: 'T',
    headerBg: 'bg-teal-600 text-white shadow-xs',
    badgeBg: 'bg-teal-600 text-white',
    borderHover: 'hover:border-teal-500',
    lightBg: 'bg-teal-50 text-teal-700 border border-teal-200',
  };
};

export default function TasksPage({ onOpenAddTask, onEditTask }) {
  const { tasks, updateTask, deleteTask, teamMembers, selectedMonth } = useData();

  const allMembers = (teamMembers && teamMembers.length > 0) ? teamMembers : FALLBACK_MEMBERS;
  const columns = ['Thanu', 'Chaitu', 'Farru'];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Internal reactive task list for instant, butter-smooth optimistic drag & drop
  const [localTasks, setLocalTasks] = useState(tasks || []);
  useEffect(() => {
    setLocalTasks(tasks || []);
  }, [tasks]);

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

  // Filter tasks by selectedMonth if active
  const allTasks = (localTasks || []).filter((t) => {
    if (!selectedMonth || selectedMonth === 'All') return true;
    const d = String(t.due_at || t.created_at || '');
    return d.startsWith(selectedMonth);
  });

  // KPI Metrics calculated from real tasks for selectedMonth
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
    setLocalTasks(prev => prev.map(t => t.task_id === taskId ? { ...t, status: newStatus } : t));
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
    setLocalTasks(prev => prev.filter(t => t.task_id !== taskId));
    if (!UUID_REGEX.test(taskId)) return;
    try {
      await deleteTask(taskId);
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete task');
    }
  };

  // Smooth Drag & Drop Handlers with Instant Optimistic Placement
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

    const memberObj = allMembers.find(m => m.name.toLowerCase() === targetMemberName.toLowerCase());
    const memberId = memberObj?.team_member_id || memberObj?.id;

    // 1. Instant optimistic update for buttery-smooth movement
    setLocalTasks(prev => prev.map(t => {
      if (t.task_id === taskId) {
        return {
          ...t,
          assigned_to: memberId,
          assigned_to_name: targetMemberName,
        };
      }
      return t;
    }));
    setDraggedTaskId(null);

    // 2. Persist to backend asynchronously
    if (UUID_REGEX.test(taskId)) {
      try {
        await updateTask(taskId, {
          assigned_to: memberId,
          assigned_to_name: targetMemberName,
        });
      } catch (err) {
        console.error('Drag and drop assignment sync failed:', err);
      }
    }
  };

  // 1. Color Schemes Based on Priority: High (Red), Medium (Orange), Low (Green)
  const getCardStyle = (task) => {
    const isCompleted = task.status === 'Completed';
    const prio = (task.priority || 'Medium').toLowerCase();

    if (isCompleted) {
      return {
        cardBg: 'bg-slate-50/90 border-slate-200 border-l-4 border-l-slate-400 opacity-80 shadow-2xs',
        titleCls: 'line-through text-slate-400 font-semibold',
        descCls: 'line-through text-slate-400',
        prioBadge: 'bg-slate-200/80 text-slate-600 border border-slate-300/60',
        prioLabel: task.priority || 'Medium',
        isCompleted: true,
      };
    }

    // High Priority: Red
    if (prio === 'high' || prio === 'urgent') {
      return {
        cardBg: 'bg-[#FFF5F5] border-rose-200 hover:border-rose-300 border-l-4 border-l-rose-500 shadow-2xs hover:shadow-md',
        titleCls: 'font-bold text-slate-900',
        descCls: 'text-slate-600',
        prioBadge: 'bg-rose-100 text-rose-700 border border-rose-200 font-bold',
        prioLabel: 'High',
        isCompleted: false,
      };
    }

    // Low Priority: Green
    if (prio === 'low') {
      return {
        cardBg: 'bg-[#F0FDF4] border-emerald-200 hover:border-emerald-300 border-l-4 border-l-emerald-500 shadow-2xs hover:shadow-md',
        titleCls: 'font-bold text-slate-900',
        descCls: 'text-slate-600',
        prioBadge: 'bg-emerald-100 text-emerald-700 border border-emerald-200 font-semibold',
        prioLabel: 'Low',
        isCompleted: false,
      };
    }

    // Medium Priority: Orange
    return {
      cardBg: 'bg-[#FFF8F0] border-orange-200 hover:border-orange-300 border-l-4 border-l-orange-500 shadow-2xs hover:shadow-md',
      titleCls: 'font-bold text-slate-900',
      descCls: 'text-slate-600',
      prioBadge: 'bg-orange-100 text-orange-700 border border-orange-200 font-semibold',
      prioLabel: 'Medium',
      isCompleted: false,
    };
  };

  // 2. Color Dots for Status Inside Cards (Per User Requirement)
  const getStatusDot = (task) => {
    const isCompleted = task.status === 'Completed';
    const isOverdue = !isCompleted && (task.status === 'Overdue' || (task.due_at && new Date(task.due_at) < new Date()));
    const effStatus = isCompleted ? 'Completed' : (isOverdue ? 'Overdue' : (task.status || 'Pending'));

    switch (effStatus) {
      case 'Completed':
        return {
          dotCls: 'bg-emerald-500 shadow-2xs shadow-emerald-500/50',
          labelCls: 'text-emerald-700 font-semibold',
          label: 'Completed'
        };
      case 'Overdue':
        return {
          dotCls: 'bg-rose-500 shadow-2xs shadow-rose-500/50 animate-pulse',
          labelCls: 'text-rose-700 font-bold',
          label: 'Overdue'
        };
      case 'In Progress':
        return {
          dotCls: 'bg-blue-500 shadow-2xs shadow-blue-500/50 animate-pulse',
          labelCls: 'text-blue-700 font-semibold',
          label: 'In Progress'
        };
      case 'Review':
        return {
          dotCls: 'bg-purple-500 shadow-2xs shadow-purple-500/50',
          labelCls: 'text-purple-700 font-semibold',
          label: 'Review'
        };
      default:
        return {
          dotCls: 'bg-amber-400 shadow-2xs shadow-amber-400/50',
          labelCls: 'text-amber-700 font-semibold',
          label: 'Pending'
        };
    }
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

        {/* Add Task button with Plus icon & single clean text */}
        <button
          type="button"
          onClick={() => onOpenAddTask && onOpenAddTask()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Task</span>
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
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── 3 Column Kanban Board: Thanu | Chaitu | Farru with User Specific Colors ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {columns.map((colName) => {
          const userTheme = getUserTheme(colName);

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
              className={`flex flex-col rounded-2xl p-4 transition-all duration-300 ease-out ${
                isOver 
                  ? 'bg-blue-50/70 border-2 border-dashed border-blue-500 ring-4 ring-blue-500/10 shadow-lg scale-[1.015]' 
                  : 'bg-slate-100/70 border border-slate-200/80 shadow-xs'
              }`}
            >
              {/* Column Header with Specific User Avatar Color: Black for Chaitu, Blue for Farru, Teal for Thanu */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${userTheme.headerBg}`}>
                    {userTheme.initial}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">{colName}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold">
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

              {/* Tasks List / Column Body with Smooth Motion */}
              <div className="space-y-3 flex-1 min-h-[350px] transition-all duration-200">
                {/* Drag-over Smooth Placeholder Slot */}
                {isOver && (
                  <div className="h-14 rounded-2xl border-2 border-dashed border-blue-400/80 bg-blue-100/50 flex items-center justify-center text-xs font-semibold text-blue-600 transition-all duration-200 animate-pulse">
                    Move to {colName}
                  </div>
                )}

                {colTasks.length === 0 && !isOver ? (
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
                    const statusDot = getStatusDot(t);
                    const isPinned = pinnedTaskIds.has(t.task_id);
                    const isMenuOpen = activeMenuId === t.task_id;
                    const isBeingDragged = draggedTaskId === t.task_id;

                    return (
                      <div
                        key={t.task_id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.task_id)}
                        className={`rounded-2xl p-4 border transition-all duration-200 ease-out cursor-grab active:cursor-grabbing relative select-none ${
                          isBeingDragged 
                            ? 'opacity-30 scale-95 ring-2 ring-blue-400 shadow-2xl rotate-1' 
                            : 'hover:-translate-y-0.5'
                        } ${style.cardBg}`}
                      >
                        {/* Top: Status COLOR DOT + Priority Badge + Pin & Menu */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            {/* Color Dot for Status */}
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 border border-slate-200/60 shadow-2xs">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot.dotCls}`} />
                              <span className={`text-[10px] ${statusDot.labelCls}`}>{statusDot.label}</span>
                            </div>

                            {/* Priority Badge Matching Card Color Scheme */}
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${style.prioBadge}`}>
                              {style.prioLabel}
                            </span>
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

                        {/* Due Date & Assigned User Indicator with exact colors */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{t.due_at ? new Date(t.due_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' }) : 'No date'}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold ${userTheme.badgeBg}`}>
                              {userTheme.initial}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-600">{colName}</span>
                          </div>
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
