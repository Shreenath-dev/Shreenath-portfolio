"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "motion/react";

const experience = [
  {
    title: "Software Associate",
    company: "Scottech Solutions",
    duration: "May 2025 – Aug 2025",
    description:
      "Architected and delivered backend services using FastAPI and PostgreSQL for a cloud-based logistics platform. Automated deployment using Docker and GitHub Actions, ensuring zero-downtime rollouts and rapid iteration cycles.",
  },
  {
    title: "Software Associate",
    company: "SNS Square Consultancy Services",
    duration: "Aug 2024 – May 2025",
    description:
      "Developed scalable APIs for AI-powered semantic search and recommendations. Introduced vector search with OpenSearch and sentence-transformers, significantly improving query relevance. Led backend architecture decisions across multiple internal tools.",
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
  const ref = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [glowIndex, setGlowIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rawBeam = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);
  const beamY = useSpring(rawBeam, {
    stiffness: 200,
    damping: 40,
  });
  const beamOffset = useTransform(rawBeam, (y) => svgHeight - y);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = beamY.on("change", (latest) => {
      const threshold = 20;
      experience.forEach((_, idx) => {
        const y = 80 + idx * 180;
        if (latest >= y - threshold && latest <= y + threshold) {
          setGlowIndex(idx);
        }
      });
    });
    return () => unsubscribe();
  }, [beamY]);

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Experience <span className="text-primary">Timeline</span>
        </h2>

        <motion.div
          ref={ref}
          className="relative mx-auto h-full w-full max-w-4xl"
        >
          <div className="absolute top-0 -left-4 md:-left-20">
            <svg
              viewBox={`0 0 20 ${svgHeight}`}
              width="20"
              height={svgHeight}
              className="ml-4 block"
              aria-hidden="true"
            >
              <motion.path
                d={`M 10 0 V ${svgHeight}`}
                fill="none"
                stroke="#9091A0"
                strokeOpacity="0.16"
              />
              <motion.path
                d={`M 10 0 V ${svgHeight}`}
                fill="none"
                stroke="url(#timelineGradient)"
                strokeWidth="1.5"
                style={{
                  strokeDasharray: svgHeight,
                  strokeDashoffset: beamOffset,
                }}
              />
              <defs>
                <linearGradient
                  id="timelineGradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#18CCFC" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
                  <stop offset="100%" stopColor="#AE48FF" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {experience.map((_, idx) => {
                const y = 80 + idx * 180;
                const isGlowing = glowIndex === idx;

                return (
                  <motion.circle
                    key={idx}
                    cx="10"
                    cy={y}
                    r={isGlowing ? 8 : 6}
                    fill="white"
                    stroke="#A855F7"
                    strokeWidth="2"
                    animate={isGlowing ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                    transition={
                      isGlowing
                        ? {
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                          }
                        : {}
                    }
                    style={{
                      filter: isGlowing
                        ? "drop-shadow(0 0 10px #A855F7) brightness(1.5)"
                        : "none",
                    }}
                  />
                );
              })}
            </svg>
          </div>

          <div ref={contentRef} className="pl-14 md:pl-20">
            {experience.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.25 }}
                viewport={{ once: true }}
                className="relative mb-16 flex items-start gap-6 md:gap-8"
              >
                <div className="bg-card/70 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-xl w-full text-left">
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {item.company} |{" "}
                    <span className="italic">{item.duration}</span>
                  </p>
                  <p className="text-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
