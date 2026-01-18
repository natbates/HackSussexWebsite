import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSiteData } from "../../../hooks/useSiteData";
import { githubRawToLocal } from "../../../util/githubRawToLocal";
import styles from "./eventSchedule.module.css";
import messages from "./eventSchedule.messages";

const EventSchedule = () => {
  const { eventId } = useParams();
  const { events, sponsors, loading } = useSiteData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <p>{messages.loading}</p>;

  const allEvents = [
    ...(events.upcomingEvents || []),
    ...(events.pastEvents || []),
  ];

  const event = allEvents.find((e) => e.id === eventId);

  if (!event) return <p>{messages.eventNotFound}</p>;
  if (!event.schedule || event.schedule.length === 0)
    return <p>{messages.noSchedule}</p>;

  const eventDate = new Date(event.date);
  const now = new Date();

  const oneWeekBeforeEvent = new Date(
    eventDate.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const showTicketsButton = now < oneWeekBeforeEvent;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{event.title}</h1>

      <p className={styles.meta}>
        {eventDate.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {event.location}
      </p>

      <div className={styles.daysGrid}>
        {event.schedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex} className={styles.daySection}>
            <h2 className={styles.dayTitle}>{daySchedule.day}</h2>

            <div className={styles.timeline}>
              {daySchedule.items.map((item, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.time}>{item.time}</div>
                  <div className={styles.content}>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sponsors && event.sponsors && event.sponsors.length > 0 && (
        <div className={styles.sponsorsSection}>
          <h2 className={styles.sponsorsTitle}>Event Sponsors</h2>
          <div className={styles.sponsorsGrid}>
            {sponsors
              .filter(sponsor => event.sponsors.includes(sponsor.id))
              .map((sponsor) => (
                <div
                  key={sponsor.id}
                  className={styles.sponsorCard}
                  onClick={() => window.open(sponsor.website, "_blank", "noopener,noreferrer")}
                >
                  <img
                    src={githubRawToLocal(sponsor.logoUrl)}
                    alt={sponsor.name}
                    className={styles.sponsorImage}
                  />
                </div>
              ))}
          </div>
        </div>
      )}

      <div className={styles.eventInfo}>
        <p>{messages.intro}</p>

        <div className={styles.bullets}>
          {messages.bullets.map((bullet, index) => (
            <p key={index}>{bullet}</p>
          ))}
        </div>

        <p>{messages.outro}</p>
      </div>

      {showTicketsButton && (
        <div className={styles.ticketCta}>
          <button
            onClick={() =>
              window.open(
                event.ticketsLink,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Book tickets now
          </button>
        </div>
      )}
    </section>
  );
};

export default EventSchedule;
