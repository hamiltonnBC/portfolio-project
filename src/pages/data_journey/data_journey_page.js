/*************************************************
 * Filename: data_journey_page.js
 *
 * Purpose: "Where does your data go?" — an interactive story about data sprawl and
 * the difficulty of GDPR erasure. One signup fans out across many live-looking
 * systems (rows land in tables, events fire, a backup snapshot appears twelve hours
 * later), then a right-to-erasure request arrives and we watch how hard it is to
 * hunt every copy back down. It doubles as an argument for privacy-by-design.
 *
 * Connected Files:
 * - DataJourney.module.css: Styling for this component
 * - router.js: Registers the nested Privacy Engineering route and legacy redirect
 *************************************************/

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './DataJourney.module.css';

/**
 * Every system a single signup touches. `order` drives the activation cascade,
 * `when` is the story timestamp, `payload` is the little live view each card shows,
 * and the erasure fields (status/tone/note) power the later "hunt" section.
 */
const CARDS = [
  {
    id: 'db', label: 'User Database', system: 'Postgres', icon: 'database',
    when: 'on signup', order: 0, from: 'signup', pos: { col: '1 / 5', row: 1 },
    payload: { kind: 'table', head: ['id', 'name'], row: ['usr_8f3a', 'Nicholas Hamilton'] },
    detail: 'Primary users row', status: 'Deleted', tone: 'done',
    identifier: 'usr_8f3a + email', control: 'First-party system',
    action: 'Delete the primary row', actionLabel: 'Delete primary record',
    lesson: 'Start with the canonical account, but never mistake the primary row for the whole person.',
    verify: 'Search again by user ID and email; both queries must return zero account rows.',
  },
  {
    id: 'payments', label: 'Payments', system: 'Stripe', icon: 'card',
    when: 'on signup', order: 1, from: 'signup', pos: { col: '9 / 13', row: 1 },
    payload: { kind: 'kv', rows: [['customer', 'cus_9Fh2Kd'], ['status', 'active']] },
    detail: 'Customer object', status: 'Retained', tone: 'retained',
    note: 'Kept under a legal obligation. Erasure does not override tax and financial record law.',
    identifier: 'cus_9Fh2Kd + email', control: 'Processor with legal records',
    action: 'Restrict and retain lawfully', actionLabel: 'Record retention exception',
    lesson: 'Erasure has exceptions. Keep only the minimum financial record, lock it from other uses, and document why.',
    verify: 'Confirm the customer cannot be used for marketing or product access, and record the retention end date.',
  },
  {
    id: 'cache', label: 'Session Cache', system: 'Redis', icon: 'bolt',
    when: 'instantly', order: 2, from: 'signup', pos: { col: '1 / 5', row: 3 },
    payload: { kind: 'kv', rows: [['key', 'session:usr_8f3a'], ['ttl', '24h']] },
    detail: 'Login session', status: 'Expired', tone: 'done',
    identifier: 'session:usr_8f3a', control: 'First-party ephemeral store',
    action: 'Revoke and expire the key', actionLabel: 'Revoke active session',
    lesson: 'Short-lived data still matters. Revoke it now instead of waiting for the normal time-to-live.',
    verify: 'Attempt to read the session key and confirm the old access token can no longer authenticate.',
  },
  {
    id: 'logs', label: 'Application Logs', system: 'stdout', icon: 'terminal',
    when: 'instantly', order: 3, from: 'signup', pos: { col: '9 / 13', row: 3 },
    payload: { kind: 'event', line: 'POST /signup 201  usr_8f3a' },
    detail: 'Request log with email', status: 'Purged', tone: 'done',
    identifier: 'usr_8f3a + request trace', control: 'First-party observability',
    action: 'Purge identifying log fields', actionLabel: 'Purge identifying fields',
    lesson: 'Logs are often missed because they are treated as infrastructure, even when they contain account identifiers.',
    verify: 'Search hot logs and the archive index; the trace may remain only after its identity fields are removed.',
  },
  {
    id: 'analytics', label: 'Analytics', system: 'Warehouse', icon: 'chart',
    when: '+2 seconds', order: 4, from: 'signup', pos: { col: '5 / 9', row: 2 },
    payload: { kind: 'event', line: 'track user_signed_up { plan: "free" }' },
    detail: 'Event keyed to user_id', status: 'Deleted', tone: 'done',
    identifier: 'user_id + device_id', control: 'First-party warehouse',
    action: 'Delete linked event history', actionLabel: 'Erase linked events',
    lesson: 'Identity resolution matters: events may use a user ID, device ID, or an anonymous ID that was later merged.',
    verify: 'Run the identity graph and warehouse query again; no event should resolve back to this person.',
  },
  {
    id: 'crm', label: 'Email / CRM', system: 'Mailchimp', icon: 'mail',
    when: '+1 minute', order: 5, from: 'signup', pos: { col: '5 / 9', row: 4 },
    payload: { kind: 'chips', items: ['welcome email queued', 'audience: Newsletter'] },
    detail: 'Marketing audience', status: 'Forwarded', tone: 'forwarded',
    note: 'A processor you have to instruct, not your own database.',
    identifier: 'email + subscriber hash', control: 'External processor',
    action: 'Send and track deletion', actionLabel: 'Instruct the processor',
    lesson: 'A contract does not delete data. Your system must send the instruction and retain evidence that it completed.',
    verify: 'Receive a completion result, then query the audience by email and subscriber hash.',
  },
  {
    id: 'adpixel', label: 'Ad Pixel', system: 'adnetwork.com', icon: 'broadcast',
    when: '+2 seconds', order: 6, from: 'analytics', pos: { col: '5 / 9', row: 5 },
    payload: { kind: 'chips', items: ['tag fired', 'shared off-site'] },
    detail: 'Third-party tag', status: 'Forwarded', tone: 'forwarded',
    note: 'That data already left with a third party.',
    identifier: 'cookie ID + event timestamp', control: 'External recipient',
    action: 'Notify and document the boundary', actionLabel: 'Notify the recipient',
    lesson: 'Once data leaves your environment, you may not be able to recall it directly. The transfer still belongs in the case.',
    verify: 'Record the recipient, instruction, response, and any limitation you must explain to the requester.',
  },
  {
    id: 'backups', label: 'Nightly Backups', system: 'S3 Glacier', icon: 'backup',
    when: '+12 hours', order: 7, from: 'db', pos: { col: '1 / 5', row: 5 },
    payload: { kind: 'table', head: ['id', 'name'], row: ['usr_8f3a', 'Nicholas Hamilton'], tag: 'immutable snapshot' },
    detail: 'Encrypted snapshot', status: 'Tombstoned', tone: 'pending',
    note: 'You can’t edit a sealed backup, so it gets flagged for deletion on restore.',
    identifier: 'usr_8f3a + snapshot date', control: 'First-party immutable backup',
    action: 'Create a restore tombstone', actionLabel: 'Add restore tombstone',
    lesson: 'Editing a sealed backup can destroy its integrity. Instead, prevent the record from returning during a restore.',
    verify: 'Run a restore drill and confirm the deletion ledger removes the row before the recovered system goes live.',
  },
  {
    id: 'more', label: 'and so many more!', system: '', icon: 'more',
    when: '', order: 8, from: 'signup', pos: { col: '9 / 13', row: 4 },
    payload: null, extra: true,
  },
];

