/*************************************************
 * Filename: home_page.js
 *
 * Purpose: Main landing page component that showcases professional experience,
 * skills, featured projects, and certifications. This component provides an
 * overview of the portfolio owner's background and accomplishments.
 *************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import styles from './home_styles.module.css';

// Image Imports
import personalHeadshot from '../../images/PERSONAL_HEADSHOT.png';
import whiteBereaLogo from '../../images/whiteBereaCollegeLogo.png';
import upCoverImage from '../../images/UP_Cover_Image.png';
import posterImage from '../../images/PosterImage.jpg';
import nextGenPoster from '../../images/nextGenPoster.jpeg';
import marimoodPoster from '../../images/marimood.png';

const HomePage = () => {
  const [activeImage, setActiveImage] = React.useState(null);
  const [activeTitle, setActiveTitle] = React.useState('');

  const openLightbox = (image, title) => {
    setActiveImage(image);
    setActiveTitle(title);
  };

  const closeLightbox = () => {
    setActiveImage(null);
    setActiveTitle('');
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
            {/* <span className={styles.badge}>Welcome to my Portfolio</span> */}
            <h1 className={styles.heroTitle}>Welcome to my Portfolio</h1>
            <p className={styles.heroSubtitle}>
              <a href="https://www.berea.edu/" target="_blank" rel="noopener noreferrer">Berea College</a> Graduate & Privacy Engineer at <a href="https://www.integrativeprivacy.com/" target="_blank" rel="noopener noreferrer">Integrative Privacy</a>.
            </p>
            <p className={styles.heroBio}>
              I build elegant full-stack web applications, conduct predictive data modeling, and leverage software engineering and machine learning to address complex real-world challenges.
            </p>
            <div className={styles.heroActions}>
              <Link to="/projects" className={styles.primaryAction}>
                View Projects
              </Link>
              <a href="mailto:hamiltonn428@gmail.com" className={styles.secondaryAction}>
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Technical Expertise</h2>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <div className={styles.skillHeader}>
              <div className={`${styles.skillIcon} ${styles.blue}`}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3>Privacy Engineering</h3>
            </div>
            <p>Evaluating data flow vulnerabilities, implementing privacy-by-design patterns, and automating code-level scanning for privacy compliance.</p>
            <ul className={styles.skillTags}>
              <li>Privacy-by-Design</li>
              <li>Data Minimization</li>
              <li>GDPR / CCPA Audit</li>
              <li>Privado AI</li>
            </ul>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillHeader}>
              <div className={`${styles.skillIcon} ${styles.purple}`}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.89 12.5L12 15.8l6.11-3.3L12 9.2l-6.11 3.3z"/>
                </svg>
              </div>
              <h3>Software Engineering</h3>
            </div>
            <p>Building scalable web architectures, API integration, and secure frontend/backend solutions using modern frameworks.</p>
            <ul className={styles.skillTags}>
              <li>React & Vue</li>
              <li>Node.js</li>
              <li>Python / Flask</li>
              <li>SQL / PostgreSQL</li>
            </ul>
          </div>

          <div className={styles.skillCard}>
            <div className={styles.skillHeader}>
              <div className={`${styles.skillIcon} ${styles.emerald}`}>
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3>Data Science & ML</h3>
            </div>
            <p>Creating predictive models, designing interactive data analytics dashboards, and processing high-dimensional datasets.</p>
            <ul className={styles.skillTags}>
              <li>R Shiny</li>
              <li>Machine Learning</li>
              <li>Regression & Stats</li>
              <li>Data Visualization</li>
            </ul>
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
          {/* Marimood Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper} onClick={() => openLightbox(marimoodPoster, "Marimood")}>
              <img
                src={marimoodPoster}
                alt="Marimood PWA"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardBadge}>Progressive Web App</span>
              <h3>Marimood</h3>
              <p>
                A full-stack, data-driven mood tracking Progressive Web App (PWA) featuring multi-variable regression with VIF collinearity detection, point-biserial correlation impact analysis, and real-time Recharts visualizations. Developed iteratively with ESM literature review, competitive analysis, and volunteer testing.
              </p>
              <div className={styles.cardTechTags}>
                <span>React & PWA</span>
                <span>Recharts</span>
                <span>Regression Analysis</span>
                <span>Heuristic Analysis</span>
              </div>
              <a
                href="https://marimood.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                Visit Marimood <span>→</span>
              </a>
            </div>
          </div>

          {/* NextGen Justice Legal Tech Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper} onClick={() => openLightbox(nextGenPoster, "Engineering a Full-Stack AI System for Legal Tech")}>
              <img
                src={nextGenPoster}
                alt="Engineering a Full-Stack AI System for Legal Tech"
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <span className={styles.cardBadge}>Full-Stack AI</span>
              <h3>Engineering a Full-Stack AI System for Legal Tech</h3>
              <p>
                Comprehensive AI-powered legal technology platform with modular RAG system, PostgreSQL with pgvector, React TypeScript frontend, and Docker containerization. Developed during NextGen Justice LLC internship to democratize access to legal representation.
              </p>
              <div className={styles.cardTechTags}>
                <span>AI & RAG</span>
                <span>React</span>
                <span>pgvector</span>
                <span>Docker</span>
              </div>
              <a
                href="https://www.lyralegal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                Visit LyraLegal <span>→</span>
              </a>
            </div>
          </div>

          {/* Food Insecurity Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper} onClick={() => openLightbox(posterImage, "Projecting Food Insecurity")}>
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

          {/* UP Initiative Project Card */}
          <div className={styles.featuredCard}>
            <div className={styles.cardImageWrapper} onClick={() => openLightbox(upCoverImage, "UP Initiative Database")}>
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
        </div>
      </section>

      {/* Graduate Highlight Section */}
      <section className={styles.graduateSection}>
        <a
          href="https://www.berea.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.graduateCard}
        >
          <img
            src={whiteBereaLogo}
            alt="Berea College Logo"
            className={styles.bereaLogo}
          />
          <div className={styles.graduateInfo}>
            <span className={styles.graduateTitle}>Berea College Graduate</span>
            <span className={styles.graduateDetails}>B.A. in Computer Science</span>
          </div>
        </a>
      </section>

      {/* Lightbox Modal */}
      {activeImage && ReactDOM.createPortal(
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox} aria-label="Close lightbox">
            &times;
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <a href={activeImage} target="_blank" rel="noopener noreferrer" title="Click to open image in new tab to zoom further">
              <img src={activeImage} alt={activeTitle} className={styles.lightboxImage} />
            </a>
            {activeTitle && (
              <div className={styles.lightboxFooter}>
                <span className={styles.lightboxTitle}>{activeTitle}</span>
                <a href={activeImage} target="_blank" rel="noopener noreferrer" className={styles.rawImageLink}>
                  Open raw image in new tab ↗
                </a>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default HomePage;