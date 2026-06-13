/*************************************************
 * Filename: header_component.js
 *
 * Purpose: Responsive mobile header with slide-out navigation drawer.
 * Only visible on mobile viewports.
 *************************************************/

import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './header_styles.module.css';

const resumePDF = process.env.PUBLIC_URL + '/HamiltonNicholasResume.pdf';

const MobileHeader = ({ theme, setTheme, isOpen, setIsOpen }) => {
  const location = useLocation();

  // Close drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          Nicholas Hamilton
        </NavLink>
      </div>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Navigation"
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>

      {/* Slide-out Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <nav className={styles.navMenu}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Projects
          </NavLink>
          <NavLink
            to="/certifications"
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Certifications
          </NavLink>
          {/* <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Contact
          </NavLink> */}
          <a href={resumePDF} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>

        {/* Theme Selectors inside Mobile Menu — temporarily hidden, keep for future use */}
        {/*
        <div className={styles.mobileThemeSection}>
          <p className={styles.sectionTitle}>Theme Accent</p>
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

        {/* Social Links inside Mobile Menu */}
        <div className={styles.mobileSocials}>
          <a href="https://github.com/hamiltonnBC" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/nicholas-trey-hamilton" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:hamiltonn428@gmail.com">
            Email
          </a>
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && <div className={styles.overlay} onClick={toggleMenu} />}
    </header>
  );
};

export default MobileHeader;
