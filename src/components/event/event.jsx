import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./event.module.css";
import messages from "./event.messages";
import { githubRawToLocal } from "../../util/githubRawToLocal";

const Event = ({ event, sponsors, timer, simpleDesign = false }) => {
  const navigate = useNavigate();

  const ticketsClosed = timer?.closed;
  const eventDate = new Date(event.date);
  const now = new Date();
  const showAddToCalendar = now < eventDate;

  const handleAddToCalendar = () => {
    const start = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0];
    const end = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0];

    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//HackSussex//Event//EN
      BEGIN:VEVENT
      UID:${event.id}@hacksussex.com
      DTSTAMP:${start}Z
      DTSTART:${start}Z
      DTEND:${end}Z
      SUMMARY:${event.title}
      DESCRIPTION:${event.description}
      LOCATION:${event.location}
      END:VEVENT
      END:VCALENDAR
      `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // -------------------
  // Simple Card JSX
  // -------------------
  if (simpleDesign) {
    return (
      <div className={styles.simpleCard}>
        {/* Column 1: Image */}
        <img
          src={githubRawToLocal(event.logo)}
          alt={`${event.title} Logo`}
          className={styles.simpleImage}
        />

        {/* Column 2: Title / Date / Location */}
        <div className={styles.simpleDetails}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.date}>
            {eventDate.toLocaleDateString("en-GB", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className={styles.location}>{event.location}</p>
        </div>

        {/* Column 3: Buttons */}
        <div className={styles.simpleButtons}>
          {showAddToCalendar && (
            <button className="secondary" onClick={handleAddToCalendar}>
              {messages.calendarBtnText}
            </button>
          )}
          <button className="secondary"
              onClick={() => navigate(`/schedules/${event.id}`)}>
            {messages.scheduleBtnText}
          </button>
          {ticketsClosed ? (
            <button disabled>{messages.ticketsClosedText}</button>
          ) : event.ticketsLink?.startsWith("https") ? (
            <button
              onClick={() =>
                window.open(event.ticketsLink, "_blank", "noopener,noreferrer")
              }
            >
              {messages.ticketsBtnText}
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  // -------------------
  // Full Card JSX
  // -------------------
  const eventSponsors = sponsors?.filter((s) => event.sponsors.includes(s.id));

  return (
    <div className={styles.eventWrapper}>
      <div className={styles.eventCard}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={githubRawToLocal(event.logo)}
            alt={`${event.title} Logo`}
            className={styles.logo}
          />
        </div>

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.eventTitle}>{event.title}</h2>

          <p className={styles.location}>{event.location}</p>
          <p className={styles.description}>{event.description}</p>

          {/* Countdown */}
          {!ticketsClosed && timer?.text && (
            <p className={styles.countdown}>{timer.text}</p>
          )}

          {/* Sponsors */}
          {eventSponsors?.length > 0 && (
            <div className={styles.sponsors}>
              <div className={styles.sponsorLogos}>
                {eventSponsors.map((sponsor) => (
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      className={styles.sponsorLogo}
                    />
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <p className={styles.date}>
            {eventDate.toLocaleDateString("en-GB", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* Buttons */}
          <div className={styles.buttons}>
            {showAddToCalendar && (
              <button className="secondary" onClick={handleAddToCalendar}>
                {messages.calendarBtnText}
              </button>
            )}
            <button className="secondary" onClick={() => navigate(`/schedules/${event.id}`)}>
              {messages.scheduleBtnText}
            </button>
            {ticketsClosed ? (
              <button disabled>{messages.ticketsClosedText}</button>
            ) : event.ticketsLink?.startsWith("https") ? (
              <button
                onClick={() =>
                  window.open(event.ticketsLink, "_blank", "noopener,noreferrer")
                }
              >
                {messages.ticketsBtnText}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
