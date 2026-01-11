import { useState } from "react";
import styles from "./video.module.css";

const Video = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div>
            <iframe
              src="https://www.youtube.com/embed/I0szBuNtyLs?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
        </div>
      </div>
    </div>
  );
};

export default Video;
