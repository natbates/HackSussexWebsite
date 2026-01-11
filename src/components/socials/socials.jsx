import styles from "./socials.module.css";
import { useSiteData } from "../../hooks/useSiteData";

// Map siteData keys → display names
const SOCIAL_NAME_MAP = {
  x: "X (Twitter)",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  discord: "Discord",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const Socials = () => {
  const { siteData, loading } = useSiteData();

  if (loading || !siteData) return null;

  const socialEntries = Object.entries(siteData).filter(
    ([key]) => key !== "merch" && SOCIAL_NAME_MAP[key]
  );

  return (
    <ul className={styles.socialsList}>
      {socialEntries.map(([key, url]) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {SOCIAL_NAME_MAP[key]}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
