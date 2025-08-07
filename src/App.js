/*************************************************
 * Filename: App.js
 *
 * Purpose: Root component of the React application that handles the main routing
 * configuration and application structure. This file serves as the primary
 * entry point for the application's component hierarchy.
 *
 * Project Role:
 * - Provides the base Router setup for the application
 * - Manages the main route configuration
 * - Establishes the layout structure using the Layout component
 *
 * Connected Files:
 * - components/Layout.js: The main layout wrapper component
 * - pages/home/home_page.js: Home page component
 * - pages/projects/projects_page.js: Projects showcase page
 * - pages/about/about_page.js: About page component
 *
 * URL Structure:
 * / (root)          -> Displays HomePage within Layout
 * /projects         -> Displays ProjectsPage within Layout
 * /about           -> Displays AboutPage within Layout
 *************************************************/

// External Dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Component Imports
import Layout from './components/Layout';
import HomePage from './pages/home/home_page';
import ProjectsPage from './pages/projects/projects_page';
import AboutPage from './pages/about/about_page';
import CertificationsPage from './pages/certifications/certifications_page';

/**
 * Main Application Component
 *
 * This component is the root of your React application. It sets up the routing
 * configuration and ensures all pages are wrapped in the Layout component
 * for consistent navigation and structure.
 *
 * The Layout component provides:
 * - Left panel with navigation
 * - Right panel for page content
 * - Consistent styling and structure
 *
 * @returns {JSX.Element} The root application component with routing configuration
 */
function App() {
    return (
        // BrowserRouter (aliased as Router) enables routing functionality
        <Router>
            {/* Routes component handles route matching and rendering */}
            <Routes>
                {/*
          Main Layout Route
          - All routes are nested within Layout for consistent structure
          - Layout handles the fixed left panel and dynamic right panel
        */}
                <Route path="/" element={<Layout />}>
                    {/*
            Home Page Route
            - Matches the root URL "/"
            - 'index' prop means this is the default route
          */}
                    <Route index element={<HomePage />} />

                    {/*
            Projects Page Route
            - Matches "/projects"
            - Displays portfolio projects
          */}
                    <Route path="projects" element={<ProjectsPage />} />

                    {/*
            About Page Route
            - Matches "/about"
            - Displays personal information and background
          */}
                    <Route path="about" element={<AboutPage />} />

                    {/*
            Certifications Page Route
            - Matches "/certifications"
            - Displays certifications and publications
          */}
                    <Route path="certifications" element={<CertificationsPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

// Export the App component as the default export
export default App;