const ORDERED = [...CARDS].sort((a, b) => a.order - b.order);
const INVESTIGATION_CARDS = CARDS.filter((card) => !card.extra);

/**
 * Real GDPR / CCPA enforcement actions. Every figure verified against a primary
 * source (issuing DPA press release, EDPB, California AG / CPPA) in 2026.
 * Amounts shown as issued; Amazon's €746M is omitted as it was annulled on appeal.
 */
const FINES = [
  { company: 'Meta', amount: '€1.2B', law: 'GDPR', regulator: 'Ireland DPC', year: 2023, reason: 'Sent EU user data to the US without adequate safeguards.' },
  { company: 'TikTok', amount: '€530M', law: 'GDPR', regulator: 'Ireland DPC', year: 2025, reason: 'Transferred European user data to China.' },
  { company: 'Instagram', amount: '€405M', law: 'GDPR', regulator: 'Ireland DPC', year: 2022, reason: 'Exposed children’s contact details by default.' },
  { company: 'LinkedIn', amount: '€310M', law: 'GDPR', regulator: 'Ireland DPC', year: 2024, reason: 'Targeted ads with no valid lawful basis.' },
  { company: 'Uber', amount: '€290M', law: 'GDPR', regulator: 'Dutch DPA', year: 2024, reason: 'Moved driver data to the US without safeguards.' },
  { company: 'WhatsApp', amount: '€225M', law: 'GDPR', regulator: 'Ireland DPC', year: 2021, reason: 'Failed to explain how it used people’s data.' },
  { company: 'Google', amount: '€50M', law: 'GDPR', regulator: 'France CNIL', year: 2019, reason: 'No valid consent for ad personalization.' },
  { company: 'Clearview AI', amount: '€30.5M', law: 'GDPR', regulator: 'Dutch DPA', year: 2024, reason: 'Scraped faces into a biometric database.' },
  { company: 'Healthline', amount: '$1.55M', law: 'CCPA', regulator: 'California AG', year: 2025, reason: 'Shared readers’ health-related data for ads.' },
  { company: 'Sephora', amount: '$1.2M', law: 'CCPA', regulator: 'California AG', year: 2022, reason: 'Ignored opt-outs and sold personal data.' },
  { company: 'Honda', amount: '$632.5K', law: 'CCPA', regulator: 'CPPA', year: 2025, reason: 'Made opt-out and deletion needlessly hard.' },
  { company: 'DoorDash', amount: '$375K', law: 'CCPA', regulator: 'California AG', year: 2024, reason: 'Sold personal info without an opt-out.' },
];

