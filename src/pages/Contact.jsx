import { useState } from "react";
import "./Contact.css";

const MAX_LENGTH = 300;

function Contact() {
  // useState #2: controlled form input, required on the Contact page
  const [message, setMessage] = useState("");

  // useState #3: toggles visibility of the writing-tips tooltip
  const [showTips, setShowTips] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const emailAddress = "d25it122@charusat.edu.in";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section className="section-wrap contact">
      <p className="section-label">Contact</p>
      <div className="contact-grid">
        <div className="contact-card">
          <div className="contact-form-header">
            <h3>Send a message</h3>
            <button
              type="button"
              className="tip-toggle"
              onClick={() => setShowTips((prev) => !prev)}
            >
              {showTips ? "Hide tips" : "Need help?"}
            </button>
          </div>

          {showTips && (
            <p className="contact-tooltip">
              Tip: mention what you'd like to collaborate on, and I'll get
              back to you by email — no need to be too formal!
            </p>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" required />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              maxLength={MAX_LENGTH}
              placeholder="Say hello..."
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <span className="char-count">
              {message.length}/{MAX_LENGTH}
            </span>

            <button type="submit" className="btn-primary">
              {submitted ? "✓ Message sent!" : "Send message"}
            </button>
          </form>
        </div>

        <div className="contact-card contact-direct">
          <h3>Prefer email?</h3>
          <p className="contact-direct-sub">Reach me directly at:</p>
          <ContactEmailWidget emailAddress={emailAddress} />
        </div>
      </div>
    </section>
  );
}

function ContactEmailWidget({ emailAddress }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="email-copy-widget" onClick={handleCopy}>
      <span className="email-text">{emailAddress}</span>
      <button className={`copy-button ${copied ? "copied" : ""}`}>
        {copied ? "✓ Copied!" : "Copy Address"}
      </button>
    </div>
  );
}

export default Contact;
