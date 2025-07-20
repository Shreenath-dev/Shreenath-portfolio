import { ArrowRight, ExternalLink, Github } from "lucide-react";
import MM from "../assets/mm.png"
import MME from "../assets/ChatGPT Image Jul 21, 2025, 12_46_30 AM.png"
import Tracker from "../assets/tracker.png"


const projects = [
  {
    id: 1,
    title: "Square MedMatch",
    description: "Square MedMatch is a platform that connects healthcare professionals with healthcare providers.",
    image: MM,
    tags: "Live",
    demoUrl: "https://www.squaremedmatch.com/",
    githubUrl: " ",
  },
  {
    id: 2,
    title: "MedMatch Entreprise",
    description:
      "MedMatch Enterprise is a B2B platform for AI-driven healthcare hiring and candidate screening.",
    image: MME,
    tags: ["TypeScript", "Next.js"],
    demoUrl: " ",
    githubUrl: " ",
  },
  {
    id: 3,
    title: "Square Tracker",
    description:
      "Streamline bug tracking and ticket management with a centralized, efficient, and user-friendly platform.",
    image: Tracker,
    tags: ["React", "Node.js", "MongoDB"],
    demoUrl: " ",
    githubUrl: " ",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags === 'Live' ? 
                    
                    <span className="px-2 py-1 text-xs font-medium border font- text-red-600 animate-pulse border-red-700 rounded-full bg-secondary text-secondary-foreground">
                      {project.tags}
                    </span>
                  :project.tags.map((tag) => (
                    
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.demoUrl!==' '?<a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>:' '}
                    {project.githubUrl!==' '?<a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>:<span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      <a href="https://www.snssquare.com/">SNS Square Product</a>
                    </span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Shreenath-dev"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
