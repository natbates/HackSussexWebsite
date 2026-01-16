import styles from "./socials.module.css";
import { useSiteData } from "../../hooks/useSiteData";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

// Map siteData keys → label + icon
const SOCIAL_CONFIG = {
  x: {
    label: "X (Twitter)",
    icon: <FaXTwitter />,
  },
  instagram: {
    label: "Instagram",
    icon: <FaInstagram />,
  },
  linkedin: {
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  discord: {
    label: "Discord",
    icon: <FaDiscord />,
  },
  tiktok: {
    label: "TikTok",
    icon: <FaTiktok />,
  },
  youtube: {
    label: "YouTube",
    icon: <FaYoutube />,
  },
};

const Socials = () => {
  const { siteData, loading } = useSiteData();

  if (loading || !siteData) return null;

  const socialEntries = Object.entries(siteData).filter(
    ([key]) => key !== "merch" && SOCIAL_CONFIG[key]
  );

  return (
    <ul className={styles.socialsList}>
      {socialEntries.map(([key, url]) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={SOCIAL_CONFIG[key].label}
          >
            <span className={styles.icon}>
              {SOCIAL_CONFIG[key].icon}
            </span>
          </a>
      ))}
    </ul>
  );
};

export default Socials;
