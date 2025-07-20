import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiServerless,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiGit,
  SiDocker,
  SiFigma,
  SiElasticsearch,
  SiGithubactions,
  SiTensorflow,
  SiPytorch,
  SiAmazonec2,
  SiFastapi,
  SiJirasoftware,
  SiNotion,
  SiApacheairflow,
  SiMlflow,
  SiPython,
} from "react-icons/si";
import { FaUserTie } from "react-icons/fa";          // Product Owner
import { MdArchitecture } from "react-icons/md";     // System Design
import { HiOutlineServer } from "react-icons/hi";    // Microservice
const skills = [
  // Frontend
  { name: "HTML/CSS", category: "frontend", icon: <SiHtml5 /> },
  { name: "JavaScript", category: "frontend", icon: <SiJavascript /> },
  { name: "React", category: "frontend", icon: <SiReact /> },
  { name: "TypeScript", category: "frontend", icon: <SiTypescript /> },
  { name: "Tailwind CSS", category: "frontend", icon: <SiTailwindcss /> },
  { name: "Next.js", category: "frontend", icon: <SiNextdotjs /> },

  // Backend
  { name: "Node.js", category: "backend", icon: <SiNodedotjs /> },
  { name: "Express", category: "backend", icon: <SiExpress /> },
  { name: "Python", category: "backend", icon: <SiPython /> },
  { name: "FastAPI", category: "backend", icon: <SiFastapi /> },
  { name: "MongoDB", category: "backend", icon: <SiMongodb /> },
  { name: "PostgreSQL", category: "backend", icon: <SiPostgresql /> },
  { name: "ElasticSearch", category: "backend", icon: <SiElasticsearch /> },
    { name: "MicroService Architecture", category: "backend", icon: <HiOutlineServer /> },


  // Tools
  { name: "Git/GitHub", category: "tools", icon: <SiGit /> },
  { name: "GitHub Actions", category: "tools", icon: <SiGithubactions /> },
  { name: "Docker", category: "tools", icon: <SiDocker /> },
  { name: "Figma", category: "tools", icon: <SiFigma /> },

  // AI / MLOps
  { name: "TensorFlow", category: "ai-mlops", icon: <SiTensorflow /> },
  { name: "PyTorch", category: "ai-mlops", icon: <SiPytorch /> },
  { name: "AWS", category: "ai-mlops", icon: <SiAmazonec2 /> },
  { name: "Mlflow", category: "ai-mlops", icon: <SiMlflow /> },
  { name: "Dagshub", category: "ai-mlops", icon: <SiGit /> },
  {
    name: "Airflow - Scheduler",
    category: "ai-mlops",
    icon: <SiApacheairflow />,
  },

  // Product Development
  { name: "Agile / Scrum", category: "product-dev", icon: <SiGit /> },
  { name: "JIRA", category: "product-dev", icon: <SiJirasoftware /> },
  { name: "Notion", category: "product-dev", icon: <SiNotion /> },
  { name: "System Design", category: "product-dev", icon: <MdArchitecture /> },
  { name: "Product Ownership", category: "product-dev", icon: <FaUserTie/> },
];

const categories = [
  "all",
  "frontend",
  "backend",
  "tools",
  "ai-mlops",
  "product-dev",
];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-primary">Tech Stack</span> & Tools
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 capitalize",
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/70"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#1e1e2f] hover:bg-[#2a2a3d] border border-border rounded-2xl p-6 shadow-xl hover:shadow-purple-500/40 backdrop-blur-md transition-transform duration-300 transform hover:scale-[1.03] group">
              <div className="flex items-center gap-4">
                <span className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <h3 className="text-xl font-semibold text-foreground">
                  {skill.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
