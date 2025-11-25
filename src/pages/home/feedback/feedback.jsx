import { useState, useEffect } from "react";
import styles from "./feedback.module.css";

const Feedback = () => {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxjDCVtVu1Lyv1U6rwIuimH2ss84w9R5dF7ITg-oowyAwXyeivnb9fqtR9gCHQW8FmPfw/exec";

  // Check localStorage if user already submitted
  useEffect(() => {
    const hasSubmitted = localStorage.getItem("feedbackSubmitted");
    if (hasSubmitted === "true") setSubmitted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestion }),
      });

      // Save submission state
      localStorage.setItem("feedbackSubmitted", "true");
      setSubmitted(true);
      alert("Thanks for your feedback!");
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.feedbackForm}>
            <h1>Help us out!</h1>
            <p className={styles.alreadySubmitted}>
            You have already submitted feedback. Thank you!
            </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
        <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <h1>Help us out!</h1>

        <textarea
            name="suggestion"
            placeholder="Do you have any suggestions?"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            required
        />

        <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
        </button>
        </form>
    </div>
  );
};

export default Feedback;
