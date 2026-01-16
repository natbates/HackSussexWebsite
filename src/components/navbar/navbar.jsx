import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import messages from "./navbar.messages";
import HSLogo from "../../assets/hackSussex/HS logo small gradient.svg";
import { useSiteData } from "../../hooks/useSiteData";

const Navbar = () => {
  const navigate = useNavigate();
  const { siteData, events, loading } = useSiteData();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return null;

  const upcomingEvent = useMemo(() => {
    if (!events?.upcomingEvents?.length) return null;
    const futureEvents = events.upcomingEvents.filter(e => new Date(e.date) > new Date());
    if (!futureEvents.length) return null;
    return futureEvents.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [events]);

  const links = messages.links.map(link => {
    if (link.name === "Merch Store") return { ...link, path: siteData?.merch || "#", external: true };
    return link;
  });

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navBar}>
        <div className={styles.leftContainer}>
          <div className={styles.logoContainer} onClick={() => { navigate("/"); setMobileOpen(false); }}>
            <img src={HSLogo} alt="Hack Sussex Logo" className={styles.logo} />
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.navLinks}>
            {links.map(link => (
              <div key={link.name} className={styles.navItem}>
                {link.external ? (
                  <a href={link.path} target="_blank" rel="noopener noreferrer" className={styles.navLink}>{link.name}</a>
                ) : (
                  <NavLink to={link.path} className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>{link.name}</NavLink>
                )}
                {link.dropdown && (
                  <div className={styles.dropdownMenu}>
                    {link.dropdown.map(item => (
                      <NavLink key={item.name} to={item.path} className={styles.dropdownItem}>{item.name}</NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {upcomingEvent ? (
              <button className={styles.ticketBtn} onClick={() => window.open(upcomingEvent.ticketsLink, "_blank", "noopener,noreferrer")}>Get Tickets</button>
            ) : (
              <button className={styles.ticketBtn} onClick={() => navigate("/contact")}>Contact Us</button>
            )}
          </div>
        </div>

        <div className={styles.mobileControls}>
          {upcomingEvent ? (
            <button className={styles.ticketBtn} onClick={() => window.open(upcomingEvent.ticketsLink, "_blank", "noopener,noreferrer")}>Get Tickets</button>
          ) : (
            <button className={styles.ticketBtn} onClick={() => navigate("/contact")}>Contact Us</button>
          )}
          <button className={styles.hamburger} onClick={() => setMobileOpen(v => !v)}>☰</button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        {links.map(link => (
          <div key={link.name} className={styles.mobileItem}>
            {link.dropdown ? link.dropdown.map(item => (
              <NavLink key={item.name} to={item.path} className={styles.mobileSubItem} onClick={() => setMobileOpen(false)}>{item.name}</NavLink>
            )) : link.external ? (
              <a href={link.path} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>{link.name}</a>
            ) : (
              <NavLink to={link.path} onClick={() => setMobileOpen(false)}>{link.name}</NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
