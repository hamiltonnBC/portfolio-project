/*************************************************
 * Filename: home_page.js
 *
 * Purpose: Main landing page component that showcases professional experience,
 * skills, featured projects, and certifications. This component provides an
 * overview of the portfolio owner's background and accomplishments.
 *************************************************/

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './home_styles.module.css';

// Image Imports
import personalHeadshot from '../../images/PERSONAL_HEADSHOT.png';
import bereaLogo from '../../images/BereaCollegeLogo.png';
import vtdspgLogo from '../../images/VTDSPGIntroduction.jpeg';
import upCoverImage from '../../images/UP_Cover_Image.png';
import posterImage from '../../images/PosterImage.jpg';

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroLayout}>
          <div className={styles.headshotWrapper}>
            <img
              src={personalHeadshot}
              alt="Nicholas Hamilton"
              className={styles.headshot}
            />
            <div className={styles.glowRing}></div>
          </div>
          <div className={styles.heroText}>
            <span className={styles.badge}>Welcome to my Portfolio</span>
            <h1 className={styles.heroTitle}>Nicholas Hamilton</h1>
            <p className={styles.heroSubtitle}>
              Computer Science Lead Teaching Assistant at{' '}
              <a
                href="https://www.berea.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Berea College
              </a>{' '}
              & Data Science Intern at{' '}
              <a
                href="https://aaec.vt.edu/academics/undergraduate/dspg.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Virginia Tech's DSPG Program
              </a>.
            </p>
            <p className={styles.heroBio}>
              I build elegant full-stack web applications, conduct predictive data modeling, and leverage software engineering and machine learning to address complex real-world challenges.
            </p>
            <div className={styles.heroActions}>
              <Link to="/projects" className={styles.primaryAction}>
                View Projects
              </Link>
              <Link to="/contact" className={styles.secondaryAction}>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Technical Expertise</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <h3>Languages</h3>
            <div className={styles.skillTags}>
              <span>Python</span>
              <span>R</span>
              <span>C++</span>
              <span>SQL</span>
              <span>JavaScript (ES6+)</span>
              <span>HTML5 / CSS3</span>
            </div>
          </div>
          
          <div className={styles.skillCard}>
            <h3>Frameworks & Systems</h3>
            <div className={styles.skillTags}>
              <span>React</span>
              <span>Vue.js</span>
              <span>Flask</span>
              <span>PostgreSQL</span>
              <span>CustomTkinter</span>
              <span>Node.js</span>
            </div>
          </div>
          
          <div className={styles.skillCard}>
            <h3>Specializations</h3>
            <div className={styles.skillTags}>
              <span>Machine Learning</span>
              <span>Data Analysis</span>
              <span>Time Series (ARIMA)</span>
              <span>Full-Stack Development</span>
              <span>Network Traffic Analysis</span>
              <span>Git & GitHub Workflows</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Work</h2>
          <Link to="/projects" className={styles.sectionLink}>
            See All Projects <span>→</span>
          </Link>
        </div>
        
        <div className={styles.featuredGrid}>
          {/* UP Initiative Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src={upCoverImage}
                alt="UP Initiative Cover"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardBadge}>Full-Stack App</span>
              <h3>UP Initiative Database</h3>
              <p>
                A Vue frontend and Python backend application with PostgreSQL for a local nonprofit initiative assisting Madison County's unhoused population.
              </p>
              <div className={styles.cardTechTags}>
                <span>Vue.js</span>
                <span>Flask</span>
                <span>PostgreSQL</span>
              </div>
              <a
                href="https://github.com/2024-databases-bereacollege/client-project-up-unhoused-persons-initiative-team"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                GitHub Repository <span>→</span>
              </a>
            </div>
          </div>

          {/* Food Insecurity Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src={posterImage}
                alt="Food Insecurity Poster"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardBadge}>Data Science & ML</span>
              <h3>Projecting Food Insecurity</h3>
              <p>
                An interactive Shiny dashboard written in R, employing machine learning to project food insecurity rates across the US to assist Feeding America's resource planning.
              </p>
              <div className={styles.cardTechTags}>
                <span>R Shiny</span>
                <span>Machine Learning</span>
                <span>Data Analysis</span>
              </div>
              <a
                href="https://virginiatechdatascienceforthepublicgood2024foodinsecurity.shinyapps.io/VTDSPGPFI/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                Launch Shiny Dashboard <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations Section */}
      <section className={styles.affiliationsSection}>
        <h3 className={styles.affiliationsTitle}>Institutional Affiliations</h3>
        <div className={styles.logosGrid}>
          <div className={styles.logoCard}>
            <img
              src={bereaLogo}
              alt="Berea College Logo"
              className={styles.logoBerea}
            />
          </div>
          <div className={styles.logoCard}>
            <img
              src={vtdspgLogo}
              alt="Virginia Tech DSPG Logo"
              className={styles.logoVT}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;