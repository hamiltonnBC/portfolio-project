import React, { useEffect, useRef } from 'react';
import styles from './AboutPage.module.css';
import codingPhoto from '/Users/hamiltonn/portfolio-project/src/images/CodingPhoto.png';
import coverImage from '/Users/hamiltonn/portfolio-project/src/images/UP_Cover_Image.png';
import bereaCoverPhoto from '/Users/hamiltonn/portfolio-project/src/images/BereaCoverPhoto.jpeg';
//import bereaGroupPhoto from '/Users/hamiltonn/portfolio-project/src/images/BereaGroupPhoto.jpg';
import vtdsCohort from '/Users/hamiltonn/portfolio-project/src/images/VTDSPG_Cohort.png';

const AboutPage = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <section ref={el => sectionRefs.current[0] = el} className={styles.section}>
        <h2>About Me</h2>
        <p>Hello! I'm Nicholas, a Computer Science student and Teaching Assistant with a passion for leveraging technology to address societal challenges. My journey in tech is driven by a desire to make a positive impact on the world.</p>
      </section>

      <section ref={el => sectionRefs.current[1] = el} className={`${styles.section} ${styles.imageSection}`}>
        <img src={codingPhoto} alt="Nicholas coding" className={styles.sectionImage} />
        <p>My academic path has equipped me with a strong foundation in Python, C++, R and SQL. But beyond just coding, I'm fascinated by how these tools can be applied to real-world problems.</p>
      </section>

      <section ref={el => sectionRefs.current[2] = el} className={`${styles.section} ${styles.teachingSection}`}>
  <h3>Teaching and Mentoring</h3>
  <div className={styles.teachingContent}>
    <div className={styles.teachingText}>
      <p>As a Teaching Assistant and Manager in the Computer Science Department, I've discovered my passion for education. I've had the opportunity to develop curricula, mentor fellow students, and manage educational programs. These experiences have not only deepened my technical knowledge but also honed my communication and leadership skills.</p>
    </div>
    {/* <img src={bereaGroupPhoto} alt="Berea group photo" className={styles.smallImage} /> */}
  </div>
  <img src={bereaCoverPhoto} alt="Berea cover photo" className={styles.fullWidthImage} />
</section>

<section ref={el => sectionRefs.current[3] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
  <div className={styles.nonprofitContent}>
    <h3>Nonprofit Initiative</h3>
    <p>One of my most rewarding experiences has been applying my skills to support a local nonprofit initiative. I developed a full-stack application using Vue.js, Flask, and PostgreSQL, which reinforced my belief in technology's power to drive positive change in communities.</p>
  </div>
  <img src={coverImage} alt="app cover photo" className={styles.sectionImage} />
</section>


      <section ref={el => sectionRefs.current[4] = el} className={styles.section}>
        <h3>Data Science Journey</h3>
        <p>My recent role as a Data Science Intern at Virginia Tech's Data Science for the Public Good program has been a turning point in my career. This experience has deepened my expertise in machine learning, predictive modeling, and time series analysis using R. I've had the opportunity to work on impactful projects, such as analyzing food insecurity trends and developing forecasting models.</p>
      </section>

      <section ref={el => sectionRefs.current[5] = el} className={`${styles.section} ${styles.imageSection}`}>
      <img src={vtdsCohort} alt="Virginia Tech Cohort" className={styles.sectionImage} />
        <p>Working with real-world data to address societal issues has been incredibly fulfilling. It's shown me the tangible impact that data-driven approaches can have on understanding and addressing complex social problems.</p>
      </section>

      <section ref={el => sectionRefs.current[6] = el} className={styles.section}>
        <h3>Interdisciplinary Passion</h3>
        <p>What truly excites me is the intersection of computer science, data analysis, and sociology. I believe that by combining these disciplines, we can gain deeper insights into societal issues and develop more effective solutions. Whether it's through research, tech development, or data science, I'm committed to using my skills to drive positive change.</p>
      </section>

      {/* <section ref={el => sectionRefs.current[7] = el} className={`${styles.section} ${styles.imageSection}`}>
        <p>Looking ahead, I'm eager to pursue opportunities that allow me to merge my technical skills with my passion for social impact. I'm particularly interested in projects or roles that use technology and data to illuminate societal issues and create meaningful change.</p>
        <div className={styles.imagePlaceholder}>Image: Future goals</div>
      </section> */}

      <section ref={el => sectionRefs.current[8] = el} className={styles.section}>
        <h3>Let's Connect</h3>
        <p>I'm always excited to connect with like-minded individuals who share my passion for technology and social impact. Whether you're interested in collaboration, have questions about my work, or just want to chat about the latest in tech and data science, feel free to reach out. Let's explore how we can use technology to make a difference!</p>
      </section>
    </div>
  );
};

export default AboutPage;
