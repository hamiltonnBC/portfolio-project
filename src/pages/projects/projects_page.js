import React from 'react';
import './projects_styles.css';

const ProjectCard = ({ title, description, image, link, githubLink, youtubeLink, date }) => (
  <div className="project_card">
    {image && <img src={image} alt={title} className="project_image" />}
    <h3>{title}</h3>
    <p className="project_date">{date}</p>
    <p>{description}</p>
    <div className="project_links">
      {link && <a href={link} target="_blank" rel="noopener noreferrer" className="project_link">View Project</a>}
      {githubLink && <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project_link github_link">GitHub</a>}
      {youtubeLink && <a href={youtubeLink} target="_blank" rel="noopener noreferrer" className="project_link youtube_link">YouTube</a>}
    </div>
  </div>
);

const ProjectsPage = () => {
  const projects = [
    {
      title: "Projecting Food Insecurity",
      description: "Shiny App written primarily in R, using Machine Learning to project future levels of food insecurity across the Continental United States to assist Feeding America in grant funding and resource management",
      link: "https://virginiatechdatascienceforthepublicgood2024foodinsecurity.shinyapps.io/VTDSPGPFI/",
      date: "May 2025 - July 2025"
    },
    {
      title: "Full Stack Database Application for UP Initiative",
      description: "Vue frontend and Python backend application with PostgreSQL for a local nonprofit initiative assisting the houseless population in Madison County, KY",
      githubLink: "https://github.com/2024-databases-bereacollege/client-project-up-unhoused-persons-initiative-team",
      youtubeLink: "https://youtu.be/Run8F22sIcs?si=nKssADWBe_TkOUi0",
      date: "January 2025 - May 2025"
    },
    {
      title: "Rank Based Voting System",
      description: "Python and CustomTKinter, Final Project for Introduction to software design",
      githubLink: "https://github.com/hamiltonnBC/RankBasedVotingSystem",
      date: "December 2024"
    }
  ];

  return (
    <div className="projects_page">
      <h1>My Projects</h1>
      <div className="projects_grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
