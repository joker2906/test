import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import loginImg from './login.png';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "450px",
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      padding: "3rem",
      borderRadius: "25px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
      position: "relative",
      overflow: "hidden",
    },
    containerBefore: {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: "linear-gradient(45deg, rgba(255, 215, 0, 0.05) 0%, transparent 50%, rgba(255, 215, 0, 0.05) 100%)",
      animation: "shimmer 3s infinite",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      marginBottom: "2rem",
      position: "relative",
      zIndex: "2",
    },
    title: {
      color: "#ffd700",
      fontSize: "2.5rem",
      fontWeight: 700,
      fontFamily: "'Playfair Display', serif",
      textShadow: "0 0 30px rgba(255, 215, 0, 0.5)",
    },
    underline: {
      width: "60px",
      height: "4px",
      background: "linear-gradient(90deg, #ffd700, #ffed4e)",
      borderRadius: "2px",
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
    },
    inputField: {
      width: "100%",
      padding: "1rem 1.5rem",
      marginBottom: "1.5rem",
      border: "1px solid rgba(255, 215, 0, 0.3)",
      borderRadius: "15px",
      fontSize: "1rem",
      outline: "none",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      color: "#e8e8e8",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    submitButton: {
      width: "100%",
      background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      color: "#1a1a2e",
      border: "none",
      borderRadius: "50px",
      padding: "1rem",
      fontSize: "1.1rem",
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
      cursor: "pointer",
      marginTop: "1rem",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 8px 32px rgba(255, 215, 0, 0.3)",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    submitButtonHover: {
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: "0 12px 40px rgba(255, 215, 0, 0.5)",
    },
    footerText: {
      marginTop: "1.5rem",
      color: "rgba(232, 232, 232, 0.8)",
      fontSize: "0.9rem",
      textAlign: "center",
    },
    link: {
      color: "#ffd700",
      textDecoration: "none",
      fontWeight: "600",
      marginLeft: "5px",
      transition: "all 0.3s ease",
    },
    linkHover: {
      textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
    },
    page: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
    },
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("⚠️ Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      alert("🔑 Password must be at least 8 characters long!");
      return;
    }
    if (password !== confirmPassword) {
      alert("🔒 Passwords do not match!");
      return;
    }
    if (!email.includes('@gmail.com')) {
      alert("📧 Email must be a Gmail address.");
      return;
    }
    alert(`🎉 Welcome, ${firstName} ${lastName}! Your account has been created successfully.`);
    navigate('/');
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundImage: `url(${loginImg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}>
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.containerBefore}></div>
          <div style={styles.header}>
            <div style={styles.title}>Join Us</div>
            <div style={styles.underline}></div>
          </div>

          <form onSubmit={handleSignUp} style={{ width: "100%", position: "relative", zIndex: "2" }}>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.inputField}
              required
            />
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.inputField}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.inputField}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.inputField}
              required
            />
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.inputField}
              required
            />

            <button type="submit" style={styles.submitButton}>
              Create Account
            </button>
          </form>

          <div style={styles.footerText}>
            Already have an account?
            <Link to="/" style={styles.link}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
