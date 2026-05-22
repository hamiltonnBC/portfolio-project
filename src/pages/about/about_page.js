/*************************************************
 * Filename: about_page.js
 *
 * Purpose: About page component that provides a detailed personal introduction
 * with animated sections using Intersection Observer. The page includes multiple
 * sections about background, experience, and interests with supporting images,
 * plus a side timeline rail that tracks scroll progress and lets visitors jump
 * between stages of the journey.
 *
 * Project Role:
 * - Serves as the main About page in the portfolio
 * - Implements scroll-based animations
 * - Displays professional background and experiences
 * - Manages image content and layout
 * - Provides a sticky timeline navigator that reflects journey order
 *
 * Connected Files:
 * - AboutPage.module.css: Styling for this component
 * - Multiple image files in the images directory
 * - Layout.js: Parent component that renders this page
 *************************************************/

// External Dependencies
import React, { useEffect, useRef, useState } from 'react';

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
 * Ordered list of journey stages used to render both the page sections and
 * the side timeline rail. Keeping the source of truth here means the labels,
 * IDs, and scroll order stay in sync.
 */
const TIMELINE_STAGES = [
    { id: 'overview', label: 'Overview' },
    { id: 'mentorship', label: 'Academic Mentorship' },
    { id: 'nonprofit', label: 'Nonprofit Initiative' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'software-ai', label: 'Software & AI' },
    { id: 'data-engineering', label: 'Data Engineering' },
    { id: 'privacy', label: 'Privacy Engineering' },
];

/**
 * About Page Component
 *
 * Renders a multi-section about page with scroll-based animations using
 * Intersection Observer. Each section becomes visible as it enters the viewport.
 *
 * Features:
 * - Animated section reveals on scroll
 * - Sticky timeline rail with active-stage tracking and click-to-jump
 * - Multiple content sections with images
 * - Professional background information
 * - Teaching and research experience
 * - Privacy engineering and study abroad history
 *
 * @returns {JSX.Element} The About page component
 */
