import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projectsData from "../../../data/projects.json";
import type { Project } from "../../../types";
import "./Projects.css";

const Projects = () => {
  const projects: Project[] = projectsData;

  return (
    <main className="projects">
      <div className="projects__header">
        <h1 className="projects__title">Projects</h1>
      </div>

      <div className="projects__grid">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card__body">
              <h2 className="project-card__title">{project.title}</h2>
              <p className="project-card__description">{project.description}</p>

              <ul className="project-card__tags" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <li key={tag} className="project-card__tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-card__links">
              {project.github && (
                <a
                  href={project.github}
                  className="project-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  className="project-card__link project-card__link--live"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                >
                  <FaExternalLinkAlt />
                  <span>Live</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Projects;
