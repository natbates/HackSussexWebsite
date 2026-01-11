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
        ["Hastings Direct", "BCS", "EDF", "Electric Square"].includes(
          sponsor.name
        )
      )
    : sponsors;

  return (
    <div className={styles.container}>
      <div className={styles.sponsors}>
        <h1
          className={styles.heading}
          style={{ textAlign: isHomePage ? "center" : "start" }}
        >
          {isHomePage ? messages.homeTitle : messages.pageTitle}
        </h1>
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

        {/* CTA section */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>{messages.ctaText}</p>
          <button
            className={styles.ctaButton}
            onClick={() => window.open("/contact-sponsorship", "_blank")}
          >
            {messages.ctaButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
