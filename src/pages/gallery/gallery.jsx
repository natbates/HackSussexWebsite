import React, { useState, useEffect } from "react";
import styles from "./gallery.module.css";
import messages from "./gallery.messages";

// Automatically import all images
const importAll = (r) => r.keys().map(r);
const allImagesRaw = importAll(
  require.context("../../assets/gallery", false, /\.(png|jpe?g|gif)$/)
);

const allImages = allImagesRaw.map((img) => {
  const src = img.default || img;
  const filename = src.split("/").pop();
  const category = filename.includes("_")
    ? filename.split("_")[0]
    : "uncategorized";

  return { src, category };
});

const IMAGES_PER_PAGE = 24;

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Categories
  const categories = Array.from(
    new Set(allImages.map((img) => img.category))
  );

  // Filter images
  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  // Pagination math
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + IMAGES_PER_PAGE
  );

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{messages.title}</h1>

      {/* Filters */}
      <div className={styles.filters}>
        <button
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? styles.active : ""}
        >
          {messages.allCategory}
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? styles.active : ""}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {paginatedImages.map((img) => (
          <div key={img.src} className={styles.card}>
            <img src={img.src} alt="" className={styles.image} />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
