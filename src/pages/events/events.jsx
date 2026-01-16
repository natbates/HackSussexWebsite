import React, { useState, useEffect } from "react";
import { useSiteData } from "../../hooks/useSiteData";
import styles from "./events.module.css";
import messages from "./events.messages";
import Event from "../../components/event/event";

const Events = () => {
  const { events, sponsors, loading } = useSiteData();
  const [timers, setTimers] = useState({});

  if (loading) return <p className={styles.container}>{messages.loading}</p>;

  const upcomingEvents = events?.upcomingEvents || [];
  const pastEvents = events?.pastEvents || [];

  const now = new Date();

  // Set timers for upcoming events (show countdown until 1 week before)
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimers = {};
      upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const cutoffDate = new Date(eventDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const diff = cutoffDate - now;

        if (diff <= 0) {
          updatedTimers[event.id] = { closed: true };
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          updatedTimers[event.id] = {
            text: `${days}d ${hours}h ${minutes}m ${seconds}s`,
            closed: false,
          };
        }
      });
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [upcomingEvents]);

  if (upcomingEvents.length === 0 && pastEvents.length === 0)
    return <p className={styles.container}>{messages.noEvents}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{messages.title}</h1>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <>
          <h2 className={styles.subHeading}>{messages.upcomingEventsTitle}</h2>
          {upcomingEvents.map((event) => (
            <Event
              simpleDesign={true}
              key={event.id}
              event={event}
              sponsors={sponsors}
              timer={timers[event.id]}
            />
          ))}
        </>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <>
          <h2 className={styles.subHeading}>{messages.pastEventsTitle}</h2>
          {pastEvents.map((event) => (
            <Event
              simpleDesign={true}
              key={event.id}
              event={event}
              sponsors={sponsors}
              timer={{ closed: true }} // past events always have tickets closed
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Events;
