
import { useSiteData } from "../../../hooks/useSiteData";
import styles from "./homeSponsors.module.css";
import messages from "./homeSponsors.messages";
import { useNavigate } from "react-router-dom";
import { githubRawToLocal } from "../../../util/githubRawToLocal";

const Sponsors = () => {
  const { sponsors, loading } = useSiteData();

  if (loading) return <p>{messages.loading}</p>;

  const navigate = useNavigate();

  const selectedSponsors = sponsors?.filter((sponsor) =>
        ["Hastings Direct", "BCS", "EDF", "Electric Square"].includes(
          sponsor.name
        )
    )

  return (
    <div className={styles.container}>
      <div className={styles.sponsors}>
        <div className={styles.sponsorsTopLine}>
          <div className={styles.sponsorsText}>
            <h1
              className={styles.heading}
            >
              {messages.title}
            </h1>
            <p className={styles.ctaText}>{messages.ctaText}</p>
          </div>
          <div className={styles.cta}>
            <button
              className={styles.ctaButton}
              onClick={() => navigate("/contact#sponsor")}
            >
              {messages.ctaButton}
            </button>
          </div>
        </div>
        <div>
          <div className="background-grid container"></div>
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sponsors;
