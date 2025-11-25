import React from "react";
import styles from "./footer.module.css";
import messages from "./footer.messages";
import logo from "../../assets/hackSussex/gradient.png"

const Footer = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.column}>
                    <img
                        src={logo}
                        alt={messages.logoAlt}
                        className={styles.logo}
                    />
                    <div className={styles.contact}>
                        <strong>{messages.contact.orgName}</strong>
                        <br />
                        {messages.contact.addressLines.map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                        ))}
                        <a href={`mailto:${messages.contact.email}`}>
                        {messages.contact.email}
                        </a>
                        {messages.contact.phone && (
                        <>
                            <br />
                            <a href={`tel:${messages.contact.phone}`}>
                            {messages.contact.phone}
                            </a>
                        </>
                        )}
                    </div>
                </div>

                <div className={styles.column}>
                    <h3>{messages.quickLinksTitle}</h3>
                    <ul>
                        {messages.quickLinks.map((link, i) => (
                        <li key={i}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.column}>
                <h3>{messages.eventTypesTitle}</h3>
                <ul>
                    {messages.eventTypes.map((type, i) => (
                    <li key={i}>
                        <a href={type.href}>{type.label}</a>
                    </li>
                    ))}
                </ul>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>
                © {new Date().getFullYear()} {messages.copyrightHolder}.{" "}
                {messages.copyrightNote}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
