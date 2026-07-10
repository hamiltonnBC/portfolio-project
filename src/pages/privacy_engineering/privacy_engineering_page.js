/*************************************************
 * Filename: privacy_engineering_page.js
 *
 * Purpose: Provides the parent Privacy Engineering section with route-based
 * sub-navigation for the portfolio's privacy-focused work.
 *
 * Project Role:
 * - Hosts the Privacy Engineering overview and case-study tabs
 * - Keeps privacy work separate from the general Projects page
 * - Renders nested routes through React Router's Outlet
 *
 * Connected Files:
 * - privacy_engineering_styles.module.css: Section and tab styling
 * - privacy_engineering_overview_page.js: Default overview content
 * - dsr_consent_analytics_page.js: DSR and consent analytics case study
 * - ../data_journey/data_journey_page.js: Interactive data-flow demo
 * - ../../router.js: Registers the nested privacy engineering routes
 *************************************************/

import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './privacy_engineering_styles.module.css';

const tabs = [
  {
    to: '/privacy-engineering',
    label: 'Overview',
    end: true,
  },
  {
    to: '/privacy-engineering/where-your-data-goes',
    label: 'Where does your data go?',
  },
  {
    to: '/privacy-engineering/dsr-consent-analytics',
    label: 'DSR & Consent Analytics',
  },
];

const PrivacyEngineeringPage = () => {
  const location = useLocation();
  const isStoryRoute = location.pathname.includes('/where-your-data-goes');

  return (
    <div className={`${styles.privacyPage} ${isStoryRoute ? styles.storyRoute : ''}`}>
      {!isStoryRoute && (
        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>Privacy Engineering Work</span>
          <h1>Privacy Engineering</h1>
          <p>
            Practical work that turns privacy obligations into maps, metrics, dashboards,
            and systems a team can operate.
          </p>
        </header>
      )}

      <nav className={styles.tabNav} aria-label="Privacy engineering sections">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) => (
              isActive ? `${styles.tabLink} ${styles.activeTab}` : styles.tabLink
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
};

export default PrivacyEngineeringPage;
