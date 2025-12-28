import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const StarBackground = () => {
  const [layer1Stars, setLayer1Stars] = useState([]);
  const [layer2Stars, setLayer2Stars] = useState([]);
  const [layer3Stars, setLayer3Stars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);

  const { scrollYProgress } = useScroll();
  
  // Parallax movements
  // Layer 1 (Far): Moves slowly
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  // Layer 2 (Mid): Moves medium speed
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  // Layer 3 (Close): Moves fastest
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  useEffect(() => {
    const generateStars = (count, sizeMin, sizeMax) => {
      const stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          id: i,
          size: Math.random() * (sizeMax - sizeMin) + sizeMin,
          x: Math.random() * 100,
          y: Math.random() * 150 - 25, // Spread stars beyond viewport (-25% to 125%)
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 5,
        });
      }
      return stars;
    };

    setLayer1Stars(generateStars(70, 0.5, 1.5)); // Small/Far
    setLayer2Stars(generateStars(40, 1.5, 2.5)); // Medium
    setLayer3Stars(generateStars(20, 2.5, 3.5)); // Large/Close

    generateFallingStars();

    const handleResize = () => {
      setLayer1Stars(generateStars(70, 0.5, 1.5));
      setLayer2Stars(generateStars(40, 1.5, 2.5));
      setLayer3Stars(generateStars(20, 2.5, 3.5));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateFallingStars = () => {
    const count = 2; // 🌠 only 1-2 cinematic falling stars
    const meteors = [];

    for (let i = 0; i < count; i++) {
      meteors.push({
        id: i,
        size: Math.random() * 8 + 5, // 5px to 13px
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 5,
        opacity: Math.random() * 0.4 + 0.6,
      });
    }

    setFallingStars(meteors);
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-[#01010a] via-[#050520] to-[#000010]">
      {/* Layer 1 - Far */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {layer1Stars.map((star) => (
          <div
            key={`l1-${star.id}`}
            className="absolute rounded-full bg-white blur-[1px]"
            style={{
              left: `${star.left || star.x}%`,
              top: `${star.top || star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2 - Mid */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {layer2Stars.map((star) => (
          <div
            key={`l2-${star.id}`}
            className="absolute rounded-full bg-white blur-[0.5px]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3 - Close */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {layer3Stars.map((star) => (
          <div
            key={`l3-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.2)`,
              animation: `twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </motion.div>

      {/* 🌠 Cinematic Falling Stars */}
      <div className="absolute inset-0">
        {fallingStars.map((star) => (
          <div
            key={`f-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              boxShadow: "0 0 25px 10px rgba(255,255,255,0.4)",
              filter: "blur(1px)",
              animation: `fall ${star.duration}s linear ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
