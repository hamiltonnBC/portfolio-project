/*************************************************
 * Filename: about_page.js
 *
 * Purpose: About page component that provides a detailed personal introduction
 * with animated sections using Intersection Observer. The page includes multiple
 * sections about background, experience, and interests with supporting images.
 *
 * Project Role:
 * - Serves as the main About page in the portfolio
 * - Implements scroll-based animations
 * - Displays professional background and experiences
 * - Manages image content and layout
 *
 * Connected Files:
 * - AboutPage.module.css: Styling for this component
 * - Multiple image files in the images directory
 * - Layout.js: Parent component that renders this page
 *************************************************/

// External Dependencies
import React, { useEffect, useRef } from 'react';

// Styles Import
import styles from './AboutPage.module.css';

// Image Imports
import codingPhoto from '../../images/CodingPhoto.jpeg';
import coverImage from '../../images/UP_Cover_Image.png';
import bereaCoverPhoto from '../../images/BereaCoverPhoto.jpeg';
import vtdsCohort from '../../images/VTDSPG_Cohort.png';

/**
 * About Page Component
 *
 * Renders a multi-section about page with scroll-based animations using
 * Intersection Observer. Each section becomes visible as it enters the viewport.
 *
 * Features:
 * - Animated section reveals on scroll
 * - Multiple content sections with images
 * - Professional background information
 * - Teaching and research experience
 *
 * @returns {JSX.Element} The About page component
 */
const AboutPage = () => {
    // Ref array to store references to all animated sections
    const sectionRefs = useRef([]);

    /**
     * Intersection Observer Effect
     *
     * Sets up an observer to watch for sections entering the viewport.
     * When a section becomes visible, it adds a CSS class to trigger the animation.
     */
    useEffect(() => {
        // Configuration for the Intersection Observer
        const observerOptions = {
            root: null,          // Use viewport as root
            rootMargin: '0px',   // No margin
            threshold: 0.1       // Trigger when 10% of element is visible
        };

        // Callback function when intersection changes
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles.visible);
                }
            });
        };

        // Create and setup the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Start observing all section references
        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        // Cleanup function to remove observers
        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []); // Empty dependency array - only run on mount

    return (
        <div className={styles.aboutContainer}>
            {/* Introduction Section */}
            <section ref={el => sectionRefs.current[0] = el} className={styles.section}>
                <h2>About Me</h2>
                <p>Hello! I'm Nicholas, a Computer Science student and Teaching Assistant with a passion for leveraging technology to address societal challenges. My journey in tech is driven by a desire to make a positive impact on the world.</p>
            </section>

            {/* Technical Background Section */}
            <section ref={el => sectionRefs.current[1] = el} className={`${styles.section} ${styles.imageSection}`}>
                <img src={codingPhoto} alt="Nicholas coding" className={styles.sectionImage} />
                <p>My academic path has equipped me with a strong foundation in Python, C++, R and SQL. But beyond just coding, I'm fascinated by how these tools can be applied to real-world problems.</p>
            </section>

            {/* Teaching Experience Section */}
            <section ref={el => sectionRefs.current[2] = el} className={`${styles.section} ${styles.teachingSection}`}>
                <h3>Teaching and Mentoring</h3>
                <div className={styles.teachingContent}>
                    <div className={styles.teachingText}>
                        <p>As a Teaching Assistant and Manager in the Computer Science Department, I've discovered my passion for education. I've had the opportunity to develop curricula, mentor fellow students, and manage educational programs. These experiences have not only deepened my technical knowledge but also honed my communication and leadership skills.</p>
                    </div>
                </div>
                <img src={bereaCoverPhoto} alt="Berea cover photo" className={styles.fullWidthImage} />
            </section>

            {/* Nonprofit Work Section */}
            <section ref={el => sectionRefs.current[3] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <div className={styles.nonprofitContent}>
                    <h3>Nonprofit Initiative</h3>
                    <p>One of my most rewarding experiences has been applying my skills to support a local nonprofit initiative. I developed a full-stack application using Vue.js, Flask, and PostgreSQL, which reinforced my belief in technology's power to drive positive change in communities.</p>
                </div>
                <img src={coverImage} alt="app cover photo" className={styles.sectionImage} />
            </section>

            {/* Data Science Experience Section */}
            <section ref={el => sectionRefs.current[4] = el} className={styles.section}>
                <h3>Data Science Journey</h3>
                <p>My recent role as a Data Science Intern at Virginia Tech's Data Science for the Public Good program has been a turning point in my career. This experience has deepened my expertise in machine learning, predictive modeling, and time series analysis using R. I've had the opportunity to work on impactful projects, such as analyzing food insecurity trends and developing forecasting models.</p>
            </section>

            {/* Data Science Impact Section */}
            <section ref={el => sectionRefs.current[5] = el} className={`${styles.section} ${styles.imageSection}`}>
                <img src={vtdsCohort} alt="Virginia Tech Cohort" className={styles.sectionImage} />
                <p>Working with real-world data to address societal issues has been incredibly fulfilling. It's shown me the tangible impact that data-driven approaches can have on understanding and addressing complex social problems.</p>
            </section>

            {/* Interdisciplinary Focus Section */}
            <section ref={el => sectionRefs.current[6] = el} className={styles.section}>
                <h3>Interdisciplinary Passion</h3>
                <p>What truly excites me is the intersection of computer science, data analysis, and sociology. I believe that by combining these disciplines, we can gain deeper insights into societal issues and develop more effective solutions. Whether it's through research, tech development, or data science, I'm committed to using my skills to drive positive change.</p>
            </section>

            {/* Contact Section */}
            <section ref={el => sectionRefs.current[8] = el} className={styles.section}>
                <h3>Let's Connect</h3>
                <p>I'm always excited to connect with like-minded individuals who share my passion for technology and social impact. Whether you're interested in collaboration, have questions about my work, or just want to chat about the latest in tech and data science, feel free to reach out. Let's explore how we can use technology to make a difference!</p>
            </section>
        </div>
    );
};

export default AboutPage;