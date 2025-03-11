# PhishGuard

PhishGuard is a cutting-edge phishing detection and security monitoring dashboard built with **React, Next.js, Tailwind CSS, and Recharts**. It provides real-time analytics and insights into phishing threats, helping organizations and individuals stay protected against malicious attacks.

## Features

- **Phishing Detection Dashboard**: Displays real-time statistics and insights on detected phishing threats.
- **Email Phishing Analysis**: Analyzes emails for phishing patterns using keyword detection, URL scanning, and domain reputation checks.
- **Telegram Spam Classifier**: Detects spam and phishing messages sent via Telegram.
- **Security Health Monitoring**: Tracks and visualizes security threats and potential vulnerabilities.
- **Real-time Alerts**: Provides notifications for detected phishing threats.
- **User-friendly Interface**: Clean and intuitive design powered by Tailwind CSS.

---

## Phishing Detection Mechanism

PhishGuard employs a **multi-layered phishing detection approach** to analyze incoming messages, emails, and URLs for potential phishing threats. The system integrates **machine learning models, keyword analysis, domain reputation checks, and URL scanning** to enhance detection accuracy.

### Email Phishing Detection

The email phishing detection system retrieves emails from Gmail and analyzes their content for malicious intent. The detection process includes:

1. **Keyword-based Phishing Detection**: The system scans emails for phishing-related phrases such as "Verify your account" or "Urgent action required."
2. **URL Analysis**:
   - Extracts URLs from email content.
   - Checks against phishing databases such as Google Safe Browsing and VirusTotal.
   - Conducts WHOIS lookups to verify domain reputation (e.g., detecting newly registered domains as potential threats).
3. **Pattern-Based Phishing Identification**:
   - Examines email content structure for social engineering tactics.
   - Flags emails that mimic official institutions or request sensitive information.

This approach ensures that phishing emails are detected with **high accuracy**, providing users with detailed insights on potential threats.

### Telegram Spam and Phishing Detection

The Telegram spam classifier is designed to detect **malicious and phishing messages** sent via Telegram. This system leverages **machine learning models** trained to differentiate between legitimate and phishing messages. The classification process includes:

1. **Text Analysis**:
   - Examines message content for phishing-related keywords.
   - Checks if the message contains suspicious links or requests for personal information.
2. **Machine Learning-Based Classification**:
   - A pre-trained spam classifier processes the input text.
   - If the message is classified as phishing, the system flags it accordingly.

By integrating this system, PhishGuard enhances security for Telegram users by detecting and mitigating phishing attempts in real time.

### Security Dashboard

The **real-time security dashboard** provides an overview of phishing threats, security alerts, and user activity. Built with **Recharts and Next.js**, it visualizes:

- Number of phishing threats detected.
- Real-time monitoring of emails and messages.
- Alerts for suspicious activities.
- Domain reputation analysis.

The dashboard is designed for **security professionals, businesses, and individuals** looking to **proactively monitor** their communication channels for phishing attempts.

---

## Technologies Used

- **Frontend**: React, Next.js, Tailwind CSS, Recharts
- **Backend**: Flask (for the Telegram spam classifier), Node.js (for email phishing detection)
- **Machine Learning**: Scikit-learn, NLP-based classification models
- **Google APIs**: Gmail API for email fetching and analysis
- **VirusTotal API & WHOIS Lookup**: URL and domain reputation verification

---

## Future Enhancements

- **AI-based phishing detection**: Integrate advanced machine learning models for improved accuracy.
- **Browser extension**: Provide phishing alerts in real-time while browsing.
- **Multi-platform support**: Expand detection to other communication channels.
- **Automated phishing response**: Implement automated actions to mitigate threats.

PhishGuard is constantly evolving to provide better security and protection against cyber threats. 🚀

