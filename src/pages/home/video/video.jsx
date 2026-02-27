import React from "react";
import styles from "./video.module.css";
import messages from "./video.messages";
import { useSiteData } from "../../../hooks/useSiteData";

const Video = () => {
  const { siteData } = useSiteData();

  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <div className={styles.text}>
          <h1 className={styles.heading}>{messages.heading}</h1>
          <p className={styles.description}>{messages.description}</p>
        </div>
        <div className={styles.cta}>
          <a
            href={siteData.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>{messages.ctaButton}</button>
          </a>
        </div>
      </div>
      <div className={styles.videoGrid}>
        <iframe
          src="https://www.youtube.com/embed/XAIrb-ik6Xo"
          title="Hack Sussex Video 1"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <iframe
          src="https://www.youtube.com/embed/I0szBuNtyLs"
          title="Hack Sussex Video 2"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Video;