/* ------------------------------- Icons ------------------------------- */
const ICON_PATHS = {
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  backup: <><ellipse cx="10" cy="6" rx="7" ry="2.5" /><path d="M3 6v9c0 1.5 3.1 2.6 7 2.6" /><rect x="14" y="13" width="7" height="7" rx="1.2" /><path d="M16 13v-1.6a1.5 1.5 0 0 1 3 0V13" /></>,
  chart: <><path d="M4 20V11" /><path d="M10 20V5" /><path d="M16 20v-6" /><path d="M3 20h18" /></>,
  broadcast: <><circle cx="12" cy="12" r="1.8" /><path d="M8.5 8.5a5 5 0 0 0 0 7" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M5.5 5.5a9 9 0 0 0 0 13" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" /></>,
  bolt: <><path d="M13 2 5 13h6l-1 9 8-11h-6z" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3" /><path d="M13 15h4" /></>,
  more: <><circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none" /></>,
};

const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" className={styles.icon} fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICON_PATHS[name]}
  </svg>
);

/* ------------------------------ Payloads ------------------------------ */
const Payload = ({ card, on }) => {
  const p = card.payload;
  if (p.kind === 'table') {
    return (
      <div className={styles.miniTable}>
        <div className={styles.miniHead}>
          {p.head.map((h) => <span key={h}>{h}</span>)}
        </div>
        <div className={`${styles.miniRow} ${on ? styles.rowIn : ''}`}>
          {p.row.map((c, i) => <span key={i}>{c}</span>)}
        </div>
        {p.tag && (
          <span className={`${styles.snapChip} ${on ? styles.chipIn : ''}`}>{p.tag}</span>
        )}
      </div>
    );
  }
  if (p.kind === 'kv') {
    return (
      <div className={`${styles.kv} ${on ? styles.kvIn : ''}`}>
        {p.rows.map(([k, v]) => (
          <div key={k}><span>{k}</span><span>{v}</span></div>
        ))}
      </div>
    );
  }
  if (p.kind === 'event') {
    return <code className={`${styles.eventLine} ${on ? styles.eventIn : ''}`}>{p.line}</code>;
  }
  if (p.kind === 'chips') {
    return (
      <div className={styles.chips}>
        {p.items.map((c, i) => (
          <span key={i} className={`${styles.miniChip} ${on ? styles.chipIn : ''}`}>{c}</span>
        ))}
      </div>
    );
  }
  return null;
};

/* ------------------------- Scroll reveal helper ------------------------- */
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

