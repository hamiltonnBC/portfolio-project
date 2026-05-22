/*************************************************
 * Filename: Layout.js
 *
 * Purpose: Main layout component that provides the two-panel structure for the
 * portfolio website. It includes an animated introduction, navigation menu,
 * and social links in the left panel, with dynamic content in the right panel.
 *
 * Project Role:
 * - Serves as the main wrapper component for all pages
 * - Manages the animated introduction sequence
 * - Handles the display of contact information
 * - Provides consistent navigation across the site
 *
 * Connected Files:
 * - Layout.module.css: Styling for the layout component
 * - App.js: Where this layout is implemented as the main wrapper
 * - All page components that are rendered in the right panel
 *************************************************/

// External Dependencies
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

// Style Imports
import styles from './Layout.module.css';

// Components Imports
import MobileHeader from './header/header_component';
import Footer from './footer/footer_component';

// Environment Variables and Constants
const resumePDF = process.env.PUBLIC_URL + '/HamiltonNicholasResume.pdf';

/**
 * Main Layout Component
 *
 * Creates a two-panel layout with an animated introduction and navigation
 * in the left panel, and dynamic content in the right panel.
 *
 * Features:
 * - Dynamic Theme Accent Switching (Cyberpunk, Emerald, Sapphire)
 * - Mouse-following radial accent glow
 * - Slide-out drawer Mobile Navigation
 * - Glassmorphic layouts and shimmering gradients
 *
 * @returns {JSX.Element} The main layout structure of the application
 */
const Layout = () => {
  // State Management for Themes and Toggleable Elements
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'sapphire');
  const [showEmail, setShowEmail] = useState(false);
  
  // Animation states for progressive loading
  const [showGreeting, setShowGreeting] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const containerRef = useRef(null);
  const rightPanelRef = useRef(null);
  const location = useLocation();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Reset scroll position to the top whenever the route changes.
  // Different elements scroll on different breakpoints:
  //  - Desktop (>768px): the inner `.rightPanel` div is the scroll container.
  //  - Mobile (<=768px): `body` and/or `documentElement` is the scroll container,
  //    depending on the browser's `scrollingElement` choice.
  // Reset all of them and use useLayoutEffect so it runs before paint to avoid
  // a visible flash of mid-page content.
  useLayoutEffect(() => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = 0;
      rightPanelRef.current.scrollLeft = 0;
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    if (typeof document !== 'undefined') {
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
    }
  }, [location.pathname]);

  // Track mouse coordinates for background radial glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        containerRef.current.style.setProperty('--mouse-x', `${x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Staggered loading animation
  useEffect(() => {
    const greetingTimer = setTimeout(() => setShowGreeting(true), 100);
    const nameTimer = setTimeout(() => setShowName(true), 400);
    const contentTimer = setTimeout(() => setShowContent(true), 700);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(nameTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const toggleEmail = (e) => {
    e.preventDefault();
    setShowEmail(!showEmail);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Interactive Background Glow */}
      <div className={styles.mouseGlow} />

      {/* Responsive Mobile Header */}
      <MobileHeader theme={theme} setTheme={setTheme} />

      {/* Left Panel - Fixed Navigation and Introduction (Desktop) */}
      <div className={styles.leftPanel}>
        <div className={styles.panelGlassCard}>
          {/* Animated Introduction Section */}
          <div className={styles.introduction}>
            {showGreeting && (
              <p className={`${styles.greeting} ${styles.animateFadeIn}`}>
                Hello, my name is
              </p>
            )}

            {showName && (
              <h1 className={`${styles.name} ${styles.animateFadeIn}`}>
                <Link to="/" className={styles.nameLink}>
                  Nicholas Hamilton
                </Link>
              </h1>
            )}
          </div>

          {/* Main Navigation and Controls */}
          {showContent && (
            <div className={`${styles.content} ${styles.animateFadeIn}`}>
              <p className={styles.title}>Software and Data Enthusiast</p>

              {/* Navigation Menu */}
              <nav className={styles.navigation}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.activeNavLink : ''} end>
                  Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeNavLink : ''}>
                  About
                </NavLink>
                <NavLink to="/projects" className={({ isActive }) => isActive ? styles.activeNavLink : ''}>
                  Projects
                </NavLink>
                <NavLink to="/certifications" className={({ isActive }) => isActive ? styles.activeNavLink : ''}>
                  Certifications
                </NavLink>
                {/* <NavLink to="/contact" className={({ isActive }) => isActive ? styles.activeNavLink : ''}>
                  Contact
                </NavLink> */}
                <a href={resumePDF} target="_blank" rel="noopener noreferrer" className={styles.resumeBtn}>
                  Resume
                </a>
              </nav>

              {/* Social Media Section */}
              <div className={styles.socialIcons}>
                <a href="https://github.com/hamiltonnBC" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/nicholas-trey-hamilton" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <button onClick={toggleEmail} className={styles.socialBtn} title="Show Email">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                  </svg>
                </button>
              </div>

              {/* Toggleable Email Display */}
              {showEmail && (
                <p className={styles.emailDisplay}>hamiltonn428@gmail.com</p>
              )}

              {/* Theme Selector Widget — temporarily hidden, keep for future use */}
              {/*
              <div className={styles.themeSection}>
                <span className={styles.themeLabel}>Theme Accent</span>
                <div className={styles.themeSelector}>
                  <button
                    className={`${styles.themeDot} ${styles.sapphireDot} ${theme === 'sapphire' ? styles.activeDot : ''}`}
                    onClick={() => setTheme('sapphire')}
                    title="Sapphire Theme"
                  />
                  <button
                    className={`${styles.themeDot} ${styles.emeraldDot} ${theme === 'emerald' ? styles.activeDot : ''}`}
                    onClick={() => setTheme('emerald')}
                    title="Emerald Theme"
                  />
                  <button
                    className={`${styles.themeDot} ${styles.cyberpunkDot} ${theme === 'cyberpunk' ? styles.activeDot : ''}`}
                    onClick={() => setTheme('cyberpunk')}
                    title="Cyberpunk Theme"
                  />
                </div>
              </div>
              */}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Dynamic Content */}
      <div ref={rightPanelRef} className={styles.rightPanel}>
        <main className={styles.rightPanelContent}>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;