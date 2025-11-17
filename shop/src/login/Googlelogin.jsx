import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import loginImg from "./login.png";
import "./styles.css";
import { auth, provider, signInWithPopup } from "../Firebase";
import "react-toastify/dist/ReactToastify.css";

const Googlelogin = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

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
      textAlign: "center",
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
      textTransform: "uppercase",
    },
    underline: {
      width: "60px",
      height: "4px",
      background: "linear-gradient(90deg, #ffd700, #ffed4e)",
      borderRadius: "2px",
      boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
    },
    submit: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "50px",
      color: "#1a1a2e",
      background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
      cursor: "pointer",
      border: "none",
      transition: "all 0.4s ease",
      boxShadow: "0 6px 24px rgba(255, 215, 0, 0.3)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginTop: "1rem",
    },
    signupLink: {
      display: "block",
      width: "100%",
      padding: "0.9rem 1.2rem",
      background: "rgba(255, 255, 255, 0.1)",
      color: "rgba(232, 232, 232, 0.9)",
      borderRadius: "50px",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
      marginTop: "1rem",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    page: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
    },
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Save a simple auth flag or token so ProtectedRoute can detect login
        try {
          localStorage.setItem("token", result.user?.accessToken || "google_logged_in");
        } catch (e) {
          // ignore storage errors, still navigate
        }
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch(() => {
        toast.error("Login failed!");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${loginImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.title}>Continue with Google</div>
            <div style={styles.underline}></div>
          </div>

          <button style={styles.submit} onClick={handleGoogleLogin}>
            Sign In with Google
          </button>

          <Link to="/signup" style={styles.signupLink}>
            Or create an account
          </Link>
        </div>
      </div>

      <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} />
    </div>
  );
};

export default Googlelogin;
