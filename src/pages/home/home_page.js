import React from 'react';
import styles from './home_styles.module.css';
import personalHeadshot from '/Users/hamiltonn/portfolio-project/src/images/PERSONAL_HEADSHOT.png';
import bereaLogo from '/Users/hamiltonn/portfolio-project/src/images/BereaCollegeLogo.png';
import vtdspgLogo from '/Users/hamiltonn/portfolio-project/src/images/VTDSPGIntroduction.jpeg';
import upCoverImage from '/Users/hamiltonn/portfolio-project/src/images/UP_Cover_Image.png';
import posterImage from '/Users/hamiltonn/portfolio-project/src/images/PosterImage.jpg';
import dataLiteracyCertification from '/Users/hamiltonn/portfolio-project/src/images/DataLitCert.png';

const HomePage = () => {
  return (
    <div className={styles.rightPanel}>
      <section className={styles.introSection}>
        <img src={personalHeadshot} alt="Nicholas Hamilton" className={styles.headshot} />
        <div className={styles.introText}>
          <ul>
            <li>Computer Science Lead Teaching Assistant at <a href="https://www.berea.edu/" target="_blank" rel="noopener noreferrer">Berea College</a></li>
            <li>Data Science Intern at <a href="https://aaec.vt.edu/academics/undergraduate/dspg.html" target="_blank" rel="noopener noreferrer">Virginia Tech's DSPG program</a></li>
          </ul>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <h2>Skills</h2>
        <p>Python, R, C++, SQL, Flask, Machine Learning, Data Analysis, Time Series Forecasting (ARIMA), Full-Stack Development.</p>
        <p>Experience with Vue and React frameworks.</p>
      </section>

      <section className={styles.projectsSection}>
        <h2>Featured Projects</h2>
        <div className={styles.projectsContainer}>
          <div className={styles.projectCard}>
            <h3>Full Stack Database Application for UP Initiative</h3>
            <p>Vue frontend and Python backend application with PostgreSQL for a local nonprofit initiative assisting the houseless population in Madison County, KY</p>
            <a href="https://github.com/2024-databases-bereacollege/client-project-up-unhoused-persons-initiative-team" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>GitHub</a>
            <img src={upCoverImage} alt="UP Initiative Cover" className={styles.projectImage} />
          </div>
          <div className={styles.projectCard}>
            <h3>Projecting Food Insecurity</h3>
            <p>Shiny App written primarily in R, using Machine Learning to project future levels of food insecurity across the Continental United States to assist Feeding America in grant funding and resource management</p>
            <a href="https://virginiatechdatascienceforthepublicgood2024foodinsecurity.shinyapps.io/VTDSPGPFI/" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Website</a>
            <img src={posterImage} alt="Food Insecurity Poster" className={styles.projectImage} />
          </div>
        </div>
      </section>

      <section className={styles.certificationsSection}>
        <h2>Certifications</h2>
        <div className={styles.certificationCard}>
          <h3>Data Literacy Certification</h3>
          <img src={dataLiteracyCertification} alt="Data Literacy Certification" className={styles.certificationImage} />
          <p>Certification in Data Literacy, demonstrating proficiency in understanding and interpreting data.</p>
        </div>
      </section>
      
      <section className={styles.logosSection}>
        <img src={bereaLogo} alt="Berea College Logo" className={styles.logo} />
        <img src={vtdspgLogo} alt="Virginia Tech DSPG Logo" className={styles.logovt} />
      </section>
    </div>
  );
};

export default HomePage;
