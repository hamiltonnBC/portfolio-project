import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const greetingTimer = setTimeout(() => setShowGreeting(true), 0);
    const nameTimer = setTimeout(() => setShowName(true), 500);
    const contentTimer = setTimeout(() => setShowContent(true), 1000);

    return () => {
      clearTimeout(greetingTimer);
      clearTimeout(nameTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.introduction}>
          {showGreeting && <p className={`${styles.greeting} ${styles.animatedGreeting}`}>Hello, my name is</p>}
          {showName && (
            <h1 className={styles.name}>
              <Link to="/" className={styles.nameLink}>
                Nicholas Hamilton
              </Link>
            </h1>
          )}
        </div>
        {showContent && (
          <div className={styles.content}>
            <p className={styles.title}>Software and Data Enthusiast</p>
            <nav className={styles.navigation}>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/projects">Projects</Link>
            </nav>
            <div className={styles.socialIcons}>
              <a href="https://github.com/hamiltonnBC" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/nicholas-trey-hamilton" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        )}
      </div>
      {showContent && (
        <div className={`${styles.rightPanel} ${styles.content}`}>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Layout;
