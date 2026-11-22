import { useEffect, useRef } from 'react';

export default function ConfirmDialog({ task, onConfirm, onCancel }) {
  const btn = useRef(null);
  useEffect(() => { btn.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal small" role="alertdialog" aria-modal="true" aria-labelledby="c-title" aria-describedby="c-desc">
        <h2 id="c-title">Delete task?</h2>
        <p id="c-desc">“{task.title}” will be removed permanently. This cannot be undone.</p>
        <div className="form-actions">
          <button ref={btn} className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn danger-solid" onClick={onConfirm}>Delete task</button>
        </div>
      </div>
    </div>
  );
}
