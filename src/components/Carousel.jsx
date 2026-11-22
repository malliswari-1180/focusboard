import { useState } from 'react';
import { SLIDES } from '../data';

export default function Carousel() {
  const [active, setActive] = useState(0);
  const last = SLIDES.length - 1;
  const prev = () => setActive((i) => (i === 0 ? last : i - 1));
  const next = () => setActive((i) => (i === last ? 0 : i + 1));

  return (
    <section className="card carousel" aria-roledescription="carousel" aria-label="Focus Notes">
      <div className="carousel-head">
        <h2>Focus Notes</h2>
        <div className="carousel-controls">
          <button className="icon-btn" onClick={prev} aria-label="Previous note">‹</button>
          <button className="icon-btn" onClick={next} aria-label="Next note">›</button>
        </div>
      </div>
      <div className="slides" aria-live="polite">
        <div className="track" style={{ transform: `translateX(-${active * 100}%)` }}>
          {SLIDES.map((s, i) => (
            <article key={s.title} className="slide" role="group" aria-roledescription="slide"
                     aria-label={`${i + 1} of ${SLIDES.length}`} aria-hidden={i !== active}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="dots">
        {SLIDES.map((s, i) => (
          <button key={s.title} className={`dot ${i === active ? 'on' : ''}`} onClick={() => setActive(i)}
                  aria-label={`Go to note ${i + 1}`} aria-current={i === active ? 'true' : undefined} />
        ))}
      </div>
    </section>
  );
}
