/*************************************************
 * Filename: resume_page.js
 *
 * Purpose: Resume page that renders an embedded view of the resume PDF, with
 * fallbacks to open the file in a new tab or download it (mobile browsers often
 * cannot render embedded PDFs inline).
 *
 * Connected Files:
 * - ResumePage.module.css: Styling for this component
 * - public/HamiltonNicholasResume.pdf: The embedded document
 * - Layout.js / header_component.js: Navigation entries linking here
 *************************************************/

import React from 'react';
import styles from './ResumePage.module.css';

const resumePDF = process.env.PUBLIC_URL + '/HamiltonNicholasResume.pdf';

const ResumePage = () => {
  return (
    <div className={styles.resumePage}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Resume</h1>
          <p className={styles.subtitle}>
            Thanks for viewing! Any feedback is always welcome! 
          </p>
        </div>

        <div className={styles.actions}>
          <a
            href={resumePDF}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
          >
            Open in new tab <span aria-hidden="true">↗</span>
          </a>
          <a
            href={resumePDF}
            download="Nicholas_Hamilton_Resume.pdf"
            className={styles.actionBtn}
          >
            Download PDF <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF viewer with graceful fallback */}
      <div className={styles.viewerFrame}>
        <object
          data={resumePDF}
          type="application/pdf"
          className={styles.viewer}
          aria-label="Nicholas Hamilton resume PDF"
        >
          <div className={styles.fallback}>
            <p>Your browser can't display the PDF inline.</p>
            <a
              href={resumePDF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actionBtn} ${styles.primaryBtn}`}
            >
              Open the resume <span aria-hidden="true">↗</span>
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

export default ResumePage;
