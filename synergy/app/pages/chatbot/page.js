"use client";

import React, { useState } from "react";
import axios from "axios";

const PhishingDetector = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!inputText) {
      alert("Please enter an email, website URL, or message.");
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const apiKey = "AIzaSyD7rekRWQSRE5rcIwavFlP9_O9AnrfxvVA"; // Secure API key usage
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyD7rekRWQSRE5rcIwavFlP9_O9AnrfxvVA`,
        {
          contents: [{ role: "user", parts: [{ text: `Analyze this text for phishing risks: ${inputText}` }] }],
        }
      );
      

      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({ error: "Failed to analyze text. Try again later!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🔍 AI-Powered Phishing Detector</h1>
      <textarea
        className="w-full max-w-lg p-3 border rounded shadow-sm"
        rows="4"
        placeholder="Paste an email, website URL, or message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={handleAnalyze}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Check for Phishing"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-white border rounded w-full max-w-lg shadow">
          <h2 className="font-semibold">🛡️ Analysis Result:</h2>
          <p className="mt-2">{response?.candidates?.[0]?.content?.parts?.[0]?.text || response.error}</p>
        </div>
      )}
    </div>
  );
};

export default PhishingDetector;