const AboutPage = () => {
    // Ref array to store references to all animated sections (matches TIMELINE_STAGES order)
    const sectionRefs = useRef([]);

    // Currently active timeline stage index (driven by scroll position)
    const [activeIndex, setActiveIndex] = useState(0);

    // While a click-driven smooth scroll is in flight, ignore IntersectionObserver
    // updates so the active index doesn't ping through every section in between.
    const isProgrammaticScroll = useRef(false);
    const scrollLockTimer = useRef(null);

    /**
     * Reveal-on-scroll Intersection Observer
     *
     * Adds the `visible` class to each section as it enters the viewport
     * to trigger the entrance animation defined in the CSS module.
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
        );

        const currentSections = sectionRefs.current;
        currentSections.forEach((ref) => ref && observer.observe(ref));

        return () => {
            currentSections.forEach((ref) => ref && observer.unobserve(ref));
        };
    }, []);

    /**
     * Active-stage Intersection Observer
     *
     * Uses a tall negative rootMargin so only the section closest to the
     * vertical center of the viewport is considered "active". This drives
     * the highlight on the timeline rail.
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Skip updates during a click-driven smooth scroll
                if (isProgrammaticScroll.current) return;

                // Pick the entry with the largest intersection ratio that is intersecting
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    const idx = sectionRefs.current.indexOf(visible[0].target);
                    if (idx !== -1) setActiveIndex(idx);
                }
            },
            {
                root: null,
                // Active band: middle ~30% of the viewport
                rootMargin: '-35% 0px -55% 0px',
                threshold: 0,
            }
        );

        const currentSections = sectionRefs.current;
        currentSections.forEach((ref) => ref && observer.observe(ref));

        return () => {
            currentSections.forEach((ref) => ref && observer.unobserve(ref));
        };
    }, []);

    // Clear any pending scroll-lock timer on unmount
    useEffect(() => {
        return () => {
            if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
        };
    }, []);

    /**
     * Smoothly scroll to a stage when the user clicks a timeline link.
     * Locks the active index to the clicked stage until the scroll settles
     * so the indicator does not flicker through intermediate sections.
     */
    const handleStageClick = (index) => {
        const target = sectionRefs.current[index];
        if (!target) return;

        // Lock the active index to the destination
        setActiveIndex(index);
        isProgrammaticScroll.current = true;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Release the lock once the smooth scroll has had time to finish
        if (scrollLockTimer.current) clearTimeout(scrollLockTimer.current);
        scrollLockTimer.current = setTimeout(() => {
            isProgrammaticScroll.current = false;
        }, 900);
    };

    return (
        <div className={styles.aboutContainer}>
            {/* Side Timeline Rail (desktop only) */}
            <aside className={styles.timeline} aria-label="About page section navigation">
                <div className={styles.timelineTrack}>
                    <div
                        className={styles.timelineProgress}
                        style={{
                            height:
                                TIMELINE_STAGES.length > 1
                                    ? `${(activeIndex / (TIMELINE_STAGES.length - 1)) * 100}%`
                                    : '0%',
                        }}
                    />
                </div>
                <ol className={styles.timelineList}>
                    {TIMELINE_STAGES.map((stage, index) => {
                        const isActive = index === activeIndex;
                        const isComplete = index < activeIndex;
                        return (
                            <li key={stage.id} className={styles.timelineItem}>
                                <a
                                    href={`#${stage.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleStageClick(index);
                                    }}
                                    className={`${styles.timelineLink} ${
                                        isActive ? styles.timelineLinkActive : ''
                                    } ${isComplete ? styles.timelineLinkComplete : ''}`}
                                    aria-current={isActive ? 'true' : undefined}
                                    aria-label={`Jump to ${stage.label}`}
                                >
                                    <span className={styles.timelineDot}>
                                        <span className={styles.timelineDotInner} />
                                    </span>
                                    <span className={styles.timelineLabel}>
                                        {stage.label}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </aside>

            {/* Main Content Column */}
            <div className={styles.aboutContent}>
                {/* 1. Overview */}
                <section
                    id="overview"
                    ref={(el) => (sectionRefs.current[0] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <div className={styles.nonprofitContent}>
                        <h2>About Me</h2>
                        <p>
                            Hi, I'm Nicholas. I'm a computer science graduate from Berea College, 
                            and most of what I work on lives somewhere in the overlap between software
                             engineering, data, and privacy. I have detailed some of my key moments here. 
                             These include leading the CS TA department at my college, learning big data engineering algorithms in Thailand,
                            and working in legal tech for an AI startup.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            It is a priority for me that the software I work on and the data that I work with are for used for the public good, and I am lucky enough to 
                            have the learning and work experiences that have supported this priority.
                        </p>
                    </div>
                    <img src={codingPhoto} alt="Nicholas Hamilton coding" className={styles.sectionImage} />
                </section>

                {/* 2. Academic Mentorship and Leadership */}
                <section
                    id="mentorship"
                    ref={(el) => (sectionRefs.current[1] = el)}
                    className={`${styles.section} ${styles.teachingSection}`}
                >
                    <h3>Academic Mentorship and Leadership</h3>
                    <div className={styles.teachingContent}>
                        <div className={styles.teachingText}>
                            <p>
                                A lot of what I did at Berea happened inside the Computer Science Department, where I worked as the Lead Teaching Assistant and Manager.
                                 The role was part teaching, part operations. On any given week I might be sitting next to a student assisting with a data structures & algorithms course, 
                                 writing a mock exam to help a class prep for finals, or developing visualizations for more complex topics.
                            </p>
                            <p style={{ marginTop: '1rem' }}>
                                The management piece consisted of a variety tasks. These included crafting the schedule for our TA cohort,
                                 assisting in the communication between students, TAs, and faculty, and leading our weekly meetings.
                            </p>
                        </div>
                    </div>
                    <img src={bereaCoverPhoto} alt="Berea campus cover" className={styles.fullWidthImage} />
                </section>

                {/* 3. Nonprofit Initiative */}
                <section
                    id="nonprofit"
                    ref={(el) => (sectionRefs.current[2] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <div className={styles.nonprofitContent}>
                        <h3>Nonprofit Initiative</h3>
                        <p>
                            One of the projects that really helped allow me to see the impact that software and data infastructure can have for the public good,
                            was building a data tracking platform for a local nonprofit.
                            The UP initiative was focused on providing a variety of resources to the unhoused population in our county.
                            I led a team of four to build them a full-stack application using Vue.js, Flask, and PostgreSQL.
                        </p>
                    </div>
                    <img src={coverImage} alt="UP Initiative database dashboard mockup" className={styles.sectionImage} />
                </section>

                {/* 4. Data Science for the Public Good */}
                <section
                    id="data-science"
                    ref={(el) => (sectionRefs.current[3] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <img src={vtdsCohort} alt="Virginia Tech Cohort" className={styles.sectionImage} />
                    <div className={styles.nonprofitContent}>
                        <h3>Data Science for the Public Good</h3>
                        <p>
                            The following summer, I spent as a Data Science Intern with Virginia Tech's Data Science for the Public Good program. 
                            I worked alongside an exceedingly talented group of researchers in a multi-discplinary team 
                             We dug into the socioeconomic factors that drive food insecurity and trained a machine learning model based on a large dataset we crafted. 
                            We used ARIMA modeling to project regional trends forward so our stakeholders could use our findings for better resource allocation.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            We ended up building a predictive model that estimated food insecurity levels across the continental U.S. for a five-year window past the available data. 
                        </p>
                    </div>
                </section>

                {/* 5. Software Engineering and AI Systems */}
                <section
                    id="software-ai"
                    ref={(el) => (sectionRefs.current[4] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <img src={nextGenImage} alt="NextGen Justice Development" className={styles.sectionImage} />
                    <div className={styles.nonprofitContent}>
                        <h3>Software Engineering and AI Systems</h3>
                        <p>
                            From there I moved out to San Jose to work as a full stack engineer at NextGen Justice, where I joined the team building LyraLegal.
                             The product is a legal assistance platform for attorneys,
                            pairing fine-tuned AI models with a modular Retrieval-Augmented Generation pipeline.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            I owned the database side of that system. I designed the schema in PostgreSQL with the pgvector extension and Prisma on top, 
                            and tuned it for semantic search using HNSW indexes so queries stayed fast as the corpus grew. On the AI side, I built the chatbot's 
                            memory layer with sliding context windows and dynamic summarization, which is what lets attorneys upload their own documents and have the 
                            assistant reason over them alongside the broader legal corpus. I also built out a lot of the user-facing experience in React and TypeScript, 
                            set up authentication and role-based access through Clerk, and wired up the AWS S3 storage layer behind a Docker deployment.
                        </p>
                    </div>
                </section>

                {/* 6. Data Engineering and International Collaboration */}
                <section
                    id="data-engineering"
                    ref={(el) => (sectionRefs.current[5] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <img src={mahidolImage} alt="Mahidol University Study Abroad" className={styles.sectionImage} />
                    <div className={styles.nonprofitContent}>
                        <h3>Data Engineering and International Collaboration</h3>
                        <p>
                            In the fall of 2025 I studied abroad at Mahidol University International College in Thailand.
                             Coursework spanned data engineering, econometrics, Thai language, and philosophy and religion, 
                             which is a stranger combination on paper than it felt in practice. 
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            I worked on a couple of projects with cross-cultural teams while I was there. 
                            One was a tourism econometrics study, and the other was a larger data engineering project on sentiment analysis where we got into the weeds of distributed processing.
                             We used the Park-Chen-Yu (PCY) optimization of the Apriori algorithm for frequent itemset mining and
                             locality-sensitive hashing for near-duplicate detection. 
                             </p>
                    </div>
                </section>

                {/* 7. Privacy Engineering */}
                <section
                    id="privacy"
                    ref={(el) => (sectionRefs.current[6] = el)}
                    className={`${styles.section} ${styles.nonprofitSection}`}
                >
                    <div className={styles.nonprofitContent}>
                        <h3>Privacy Engineering</h3>
                        <p>
                            Most recently I started as a Privacy Engineer at Integrative Privacy, 
                            and in a lot of ways this role pulls together the threads of everything that came before it. 
                            Working in legal tech taught me how careful you have to be with sensitive client documents and 
                            how easily data isolation boundaries can get fuzzy when a system grows. The data science work 
                            taught me the flip side of that, which is how much personal information can leak out of a dataset that, 
                            on the surface, looks anonymous.
                        </p>
                        <p style={{ marginTop: '1rem' }}>
                            That combination is what pushed me toward privacy as a discipline.
                            I belive strongly in Privacy-by-design, and the work
                              I'm doing now is building software that assists other engineers in abiding by this. 
                        </p>
                    </div>
                    <a
                        href="https://www.integrativeprivacy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.privacyLink}
                    >
                        <img src={privacyIcon} alt="Integrative Privacy Logo" className={styles.privacyLogo} />
                    </a>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;
