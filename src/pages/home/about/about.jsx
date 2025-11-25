import styles from "./about.module.css";
import messages from "./about.messages.js";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutContent}>
        <h1 className={styles.header}>{messages.header}</h1>

        <p className={styles.description}>{messages.description}</p>

        <h2 className={styles.photosTitle}>{messages.photosTitle}</h2>

        <div className={styles.photosGrid}>
          {/* Add or remove photos freely — this auto-grids */}
          <img src="/assets/about/photo1.jpg" alt="About 1" />
          <img src="/assets/about/photo2.jpg" alt="About 2" />
          <img src="/assets/about/photo3.jpg" alt="About 3" />
          <img src="/assets/about/photo4.jpg" alt="About 4" />
        </div>
      </div>
    </div>
  );
};

export default About;
