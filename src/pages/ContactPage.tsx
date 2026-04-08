import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendContactMessage } from "../services/contactService";

import styles from "./ContactPage.module.css";

/* ==================================================
   TYPES
   ================================================== */

type ContactStatus = "idle" | "success" | "error";

type ContactContext = {
  type?: string;
};

/* ==================================================
   PAGE
   ================================================== */

export default function ContactPage() {
  const location = useLocation();
  const context = location.state as ContactContext | null;

  const isPodcastApplication = context?.type === "podcast-application";

  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<ContactStatus>("idle");

  /* ==================================================
     CONTEXT PREFILL (SAFE — NON-DESTRUCTIVE)
     ================================================== */

  useEffect(() => {
    if (isPodcastApplication) {
      setHeading((prev) =>
        prev ? prev : "Podcast Application"
      );

      setMessage((prev) =>
        prev
          ? prev
          : "Podcast Name:\nPodcast URL:\nRegion:\nDescription:\n\n"
      );
    }
  }, [isPodcastApplication]);

  /* ==================================================
     VALIDATION
     ================================================== */

  function isValidEmail(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
  }

  function isFormValid(): boolean {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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

  /* ==================================================
     RENDER
     ================================================== */

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* TITLE */}
        <h1 className={styles.title}>Contact</h1>

        {/* CONTEXT INFO (ONLY WHEN APPLICABLE) */}
        {isPodcastApplication && (
          <div className={styles.info}>
            Podcast application — please include your podcast URL,
            region, and a short description.
          </div>
        )}

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
              placeholder="Describe your request, feedback, or application..."
              rows={6}
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