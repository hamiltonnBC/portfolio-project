import React from 'react';
import './projects_styles.css';

const ProjectCard = ({ title, description, image, link }) => (
  <div className="project_card">
    <img src={image} alt={title} className="project_image" />
    <h3>{title}</h3>
    <p>{description}</p>
    <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
  </div>
);

const ProjectsPage = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1.",
      image: "/path/to/project1-image.jpg",
      link: "https://project1-link.com"
    },
    {
      title: "Project 2",
      description: "A brief description of project 2.",
      image: "/path/to/project2-image.jpg",
      link: "https://project2-link.com"
    },
    // Add more projects as needed
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
