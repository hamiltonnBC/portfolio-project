/*************************************************
 * Filename: projects_page.js
 *
 * Purpose: Projects page component that displays a grid of project cards,
 * each showing details about a specific project including links to live demos,
 * GitHub repositories, and related videos.
 *
 * Project Role:
 * - Displays portfolio projects in a grid layout
 * - Provides a reusable ProjectCard component
 * - Manages project data and rendering
 * - Handles external links and media
 *
 * Connected Files:
 * - projects_styles.css: Styling for this component
 * - Layout.js: Parent component that renders this page
 *************************************************/

// React Import
import React from 'react';

// Styles Import
import './projects_styles.css';

/**
 * Project Card Component
 *
 * Renders an individual project card with title, description, date,
 * and various types of links (live demo, GitHub, YouTube).
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Project title
 * @param {string} props.description - Project description
 * @param {string} [props.image] - Optional project image URL
 * @param {string} [props.link] - Optional live project link
 * @param {string} [props.githubLink] - Optional GitHub repository link
 * @param {string} [props.youtubeLink] - Optional YouTube video link
 * @param {string} props.date - Project date or duration
 * @returns {JSX.Element} A project card component
 */
const ProjectCard = ({ title, description, image, link, githubLink, youtubeLink, date }) => (
    <div className="project_card">
        {/* Optional project image */}
        {image && <img src={image} alt={title} className="project_image" />}

        {/* Project information */}
        <h3>{title}</h3>
        <p className="project_date">{date}</p>
        <p>{description}</p>

        {/* Project links section */}
        <div className="project_links">
            {/* Live project link */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project_link"
                >
                    View Project
                </a>
            )}

            {/* GitHub repository link */}
            {githubLink && (
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project_link github_link"
                >
                    GitHub
                </a>
            )}

            {/* YouTube video link */}
            {youtubeLink && (
                <a
                    href={youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project_link youtube_link"
                >
                    YouTube
                </a>
            )}
        </div>
    </div>
);

/**
 * Projects Page Component
 *
 * Main component that displays a grid of projects. Contains project data
 * and renders multiple ProjectCard components.
 *
 * Features:
 * - Grid layout of project cards
 * - Consistent project information display
 * - Multiple link types per project
 * - Chronological project ordering
 *
 * @returns {JSX.Element} The projects page component
 */
const ProjectsPage = () => {
    // Project data array containing information for each project
    const projects = [
        {
            title: "CS Department Website",
            description: "Leading a team of 15+ developers to create a comprehensive platform for the CS department. Features include evening lab hours scheduling system, student work portfolio showcase, centralized information hub for department resources, and interactive features for student and faculty engagement.",
            githubLink: "https://github.com/BC-CS-Website-Team/CS_TA_Website",
            link: "https://bereacshub.live/",
            status: "In Progress",
            date: "2024 - Present"
        },
        {
            title: "CensusConnect",
            description: "Developing a research tool to streamline US Census data retrieval, addressing common data access challenges and implementing solutions for data consistency and accessibility.",
            githubLink: "https://github.com/hamiltonnBC/CensusConnect.git",
            status: "In Development",
            date: "2024 - Present"
        },
        {
            title: "Projecting Food Insecurity",
            description: "Shiny App written primarily in R, using Machine Learning to project future levels of food insecurity across the Continental United States to assist Feeding America in grant funding and resource management",
            link: "https://virginiatechdatascienceforthepublicgood2024foodinsecurity.shinyapps.io/VTDSPGPFI/",
            date: "May 2024 - July 2024"
        },
        {
            title: "Full Stack Database Application for UP Initiative",
            description: "Vue frontend and Python backend application with PostgreSQL for a local nonprofit initiative assisting the houseless population in Madison County, KY",
            githubLink: "https://github.com/2024-databases-bereacollege/client-project-up-unhoused-persons-initiative-team",
            youtubeLink: "https://youtu.be/Run8F22sIcs?si=nKssADWBe_TkOUi0",
            date: "January 2024 - May 2024"
        },
        {
            title: "Network Traffic Analysis",
            description: "Conducted detailed analysis of school network traffic using Wireshark. Implemented data visualization and pattern recognition techniques.",
            githubLink: "https://github.com/hamiltonnBC/NetworkTrafficAnalysis_BC",
            link: "https://networktrafficanalysis-bc-1.onrender.com/",
            date: "October 2024"
        },
        {
            title: "Rank Based Voting System",
            description: "Python and CustomTKinter, Final Project for Introduction to software design",
            githubLink: "https://github.com/hamiltonnBC/RankBasedVotingSystem",
            date: "December 2023"
        }
    ];
    return (
        <div className="projects_page">
            <h1>My Projects</h1>
            {/* Projects grid with mapped ProjectCard components */}
            <div className="projects_grid">
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;