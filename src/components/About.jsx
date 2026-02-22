import React from "react";
import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.hero}>
        <h1>About Samplify</h1>
        <p className={styles.subtitle}>Empowering your shopping journey with technology and heart.</p>
      </section>
      <section className={styles.story}>
        <h2>Our Story</h2>
        <p>
          Samplify is a full-stack e-commerce application developed by a Computer Science student as part of a hands-on learning journey into modern web technologies. The project demonstrates practical implementation of frontend development, backend communication, and responsive UI design, with the goal of building scalable and efficient web solutions.
        </p>
        <p>
          What started as a classroom idea quickly grew into a passion project, blending creativity, code, and customer experience. Every feature is crafted to make shopping simple, secure, and enjoyable for everyone.
        </p>
      </section>
      <section className={styles.vision}>
        <h2>Our Vision & Mission</h2>
        <ul>
          <li>Deliver seamless, intuitive shopping experiences.</li>
          <li>Connect people with products they love.</li>
          <li>Embrace innovation and continuous learning.</li>
          <li>Build a community where feedback shapes the future.</li>
        </ul>
      </section>
      <section className={styles.features}>
        <h2>What Makes Samplify Special?</h2>
        <div className={styles.featureCards}>
          <div className={styles.featureCard}>
            <h3>Modern Tech Stack</h3>
            <p>Built with React, Node.js, and responsive CSS for speed and reliability.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Customer-Centric Design</h3>
            <p>Easy navigation, clear visuals, and helpful features for a delightful experience.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Continuous Improvement</h3>
            <p>We listen, learn, and update—your feedback drives our progress.</p>
          </div>
        </div>
      </section>
      <section className={styles.invite}>
        <h2>Join the Samplify Journey</h2>
        <p>
          Whether you’re a shopper, a tech enthusiast, or just curious, Samplify welcomes you! Explore, enjoy, and let us know how we can make your experience even better.
        </p>
      </section>
    </div>
  );
}
