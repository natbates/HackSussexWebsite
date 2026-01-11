import Hero from "./hero/hero";
import UpcomingEvents from "./upcoming-events/upcomingEvents";
import styles from "./home.module.css";
import Sponsors from "../sponsors/sponsors";
import Feedback from "./feedback/feedback";
import Video from "./video/video";
import EventTypes from "./events/events";

const Home = () => {

  return (
    <div className={styles.homePage}>
      <Hero />
      <UpcomingEvents />
      <EventTypes />
      {/* <About /> */}
      <Sponsors />
      <Video />
      <Feedback /> 
    </div>
  );
};

export default Home;

