/*************************************************
 * Filename: contact_form_component.js
 *
 * Purpose: Interactive contact form component. Provides field validation,
 * character counters, animated input fields, and simulated success state.
 *************************************************/

import React, { useState } from 'react';
import styles from './contact_form_styles.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const maxMessageLength = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Enforce message character limit
    if (name === 'message' && value.length > maxMessageLength) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Clear any previous submit error
    if (errors.submit) {
      setErrors(prev => {
        const { submit, ...rest } = prev;
        return rest;
      });
    }

    fetch("https://formsubmit.co/ajax/hamiltonn428@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          email: '',
          subject: '',
          message: ''
        });
      })
      .catch(err => {
        console.error("Form submission failed:", err);
        setIsSubmitting(false);
        setErrors(prev => ({
          ...prev,
          submit: `Submission failed: ${err.message}. Please check your connection or email directly at hamiltonn428@gmail.com.`
        }));
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question, collaboration idea, or project you'd like to discuss? Drop me a line below!
        </p>
      </div>

      <div className={styles.contactGrid}>
        {/* Contact Info Panel */}
        <div className={styles.infoPanel}>
          <h3>Contact Details</h3>
          <p className={styles.infoDesc}>
            Feel free to reach out via the form, email directly, or connect through social media.
          </p>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Email</span>
              <a href="mailto:hamiltonn428@gmail.com" className={styles.infoLink}>
                hamiltonn428@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Locations</span>
              <span className={styles.infoValue}>Berea, KY / Blacksburg, VA</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Availability</span>
              <span className={styles.infoValue}>Open to research & development roles</span>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className={styles.formPanel}>
          {submitSuccess ? (
            <div className={styles.successState}>
              <div className={styles.checkmarkWrapper}>
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.checkmarkIcon}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Message Sent!</h3>
              <p>
                Thank you for reaching out. I appreciate your message and will respond as soon as possible.
              </p>
              <button 
                onClick={() => setSubmitSuccess(false)}
                className={styles.resetBtn}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>

              {/* Email Field */}
              <div className={`${styles.fieldGroup} ${errors.email ? styles.fieldError : ''}`}>
                <div className={styles.inputWrapper}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={styles.input}
                  />
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                </div>
                {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
              </div>

              {/* Subject Field */}
              <div className={`${styles.fieldGroup} ${errors.subject ? styles.fieldError : ''}`}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={styles.input}
                  />
                  <label htmlFor="subject" className={styles.label}>Subject</label>
                </div>
                {errors.subject && <span className={styles.errorMessage}>{errors.subject}</span>}
              </div>

              {/* Message Field */}
              <div className={`${styles.fieldGroup} ${errors.message ? styles.fieldError : ''}`}>
                <div className={styles.inputWrapper}>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={`${styles.input} ${styles.textarea}`}
                  />
                  <label htmlFor="message" className={styles.label}>Your Message</label>
                </div>
                <div className={styles.textareaMeta}>
                  {errors.message ? (
                    <span className={styles.errorMessage}>{errors.message}</span>
                  ) : (
                    <span></span>
                  )}
                  <span className={styles.charCounter}>
                    {formData.message.length} / {maxMessageLength}
                  </span>
                </div>
              </div>

              {/* Submit Error Message */}
              {errors.submit && (
                <div className={styles.errorContainer}>
                  <div className={styles.submitError}>
                    {errors.submit}
                  </div>
                  <a 
                    href={`mailto:hamiltonn428@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(formData.message)}`}
                    className={styles.fallbackMailtoBtn}
                  >
                    <span>Send Email Directly</span>
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={styles.submitBtn}
              >
                {isSubmitting ? (
                  <div className={styles.spinner}></div>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
