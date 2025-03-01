"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import "./styles/landingPage.css"; // Import the CSS file

export default function LandingPage() {
  return (
    <div className="page-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>PhishGuard</h1>
      </nav>

      {/* Auth Section (Top-Right Corner) */}
      <section className="auth-section">
        <h2>Secure Your Accounts</h2>
        <p>Stay protected from phishing attacks with real-time monitoring.</p>
        <div className="auth-buttons">
          <Link href="/auth/login" className="auth-btn primary">
            Login
          </Link>
          <Link href="/auth/signup" className="auth-btn secondary">
            Sign Up
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-title"
        >
          Advanced Phishing Protection
        </motion.h2>
        <p className="hero-description">
          Detect and prevent phishing attacks with AI-powered security.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
          <h3>Real-Time Alerts</h3>
          <p>Get instant notifications for potential threats.</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
          <h3>AI-Powered Detection</h3>
          <p>Identify suspicious links and emails automatically.</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="feature-card">
          <h3>Comprehensive Reports</h3>
          <p>Monitor and analyze security threats in-depth.</p>
        </motion.div>
      </section>
    </div>
  );
}
