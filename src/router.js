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
import { Route, Routes } from 'react-router-dom';

// Layout Component Import
import Layout from './components/Layout';

// Page Component Imports
import HomePage from './pages/home/home_page';
import ProjectsPage from './pages/projects/projects_page';
import AboutPage from './pages/about/about_page';

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
 * /about           -> AboutPage
 *
 * @returns {JSX.Element} The configured router component with all application routes
 */
function AppRouter() {
    return (
        <Routes>
            {/*
        Main Layout Route:
        All child routes will be rendered within the Layout component
      */}
            <Route path="/" element={<Layout />}>
                {/* Home Page - shown at root URL */}
                <Route index element={<HomePage />} />

                {/* Projects Page */}
                <Route path="projects" element={<ProjectsPage />} />

                {/* About Page */}
                <Route path="about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
}

// Export the router component
export default AppRouter;