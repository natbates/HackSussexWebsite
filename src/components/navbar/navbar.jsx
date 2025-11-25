import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import messages from "./navbar.messages";
import HSLogo from "../../assets/hackSussex/gradient.png";
import { useSiteData } from "../../hooks/useSiteData";
import SketchyBorder from "../sketchy/sketch-border";
import SketchButton from "../sketchy/sketch-button";

const Navbar = () => {
  const navigate = useNavigate();
  const { siteData, loading } = useSiteData();

  if (loading) return null;

  const links = messages.links.map((link) => {
    if (link.name === "Merch Store") {
      return { ...link, path: siteData?.merch || "#", external: true };
    }
    return link;
  });

  return (
    <div className={styles.navbarContainer}>

      <div className={styles.leftContainer}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <img src={HSLogo} alt="Hack Sussex Logo" className={styles.logo} />
        </div>
      </div>

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
                    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                  }
                >
                  {link.name}
                </NavLink>
              )}

              {/* DROPDOWN MENU */}
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
        </div>

      </div>

      <div className={styles.rightContainer}>
        <SketchButton>Get Tickets</SketchButton>
        <SketchButton>Get In Touch</SketchButton>
      </div>

    </div>
  );
};

export default Navbar;
