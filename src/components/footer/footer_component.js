/*************************************************
 * Filename: footer_component.js
 *
 * Purpose: A responsive footer component with social links, copyright,
 * and a status indicator.
 *************************************************/

import React from 'react';
import styles from './footer_styles.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.status}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>Open to exciting new opportunities</span>
        </div>

        <div className={styles.copyright}>
          &copy; {currentYear} Nicholas Hamilton. Built with React.
        </div>

        <div className={styles.socials}>
          <a
            href="https://github.com/hamiltonnBC"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nicholas-trey-hamilton"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:hamiltonn428@gmail.com">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
