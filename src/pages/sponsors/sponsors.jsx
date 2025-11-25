import { useSiteData } from "../../hooks/useSiteData";
import styles from "./sponsors.module.css";
import messages from "./sponsors.messages";
import { githubRawToLocal } from "../../util/githubRawToLocal";

const Sponsors = () => {
  const { sponsors, loading } = useSiteData();

  if (loading) return <p>{messages.loading}</p>;

  const isHomePage = window.location.pathname === "/";
  
  const selectedSponsors = isHomePage
    ? sponsors?.filter((sponsor) =>
        ["Hastings Direct", "BCS", "EDF", "Electric Square"].includes(sponsor.name)
      )
    : sponsors;

  return (
    <div className={styles.container}>
      <div className={styles.sponsors}>
        <h1 className={styles.heading}>{messages.title.toUpperCase()}</h1>
        <div className={styles.grid}>
          {selectedSponsors?.map((sponsor) => (
            <div
              key={sponsor.id}
              className={styles.card}
              onClick={() => window.open(sponsor.website)}
            >
              <img
                src={githubRawToLocal(sponsor.logoUrl)}
                alt={sponsor.name}
                className={styles.cardImage}
              />
              <h2 className={styles.name}>{sponsor.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
