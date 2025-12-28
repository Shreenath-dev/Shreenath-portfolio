"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scene3D } from "./Scene3D";

const experience = [
  {
    title: "Software Associate",
    company: "Scottech Solutions",
    duration: "May 2025 – Jul 2025",
    description:
      "Architected and delivered backend services using FastAPI and PostgreSQL for a cloud-based logistics platform. Automated deployment using Docker and GitHub Actions, ensuring zero-downtime rollouts and rapid iteration cycles.",
  },
  {
    title: "Software Associate",
    company: "SNS Square Consultancy Services",
    duration: "Aug 2024 – May 2025",
    description:
      "Designed and built scalable, production-grade backend systems integrating AI capabilities. Developed ML models, leveraging sentence-transformers and OpenSearch for semantic search and recommender system. Led backend architecture decisions across internal platforms, ensuring performance and reliability. Acted as Product Owner, driving development through strong Agile practices and cross-functional collaboration.",
  },
  {
    title: "Software Associate Intern",
    company: "Cybernerds Solutions",
    duration: "Jun 2024 – Aug 2024",
    description:
      "Built and fine-tuned PyTorch-based ML models for classification and text generation. Integrated inference pipelines with React-based dashboards and deployed services to AWS EC2 using CI/CD pipelines.",
  },
];

export const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yScene = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="experience" className="py-24 px-4 relative overflow-hidden" ref={containerRef}>
      <motion.div
        style={{ y: yScene }}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      >
        <Scene3D />
      </motion.div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Experience <span className="text-primary">Timeline</span>
        </h2>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2 rounded-full" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-blue-500 transform md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]"
          />

          <div className="space-y-12">
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                <div className="absolute left-8 md:left-1/2 top-0 w-4 h-4 rounded-full bg-background border-2 border-primary transform -translate-x-1/2 md:translate-x-[-50%] z-20 shadow-[0_0_10px_rgba(168,85,247,0.8)] mt-6 md:mt-0">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                </div>

                <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12">
                  <div
                    className={`bg-card/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group`}
                  >
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary/80 font-medium text-sm mb-3">
                      {item.company} <span className="text-neutral-500 px-2">•</span> {item.duration}
                    </p>
                    <p className="text-neutral-300 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
