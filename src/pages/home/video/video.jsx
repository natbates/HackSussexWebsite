import SketchyBorder from "../../../components/sketchy/sketch-border";
import styles from "./video.module.css";

const Video = () => {
  return (
    <div className={styles.container}>     
        <div className={styles.videoContainer}>
            <SketchyBorder>      
                <iframe 
                    src="https://www.youtube.com/embed/I0szBuNtyLs?si=TEE0gPpGtFm91Q68" title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
            </SketchyBorder>      
        </div>
    </div>
  );
};

export default Video;
