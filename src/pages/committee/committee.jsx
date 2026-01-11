import { useSiteData } from "../../hooks/useSiteData";
import styles from "./committee.module.css";
import messages from "./committee.messages";

const Committee = () => {
  const { committee, loading } = useSiteData();

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
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LinkedIn
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className={styles.container}>
      <div className={styles.committee}>

        {/* Main Page Title */}
        <h1 className={styles.pageTitle}>
          {messages.pageTitle}
        </h1>

        {/* Current Committee */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {messages.currentCommitteeTitle}
          </h2>
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
