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
 * Systems are grouped by the product moment that actually creates or enriches
 * their records. The original eight erasure examples also carry the case-file
 * fields used later in the story; supporting examples stay illustrative only.
 */
const CARDS = [
  {
    id: 'db', label: 'User Database', system: 'Postgres', icon: 'database',
    when: 'account created', trigger: 'signup', from: 'signup',
    payload: { kind: 'table', head: ['id', 'name'], row: ['usr_8f3a', 'Nicholas Hamilton'] },
    detail: 'Primary users row', status: 'Deleted', tone: 'done',
    identifier: 'usr_8f3a + email', control: 'First-party system',
    action: 'Delete the primary row', actionLabel: 'Delete primary record',
    lesson: 'Start with the canonical account, but never mistake the primary row for the whole person.',
    verify: 'Search again by user ID and email; both queries must return zero account rows.',
  },
  {
    id: 'cache', label: 'Session Cache', system: 'Redis', icon: 'bolt',
    when: 'session issued', trigger: 'signup', from: 'signup',
    payload: { kind: 'kv', rows: [['key', 'session:usr_8f3a'], ['ttl', '24h']] },
    detail: 'Login session', status: 'Expired', tone: 'done',
    identifier: 'session:usr_8f3a', control: 'First-party ephemeral store',
    action: 'Revoke and expire the key', actionLabel: 'Revoke active session',
    lesson: 'Short-lived data still matters. Revoke it now instead of waiting for the normal time-to-live.',
    verify: 'Attempt to read the session key and confirm the old access token can no longer authenticate.',
  },
  {
    id: 'logs', label: 'Application Logs', system: 'stdout', icon: 'terminal',
    when: 'request completed', trigger: 'signup', from: 'signup',
    payload: { kind: 'event', line: 'POST /signup 201  usr_8f3a' },
    detail: 'Request log with email', status: 'Purged', tone: 'done',
    identifier: 'usr_8f3a + request trace', control: 'First-party observability',
    action: 'Purge identifying log fields', actionLabel: 'Purge identifying fields',
    lesson: 'Logs are often missed because they are treated as infrastructure, even when they contain account identifiers.',
    verify: 'Search hot logs and the archive index; the trace may remain only after its identity fields are removed.',
  },
  {
    id: 'security', label: 'Security Signals', system: 'WAF + device risk', icon: 'broadcast',
    when: 'risk check', trigger: 'signup', from: 'signup', investigate: false,
    payload: { kind: 'kv', rows: [['ip', '198.51.100.42'], ['risk', 'low']] },
  },

  {
    id: 'profile', label: 'Profile Service', system: 'Profile API', icon: 'user',
    when: 'profile saved', trigger: 'profile', from: 'profile', investigate: false,
    payload: { kind: 'chips', items: ['phone', 'address', 'birthday'] },
  },
  {
    id: 'avatars', label: 'Media Storage', system: 'Object storage', icon: 'cloud',
    when: 'photo uploaded', trigger: 'profile', from: 'profile', investigate: false,
    payload: { kind: 'kv', rows: [['object', 'avatars/usr_8f3a'], ['metadata', 'image/jpeg']] },
  },
  {
    id: 'search', label: 'Search Index', system: 'Elasticsearch', icon: 'search',
    when: 'profile indexed', trigger: 'profile', from: 'profile', investigate: false,
    payload: { kind: 'event', line: 'index profile usr_8f3a' },
  },

  {
    id: 'analytics', label: 'Analytics', system: 'Warehouse', icon: 'chart',
    when: 'events streamed', trigger: 'browse', from: 'browse',
    payload: { kind: 'event', line: 'track product_viewed { sku: "BK-204" }' },
    detail: 'Event keyed to user_id', status: 'Deleted', tone: 'done',
    identifier: 'user_id + device_id', control: 'First-party warehouse',
    action: 'Delete linked event history', actionLabel: 'Erase linked events',
    lesson: 'Identity resolution matters: events may use a user ID, device ID, or an anonymous ID that was later merged.',
    verify: 'Run the identity graph and warehouse query again; no event should resolve back to this person.',
  },
  {
    id: 'cdp', label: 'Identity Graph', system: 'Customer data platform', icon: 'identity',
    when: 'identities merged', trigger: 'browse', from: 'browse', investigate: false,
    payload: { kind: 'chips', items: ['user_id', 'device_id', 'anonymous_id'] },
  },
  {
    id: 'recommendations', label: 'Recommendations', system: 'Feature store', icon: 'spark',
    when: 'interests inferred', trigger: 'browse', from: 'browse', investigate: false,
    payload: { kind: 'kv', rows: [['category', 'privacy books'], ['affinity', '0.78']] },
  },

  {
    id: 'payments', label: 'Payments', system: 'Stripe', icon: 'card',
    when: 'payment added', trigger: 'purchase', from: 'purchase',
    payload: { kind: 'kv', rows: [['customer', 'cus_9Fh2Kd'], ['card', '•••• 4242']] },
    detail: 'Customer object', status: 'Retained', tone: 'retained',
    note: 'Kept under a legal obligation. Erasure does not override tax and financial record law.',
    identifier: 'cus_9Fh2Kd + email', control: 'Processor with legal records',
    action: 'Restrict and retain lawfully', actionLabel: 'Record retention exception',
    lesson: 'Erasure has exceptions. Keep only the minimum financial record, lock it from other uses, and document why.',
    verify: 'Confirm the customer cannot be used for marketing or product access, and record the retention end date.',
  },
  {
    id: 'orders', label: 'Order Database', system: 'Commerce service', icon: 'order',
    when: 'order placed', trigger: 'purchase', from: 'purchase', investigate: false,
    payload: { kind: 'table', head: ['order', 'total'], row: ['ord_48291', '$68.42'] },
  },
  {
    id: 'tax', label: 'Tax & Invoicing', system: 'Finance system', icon: 'receipt',
    when: 'invoice issued', trigger: 'purchase', from: 'purchase', investigate: false,
    payload: { kind: 'chips', items: ['billing address', 'tax jurisdiction'] },
  },
  {
    id: 'fraud', label: 'Fraud Screening', system: 'Risk processor', icon: 'fingerprint',
    when: 'transaction scored', trigger: 'purchase', from: 'purchase', investigate: false,
    payload: { kind: 'kv', rows: [['decision', 'accept'], ['score', '0.08']] },
  },
  {
    id: 'fulfillment', label: 'Fulfillment', system: 'Shipping partner', icon: 'truck',
    when: 'shipment created', trigger: 'purchase', from: 'purchase', investigate: false,
    payload: { kind: 'chips', items: ['recipient name', 'delivery address'] },
  },

  {
    id: 'support', label: 'Support Desk', system: 'Zendesk', icon: 'support',
    when: 'ticket opened', trigger: 'support', from: 'support', investigate: false,
    payload: { kind: 'event', line: 'ticket #1842 · account access' },
  },
  {
    id: 'conversations', label: 'Conversation Archive', system: 'Support transcripts', icon: 'transcript',
    when: 'conversation saved', trigger: 'support', from: 'support', investigate: false,
    payload: { kind: 'chips', items: ['chat transcript', 'agent notes'] },
  },

  {
    id: 'crm', label: 'Email / CRM', system: 'Mailchimp', icon: 'mail',
    when: 'consent recorded', trigger: 'marketing', from: 'marketing',
    payload: { kind: 'chips', items: ['newsletter opt-in', 'audience: Updates'] },
    detail: 'Marketing audience', status: 'Forwarded', tone: 'forwarded',
    note: 'A processor you have to instruct, not your own database.',
    identifier: 'email + subscriber hash', control: 'External processor',
    action: 'Send and track deletion', actionLabel: 'Instruct the processor',
    lesson: 'A contract does not delete data. Your system must send the instruction and retain evidence that it completed.',
    verify: 'Receive a completion result, then query the audience by email and subscriber hash.',
  },
  {
    id: 'adpixel', label: 'Ad Pixel', system: 'adnetwork.com', icon: 'broadcast',
    when: 'if consent allows', trigger: 'marketing', from: 'marketing',
    payload: { kind: 'chips', items: ['campaign event', 'shared off-site'] },
    detail: 'Third-party tag', status: 'Forwarded', tone: 'forwarded',
    note: 'That data already left with a third party.',
    identifier: 'cookie ID + event timestamp', control: 'External recipient',
    action: 'Notify and document the boundary', actionLabel: 'Notify the recipient',
    lesson: 'Once data leaves your environment, you may not be able to recall it directly. The transfer still belongs in the case.',
    verify: 'Record the recipient, instruction, response, and any limitation you must explain to the requester.',
  },
  {
    id: 'audiences', label: 'Audience Sync', system: 'Ad platform', icon: 'broadcast',
    when: 'audience refreshed', trigger: 'marketing', from: 'marketing', investigate: false,
    payload: { kind: 'kv', rows: [['match key', 'hashed email'], ['segment', 'returning customer']] },
  },

  {
    id: 'backups', label: 'Nightly Backups', system: 'S3 Glacier', icon: 'backup',
    when: 'overnight snapshot', trigger: 'overnight', from: 'overnight',
    payload: { kind: 'table', head: ['id', 'name'], row: ['usr_8f3a', 'Nicholas Hamilton'], tag: 'immutable snapshot' },
    detail: 'Encrypted snapshot', status: 'Tombstoned', tone: 'pending',
    note: 'You can’t edit a sealed backup, so it gets flagged for deletion on restore.',
    identifier: 'usr_8f3a + snapshot date', control: 'First-party immutable backup',
    action: 'Create a restore tombstone', actionLabel: 'Add restore tombstone',
    lesson: 'Editing a sealed backup can destroy its integrity. Instead, prevent the record from returning during a restore.',
    verify: 'Run a restore drill and confirm the deletion ledger removes the row before the recovered system goes live.',
  },
  {
    id: 'warehouse', label: 'Analytics Warehouse', system: 'Snowflake / BigQuery', icon: 'database',
    when: 'batch transformed', trigger: 'overnight', from: 'overnight', investigate: false,
    payload: { kind: 'table', head: ['user_key', 'orders'], row: ['usr_8f3a', '1'] },
  },
  {
    id: 'lake', label: 'Raw Data Lake', system: 'Object storage', icon: 'cloud',
    when: 'exports landed', trigger: 'overnight', from: 'overnight', investigate: false,
    payload: { kind: 'chips', items: ['event export', 'support export', 'order export'] },
  },
];

