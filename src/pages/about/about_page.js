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
import nextGenImage from '../../images/ngj2.jpeg';
import mahidolImage from '../../images/Mahidol.png';
import privacyIcon from '../../images/05_ICON_FOREST.png';

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
 * - Privacy engineering and study abroad history
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

        // Copy ref current to local variable for cleanup safety
        const currentSections = sectionRefs.current;

        // Start observing all section references
        currentSections.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        // Cleanup function to remove observers
        return () => {
            currentSections.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []); // Empty dependency array - only run on mount

    return (
        <div className={styles.aboutContainer}>
            {/* Introduction Section */}
            <section ref={el => sectionRefs.current[0] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <div className={styles.nonprofitContent}>
                    <h2>About Me</h2>
                    <p>
                        Hello, I am Nicholas. As a software developer, data researcher, and privacy engineer, I build applications that sit at the intersection of complex data systems, artificial intelligence, and user security. I am currently pursuing my degree in Computer Science at Berea College, with an academic and professional path shaped by experiences ranging from leading teaching assistant cohorts in Kentucky to studying advanced data engineering in Thailand.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        My approach to technology is defined by a commitment to solving practical, real-world problems. Whether building full-stack platforms for legal professionals or analyzing public health datasets, I focus on constructing systems that are robust, secure, and respectful of the individuals whose data they process.
                    </p>
                </div>
                <img src={codingPhoto} alt="Nicholas Hamilton coding" className={styles.sectionImage} />
            </section>

            {/* Software Engineering and AI Systems */}
            <section ref={el => sectionRefs.current[1] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <img src={nextGenImage} alt="NextGen Justice Development" className={styles.sectionImage} />
                <div className={styles.nonprofitContent}>
                    <h3>Software Engineering and AI Systems</h3>
                    <p>
                        During my time as a full stack engineer at NextGen Justice in San Jose, California, I contributed to the development of LyraLegal, a legal assistance platform for attorneys. The application integrates fine-tuned artificial intelligence models with a modular Retrieval-Augmented Generation (RAG) pipeline to deliver context-aware legal responses, source citations, and document-based reasoning.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        I led the design and implementation of the database architecture using PostgreSQL with the pgvector extension and Prisma ORM, enabling high-performance semantic search with HNSW indexing. I built an AI chatbot system with persistent memory, sliding context windows, and dynamic summarization, allowing attorneys to embed their own documents into the platform's legal corpus. Additionally, I designed user-facing pages and workflows in React and TypeScript, implemented secure authentication and role-based access control with Clerk, and deployed scalable AWS S3 storage integrated via Docker.
                    </p>
                </div>
            </section>

            {/* Nonprofit Work Section */}
            <section ref={el => sectionRefs.current[2] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <div className={styles.nonprofitContent}>
                    <h3>Nonprofit Initiative</h3>
                    <p>
                        One of my most rewarding experiences has been applying my skills to support a local nonprofit initiative. I developed a full-stack application using Vue.js, Flask, and PostgreSQL, which reinforced my belief in technology's power to drive positive change in communities.
                    </p>
                </div>
                <img src={coverImage} alt="UP Initiative database dashboard mockup" className={styles.sectionImage} />
            </section>

            {/* Data Science Experience Section */}
            <section ref={el => sectionRefs.current[3] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <img src={vtdsCohort} alt="Virginia Tech Cohort" className={styles.sectionImage} />
                <div className={styles.nonprofitContent}>
                    <h3>Data Science for the Public Good</h3>
                    <p>
                        As a Data Science Intern in Virginia Tech's Data Science for the Public Good program, I collaborated with a research team to address food insecurity. We conducted extensive research on food insecurity and its related socioeconomic factors, developing a machine learning model to analyze these determinants and utilizing ARIMA modeling to forecast future regional trends.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Our team built a predictive model to estimate food insecurity levels for a five-year period beyond available data across the continental United States. A significant part of our work involved performing targeted research for Southwest Virginia, providing actionable insights to Feeding Southwest Virginia, a subsidiary of Feeding America. This project highlighted how predictive data modeling and public health research can combine to address critical social welfare challenges.
                    </p>
                </div>
            </section>

            {/* Teaching Experience Section */}
            <section ref={el => sectionRefs.current[4] = el} className={`${styles.section} ${styles.teachingSection}`}>
                <h3>Academic Mentorship and Leadership</h3>
                <div className={styles.teachingContent}>
                    <div className={styles.teachingText}>
                        <p>
                            Mentorship and academic leadership are central to my work in the Computer Science Department at Berea College. As the Lead Teaching Assistant and Manager, I balanced educational instruction, grading, and administrative responsibilities. I supported student learning by assisting with course instruction, creating educational materials such as mock assignments, practice exams, and study guides, and offering individual and group tutoring for complex programming concepts.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            On the managerial side, I organized schedules for the teaching assistant cohort, facilitated communication between students, teaching assistants, and faculty, and standardized teaching materials. I also mentored junior teaching assistants and managed feedback systems to continuously improve course delivery, ensuring our methods effectively met curriculum objectives and student needs.
                        </p>
                    </div>
                </div>
                <img src={bereaCoverPhoto} alt="Berea campus cover" className={styles.fullWidthImage} />
            </section>

            {/* Data Engineering Abroad */}
            <section ref={el => sectionRefs.current[5] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <img src={mahidolImage} alt="Mahidol University Study Abroad" className={styles.sectionImage} />
                <div className={styles.nonprofitContent}>
                    <h3>Data Engineering and International Collaboration</h3>
                    <p>
                        In the fall of 2025, I studied abroad at Mahidol University International College in Thailand. This opportunity allowed me to complete coursework in data engineering, econometrics, Thai language, and philosophy and religion.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        While abroad, I worked on cross-cultural teams on a tourism econometrics project and a large-scale data engineering project focused on sentiment analysis. This work involved distributed data processing concepts and advanced algorithmic techniques, including frequent itemset mining using the Park-Chen-Yu (PCY) optimization of the Apriori algorithm, locality-sensitive hashing, and iterative data workflows. This experience was facilitated by the Berea College Center for International Education, expanding my technical toolkit and my ability to collaborate in global environments.
                    </p>
                </div>
            </section>

            {/* Privacy Engineering Section */}
            <section ref={el => sectionRefs.current[6] = el} className={`${styles.section} ${styles.nonprofitSection}`}>
                <div className={styles.nonprofitContent}>
                    <h3>Privacy Engineering</h3>
                    <p>
                        Recently, I began my role as a Privacy Engineer at Integrative Privacy. This position represents a natural intersection of my work across software development, data science, and artificial intelligence. My experiences in full-stack engineering and legal technology showed me the complexities of managing sensitive client documents and maintaining strict data isolation boundaries. Similarly, my research in data science demonstrated how easily personal details can be exposed within large datasets.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        These experiences shaped my interest in users' data privacy. I believe that privacy cannot merely be a legal review checklist at the end of a product cycle. Instead, privacy must be built directly into the codebase. I am focused on privacy-by-design and privacy engineering, developing technical solutions that protect user information and secure data flows directly within the software architecture.
                    </p>
                </div>
                <a href="https://www.integrativeprivacy.com/" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
                    <img src={privacyIcon} alt="Integrative Privacy Logo" className={styles.privacyLogo} />
                </a>
            </section>

            {/* Contact Section */}
            {/* <section ref={el => sectionRefs.current[7] = el} className={styles.section}>
                <h3>Let's Connect</h3>
                <p>I'm always excited to connect with like-minded individuals who share my passion for technology, data science, and privacy engineering. Whether you're interested in collaboration, have questions about my work, or just want to chat about the latest in tech, feel free to reach out. Let's explore how we can build secure and impactful technology together!</p>
            </section> */}
        </div>
    );
};

export default AboutPage;