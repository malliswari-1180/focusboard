const LINKS = ['Dashboard', 'My tasks', 'Calendar', 'Reports', 'Settings'];

// Only "Dashboard" is a real view. The other links are visual placeholders (see README).
export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>FocusBoard</span>
          <button className="icon-btn close-nav" onClick={onClose} aria-label="Close menu">✕</button>
        </div>
        <nav>
          <ul>
            {LINKS.map((l, i) => (
              <li key={l}>
                <a href="#" className={i === 0 ? 'active' : ''} aria-current={i === 0 ? 'page' : undefined}
                   onClick={(e) => { e.preventDefault(); onClose(); }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
