import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/customers/reset-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successful. Check your email.');
      } else {
        setError(data.detail || 'Error resetting password.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.row}>
        <div style={styles.infoSection}>
          <p>RESET YOUR PASSWORD</p>
          <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            We’ve Got You<span className="text-blue-400"> Covered</span>
          </h1>
        </div>
        <div style={styles.container}>
          <h2 style={styles.header}>Reset Password</h2>
          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>
            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.button}>Send Reset Link</button>
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
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #1e293b, #0f172a)',
    color: '#ffffff',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  infoSection: {
    flex: 1,
    padding: '20px',
  },
  container: {
    flex: 1,
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: '#000',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '6px 10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default ResetPassword;
