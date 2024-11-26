import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setError('');
        // Mock login logic
        console.log('Logging in with', { email, password });
        alert('Login successful!');
    };

    return (
        <div style={styles.page}>
            <div style={styles.row}>
                <div style={styles.infoSection}>
                    <p>ITS TIME TO GET YOUR CAR</p>
                    <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>
                        Serviced<span className='text-blue-400'> Right</span>
                    </h1>
                </div>
                <div style={styles.container}>
                    <h2 style={styles.header}>Login</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        {error && <p style={styles.error}>{error}</p>}
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
                        <button type="submit" style={styles.button}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Styles with gradient applied to the page
const styles = {
    page: {
        minHeight: '100vh', // Full viewport height
        display: 'flex', // Centering
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #1e293b, #0f172a)', // Gradient background
        color: '#ffffff', // Text color for contrast
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px', // Space between the two sections
    },
    infoSection: {
        flex: 1,
        padding: '20px',
    },
    container: {
        flex: 1,
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#ffffff', // Card background color
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        color: '#000', // Text color for the form content
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
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        marginBottom: '10px',
    },
};

export default Login;
