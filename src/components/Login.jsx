import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear previous error messages
    setLoading(true); // Set loading state
    try {
      // Login API call
      const response = await fetch("http://127.0.0.1:8000/api/customers/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token in localStorage
        alert("Login successful!");
        navigate("/Dashboard"); // Redirect to Dashboard page after login
      } else if (response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        const errorData = await response.json();
        setError(errorData?.detail || "An error occurred. Please try again later.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("A network error occurred. Please check your connection or try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/Signup"); // Redirect to signup page
  };

  const handleResetPassword = () => {
    navigate("/ResetPassword"); // Redirect to reset password page
  };

  return (
    <div style={styles.page}>
      <div style={styles.row}>
        <div style={styles.infoSection}>
          <p>IT'S TIME TO GET YOUR CAR</p>
          <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Serviced<span className="text-blue-400"> Right</span>
          </h1>
        </div>
        <div style={styles.container}>
          <h2 style={styles.header}>Login</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                aria-label="Email address"
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                aria-label="Password"
                required
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                type="button"
                onClick={handleSignUpRedirect}
                style={styles.buttonAlt}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={handleResetPassword}
                style={styles.buttonAlt}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles with gradient applied to the page
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #1e293b, #0f172a)",
    color: "#ffffff",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  infoSection: {
    flex: 1,
    padding: "20px",
  },
  container: {
    flex: 1,
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    color: "#000",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  buttonAlt: {
    padding: "10px",
    backgroundColor: "#6C757D",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
    textAlign: "center",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;
