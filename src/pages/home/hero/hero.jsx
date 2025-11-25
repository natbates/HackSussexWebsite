import HeroImage from "../../../assets/hackSussex/wideWhite.png";
import styles from "./hero.module.css";
import messages from "./hero.messages";
import Socials from "../../../components/socials/socials";
import BearImage from "../../../assets/bear/bear.png"

const Hero = () => {
    return (
        <div className={styles.hero}>
            {/* Background image */}

            {/* Centered logo */}
            <div className={styles.logoContainer}>
                <img src={HeroImage} alt="Hero Logo" className={styles.logo} />
            </div>

            <p className={styles.heroText}>University of Sussex society that hosts hackathons</p>

            <div className={styles.infoRight}>
                <Socials />
            </div>

            <img className={styles.bear} src={BearImage}></img>

        </div>
    );
};

export default Hero;
