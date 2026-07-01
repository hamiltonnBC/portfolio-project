/*************************************************
 * Filename: data_journey_page.js
 *
 * Purpose: "Where does your data go?" — an interactive, scroll-driven story about
 * data sprawl and the difficulty of GDPR erasure (Data Subject Requests). A single
 * signup fans out across many systems; then a right-to-erasure request arrives and
 * we watch how hard it is to hunt every copy back down.
 *
 * It doubles as an argument for privacy-by-design: the mess is avoidable if data
 * flows are mapped before you build, not after a deletion request forces it.
 *
 * Connected Files:
 * - DataJourney.module.css: Styling for this component
 * - router.js: Registers the /where-your-data-goes route under <Layout />
 *************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './DataJourney.module.css';

/** Systems a single signup typically touches, with how each resolves on erasure. */
const SYSTEMS = [
  { id: 'db', label: 'User Database', detail: 'Postgres · users row', status: 'Deleted', tone: 'done' },
  { id: 'backup', label: 'Nightly Backups', detail: 'Encrypted snapshots', status: 'Tombstoned', tone: 'pending', note: 'You can’t edit a sealed backup — it’s flagged for deletion on restore.' },
  { id: 'analytics', label: 'Analytics', detail: 'Events keyed to user_id', status: 'Deleted', tone: 'done' },
  { id: 'crm', label: 'Email / CRM', detail: 'Mailchimp audience', status: 'Forwarded', tone: 'forwarded', note: 'A processor you have to instruct — it isn’t your database.' },
  { id: 'payments', label: 'Payments', detail: 'Stripe customer', status: 'Retained', tone: 'retained', note: 'Kept under a legal obligation. Erasure doesn’t override tax and financial record law.' },
  { id: 'logs', label: 'Application Logs', detail: 'Request logs with email', status: 'Purged', tone: 'done' },
  { id: 'cache', label: 'Session Cache', detail: 'Redis key', status: 'Expired', tone: 'done' },
  { id: 'pixel', label: 'Ad Pixel', detail: 'Third-party tag', status: 'Forwarded', tone: 'forwarded', note: 'That data already left with a third party.' },
];

// SVG diagram geometry — a fixed coordinate space that scales via the viewBox.
const VIEW = { w: 940, h: 560 };
const SIGNUP = { x: 40, y: 235, w: 180, h: 90 };
const NODE = { x: 560, w: 360, h: 52, startY: 24, gap: 66 };
const signupAnchor = { x: SIGNUP.x + SIGNUP.w, y: SIGNUP.y + SIGNUP.h / 2 };
const nodeCenterY = (i) => NODE.startY + i * NODE.gap + NODE.h / 2;
const connectorPath = (i) => {
  const cy = nodeCenterY(i);
  return `M ${signupAnchor.x} ${signupAnchor.y} C ${signupAnchor.x + 150} ${signupAnchor.y}, ${NODE.x - 150} ${cy}, ${NODE.x} ${cy}`;
};

/**
 * Fire once when an element scrolls into view. Viewport root works here: the right
 * panel scrolls within the viewport (same pattern the About page relies on).
 */
const useInView = (threshold = 0.2) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, threshold]);
  return [ref, inView];
};

/** Fade-and-rise wrapper that reveals its children when scrolled into view. */
const Reveal = ({ children, className = '' }) => {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref} className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}>
      {children}
    </section>
  );
};

