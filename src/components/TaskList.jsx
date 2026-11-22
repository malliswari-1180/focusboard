import { STATUSES, statusLabel, priorityLabel } from '../data';

const fmt = (d) => {
  if (!d) return 'No due date';
  const date = new Date(`${d}T00:00:00`);
  return Number.isNaN(date.getTime())
    ? d
    : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export default function TaskList({ tasks, onStatus, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty card">No tasks match your filters. Clear the search or add a new task.</p>;
  }
  return (
    <ul className="tasks">
      {tasks.map((t) => (
        <li key={t.id} className={`card task ${t.status === 'completed' ? 'done' : ''}`}>
          <div className="task-main">
            <h3>{t.title}</h3>
            {t.description && <p>{t.description}</p>}
            <div className="meta">
              <span className="badge cat">{t.category}</span>
              <span className={`badge pri-${t.priority}`}>{priorityLabel(t.priority)}</span>
              <span className="due">Due {fmt(t.dueDate)}</span>
            </div>
          </div>
          <div className="task-actions">
            <label className="sr-only" htmlFor={`st-${t.id}`}>Status for {t.title}</label>
            <select id={`st-${t.id}`} className={`status st-${t.status}`} value={t.status}
                    onChange={(e) => onStatus(t.id, e.target.value)}>
              {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <button className="btn small" onClick={() => onEdit(t)} aria-label={`Edit ${t.title}`}>Edit</button>
            <button className="btn small danger" onClick={() => onDelete(t)} aria-label={`Delete ${t.title}`}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
export { statusLabel };
