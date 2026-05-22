/*************************************************
 * Filename: certifications_page.js
 *
 * Purpose: Certifications and Publications page component that showcases
 * professional certifications, academic publications, and honors. This page
 * provides detailed information about achievements and credentials.
 *
 * Project Role:
 * - Serves as the dedicated certifications and publications page
 * - Displays professional certifications and academic achievements
 * - Showcases publications and research work
 * - Presents honors and society memberships
 *
 * Connected Files:
 * - certifications_styles.module.css: Styling for this component
 * - Multiple image files in the images directory
 * - Layout.js: Parent component that renders this page
 *************************************************/

// React Import
import React from 'react';

// Styles Import
import styles from './certifications_styles.module.css';

// Image Imports
import dataLiteracyCertification from '../../images/DataLitCert.png';
import privacyEngineerCert from '../../images/privacyEngineerCert.png';
import apiSecCert from '../../images/API_SEC_CERT.png';

/**
 * Certifications and Publications Page Component
 *
 * Renders a comprehensive display of professional certifications, academic
 * publications, and honors with detailed descriptions and supporting images.
 *
 * Sections:
 * - Academic Publications
 * - Professional Certifications
 * - Honor Society Memberships
 * - Program Certificates
 *
 * @returns {JSX.Element} The certifications and publications page component
 */
const CertificationsPage = () => {
    return (
        <div className={styles.certificationsContainer}>
            <h1>Certifications and Publications</h1>
            
            {/* Certifications Section */}
            <section className={styles.certificationsSection}>
                <div className={styles.certificationCard}>
                    <h3>Food Insecurity in Southwest Virginia</h3>
                    <img
                        src={process.env.PUBLIC_URL + '/research_paper_title.png'}
                        alt="Food Insecurity in Southwest Virginia Publication Title"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <a href={process.env.PUBLIC_URL + '/FoodInsecurityinSouthwestVirginia.pdf'} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        View Publication (PDF)
                    </a>
                    <a href="https://www.pubs.ext.vt.edu/ALCE/alce-323/alce-323.html" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        View Online Publication
                    </a>
                    <p>
                        This publication examines food insecurity in Southwest Virginia using statistical and machine learning analysis. It evaluates contributing socioeconomic factors, regional trends, and the impact of policy and community-based interventions. As a co-author, I contributed to data analysis, interpretation, and writing as part of the Data Science for the Public Good internship at Virginia Tech.
                    </p>
                </div>
                
                <div className={styles.certificationCard}>
                    <h3>Technical Privacy Masterclass</h3>
                    <img
                        src={privacyEngineerCert}
                        alt="Technical Privacy Masterclass Certificate"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>
                        Completed the Technical Privacy Masterclass from Privado AI, focusing on the concepts of privacy engineering and privacy-by-code. The course covered advanced privacy frameworks beyond standard GDPR and CCPA checklists, emphasizing integration of automated data privacy checks directly into software pipelines.
                    </p>
                </div>
                
                <div className={styles.certificationCard}>
                    <h3>Level I International Tutor Certification</h3>
                    <img
                        src={process.env.PUBLIC_URL + '/CRLA ITTPC Nicholas Hamilton.png'}
                        alt="Level I International Tutor Certification"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>
                        Earned Level I certification by completing training through Berea College's Center for Teaching and Learning. Certification requirements included 25+ hours of active tutoring, 10 hours of instructional training, a written tutoring philosophy, and an observed tutoring session.
                    </p>
                </div>
                
                <div className={styles.certificationCard}>
                    <h3>Silicon Valley Accelerator Program Certificate</h3>
                    <img
                        src={process.env.PUBLIC_URL + '/Nicholas_Hamilton_Silicon_Valley_Accelerator_Program_certificate_summer25.png'}
                        alt="Silicon Valley Accelerator Program Certificate"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>
                        Joined fellow AI Startup interns in attending talks and workshops led by experts across AI, entrepreneurship, venture capital, and product design. We've also pitched our own startup ideas, learning to frame them for both investors and end users - whether in B2B or B2C contexts.
                    </p>
                </div>
                
                <div className={styles.certificationCard}>
                    <h3>Epsilon Pi Tau Honor Society</h3>
                    <img
                        src={process.env.PUBLIC_URL + '/EpsilonCert.jpeg'}
                        alt="Epsilon Pi Tau Honor Society Certificate"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>
                        Initiated into Epsilon Pi Tau, the International Honor Society for Professions in Technology, as a member of the Gamma Mu Chapter at Berea College.
                    </p>
                </div>

                <div className={styles.certificationCard}>
                    <h3>Data Literacy Certification</h3>
                    <img
                        src={dataLiteracyCertification}
                        alt="Data Literacy Certification"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>Certification in Data Literacy, demonstrating proficiency in understanding and interpreting data.</p>
                </div>

                <div className={styles.certificationCard}>
                    <h3>OWASP API Security Top 10</h3>
                    <img
                        src={apiSecCert}
                        alt="OWASP API Security Top 10 Certificate"
                        className={styles.certificationImage}
                        loading="lazy"
                        decoding="async"
                    />
                    <p>
                        Completed the OWASP API Security Top 10 course at APIsec University, which reviews critical API vulnerabilities and demonstrates real-world threat mitigation strategies and security best practices for API endpoints.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default CertificationsPage;