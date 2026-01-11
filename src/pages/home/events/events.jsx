import React from "react";
import styles from "./events.module.css";
import messages from "./events.messages";

const EventTypes = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{messages.pageTitle}</h1>

      <div className={styles.grid}>
        {messages.eventTypes.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img
                  src={event.image}
                  alt={event.title}
                  className={styles.image}
                />

                <div className={styles.iconOverlay}>
                  <Icon />
                </div>
              </div>

              <h2 className={styles.name}>{event.title}</h2>
              <p className={styles.description}>{event.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventTypes;
