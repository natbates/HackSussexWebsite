import styles from "./video.module.css";

const Video = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>See for yourself</h1>
      <p className={styles.description}>Check out some videos all about us!</p>
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
