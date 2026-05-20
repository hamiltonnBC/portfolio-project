/*************************************************
 * Filename: projects_page.js
 *
 * Purpose: Projects page component that displays a grid of project cards,
 * with filters to explore projects by category. Supports links to GitHub,
 * live websites, YouTube demos, and design process documentation.
 *************************************************/

import React, { useState } from 'react';
import styles from './ProjectsPage.module.css';
import censusPoster from '../../images/Poster_CensusConnect_User_Authentication_System.pdf';
import foodInsecurityPoster from '../../images/PosterImage.jpg';
import nextGenPoster from '../../images/nextGenPoster.jpeg';
import marimoodPoster from '../../images/marimood.png';

/**
 * Project Card Component
 */
const ProjectCard = ({ title, description, link, githubLink, youtubeLink, designProcessLink, posterLink, posterLabel = "Research Poster", date, status, tags }) => (
  <div className={styles.projectCard}>
    <div className={styles.cardHeader}>
      <span className={styles.projectDate}>{date}</span>
      {status && (
        <span className={`${styles.statusBadge} ${status === 'In Progress' || status === 'In Development' ? styles.inProgress : styles.completed}`}>
          {status}
        </span>
      )}
    </div>

    <h3>{title}</h3>
    <p className={styles.description}>{description}</p>

    {tags && tags.length > 0 && (
      <div className={styles.techTags}>
        {tags.map((tag, i) => (
          <span key={i} className={styles.tag}>{tag}</span>
        ))}
      </div>
    )}

    {/* Project links section */}
    <div className={styles.projectLinks}>
      {/* Live project link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectLink} ${styles.liveLink}`}
        >
          View Live Site <span>→</span>
        </a>
      )}

      {/* GitHub repository link */}
      {githubLink && (
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectLink} ${styles.githubLink}`}
        >
          GitHub <span>→</span>
        </a>
      )}

      {/* YouTube video link */}
      {youtubeLink && (
        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectLink} ${styles.youtubeLink}`}
        >
          Demo Video <span>→</span>
        </a>
      )}

      {/* Design process link */}
      {designProcessLink && (
        <a
          href={designProcessLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectLink} ${styles.designLink}`}
        >
          Design Process <span>→</span>
        </a>
      )}

      {/* Research/Application Poster link */}
      {posterLink && (
        <a
          href={posterLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.projectLink} ${styles.posterLink}`}
        >
          {posterLabel} <span>→</span>
        </a>
      )}
    </div>
  </div>
);

/**
 * Projects Page Component
 */
