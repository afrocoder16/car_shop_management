import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use React Router navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !username || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        try {
            // Signup API call
            const response = await fetch('http://127.0.0.1:8000/api/customers/sign-up/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert('Account created successfully! Please log in.');
                navigate('/Login'); // Redirect to login page after signup
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'An error occurred during signup.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/Login'); // Redirect to login page
    };

    return (
        <div style={styles.page}>
            <div style={styles.row}>
                <div style={styles.infoSection}>
                    <p>JOIN OUR PLATFORM</p>
                    <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Serviced<span className="text-blue-400"> Right</span>
                    </h1>
                </div>
                <div style={styles.container}>
                    <h2 style={styles.header}>Sign Up</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {error && <p style={styles.error}>{error}</p>}
                        <div style={styles.inputGroup}>
                            <label htmlFor="username" style={styles.label}>Username:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="email" style={styles.label}>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="password" style={styles.label}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.inputGroup}>
                            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.buttonGroup}>
                            <button type="submit" style={styles.button}>Sign Up</button>
                            <button
                                type="button"
                                onClick={handleLoginRedirect}
                                style={styles.button}
                            >
                                Login
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
        justifyContent: 'space-between',
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
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default Signup;