const DataJourneyPage = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [mapRef, mapInView] = useInView(0.3);
  const [huntRef, huntInView] = useInView(0.25);

  const drawn = signedUp || mapInView;

  // Give this page its own tab title, restored on unmount.
  useEffect(() => {
    const previous = document.title;
    document.title = 'Where does your data go?';
    return () => { document.title = previous; };
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setSignedUp(true);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backButton}>
        <span aria-hidden="true">←</span> Return to portfolio
      </Link>

      {/* Hero */}
      <Reveal className={styles.hero}>
        <span className={styles.eyebrow}>Privacy by design</span>
        <h1 className={styles.title}>Where does your data go?</h1>
        <p className={styles.dek}>
          Signing up takes two seconds. Cleaning it back up can take a month — if you can
          even find it all. Scroll to follow one signup as it spreads across a system, then
          watch what happens when that person asks to be deleted.
        </p>
      </Reveal>

      {/* Signup */}
      <Reveal className={styles.signupScene}>
        <form className={styles.signupCard} onSubmit={handleSignup}>
          <div className={styles.field}>
            <label htmlFor="fn">First name</label>
            <input id="fn" type="text" value="Nicholas" readOnly />
          </div>
          <div className={styles.field}>
            <label htmlFor="ln">Last name</label>
            <input id="ln" type="text" value="Hamilton" readOnly />
          </div>
          <div className={styles.field}>
            <label htmlFor="em">Email</label>
            <input id="em" type="email" value="nicholas@example.com" readOnly />
          </div>
          <button type="submit" className={styles.signupBtn} disabled={signedUp}>
            {signedUp ? 'Signed up ✓' : 'Sign up'}
          </button>
        </form>
        <p className={styles.sceneHint}>
          {signedUp ? 'One row. Now watch where it goes.' : 'Go ahead — it’s only three fields.'}
        </p>
      </Reveal>

      {/* Fan-out map */}
      <section
        ref={mapRef}
        className={`${styles.reveal} ${styles.mapScene} ${drawn ? styles.visible : ''}`}
      >
        <h2 className={styles.sectionTitle}>One signup, eight systems</h2>
        <p className={styles.sectionLead}>
          That single form didn’t write to one place. Here’s where a typical signup lands.
        </p>
        <div className={styles.diagramWrap}>
          <svg
            className={styles.diagram}
            viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
            role="img"
            aria-label="A signup form connected by lines to eight downstream systems: user database, backups, analytics, email/CRM, payments, logs, cache, and an ad pixel."
          >
            <g className={styles.connectors}>
              {SYSTEMS.map((s, i) => (
                <path
                  key={s.id}
                  d={connectorPath(i)}
                  className={styles.connector}
                  pathLength="1"
                  style={{ strokeDashoffset: drawn ? 0 : 1, transitionDelay: `${i * 0.09}s` }}
                />
              ))}
            </g>

            {/* Signup source node */}
            <g className={`${styles.svgNode} ${styles.signupNode} ${drawn ? styles.nodeIn : ''}`}>
              <rect x={SIGNUP.x} y={SIGNUP.y} width={SIGNUP.w} height={SIGNUP.h} rx="12" />
              <text x={SIGNUP.x + SIGNUP.w / 2} y={SIGNUP.y + 36} className={styles.svgNodeLabel} textAnchor="middle">Sign up</text>
              <text x={SIGNUP.x + SIGNUP.w / 2} y={SIGNUP.y + 58} className={styles.svgNodeSub} textAnchor="middle">Nicholas Hamilton</text>
            </g>

            {/* Destination nodes */}
            {SYSTEMS.map((s, i) => {
              const y = NODE.startY + i * NODE.gap;
              return (
                <g
                  key={s.id}
                  className={`${styles.svgNode} ${drawn ? styles.nodeIn : ''}`}
                  style={{ transitionDelay: `${0.2 + i * 0.09}s` }}
                >
                  <rect x={NODE.x} y={y} width={NODE.w} height={NODE.h} rx="10" />
                  <text x={NODE.x + 20} y={y + 22} className={styles.svgNodeLabel}>{s.label}</text>
                  <text x={NODE.x + 20} y={y + 40} className={styles.svgNodeSub}>{s.detail}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      {/* Erasure request */}
      <Reveal className={styles.requestScene}>
        <div className={styles.requestCard}>
          <span className={styles.requestTag}>Incoming request</span>
          <h2 className={styles.requestTitle}>“Delete everything you have on me.”</h2>
          <p className={styles.requestBody}>
            Nicholas Hamilton has invoked his right to erasure under <strong>GDPR Article 17</strong>.
          </p>
          <div className={styles.deadline}>
            <span className={styles.deadlineClock} aria-hidden="true">◷</span>
            <span>
              You have <strong>one month</strong> to comply (Art. 12(3)) — extendable by two
              months for complex cases. The clock is running.
            </span>
          </div>
        </div>
      </Reveal>

      {/* The hunt */}
      <section
        ref={huntRef}
        className={`${styles.reveal} ${styles.huntScene} ${huntInView ? styles.visible : ''}`}
      >
        <h2 className={styles.sectionTitle}>Now go find all of it</h2>
        <p className={styles.sectionLead}>
          Eight systems, three different kinds of “done.” Some you delete outright. Some you
          can only flag. Some you don’t control — and some you aren’t even allowed to erase.
        </p>
        <div className={styles.huntGrid}>
          {SYSTEMS.map((s, i) => (
            <div
              key={s.id}
              className={`${styles.huntCard} ${huntInView ? styles.huntIn : ''}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className={styles.huntCardTop}>
                <span className={styles.huntLabel}>{s.label}</span>
                <span className={`${styles.statusChip} ${styles['tone_' + s.tone]}`}>{s.status}</span>
              </div>
              <span className={styles.huntDetail}>{s.detail}</span>
              {s.note && <span className={styles.huntNote}>{s.note}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Closing + CTA */}
      <Reveal className={styles.closing}>
        <h2 className={styles.closingTitle}>None of this had to be so hard.</h2>
        <p className={styles.closingBody}>
          Every branch above was a decision someone made without picturing the day it would
          need to be undone. Mapping where data flows <em>before</em> you build — privacy by
          design — turns a frantic one-month scramble into a problem you already solved.
        </p>
        <p className={styles.closingBody}>
          This is the kind of thing I help teams get ahead of.
        </p>
        <div className={styles.closingActions}>
          <a href="mailto:hamiltonn428@gmail.com" className={styles.ctaPrimary}>Get in touch</a>
          <Link to="/" className={styles.ctaSecondary}>Back to portfolio</Link>
        </div>
      </Reveal>
    </div>
  );
};

export default DataJourneyPage;
