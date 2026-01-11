import React from "react";
import styles from "./footer.module.css";
import messages from "./footer.messages";
import logo from "../../assets/hackSussex/gradient.png";
import Socials from "../socials/socials";

const Footer = () => {
    return (
        <footer className={styles.container}>
            {/* Top section */}
            <div className={styles.footer}>
                {/* Left: Logo only */}
                <div className={styles.logoColumn}>
                    <img
                        src={logo}
                        alt={messages.logoAlt}
                        className={styles.logo}
                    />
                </div>

                {/* Middle: All links */}
                <div className={styles.linksColumn}>
                    <div className={styles.linksGroup}>
                        <ul>
                            {messages.eventTypes.map((type, i) => (
                                <li key={i}>
                                    <a href={type.href}>{type.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.linksGroup}>
                        <ul>
                            {messages.quickLinks.map((link, i) => (
                                <li key={i}>
                                    <a href={link.href}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.linksGroup}>
                        <Socials />
                    </div>
                </div>

                {/* Right: Contact button */}
                <div className={styles.contactColumn}>
                    <button
                    >
                        Contact Us
                    </button>
                </div>
            </div>

            {/* Bottom full-width row */}
            <div className={styles.bottomRow}>
                <div className={styles.address}>
                    <strong>{messages.contact.orgName}</strong>
                    <br />
                    {messages.contact.addressLines.map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </div>

                <div className={styles.copyright}>
                    © {new Date().getFullYear()} {messages.copyrightHolder}.{" "}
                    {messages.copyrightNote}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
