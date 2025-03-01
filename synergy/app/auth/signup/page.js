"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/signup.css"; // Import the CSS file

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="signup-title">Signup</h2>
        {error && <p className="errorMessage">{error}</p>}
        <input 
          type="text" 
          placeholder="Name" 
          className="input1" 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="input1" 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input1" 
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="submit">Signup</button>
      </form>
    </div>
  );
}
