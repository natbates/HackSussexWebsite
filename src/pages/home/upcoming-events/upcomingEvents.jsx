import React from "react";
import { useSiteData } from "../../../hooks/useSiteData";
import styles from "./upcomingEvents.module.css";
import messages from "./upcomingEvents.messages";
import Event from "../../../components/event/event";

const UpcomingEvents = () => {
  const { events, sponsors, loading } = useSiteData();

  if (loading) return <p className={styles.loading}>{messages.loadingText}</p>;

  if (!events.upcomingEvents || events.upcomingEvents.length === 0) {
    return (<div className={styles.container}></div>);
  }

  return (
    <div className={styles.container}>
      <div className={styles.upComingEvent}>
        <img className={styles.mlhBanner} src={"https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"}></img>
        <h1 className={styles.pageTitle}>{messages.pageTitle.toUpperCase()}</h1>

        {events.upcomingEvents.map((event) => (
          <Event key={event.id} event={event} sponsors={sponsors} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
