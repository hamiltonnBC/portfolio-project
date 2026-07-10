/*************************************************
 * Filename: dsr_consent_analytics_page.js
 *
 * Purpose: Presents a sanitized privacy analytics case study focused on data
 * subject request operations and consent-management measurement.
 *
 * Project Role:
 * - Adds a second Privacy Engineering subpage beyond the data-flow demo
 * - Shows applied dashboard and analysis work without exposing client data
 * - Explains DSR and consent analytics in recruiter-friendly language
 *
 * Connected Files:
 * - privacy_engineering_page.js: Parent section shell and tabs
 * - privacy_engineering_styles.module.css: Case-study styling
 * - ../../router.js: Registers this route under /privacy-engineering
 *************************************************/

import React, { useEffect } from 'react';
import styles from './privacy_engineering_styles.module.css';
import heatmapImage from '../../images/selectedenhanced_fi_rate_heatmap_selected_areas.png';

const requestMetrics = [
  ['Completed requests', 'Which requests reached the organization-defined completed state.'],
  ['Active requests', 'Which requests still need operational attention.'],
  ['Average completion time', 'How long request work takes when measured against the same completed-row logic.'],
];

const consentMetrics = [
  ['Consent changes', 'Change events, such as an opt-in or opt-out action.'],
  ['Site sessions', 'Observed session volume by consent regime.'],
  ['Initial session consent', 'Purpose-level session status compared with the default posture.'],
];

const workflowPoints = [
  'Separate DSR-classified requests from preference-classified request types so mixed dashboards stay honest.',
  'Keep lifecycle cards grouped as completed, active, and average-time sets instead of scattering related numbers.',
  'Use weighted aggregation for pre-aggregated consent rows so large and small segments do not count equally by accident.',
  'Attach plain-language explanations to metrics so a dashboard can answer what the number means, not only display it.',
];

const DsrConsentAnalyticsPage = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'DSR & Consent Analytics | Privacy Engineering';
    return () => { document.title = previous; };
  }, []);

  return (
    <div className={styles.analyticsPage}>
      <section className={styles.analyticsHero}>
        <div>
          <span className={styles.eyebrow}>Applied dashboard work</span>
          <h2>DSR & Consent Analytics</h2>
          <p>
            A sanitized look at the kind of privacy-dashboard analysis I work on:
            request lifecycle metrics, consent event semantics, and the data-model
            choices that keep privacy reporting explainable.
          </p>
        </div>
        <div className={styles.metricSnapshot} aria-label="Privacy analytics summary">
          <span>Focus</span>
          <strong>Operational privacy reporting</strong>
          <p>Data rights requests, consent sessions, lifecycle grouping, and metric definitions.</p>
        </div>
      </section>

      <section className={styles.analysisSplit}>
        <article className={styles.analysisPanel}>
          <span className={styles.cardLabel}>Data Subject Requests</span>
          <h3>Request lifecycle analysis</h3>
          <p>
            DSR work starts with the practical question: which requests are done,
            which are still open, and how long does completion actually take?
          </p>
          <div className={styles.metricList}>
            {requestMetrics.map(([name, body]) => (
              <div className={styles.metricRow} key={name}>
                <strong>{name}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.analysisPanel}>
          <span className={styles.cardLabel}>Consent Management</span>
          <h3>Consent metric semantics</h3>
          <p>
            Consent analytics need careful language because events, sessions, and
            defaults answer different questions. The dashboard should not imply
            more certainty than the source data supports.
          </p>
          <div className={styles.metricList}>
            {consentMetrics.map(([name, body]) => (
              <div className={styles.metricRow} key={name}>
                <strong>{name}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.visualEvidence}>
        <div className={styles.sectionIntro}>
          <h2>From raw reporting to readable evidence</h2>
          <p>
            The useful part is not just drawing a chart. It is knowing which unit
            is being counted, which source produced it, and whether the display
            helps a privacy team take the next action.
          </p>
        </div>
        <figure className={styles.heatmapFigure}>
          <img
            src={heatmapImage}
            alt="Example heatmap visualization from data analysis work"
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            Example of translating time-series and segment data into a quick-read
            visual. Privacy dashboards need the same discipline: the chart should
            reveal the operational question.
          </figcaption>
        </figure>
      </section>

      <section className={styles.workflowSection}>
        <div className={styles.sectionIntro}>
          <h2>Engineering considerations I worked through</h2>
          <p>
            This page is intentionally sanitized, but these are the kinds of
            decisions behind the work.
          </p>
        </div>
        <div className={styles.workflowList}>
          {workflowPoints.map((point) => (
            <article className={styles.workflowItem} key={point}>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DsrConsentAnalyticsPage;
