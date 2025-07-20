"use client";
import { Cloud, BrainCircuit, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-white">
              Backend Engineer & AI Creator
            </h3>

            <p className="text-muted-foreground">
              I'm a software associate experienced in building scalable backend
              systems and intelligent AI models for real-world applications.
              I've worked on robust backend system, microservice architecture,
              semantic search, recommendation systems, and GenAI features for
              production-ready systems.
            </p>

            <p className="text-muted-foreground">
              With hands-on experience across the stack—FastAPI, Python, MERN,
              and cloud-native deployments on AWS—I love crafting robust,
              meaningful solutions. I also drive feature delivery as a product
              owner and focus on user impact through AI-powered backend logic.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="https://drive.google.com/file/d/1XRjDSYzKvDIUs8x6dtK-WMzZIOnplZbY/view?usp=sharing"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {[
              {
                Icon: BrainCircuit,
                title: "AI & Backend Systems",
                description:
                  "Building intelligent systems using FastAPI, Python, and deep learning models for recommendation and semantic search.",
              },
              {
                Icon: Cloud,
                title: "Cloud & DevOps",
                description:
                  "Deploying cloud-native apps using AWS, Docker, Kubernetes, and MLOps tools for scalable AI delivery.",
              },
              {
                Icon: Briefcase,
                title: "Product Ownership",
                description:
                  "Led product features end-to-end, balancing technical delivery and user-focused outcomes with agile best practices.",
              },
            ].map(({ Icon, title, description }, idx) => (
              <motion.div
                key={idx}
                className="gradient-border p-6 card-hover backdrop-blur"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg text-white">
                      {title}
                    </h4>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
