import React, { useState } from "react";
import styles from "./faq.module.css";
import messages from "./faq.messages";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{messages.pageTitle}</h1>

      <div className={styles.faqList}>
        {messages.faqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.question}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
                  ▾
                </span>
              </button>

              {isOpen && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
