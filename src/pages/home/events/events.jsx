import React from "react";
import styles from "./events.module.css";
import messages from "./events.messages";
import { useNavigate } from "react-router-dom";
import { useSiteData } from "../../../hooks/useSiteData";

const EventTypes = () => {
  const navigate = useNavigate();
  const { siteData } = useSiteData();

  return (
    <section className={styles.container}>
      <div className={styles.topLine}>
        <div className={styles.text}>
          <h1 className={styles.heading}>{messages.pageTitle}</h1>
          <p className={styles.description}>{messages.description}</p>
        </div>
        <div className={styles.cta}>
          <a href={siteData.discord} target="_blank" rel="noopener noreferrer">
            <button>{messages.ctaButton}</button>
          </a>
        </div>
      </div>
      <div className={styles.grid}>
        {messages.eventTypes.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.id} className={styles.card}>
              <Icon />
              <h2 className={styles.name}>{event.title}</h2>
              <p className={styles.description}>{event.description}</p>
              <button onClick={() => {navigate("/events/"+event.id)}}>Learn More</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventTypes;
