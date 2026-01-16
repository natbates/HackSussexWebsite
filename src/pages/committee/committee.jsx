import { useNavigate } from "react-router-dom";
import { useSiteData } from "../../hooks/useSiteData";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import styles from "./committee.module.css";
import messages from "./committee.messages";

const Committee = () => {
  const { committee, loading } = useSiteData();
  const navigate = useNavigate();

  if (loading) {
    return <p className={styles.loading}>{messages.loading}</p>;
  }

  const currentCommittee = committee?.filter(
    (member) => !member.pastCommittee
  );

  const pastCommittee = committee?.filter(
    (member) => member.pastCommittee
  );

  const renderMembers = (members) => (
    <div className={styles.grid}>
      {members.map((member) => (
        <div key={member.id} className={styles.card}>
          <img
            src={member.image}
            alt={member.name}
            className={styles.cardImage}
          />

          <h3 className={styles.name}>{member.name}</h3>
          <p className={styles.role}>{member.role}</p>

          <div className={styles.socialLinks}>
            {member.linkedin && (
              <button
                className={styles.socialButton}
                onClick={() => window.open(member.linkedin, "_blank")}
                aria-label={`${member.name} LinkedIn`}
              >
                <FaLinkedinIn />
              </button>
            )}

            {member.github && (
              <button
                className={styles.socialButton}
                onClick={() => window.open(member.github, "_blank")}
                aria-label={`${member.name} GitHub`}
              >
                <FaGithub />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.container}>
      <div className={styles.committee}>
        <div className={styles.committeeTopLine}>
          <div className={styles.sponsorsText}>
            <h1 className={styles.title}>{messages.title}</h1>
            <p className={styles.ctaText}>{messages.ctaText}</p>
          </div>

          <div className={styles.cta}>
            <button
              className="secondary"
              onClick={() => navigate("/contact#committee")}
            >
              {messages.ctaButton}
            </button>
          </div>
        </div>

        {/* Current Committee */}
        <div className={styles.section}>
          {renderMembers(currentCommittee)}
        </div>

        {/* Past Committee */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {messages.pastCommitteeTitle}
          </h2>
          {renderMembers(pastCommittee)}
        </div>
      </div>
    </section>
  );
};

export default Committee;
