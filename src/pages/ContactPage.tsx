import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

import styles from "./ContactPage.module.css";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  /* ==================================================
     VALIDATION
     ================================================== */

  function isValidEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function isFormValid() {
    return (
      isValidEmail(email) &&
      date.trim() !== "" &&
      heading.trim().length > 2 &&
      message.trim().length > 5
    );
  }

  /* ==================================================
     SUBMIT
     ================================================== */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isFormValid()) {
      console.warn("RAZ: invalid contact form");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const result = await sendContactMessage({
        email,
        date,
        heading,
        message,
      });

      if (result.success) {
        setStatus("success");

        /* RESET FORM */
        setEmail("");
        setDate("");
        setHeading("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.warn("RAZ: contact submit failed", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Contact Support</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* EMAIL */}
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          {/* DATE */}
          <div className={styles.field}>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* HEADING */}
          <div className={styles.field}>
            <label>Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="What is this about?"
            />
          </div>

          {/* MESSAGE */}
          <div className={styles.field}>
            <label>Comments</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue or feedback..."
              rows={5}
            />
          </div>

          {/* STATUS */}
          {status === "success" && (
            <div className={styles.success}>
              Message sent successfully
            </div>
          )}

          {status === "error" && (
            <div className={styles.error}>
              Something went wrong. Please try again.
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className={styles.button}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}