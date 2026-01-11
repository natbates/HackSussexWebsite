import styles from "./hero.module.css";
import messages from "./hero.messages";
import Socials from "../../../components/socials/socials";
import HackSussexLogo from "../../../assets/hackSussex/wideWhite.png"

import Image1 from "../../../assets/gallery/hackathon_nfgd20.jpg"
import Image2 from "../../../assets/gallery/hackathon_0sirvt.jpg"
import Image3 from "../../../assets/gallery/hackathon_nfnc6o.jpg"

const Hero = () => {
    return (
        <div className={styles.hero}>

            <div className={styles.titleColumn}>

                <div className={styles.imageGap}>
                    <img src = {Image1} className={styles.image}></img>
                    <img src = {Image2} className={styles.image}></img>
                </div>

                <p className={styles.welcomeTo}>{messages.welcomeText}</p>
                <h1 className={styles.title}>{messages.title}</h1>
                {/* <img src={HackSussexLogo}></img> */}

            </div>

            <div className={styles.descriptionColumn}>
                <img src = {Image3} className={styles.image}></img>
                <p className={styles.heroText}>{messages.description}</p>
                <button>See Photos</button>
            </div>


        </div>
    );
};

export default Hero;
