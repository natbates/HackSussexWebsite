import styles from "./hero.module.css";
import messages from "./hero.messages";
import Socials from "../../../components/socials/socials";
import HackSussexLogo from "../../../assets/hackSussex/logo.png";
import MobileLogo from "../../../assets/hackSussex/gradient.png";

import NewsletterSignup from "../../../components/newsletter/newsletter";
import MLHBanner from "../../../assets/misc/mlh-trust-badge-2026-white.svg"
import { isMlhSeason } from "../../../config/settings";

const Hero = () => {
    return (
        <div className={styles.hero}>
            <h3 className={styles.welcomeTo}>{messages.welcomeText}</h3>
            
            {isMlhSeason && (
                <img
                    className={styles.mlhBanner}
                    src={MLHBanner}
                    onClick={() => window.open(messages.codeOfConductLink, "_blank")}
                />
            )}

            <div className={styles.logoContainer}>
                <img className={styles.desktopLogo} src={HackSussexLogo} alt="Hack Sussex Logo" />
                <img className={styles.mobileLogo} src={MobileLogo} alt="Hack Sussex Mobile Logo" />
            </div>

            <p className={styles.description}>{messages.description}</p>
            
            <div className={styles.socialsNewsletterContainer}>
                <Socials />
                <NewsletterSignup />
            </div>
        </div>
    );
};

export default Hero;
