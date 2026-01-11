import React, { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import messages from "./navbar.messages";
import HSLogo from "../../assets/hackSussex/gradient.png";
import { useSiteData } from "../../hooks/useSiteData";

const Navbar = () => {
  const navigate = useNavigate();
  const { siteData, events, loading } = useSiteData();

  if (loading) return null;

  // Find the upcoming events
  const upcomingEvent = useMemo(() => {
    if (!events?.upcomingEvents || events.upcomingEvents.length === 0) return null;

    // Filter future events
    const futureEvents = events.upcomingEvents.filter(
      (e) => new Date(e.date) > new Date()
    );

    if (!futureEvents.length) return null;

    // Sort by soonest date
    return futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [events]);

  // Build nav links
  const links = messages.links.map((link) => {
    if (link.name === "Merch Store") {
      return { ...link, path: siteData?.merch || "#", external: true };
    }
    return link;
  });

  return (
    <div className={styles.navbarContainer}>
      {/* Logo */}
      {/* <div className={styles.leftContainer}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HSLogo} alt="Hack Sussex Logo" className={styles.logo} />
        </div>
      </div> */}

      {/* Nav Links */}
      <div className={styles.centerContainer}>
        <div className={styles.navLinks}>
          {links.map((link) => (
            <div key={link.name} className={styles.navItem}>
              {link.external ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLink}
                >
                  {link.name}
                </a>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.active}`
                      : styles.navLink
                  }
                >
                  {link.name}
                </NavLink>
              )}

              {/* Dropdown */}
              {link.dropdown && (
                <div className={styles.dropdownMenu}>
                  {link.dropdown.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={styles.dropdownItem}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Dynamic Get Tickets link */}
          {upcomingEvent && (
            <a
              href={upcomingEvent.ticketsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}
            >
              Get Tickets
            </a>
          )}
        </div>
      </div>

      {/* Right buttons */}
      <div className={styles.rightContainer}>
        {upcomingEvent && (
          <button
            onClick={() =>
              window.open(upcomingEvent.ticketsLink, "_blank", "noopener,noreferrer")
            }
          >
            Get Tickets
          </button>
        )}
        <button onClick={() => navigate("/contact")}>Get In Touch</button>
      </div>
    </div>
  );
};

export default Navbar;