const ProjectsPage = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: "Marimood",
      description: "A full-stack, data-driven mood tracking Progressive Web App (PWA) and proof of concept named after Japan's Marimo algae, developed to give users complete data customization and statistical analyses. Built following a literature review on Experience Sampling Methodology (ESM), user observations, and a heuristic evaluation. Features multi-variable regression with VIF collinearity detection, point-biserial correlation impact analysis, and real-time co-occurrence visualizations using Recharts.",
      link: "https://marimood.com",
      posterLink: marimoodPoster,
      posterLabel: "Application Poster",
      status: "Completed",
      date: "2025",
      category: "fullstack",
      tags: ["React & PWA", "Recharts", "Statistical Analysis", "Heuristic Evaluation"]
    },
    {
      title: "Engineering a Full-Stack AI System for Legal Tech",
      description: "Comprehensive AI-powered legal technology platform with modular RAG system, PostgreSQL with pgvector, React TypeScript frontend, and Docker containerization. Developed during NextGen Justice LLC internship to democratize access to legal representation.",
      link: "https://www.lyralegal.com/",
      posterLink: nextGenPoster,
      posterLabel: "Application Poster",
      status: "Completed",
      date: "June 2025 - August 2025",
      category: "fullstack",
      tags: ["AI & RAG", "React", "pgvector", "Docker"]
    },
    {
      title: "CS Department Website",
      description: "Leading a team of 15+ student developers to build a comprehensive platform for the Berea College Computer Science department. Features include an evening lab hours scheduling application, student work portfolio directory, and a centralized hub for tutoring resources.",
      githubLink: "https://github.com/BC-CS-Website-Team/CS_TA_Website",
      link: "https://bereacshub.live/",
      status: "In Progress",
      date: "2024 - Present",
      category: "fullstack",
      tags: ["React", "Node.js", "Express", "SQLite", "Git Workflow"]
    },
    {
      title: "CensusConnect",
      description: "Developing a research tool in R to streamline and standardize the retrieval of US Census data, addressing access bottlenecks and formatting discrepancies for public policy researchers.",
      githubLink: "https://github.com/hamiltonnBC/CensusConnect.git",
      designProcessLink: "https://sites.google.com/view/nicholas-hamilton/project-portfolio-blog-post?authuser=1",
      posterLink: censusPoster,
      status: "In Development",
      date: "2024 - Present",
      category: "datascience",
      tags: ["R", "API Integration", "Census Data", "Public Policy"]
    },
    {
      title: "Projecting Food Insecurity",
      description: "A machine learning and interactive forecasting platform. Built as a Shiny web application in R, it projects future county-level food insecurity levels across the Continental US to help Feeding America optimize resource distributions.",
      link: "https://virginiatechdatascienceforthepublicgood2024foodinsecurity.shinyapps.io/VTDSPGPFI/",
      posterLink: foodInsecurityPoster,
      status: "Completed",
      date: "May 2024 - July 2024",
      category: "datascience",
      tags: ["R Shiny", "Machine Learning", "Data Visualization", "ARIMA"]
    },
    {
      title: "UP Initiative Database",
      description: "A full-stack client project for the unhoused population initiative in Madison County, KY. Features a Vue.js frontend dashboard and Flask REST API supported by a robust PostgreSQL relational database.",
      githubLink: "https://github.com/2024-databases-bereacollege/client-project-up-unhoused-persons-initiative-team",
      youtubeLink: "https://youtu.be/Run8F22sIcs?si=nKssADWBe_TkOUi0",
      status: "Completed",
      date: "Jan 2024 - May 2024",
      category: "fullstack",
      tags: ["Vue.js", "Flask API", "PostgreSQL", "Database Design"]
    },
    {
      title: "Network Traffic Analysis",
      description: "Executed a comprehensive analysis of scholastic local area network packets utilizing Wireshark. Implemented Python visualization pipelines to identify traffic volume anomalies and potential bandwidth bottlenecks.",
      githubLink: "https://github.com/hamiltonnBC/NetworkTrafficAnalysis_BC",
      link: "https://networktrafficanalysis-bc-1.onrender.com/",
      status: "Completed",
      date: "October 2024",
      category: "datascience",
      tags: ["Wireshark", "Python", "Data Viz", "Network Security"]
    },
    {
      title: "Ranked-Choice Voting System",
      description: "A software design project utilizing Python and CustomTkinter to model a secure, graphical ranked-choice voting dashboard simulating algorithmic candidate elimination rounds.",
      githubLink: "https://github.com/hamiltonnBC/RankBasedVotingSystem",
      status: "Completed",
      date: "December 2023",
      category: "software",
      tags: ["Python", "CustomTkinter", "GUI Design", "Algorithmic Logic"]
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className={styles.projectsPage}>
      <div className={styles.pageHeader}>
        <h1>My Projects</h1>
        <p className={styles.subtitle}>
          A curated selection of software applications, research pipelines, and full-stack solutions.
        </p>
      </div>

      {/* Filter Navigation Tabs */}
      <div className={styles.filterContainer}>
        <button 
          className={`${styles.filterBtn} ${filter === 'all' ? styles.activeFilter : ''}`}
          onClick={() => setFilter('all')}
        >
          All Projects
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'fullstack' ? styles.activeFilter : ''}`}
          onClick={() => setFilter('fullstack')}
        >
          Full-Stack Apps
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'datascience' ? styles.activeFilter : ''}`}
          onClick={() => setFilter('datascience')}
        >
          Data Science & ML
        </button>
        <button 
          className={`${styles.filterBtn} ${filter === 'software' ? styles.activeFilter : ''}`}
          onClick={() => setFilter('software')}
        >
          Software Design
        </button>
      </div>

      {/* Projects Grid */}
      <div className={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;