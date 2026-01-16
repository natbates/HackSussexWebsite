import React, { useState } from "react";
import styles from "./faq.module.css";
import messages from "./faq.messages";

const FAQ = () => {
  const [openIds, setOpenIds] = useState([]); // <-- array now

  const toggleFAQ = (id) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((openId) => openId !== id) // close
        : [...prev, id] // open
    );
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{messages.pageTitle}</h1>
      <p dangerouslySetInnerHTML={{ __html: messages.description }} />

      <div className={styles.faqList}>
        {messages.faqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);

          return (
            <div key={faq.id} className={styles.faqItem}>
              <button
                className={styles.question}
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span
                  className={`${styles.arrow} ${
                    isOpen ? styles.open : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              <div
                className={`${styles.answer} ${
                  isOpen ? styles.open : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
