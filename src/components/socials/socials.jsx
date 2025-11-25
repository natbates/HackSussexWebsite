import styles from "./socials.module.css";
import { FaInstagram, FaYoutube, FaDiscord, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { useSiteData } from "../../hooks/useSiteData";

// Map siteData keys → icons + display names
const SOCIAL_ICON_MAP = {
  x: { name: "X (Twitter)", icon: <FaXTwitter /> },
  instagram: { name: "Instagram", icon: <FaInstagram /> },
  linkedin: { name: "LinkedIn", icon: <FaLinkedin /> },
  discord: { name: "Discord", icon: <FaDiscord /> },
  tiktok: { name: "TikTok", icon: <FaTiktok /> },
  youtube: { name: "YouTube", icon: <FaYoutube /> },
};

const Socials = () => {
  const { siteData, loading } = useSiteData();

  if (loading || !siteData) return null;

  // Filter: remove "merch" and any unknown keys
  const socialEntries = Object.entries(siteData).filter(
    ([key]) => key !== "merch" && SOCIAL_ICON_MAP[key]
  );

  return (
    <div className={styles.socialsContainer}>
      {socialEntries.map(([key, url]) => {
        const { name, icon } = SOCIAL_ICON_MAP[key];

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <span className={styles.icon}>{icon}</span>
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
