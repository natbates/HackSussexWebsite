import React from "react";
import styles from "./events.module.css";
import messages from "./events.messages";
import { useNavigate } from "react-router-dom";

const EventTypes = () => {

  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{messages.pageTitle}</h1>
      <p className={styles.description}>{messages.description}</p>
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
