/*************************************************
 * Filename: home_page.js
 *
 * Purpose: Main landing page component that showcases professional experience,
 * skills, featured projects, and certifications. This component provides an
 * overview of the portfolio owner's background and accomplishments.
 *************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Link, useOutletContext } from 'react-router-dom';
import styles from './home_styles.module.css';

// Image Imports
import personalHeadshot from '../../images/PERSONAL_HEADSHOT.jpg';
import whiteBereaLogo from '../../images/whiteBereaCollegeLogo.png';
import upCoverImage from '../../images/UP_Cover_Image.jpg';
import posterImage from '../../images/PosterImage.jpg';
import nextGenPoster from '../../images/nextGenPoster.jpeg';
import marimoodPoster from '../../images/marimood.jpg';

const HomePage = () => {
  const { openMobileNav } = useOutletContext();
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
              decoding="async"
            />
            <div className={styles.glowRing}></div>
          </div>
          <div className={styles.heroText}>
            <span className={styles.eyebrow}>Software · Data · Privacy</span>
            <h1 className={styles.heroTitle}>Engineering for the public good.</h1>
            <p className={styles.heroSubtitle}>
              <a href="https://www.berea.edu/" target="_blank" rel="noopener noreferrer">Berea College</a> graduate and Privacy Engineer at <a href="https://www.integrativeprivacy.com/" target="_blank" rel="noopener noreferrer">Integrative Privacy</a>.
            </p>
            {/* <p className={styles.heroBio}>
              I build elegant full-stack web applications, conduct predictive data modeling, and leverage software engineering and machine learning to address complex real-world challenges.
            </p> */}
            <div className={styles.heroActions}>
              <Link to="/projects" className={styles.primaryAction}>
                View Projects
              </Link>
              {/* Get in Touch — temporarily hidden, keep for future use */}
              {/*
              <a href="mailto:hamiltonn428@gmail.com" className={styles.secondaryAction}>
                Get in Touch
              </a>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise Section */}
      <section className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Technical Expertise</h2>

        {/* Bar 1 — Languages, grouped by proficiency */}
        <div className={styles.skillBar}>
          <span className={styles.skillBarLabel}>Languages</span>
          <div className={styles.skillBarBody}>
            <div className={styles.skillGroup}>
              <span className={`${styles.skillTier} ${styles.tierProficient}`}>Proficient</span>
              <span className={styles.skillItem}>Python <em>(3 yrs)</em></span>
              <span className={styles.skillSeparator}>·</span>
              <span className={styles.skillItem}>SQL <em>(3 yrs)</em></span>
            </div>
            <div className={styles.skillGroup}>
              <span className={`${styles.skillTier} ${styles.tierIntermediate}`}>Intermediate</span>
              <span className={styles.skillItem}>JavaScript <em>(2 yrs)</em></span>
              <span className={styles.skillSeparator}>·</span>
              <span className={styles.skillItem}>TypeScript <em>(2 yrs)</em></span>
            </div>
            <div className={styles.skillGroup}>
              <span className={`${styles.skillTier} ${styles.tierBeginner}`}>Beginner</span>
              <span className={styles.skillItem}>C++ <em>(2 yrs)</em></span>
              <span className={styles.skillSeparator}>·</span>
              <span className={styles.skillItem}>Go <em>(1 yr)</em></span>
            </div>
          </div>
        </div>

        {/* Bar 2 — Software & tools */}
        <div className={styles.skillBar}>
          <span className={styles.skillBarLabel}>Software</span>
          <div className={styles.skillBarBody}>
            <div className={styles.skillGroup}>
              {[
                'Git',
                'FastAPI',
                'Flask',
                'Docker',
                'Ollama',
                'Langchain',
                'TensorFlow',
                'Nest.js',
                'React.js',
                'Bash',
                'Jupyter Notebook',
              ].map((tool, i, arr) => (
                <React.Fragment key={tool}>
                  <span className={styles.skillItem}>{tool}</span>
                  {i < arr.length - 1 && (
                    <span className={styles.skillSeparator}>·</span>
                  )}
                </React.Fragment>
              ))}
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
          {/* Marimood Project Card — wide feature */}
          <div className={`${styles.featuredCard} ${styles.featuredCardWide}`}>
            <div className={styles.cardImageWrapper} onClick={() => openLightbox(marimoodPoster, "Marimood")}>
              <img
                src={marimoodPoster}
                alt="Marimood PWA"
                className={styles.cardImage}
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
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
            loading="lazy"
            decoding="async"
          />
          <div className={styles.graduateInfo}>
            <span className={styles.graduateTitle}>Berea College Graduate</span>
            <span className={styles.graduateDetails}>B.A. in Computer Science</span>
          </div>
        </a>
      </section>

      {/* Mobile-only signifier that more pages exist — opens the nav drawer */}
      <section className={styles.morePagesSection}>
        <span className={styles.morePagesHint}>There's more to explore</span>
        <button
          type="button"
          className={styles.morePagesButton}
          onClick={openMobileNav}
        >
          View other pages
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </section>

      {/* Lightbox Modal */}
      {activeImage && ReactDOM.createPortal(
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox} aria-label="Close lightbox">
            &times;
          </button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <a href={activeImage} target="_blank" rel="noopener noreferrer" title="Click to open image in new tab to zoom further">
              <img src={activeImage} alt={activeTitle} className={styles.lightboxImage} decoding="async" />
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