const Reveal = ({ children, className = '' }) => {
  const [ref, inView] = useInView(0.15);
  return (
    <section ref={ref} className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}>
      {children}
    </section>
  );
};

/* ------------------------------- Page ------------------------------- */
const DataJourneyPage = () => {
  const [signedUp, setSignedUp] = useState(false);
  const [active, setActive] = useState(() => new Set());
  const [huntRef, huntInView] = useInView(0.2);
  const [selectedSystem, setSelectedSystem] = useState(INVESTIGATION_CARDS[0].id);
  const [resolvedSystems, setResolvedSystems] = useState(() => new Set());

  const stageRef = useRef(null);
  const sourceRef = useRef(null);
  const cardRefs = useRef({});
  const timers = useRef([]);
  const [wires, setWires] = useState({});
  const [dims, setDims] = useState({ w: 0, h: 0 });

  // Own tab title, restored on unmount.
  useEffect(() => {
    const previous = document.title;
    document.title = 'Where does your data go? | Privacy Engineering';
    return () => { document.title = previous; };
  }, []);

  // Measure wire paths from the real DOM so they stay attached through layout
  // changes (including the sidebar sliding away on this route).
  const measure = useCallback(() => {
    const stage = stageRef.current;
    const src = sourceRef.current;
    if (!stage || !src) return;
    const sRect = stage.getBoundingClientRect();
    const srcRect = src.getBoundingClientRect();
    const start = { x: srcRect.left - sRect.left + srcRect.width / 2, y: srcRect.bottom - sRect.top };

    const next = {};
    CARDS.forEach((c) => {
      const el = cardRefs.current[c.id];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left - sRect.left + r.width / 2;
      const cyTop = r.top - sRect.top;
      let from = start;
      if (c.from !== 'signup') {
        const pEl = cardRefs.current[c.from];
        if (pEl) {
          const pr = pEl.getBoundingClientRect();
          from = { x: pr.left - sRect.left + pr.width / 2, y: pr.bottom - sRect.top };
        }
      }
      const midY = (from.y + cyTop) / 2;
      next[c.id] = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${cx} ${midY}, ${cx} ${cyTop}`;
    });
    setWires(next);
    setDims({ w: sRect.width, h: sRect.height });
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (signedUp) return;
    setSignedUp(true);
    // Slow cascade: each system lights up roughly 1.2s after the last.
    ORDERED.forEach((card, i) => {
      const t = setTimeout(() => {
        setActive((prev) => new Set(prev).add(card.id));
      }, 650 + i * 1200);
      timers.current.push(t);
    });
  };

  const selectedCard = INVESTIGATION_CARDS.find((card) => card.id === selectedSystem);
  const resolvedCount = resolvedSystems.size;
  const investigationComplete = resolvedCount === INVESTIGATION_CARDS.length;

  const handleResolve = () => {
    const next = new Set(resolvedSystems).add(selectedSystem);
    const nextOpenCard = INVESTIGATION_CARDS.find((card) => !next.has(card.id));
    setResolvedSystems(next);
    if (nextOpenCard) setSelectedSystem(nextOpenCard.id);
  };

  const resetInvestigation = () => {
    setResolvedSystems(new Set());
    setSelectedSystem(INVESTIGATION_CARDS[0].id);
  };

  return (
    <div className={styles.page}>
      <Link to="/privacy-engineering" className={styles.backButton}>
        <span aria-hidden="true">←</span> Back to Privacy Engineering
      </Link>

      {/* Hero */}
      <Reveal className={styles.hero}>
        <span className={styles.eyebrow}>Privacy by design</span>
        <h1 className={styles.title}>Where does your data go?</h1>
        <p className={styles.dek}>
          One form creates a person in seconds. Then identifiers, events, and copies scatter
          across systems with different owners and rules. Follow one signup outward, then work
          the deletion request yourself.
        </p>
      </Reveal>

      {/* Signup + live fan-out stage */}
      <section className={styles.flowScene}>
        <div className={styles.stage} ref={stageRef}>
          {/* Wire overlay */}
          <svg
            className={styles.wires}
            viewBox={`0 0 ${dims.w || 1} ${dims.h || 1}`}
            width={dims.w}
            height={dims.h}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {CARDS.map((c) => (
              <path
                key={c.id}
                d={wires[c.id] || ''}
                className={`${styles.wire} ${active.has(c.id) ? styles.wireOn : ''}`}
                pathLength="1"
              />
            ))}
          </svg>

          {/* Source: the signup form */}
          <form className={styles.signupCard} ref={sourceRef} onSubmit={handleSignup}>
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
              <input id="em" type="email" value="hamiltonn428@gmail.com" readOnly />
            </div>
            <button type="submit" className={styles.signupBtn} disabled={signedUp}>
              {signedUp ? 'Signed up ✓' : 'Sign up'}
            </button>
            <p className={styles.sceneHint}>
              {signedUp ? 'Following the trail…' : 'Click Sign up for a demo!'}
            </p>
          </form>

          {/* System cards */}
          <div className={styles.cardsGrid}>
            {CARDS.map((c) => {
              const on = active.has(c.id);
              return (
                <article
                  key={c.id}
                  ref={(el) => { cardRefs.current[c.id] = el; }}
                  className={`${styles.systemCard} ${c.extra ? styles.cardExtra : ''} ${on ? styles.cardOn : ''}`}
                  data-system={c.id}
                >
                  <header className={styles.cardHead}>
                    <span className={styles.cardIcon}><Icon name={c.icon} /></span>
                    <span className={styles.cardTitles}>
                      <span className={styles.cardLabel}>{c.label}</span>
                      {c.system && <span className={styles.cardSystem}>{c.system}</span>}
                    </span>
                    {c.when && (
                      <span className={`${styles.whenBadge} ${on ? styles.whenOn : ''}`}>{c.when}</span>
                    )}
                  </header>
                  {c.payload && <Payload card={c} on={on} />}
                </article>
              );
            })}
          </div>
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
              You have <strong>one month</strong> to comply (Art. 12(3)), extendable by two
              months for complex cases. The clock is running.
            </span>
          </div>
        </div>
      </Reveal>

      {/* Enforcement fines marquee */}
      <Reveal className={styles.finesScene}>
        <p className={styles.finesLead}>Getting it wrong is expensive.</p>
        <div
          className={styles.marquee}
          role="group"
          aria-label="Real GDPR and CCPA enforcement fines"
        >
          <div className={styles.marqueeTrack}>
            {[...FINES, ...FINES].map((f, i) => (
              <div
                className={styles.fineCard}
                key={i}
                aria-hidden={i >= FINES.length ? 'true' : undefined}
              >
                <span className={styles.fineCompany}>{f.company}</span>
                <span className={`${styles.fineAmount} tabular-nums`}>{f.amount}</span>
                <div className={styles.fineMeta}>
                  <span className={`${styles.lawChip} ${f.law === 'GDPR' ? styles.lawGdpr : styles.lawCcpa}`}>
                    {f.law}
                  </span>
                  <span className={styles.fineReg}>{f.regulator} · {f.year}</span>
                </div>
                <span className={styles.fineReason}>{f.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* The hunt */}
      <section
        ref={huntRef}
        className={`${styles.reveal} ${styles.huntScene} ${huntInView ? styles.visible : ''}`}
      >
        <header className={styles.huntHeader}>
          <div>
            <span className={styles.caseLabel}>Interactive case file · DSR-017</span>
            <h2 className={styles.sectionTitle}>Now go find all of it</h2>
            <p className={styles.sectionLead}>
              Closing an erasure request is not one delete query. Reconcile every system:
              find the right identity, decide what the law and architecture allow, take action,
              and keep proof that it worked.
            </p>
          </div>
          <aside className={styles.caseProgress} aria-label={`${resolvedCount} of ${INVESTIGATION_CARDS.length} systems reconciled`}>
            <div className={styles.caseProgressTop}>
              <span>Case progress</span>
              <strong className="tabular-nums">{resolvedCount}/{INVESTIGATION_CARDS.length}</strong>
            </div>
            <progress value={resolvedCount} max={INVESTIGATION_CARDS.length}>
              {resolvedCount} of {INVESTIGATION_CARDS.length}
            </progress>
            <span className={styles.caseDeadline}>Day 01 of 30 · clock running</span>
          </aside>
        </header>

        <div className={styles.investigationGuide} aria-label="Four steps in an erasure investigation">
          <span><b>01</b> Discover systems</span>
          <span><b>02</b> Match identities</span>
          <span><b>03</b> Apply disposition</span>
          <span><b>04</b> Verify the result</span>
        </div>

        <div className={styles.huntWorkbench}>
          <nav className={styles.systemQueue} aria-label="Systems in this erasure case">
            <div className={styles.queueHeader}>
              <span>System inventory</span>
              <span>{INVESTIGATION_CARDS.length} found</span>
            </div>
            <div className={styles.queueList}>
              {INVESTIGATION_CARDS.map((card, index) => {
                const isSelected = selectedSystem === card.id;
                const isResolved = resolvedSystems.has(card.id);
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`${styles.queueItem} ${isSelected ? styles.queueItemSelected : ''} ${isResolved ? styles.queueItemResolved : ''}`}
                    onClick={() => setSelectedSystem(card.id)}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.queueIndex}>{String(index + 1).padStart(2, '0')}</span>
                    <span className={styles.queueIdentity}>
                      <strong>{card.label}</strong>
                      <small>{card.system}</small>
                    </span>
                    <span className={styles.queueState}>{isResolved ? 'Closed' : 'Open'}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <article className={styles.caseDetail} aria-live="polite">
            <header className={styles.caseDetailHeader}>
              <span className={styles.caseSystemIcon}><Icon name={selectedCard.icon} /></span>
              <div>
                <span>{selectedCard.system}</span>
                <h3>{selectedCard.label}</h3>
              </div>
              <span className={`${styles.statusChip} ${styles['tone_' + selectedCard.tone]}`}>
                {selectedCard.status}
              </span>
            </header>

            <div className={styles.evidenceGrid}>
              <div>
                <span className={styles.evidenceLabel}>Match with</span>
                <code>{selectedCard.identifier}</code>
              </div>
              <div>
                <span className={styles.evidenceLabel}>Control boundary</span>
                <strong>{selectedCard.control}</strong>
              </div>
            </div>

            <div className={styles.dispositionPanel}>
              <span className={styles.evidenceLabel}>Required disposition</span>
              <h4>{selectedCard.action}</h4>
              <p>{selectedCard.lesson}</p>
              {selectedCard.note && <p className={styles.boundaryNote}>{selectedCard.note}</p>}
            </div>

            <div className={styles.verificationPanel}>
              <span className={styles.verifyMark} aria-hidden="true">✓</span>
              <div>
                <span className={styles.evidenceLabel}>Evidence to close</span>
                <p>{selectedCard.verify}</p>
              </div>
            </div>

            <button
              type="button"
              className={styles.resolveButton}
              onClick={handleResolve}
              disabled={resolvedSystems.has(selectedCard.id)}
            >
              {resolvedSystems.has(selectedCard.id) ? 'System reconciled' : selectedCard.actionLabel}
              <span aria-hidden="true">{resolvedSystems.has(selectedCard.id) ? ' ✓' : ' →'}</span>
            </button>
          </article>
        </div>

        {investigationComplete && (
          <div className={styles.caseComplete} role="status">
            <div>
              <span className={styles.completeKicker}>Case reconciled</span>
              <h3>Eight systems found. Four different endings.</h3>
              <p>
                Four records were deleted, purged, or expired; two external parties received
                instructions; one record was retained under a legal exception; and one backup
                received a restore tombstone. “Done” means a justified, verified outcome—not
                that every byte vanished in the same way.
              </p>
            </div>
            <button type="button" className={styles.resetButton} onClick={resetInvestigation}>
              Run the case again
            </button>
          </div>
        )}
      </section>

      {/* Closing + CTA */}
      <Reveal className={styles.closing}>
        <h2 className={styles.closingTitle}>None of this had to be so hard.</h2>
        <p className={styles.closingBody}>
          Every branch above was a decision someone made without picturing the day it would
          need to be undone. Mapping where data flows before you build, what we call privacy
          by design, turns a frantic one-month scramble into a problem you already solved.
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
