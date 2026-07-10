/*************************************************
 * Filename: privacy_engineering_overview_page.js
 *
 * Purpose: Introduces the portfolio's privacy engineering body of work and
 * guides visitors toward focused privacy case studies.
 *
 * Project Role:
 * - Serves as the default Privacy Engineering route
 * - Frames Nicholas Hamilton's privacy work for recruiters and collaborators
 * - Links to deeper privacy-engineering case studies
 *
 * Connected Files:
 * - privacy_engineering_page.js: Parent section shell and tabs
 * - privacy_engineering_styles.module.css: Page styling
 * - ../data_journey/data_journey_page.js: Interactive data-flow demo
 * - dsr_consent_analytics_page.js: Analytics case-study route
 *************************************************/

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './privacy_engineering_styles.module.css';
import privacyIcon from '../../images/05_ICON_FOREST.png';
import privacyCertificate from '../../images/privacyEngineerCert.png';

const focusAreas = [
  {
    title: 'Data Mapping',
    body: 'Trace where personal data appears, which systems touch it, and where deletion or retention needs real engineering support.',
  },
  {
    title: 'Request Operations',
    body: 'Model privacy request lifecycles so completed, active, and average-time views line up across dashboards and exports.',
  },
  {
    title: 'Consent Analytics',
    body: 'Separate change events from session-state metrics so consent reporting explains what was measured and what it cannot prove.',
  },
  {
    title: 'Explainable Dashboards',
    body: 'Make metric definitions visible enough that legal, privacy, and engineering teams can reason from the same evidence.',
  },
];

const caseStudies = [
  {
    title: 'Where does your data go?',
    label: 'Interactive privacy demo',
    body: 'A scrollytelling experience showing how a simple signup spreads through databases, logs, vendors, analytics, and backups before an erasure request arrives.',
    to: '/privacy-engineering/where-your-data-goes',
    action: 'Open the demo',
  },
  {
    title: 'DSR & Consent Analytics',
    label: 'Applied dashboard work',
    body: 'A case-study page for privacy request lifecycle analysis, consent metric semantics, and the dashboard decisions behind operational privacy reporting.',
    to: '/privacy-engineering/dsr-consent-analytics',
    action: 'View the analysis',
  },
];

const PrivacyEngineeringOverviewPage = () => (
  <div className={styles.overviewPage}>
    <section className={styles.overviewHero}>
      <div className={styles.overviewCopy}>
        <h2>Making privacy obligations operational.</h2>
        <p>
          My privacy engineering work sits between software systems, data analysis,
          compliance obligations, and the practical dashboards teams use to make decisions.
        </p>
      </div>
      <div className={styles.identityPanel} aria-label="Privacy engineering credential">
        <img
          src={privacyIcon}
          alt="Integrative Privacy logo"
          className={styles.privacyMark}
          loading="lazy"
          decoding="async"
        />
        <div>
          <span className={styles.identityKicker}>Current focus</span>
          <strong>Privacy Engineer at Integrative Privacy</strong>
          <span>Technical Privacy Engineering Certification, issued 2026.</span>
        </div>
      </div>
    </section>

    <section className={styles.caseStudyGrid} aria-label="Privacy engineering case studies">
      {caseStudies.map((study) => (
        <Link to={study.to} className={styles.caseStudyCard} key={study.title}>
          <span className={styles.cardLabel}>{study.label}</span>
          <h3>{study.title}</h3>
          <p>{study.body}</p>
          <span className={styles.cardAction}>{study.action}</span>
        </Link>
      ))}
    </section>

    <section className={styles.focusSection}>
      <div className={styles.sectionIntro}>
        <h2>What I want this work to show</h2>
        <p>
          Privacy engineering is not only policy awareness. It is the ability to
          model systems, handle messy operational constraints, and explain the
          result clearly enough for other teams to trust it.
        </p>
      </div>
      <div className={styles.focusGrid}>
        {focusAreas.map((area) => (
          <article className={styles.focusCard} key={area.title}>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
          </article>
        ))}
      </div>
    </section>

    <section className={styles.certificateBand}>
      <div>
        <h2>Credentialed foundation, applied through product work.</h2>
        <p>
          The certification supports the fundamentals. The case studies show how I
          apply those ideas through data models, dashboard semantics, and user-facing
          explanations.
        </p>
      </div>
      <img
        src={privacyCertificate}
        alt="Technical Privacy Engineering Certification for Nicholas Hamilton"
        className={styles.certificateImage}
        loading="lazy"
        decoding="async"
      />
    </section>
  </div>
);

export default PrivacyEngineeringOverviewPage;
