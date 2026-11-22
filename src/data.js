export const STATUSES = [
  { value: 'todo', label: 'To do' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'completed', label: 'Completed' },
];
export const PRIORITIES = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
export const CATEGORIES = ['Work', 'Personal', 'Study', 'Health', 'Finance'];

export const statusLabel = (v) => STATUSES.find((s) => s.value === v)?.label ?? v;
export const priorityLabel = (v) => PRIORITIES.find((p) => p.value === v)?.label ?? v;

export const SAMPLE_TASKS = [
  { id: 's1', title: 'Design landing page', description: 'Finish hero section and pricing cards.', category: 'Work', status: 'in-progress', priority: 'high', dueDate: '2026-12-02' },
  { id: 's2', title: 'Write weekly report', description: 'Summarise progress and blockers for the team.', category: 'Work', status: 'todo', priority: 'medium', dueDate: '2026-12-04' },
  { id: 's3', title: 'Revise React hooks', description: 'Go through useState, useEffect and useMemo notes.', category: 'Study', status: 'in-progress', priority: 'medium', dueDate: '2026-12-06' },
  { id: 's4', title: 'Morning run', description: '5 km easy pace before breakfast.', category: 'Health', status: 'completed', priority: 'low', dueDate: '2026-11-20' },
  { id: 's5', title: 'Pay electricity bill', description: 'Pay online before the due date.', category: 'Finance', status: 'todo', priority: 'high', dueDate: '2026-11-28' },
  { id: 's6', title: 'Plan weekend trip', description: 'Book tickets and shortlist places to visit.', category: 'Personal', status: 'completed', priority: 'low', dueDate: '2026-11-18' },
];

// TODO: replace with the exact text from the Figma "Focus Notes" frames (15:2, 15:30, 15:58).
export const SLIDES = [
  { title: 'Plan your day', text: 'Pick your top three tasks each morning and finish them first.' },
  { title: 'Work in focused blocks', text: 'Try 25 minutes of focused work, then a 5 minute break.' },
  { title: 'Review before you rest', text: 'Spend two minutes closing the day: mark what is done and move the rest.' },
];
