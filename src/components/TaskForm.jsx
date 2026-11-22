import { useEffect, useRef, useState } from 'react';
import { STATUSES, PRIORITIES, CATEGORIES } from '../data';

const EMPTY = { title: '', description: '', category: CATEGORIES[0], status: 'todo', priority: 'medium', dueDate: '' };

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task ? { ...task } : EMPTY);
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  useEffect(() => { titleRef.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k === 'title') setError('');
  };

  const submit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return setError('Title is required. Please enter a task title.');
    if (title.length > 80) return setError('Title must be 80 characters or fewer.');
    onSave({ ...form, title, description: form.description.trim() });
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title" onSubmit={submit} noValidate>
        <h2 id="form-title">{task ? 'Edit task' : 'Create task'}</h2>

        <label htmlFor="f-title">Title *</label>
        <input id="f-title" ref={titleRef} value={form.title} onChange={set('title')} placeholder="e.g. Finish project report"
               aria-invalid={!!error} aria-describedby={error ? 'f-err' : undefined} />
        {error && <p id="f-err" className="error" role="alert">{error}</p>}

        <label htmlFor="f-desc">Description</label>
        <textarea id="f-desc" rows={4} value={form.description} onChange={set('description')} placeholder="Add a few details" />

        <div className="grid2">
          <div>
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={form.status} onChange={set('status')}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-pri">Priority</label>
            <select id="f-pri" value={form.priority} onChange={set('priority')}>
              {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-cat">Category</label>
            <select id="f-cat" value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="f-due">Due date</label>
            <input id="f-due" type="date" value={form.dueDate} onChange={set('dueDate')} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{task ? 'Save changes' : 'Create task'}</button>
        </div>
      </form>
    </div>
  );
}
