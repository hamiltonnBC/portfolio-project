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
import { BrowserRouter as Router } from 'react-router-dom';

// Router Component Import
import AppRouter from './router';

/**
 * Main Application Component
 *
 * This component is the root of the React application. It wraps the central AppRouter
 * with the BrowserRouter component to enable clean routing.
 *
 * @returns {JSX.Element} The root application component
 */
function App() {
    return (
        <Router>
            <AppRouter />
        </Router>
    );
}

// Export the App component as the default export
export default App;