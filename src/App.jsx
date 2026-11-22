import { useMemo, useState } from 'react';
import { useTasks } from './useTasks';
import { STATUSES, PRIORITIES } from './data';
import Sidebar from './components/Sidebar.jsx';
import Stats from './components/Stats.jsx';
import Carousel from './components/Carousel.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [query, setQuery] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [priority, setPriority] = useState('all');
  const [formTask, setFormTask] = useState(null); // null = closed, {} = new, task = edit
  const [toDelete, setToDelete] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  // Derived values - computed from `tasks`, never stored or hardcoded.
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    return { total, completed, inProgress, percent: total ? Math.round((completed / total) * 100) : 0 };
  }, [tasks]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        (!q || t.title.toLowerCase().includes(q)) &&
        (statusTab === 'all' || t.status === statusTab) &&
        (priority === 'all' || t.priority === priority)
    );
  }, [tasks, query, statusTab, priority]);

  const save = (data) => {
    if (formTask?.id) updateTask(formTask.id, data);
    else addTask(data);
    setFormTask(null);
  };

  return (
    <div className="layout">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="content">
        <header className="topbar">
          <button className="icon-btn menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu">☰</button>
          <div>
            <h1>Dashboard</h1>
            <p className="sub">Plan, track and finish your tasks.</p>
          </div>
          <button className="btn primary" onClick={() => setFormTask({})}>+ New task</button>
        </header>

        <main>
          <Stats stats={stats} />
          <Carousel />

          <section aria-label="Tasks">
            <div className="toolbar">
              <div className="search">
                <label htmlFor="search" className="sr-only">Search tasks by title</label>
                <input id="search" type="search" placeholder="Search tasks…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="tabs" role="group" aria-label="Filter by status">
                {[{ value: 'all', label: 'All' }, ...STATUSES].map((s) => (
                  <button key={s.value} className={`tab ${statusTab === s.value ? 'on' : ''}`} aria-pressed={statusTab === s.value}
                          onClick={() => setStatusTab(s.value)}>
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="prio">
                <label htmlFor="prio" className="sr-only">Filter by priority</label>
                <select id="prio" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="all">All priorities</option>
                  {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label} priority</option>)}
                </select>
              </div>
            </div>
            <TaskList tasks={visible} onStatus={(id, status) => updateTask(id, { status })} onEdit={setFormTask} onDelete={setToDelete} />
          </section>
        </main>
      </div>

      {formTask && <TaskForm task={formTask.id ? formTask : null} onSave={save} onClose={() => setFormTask(null)} />}
      {toDelete && (
        <ConfirmDialog task={toDelete} onCancel={() => setToDelete(null)}
                       onConfirm={() => { deleteTask(toDelete.id); setToDelete(null); }} />
      )}
    </div>
  );
}
