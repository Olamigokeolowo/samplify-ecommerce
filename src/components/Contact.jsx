import React, { useState } from "react";
import "./Contact.css";
import {
    FaWhatsapp,
    FaInstagram,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import ceoAvatar from "../assets/ceo_avatar.png";

export default function Contact() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData((prev) => ({ ...prev, subject: "", message: "" }));
        }, 5000);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-grid">
                    {/* Contact Form Section */}
                    <div className="contact-form-section">
                        <div className="ceo-profile">
                            <img src={ceoAvatar} alt="CEO Avatar" className="ceo-avatar-img" />
                            <h2 className="ceo-name">Olowo Covenant Olamigoke</h2>
                            <p className="ceo-title">CEO of Samplify</p>
                        </div>
                        <h1 className="contact-title">Contact Us</h1>
                        <p className="contact-welcome">
                            Got a question, idea, or feedback? We’d love to hear from you!
                        </p>

                        {submitted ? (
                            <div className="success-message">
                                <div className="success-icon">✓</div>
                                <h2>Thanks for reaching out!</h2>
                                <p>We’ll get back to you shortly.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select a subject</option>
                                        <option value="Support">Support</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Partnership">Partnership</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="send-button">
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info Section */}
                    <div className="contact-info-section">
                        <div className="info-card">
                            <h2 className="info-title">Contact Information</h2>
                            <div className="info-item">
                                <span className="info-label">Email</span>
                                <a href="mailto:covenantolamigoke69@gmail.com" className="info-value">
                                    covenantolamigoke69@gmail.com
                                </a>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Phone Number</span>
                                <a href="tel:09023413618" className="info-value">
                                    09023413618
                                </a>
                            </div>

                            <div className="social-links-container">
                                <h3 className="social-title">Follow Us</h3>
                                <div className="contact-social-links">
                                    <a href="#" className="social-icon-link" aria-label="WhatsApp">
                                        <FaWhatsapp />
                                    </a>
                                    <a href="#" className="social-icon-link" aria-label="Instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="#" className="social-icon-link" aria-label="X">
                                        <FaXTwitter />
                                    </a>
                                    <a href="#" className="social-icon-link" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                    <a href="#" className="social-icon-link" aria-label="GitHub">
                                        <FaGithub />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
