import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [twinkleStars, setTwinkleStars] = useState([]);
  const [fallingStars, setFallingStars] = useState([]);

  useEffect(() => {
    generateTwinklingStars();
    generateFallingStars();

    const handleResize = () => {
      generateTwinklingStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateTwinklingStars = () => {
    const count = 30; // ✨ just a few twinkling stars
    const stars = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        id: i,
        size: Math.random() * 1.2 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      });
    }

    setTwinkleStars(stars);
  };

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
      {/* ✨ Twinkling Stars */}
      {twinkleStars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white blur-[1px]"
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

      {/* 🌠 Cinematic Falling Stars */}
      {fallingStars.map((star) => (
        <div
          key={star.id}
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
  );
};
