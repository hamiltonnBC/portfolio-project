/*************************************************
 * Filename: index.js
 *
 * Purpose: Entry point for the React application. This file initializes the React
 * application, mounts it to the DOM, and sets up the strict mode for development.
 *
 * Project Role:
 * - Serves as the main entry point for the application
 * - Renders the root App component into the DOM
 * - Imports global styles
 * - Provides debugging information through console logs
 *
 * Connected Files:
 * - App.js: Main application component
 * - index.css: Base styling for HTML elements
 * - global.css: Global layout and color scheme
 *************************************************/

// External Dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';

// Style Imports
import './index.css';

// Component Imports
import App from './App';

// Log environment variables for debugging purposes
console.log('Public URL:', process.env.PUBLIC_URL);
console.log('Node Env:', process.env.NODE_ENV);

/**
 * Root Render Function
 *
 * Mounts the application to the DOM element with id 'root'.
 * Uses StrictMode for additional development checks and warnings.
 */
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Confirmation log for debugging
console.log('Index.js is running');