import { useEffect, useState } from 'react';
import { SAMPLE_TASKS } from './data';

const KEY = 'focusboard.tasks.v1';

// Sample data is used ONLY when nothing has ever been saved (key is null).
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return SAMPLE_TASKS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_TASKS;
  } catch {
    return SAMPLE_TASKS;
  }
}

const newId = () => `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export function useTasks() {
  const [tasks, setTasks] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {
      /* storage full or blocked - app keeps working in memory */
    }
  }, [tasks]);

  // Every mutation returns a NEW array/object - state is never mutated directly.
  const addTask = (task) => setTasks((prev) => [{ ...task, id: newId() }, ...prev]);
  const updateTask = (id, changes) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  return { tasks, addTask, updateTask, deleteTask };
}
