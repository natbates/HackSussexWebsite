import { useSiteData } from "../../hooks/useSiteData";
import styles from "./sponsors.module.css";
import messages from "./sponsors.messages";
import { githubRawToLocal } from "../../util/githubRawToLocal";
import { useNavigate } from "react-router-dom";

const Sponsors = () => {
  const { sponsors, loading } = useSiteData();

  if (loading) return <p>{messages.loading}</p>;

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.sponsors}>
        <div className={styles.sponsorsTopLine}>
          <div className={styles.sponsorsText}>
            <h1
              className={styles.heading}
            >{messages.title}
            </h1>
            <p className={styles.ctaText}>{messages.ctaText}</p>
          </div>
          <div className={styles.cta}>
            <button
              className="secondary"
              onClick={() => navigate("/contact#sponsor")}
            >
              {messages.ctaButton}
            </button>
          </div>
        </div>
        <div>
          <div className="background-grid container"></div>
          <div className={styles.grid}>
            {sponsors?.map((sponsor) => (
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