const INVESTIGATION_CARDS = CARDS.filter((card) => card.investigate !== false);

const LIFECYCLE_STEPS = [
  { id: 'profile', label: 'Complete a profile', detail: 'Phone, address, preferences, and a photo' },
  { id: 'browse', label: 'Browse the product', detail: 'Views, searches, identity links, and inferences' },
  { id: 'purchase', label: 'Make a purchase', detail: 'Payment, order, tax, risk, and fulfillment' },
  { id: 'support', label: 'Contact support', detail: 'Tickets, messages, attachments, and agent notes' },
  { id: 'marketing', label: 'Opt into updates', detail: 'CRM records and consent-based ad sharing' },
  { id: 'overnight', label: 'A day passes', detail: 'Backups, warehouse jobs, and raw exports' },
];

const SYSTEM_PHASES = [
  { id: 'signup', label: 'Signup', detail: 'Account creation and immediate technical records' },
  ...LIFECYCLE_STEPS,
];

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
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  cloud: <><path d="M7 18h10a4 4 0 0 0 .7-7.9A6 6 0 0 0 6.2 9 4.5 4.5 0 0 0 7 18Z" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>,
  identity: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="16" r="3" /><path d="M10.5 9.5 14.5 14.5" /></>,
  spark: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z" /><path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7Z" /></>,
  order: <><path d="M6 7h15l-2 8H8L6 4H3" /><circle cx="9" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /></>,
  receipt: <><path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21Z" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  fingerprint: <><path d="M8 11a4 4 0 0 1 8 0c0 4-1 7-2.5 10" /><path d="M5 11a7 7 0 0 1 14 0c0 2.5-.3 5-1.2 7.3" /><path d="M11 11c0 3-.4 5.8-1.8 8.5" /></>,
  truck: <><path d="M3 6h11v11H3Z" /><path d="M14 10h4l3 3v4h-7Z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 13h-3v6h1a2 2 0 0 0 2-2Z" /><path d="M17 19c-1 2-3 2-5 2" /></>,
  transcript: <><path d="M5 4h14v13H9l-4 3Z" /><path d="M8 8h8M8 12h6" /></>,
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
  const [triggeredSteps, setTriggeredSteps] = useState(() => new Set());
  const [huntRef, huntInView] = useInView(0.2);
  const [selectedSystem, setSelectedSystem] = useState(INVESTIGATION_CARDS[0].id);
  const [resolvedSystems, setResolvedSystems] = useState(() => new Set());

  const stageRef = useRef(null);
  const sourceRef = useRef(null);
  const triggerRefs = useRef({});
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
    const next = {};
    CARDS.forEach((c) => {
      const el = cardRefs.current[c.id];
      const originEl = c.from === 'signup' ? src : triggerRefs.current[c.from];
      if (!el || !originEl) return;
      const r = el.getBoundingClientRect();
      const originRect = originEl.getBoundingClientRect();
      const cx = r.left - sRect.left + r.width / 2;
      const cyTop = r.top - sRect.top;
      const from = {
        x: originRect.left - sRect.left + originRect.width / 2,
        y: originRect.bottom - sRect.top,
      };
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

  useLayoutEffect(() => {
    measure();
  }, [signedUp, measure]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const handleSignup = (e) => {
    e.preventDefault();
    if (signedUp) return;
    setSignedUp(true);
    const signupCards = CARDS.filter((card) => card.trigger === 'signup');
    signupCards.forEach((card, i) => {
      const t = setTimeout(() => {
        setActive((prev) => new Set(prev).add(card.id));
      }, 350 + i * 500);
      timers.current.push(t);
    });
  };

  const handleLifecycleStep = (stepId) => {
    if (triggeredSteps.has(stepId)) return;
    setTriggeredSteps((previous) => new Set(previous).add(stepId));
    const stepCards = CARDS.filter((card) => card.trigger === stepId);
    stepCards.forEach((card, i) => {
      const t = setTimeout(() => {
        setActive((previous) => new Set(previous).add(card.id));
      }, 180 + i * 360);
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
          One form creates an account in seconds. What happens after that depends on what the
          person actually does. Create the account, simulate the moments that follow, and watch
          a small data trail become a company-wide map.
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

          <div className={`${styles.originRow} ${signedUp ? styles.originRowActive : ''}`}>
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
                {signedUp ? 'Following four immediate signup records…' : 'Start with the account creation event.'}
              </p>
            </form>

            {signedUp && (
              <aside className={styles.lifecyclePanel} aria-live="polite">
                <header className={styles.lifecycleHeader}>
                  <div>
                    <span className={styles.lifecycleKicker}>What happens next</span>
                    <h2>Signup is only the first event.</h2>
                  </div>
                  <span className={styles.systemCounter}>
                    <strong className="tabular-nums">{active.size}/{CARDS.length}</strong>
                    systems touched
                  </span>
                </header>
                <p className={styles.lifecycleCopy}>
                  At signup, a product may create an account row, session, request log, and
                  security signal. It has not created payment, shipping, support, or marketing
                  records yet.
                </p>
                <p className={styles.lifecycleCopy}>
                  As the person uses the product, each action can add new records, derived
                  profiles, and disclosures to service providers. Try the moments below.
                </p>
                <div className={styles.lifecycleActions}>
                  {LIFECYCLE_STEPS.map((step) => {
                    const triggered = triggeredSteps.has(step.id);
                    return (
                      <button
                        key={step.id}
                        type="button"
                        ref={(el) => { triggerRefs.current[step.id] = el; }}
                        className={`${styles.lifecycleAction} ${triggered ? styles.lifecycleActionDone : ''}`}
                        onClick={() => handleLifecycleStep(step.id)}
                        disabled={triggered}
                      >
                        <span>
                          <strong>{step.label}</strong>
                          <small>{step.detail}</small>
                        </span>
                        <span className={styles.lifecycleActionState}>{triggered ? 'Added ✓' : 'Simulate →'}</span>
                      </button>
                    );
                  })}
                </div>
                <p className={styles.lifecycleFootnote}>
                  Illustrative architecture: the exact systems and lawful purposes vary by product.
                </p>
              </aside>
            )}
          </div>

          {/* System map, grouped by the product moment that created each record. */}
          <div className={styles.systemMap}>
            {SYSTEM_PHASES.map((phase, phaseIndex) => {
              const phaseCards = CARDS.filter((card) => card.trigger === phase.id);
              const phaseActive = phaseCards.some((card) => active.has(card.id));
              return (
                <section
                  className={`${styles.systemPhase} ${phaseActive ? styles.systemPhaseOn : ''}`}
                  key={phase.id}
                  data-trigger={phase.id}
                >
                  <header className={styles.phaseHeader}>
                    <span className={styles.phaseNumber}>{String(phaseIndex + 1).padStart(2, '0')}</span>
                    <span>
                      <strong>{phase.label}</strong>
                      <small>{phase.detail}</small>
                    </span>
                    <span className={styles.phaseCount}>{phaseCards.length} systems</span>
                  </header>
                  <div className={styles.cardsGrid}>
                    {phaseCards.map((c) => {
                      const on = active.has(c.id);
                      return (
                        <article
                          key={c.id}
                          ref={(el) => { cardRefs.current[c.id] = el; }}
                          className={`${styles.systemCard} ${on ? styles.cardOn : ''}`}
                          data-system={c.id}
                          data-trigger={c.trigger}
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
                </section>
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
