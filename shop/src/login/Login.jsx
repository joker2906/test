import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "./login.png";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      transition: "all 0.3s ease",
    },
    submit: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "180px",
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
    },
    gray: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "rgba(232, 232, 232, 0.7)",
      border: "1px solid rgba(255, 215, 0, 0.2)",
    },
    forgotPassword: {
      textAlign: "center",
      marginTop: "1rem",
      color: "rgba(232, 232, 232, 0.9)",
      fontSize: "0.95rem",
    },
    forgotPasswordSpan: {
      color: "#ffd700",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "all 0.3s ease",
    },
    submitContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "2rem",
      width: "100%",
    },
    page: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
    },
  };

  // Handle login logic with Toasts
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("⚠️ Please fill in both email and password.", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (!email.includes("@gmail.com")) {
      toast.error("📧 Email must be a valid Gmail address!", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("🔑 Password must be at least 8 characters long.", {
        position: "top-center",
        theme: "dark",
      });
      return;
    }

    toast.success("✅ Login successful! Redirecting...", {
      position: "top-center",
      theme: "dark",
    });

    setTimeout(() => {
      navigate("/home");
    }, 2500);
  };

  const handleSignUp = () => {
    toast.info("📝 Redirecting to Sign Up...", {
      position: "top-center",
      theme: "dark",
    });
    setTimeout(() => navigate("/signup"), 1500);
  };

  const handleForgotPassword = () => {
    toast.info("🔒 Redirecting to password recovery...", {
      position: "top-center",
      theme: "dark",
    });
    setTimeout(() => navigate("/forgot-password"), 1500);
  };

  const handleSigninwithGOOGLE = () => {
    toast.success("🌐 Signing in with Google...", {
      position: "top-center",
      theme: "dark",
    });
    setTimeout(() => navigate("/home"), 2000);
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
            <div style={styles.title}>Welcome Back</div>
            <div style={styles.underline}></div>
          </div>

          <form onSubmit={handleLogin}>
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
            <div style={styles.forgotPassword}>
              Forgot Password?{" "}
              <span
                onClick={handleForgotPassword}
                style={styles.forgotPasswordSpan}
              >
                Click here
              </span>
            </div>

            <div style={styles.submitContainer}>
              <button type="submit" style={styles.submit}>
                Log In
              </button>

              <button
                type="button"
                onClick={handleSignUp}
                style={{ ...styles.submit, ...styles.gray }}
              >
                Sign Up
              </button>
            </div>

            <button
              type="button"
              onClick={handleSigninwithGOOGLE}
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
                color: "#1a1a2e",
                border: "none",
                borderRadius: "50px",
                padding: "1rem",
                fontSize: "1.1rem",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                marginTop: "1rem",
                transition: "all 0.4s ease",
                boxShadow: "0 8px 32px rgba(255, 215, 0, 0.3)",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer autoClose={2000} hideProgressBar={false} newestOnTop={false} />
    </div>
  );
}

export default Login;
