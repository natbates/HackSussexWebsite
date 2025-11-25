import React, { useState, useEffect } from "react";
import Polaroid from "./polaroid/polaroid";

// Import all polaroid images
const importAllPolaroids = (r) => r.keys().map(r);
const allPolaroidsRaw = importAllPolaroids(
  require.context("../assets/gallery", false, /\.(png|jpe?g|gif)$/)
);
const allPolaroids = allPolaroidsRaw.map((img) => img.default || img);

const PolaroidColumn = ({ right }) => {
  const [polaroids, setPolaroids] = useState([]);
  const POLAROID_HEIGHT = 250;

  useEffect(() => {
    const updatePolaroids = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const count = Math.ceil(pageHeight / POLAROID_HEIGHT);

      const newPolaroids = Array.from({ length: count }, (_, i) => {
        // Pick random image
        const randomImage =
          allPolaroids[Math.floor(Math.random() * allPolaroids.length)];

        const rotate = right
          ? i % 2 === 0
            ? "-10deg"
            : "10deg"
          : i % 2 === 0
          ? "10deg"
          : "-10deg";

        return { id: i, rotate, image: randomImage };
      });

      setPolaroids(newPolaroids);
    };

    updatePolaroids();
    window.addEventListener("resize", updatePolaroids);
    return () => window.removeEventListener("resize", updatePolaroids);
  }, [right]);

  return (
    <div className={`polaroid-column ${right ? "right" : ""}`}>
      {polaroids.map((p) => (
        <Polaroid key={p.id} image={p.image} rotate={p.rotate} />
      ))}
    </div>
  );
};

export default PolaroidColumn;
