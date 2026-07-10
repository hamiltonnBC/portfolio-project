/*************************************************
 * Filename: router.js
 *
 * Purpose: Centralizes routing configuration for the React application using
 * React Router v6. This component handles the mapping between URLs and page
 * components, maintaining the application's navigation structure.
 *
 * Project Role:
 * - Defines all application routes in one place
 * - Manages navigation between different pages
 * - Works in conjunction with the Layout component
 *
 * Connected Files:
 * - components/Layout.js: Main layout wrapper
 * - pages/home/home_page.js: Home page component
 * - pages/projects/projects_page.js: Projects page component
 * - pages/about/about_page.js: About page component
 *************************************************/

// External Dependencies
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Layout Component Import
import Layout from './components/Layout';

// Page Component Imports
import HomePage from './pages/home/home_page';
import ProjectsPage from './pages/projects/projects_page';
import AboutPage from './pages/about/about_page';
import CertificationsPage from './pages/certifications/certifications_page';
import ResumePage from './pages/resume/resume_page';
import DataJourneyPage from './pages/data_journey/data_journey_page';
import PrivacyEngineeringPage from './pages/privacy_engineering/privacy_engineering_page';
import PrivacyEngineeringOverviewPage from './pages/privacy_engineering/privacy_engineering_overview_page';
import DsrConsentAnalyticsPage from './pages/privacy_engineering/dsr_consent_analytics_page';
// import ContactForm from './components/contact_form/contact_form_component';

/**
 * Application Router Component
 *
 * Configures the application's routing structure using React Router v6.
 * All routes are wrapped in the Layout component to maintain consistent
 * site structure with the fixed left panel and dynamic right panel.
 *
 * Route Structure:
 * / (root)          -> HomePage
 * /projects         -> ProjectsPage
 * /about            -> AboutPage
 * /certifications   -> CertificationsPage
 * /privacy-engineering -> PrivacyEngineeringPage with nested case studies
 * /contact          -> ContactForm
 *
 * @returns {JSX.Element} The configured router component with all application routes
 */
function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Home Page - shown at root URL */}
                <Route index element={<HomePage />} />

                {/* Projects Page */}
                <Route path="projects" element={<ProjectsPage />} />

                {/* About Page */}
                <Route path="about" element={<AboutPage />} />

                {/* Certifications Page */}
                <Route path="certifications" element={<CertificationsPage />} />

                {/* Resume Page */}
                <Route path="resume" element={<ResumePage />} />

                {/* Privacy Engineering Section */}
                <Route path="privacy-engineering" element={<PrivacyEngineeringPage />}>
                    <Route index element={<PrivacyEngineeringOverviewPage />} />
                    <Route path="where-your-data-goes" element={<DataJourneyPage />} />
                    <Route path="dsr-consent-analytics" element={<DsrConsentAnalyticsPage />} />
                </Route>

                {/* Legacy data journey URL */}
                <Route
                    path="where-your-data-goes"
                    element={<Navigate to="/privacy-engineering/where-your-data-goes" replace />}
                />

                {/* Contact Page */}
                {/* <Route path="contact" element={<ContactForm />} /> */}
            </Route>
        </Routes>
    );
}

// Export the router component
export default AppRouter;
