import React from 'react';
//import { Link } from 'react-router-dom';
import styles from './home_styles.module.css';

const HomePage = () => {
  return (
    <div className={styles.rightPanel}>
      <section className={styles.aboutSection}>
        <h2>Skills</h2>
        <p>Python, C++, SQL, Vue.js, Flask, Machine Learning, Data Analysis, Time Series Forecasting (ARIMA), Full-Stack Development.</p>
      </section>
      <section className={styles.projectsSection}>
        <h2>Projects</h2>
        <div className={styles.projectCard}>
          <h3>Project 1</h3>
          <p>Brief description of Project 1</p>
        </div>
        <div className={styles.projectCard}>
          <h3>Project 2</h3>
          <p>Brief description of Project 2</p>
        </div>
      </section>
      <section className={styles.experienceSection}>
        <h2>Experience</h2>
        <div className={styles.experienceItem}>
          <h3>Company Name</h3>
          <p>Your Role | Date Range</p>
          <p>Brief description of your responsibilities and achievements</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
