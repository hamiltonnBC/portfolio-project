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
    name: '',
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
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

    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
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
            <div className={styles.infoIcon}>✉</div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Email</span>
              <a href="mailto:hamiltonn428@gmail.com" className={styles.infoLink}>
                hamiltonn428@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📍</div>
            <div className={styles.infoText}>
              <span className={styles.infoLabel}>Locations</span>
              <span className={styles.infoValue}>Berea, KY / Blacksburg, VA</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>🤝</div>
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
                <div className={styles.checkmark}>✓</div>
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
              {/* Name Field */}
              <div className={`${styles.fieldGroup} ${errors.name ? styles.fieldError : ''}`}>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className={styles.input}
                  />
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                </div>
                {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
              </div>

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
