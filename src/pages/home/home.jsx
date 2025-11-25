import Hero from "./hero/hero";
import UpcomingEvents from "./upcoming-events/upcomingEvents";
import styles from "./home.module.css";
import Sponsors from "../sponsors/sponsors";
import Merch from "./merch/merch";
import Feedback from "./feedback/feedback";
import Video from "./video/video";
import About from "./about/about";

const Home = () => {

  return (
    <div className={styles.homePage}>
      <Hero />
      <UpcomingEvents />
      <About />
      <Sponsors />
      <Video />
      <Merch />
      <Feedback />
    </div>
  );
};

export default Home;



// hero

// upcoming events (if any)

// about us + stats

// gallery snippet

// MERCH !

// feedback

// previous sponsors

// meet the committee snippet

