import React, { useState } from 'react';

const InvoiceAndPayment = () => {
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [isPaid, setIsPaid] = useState(false);

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Mock payment processing
        alert('Payment successful!');
        setIsPaid(true);
    };

    const invoiceItems = [
        { id: 1, name: 'Oil Change', quantity: 1, price: 50 },
        { id: 2, name: 'Tire Rotation', quantity: 1, price: 30 },
        { id: 3, name: 'Brake Inspection', quantity: 1, price: 20 },
    ];

    const totalAmount = invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.heading}>Invoice and Payment</h2>

                {/* Invoice Section */}
                <div style={styles.invoiceSection}>
                    <h3 style={styles.subheading}>Invoice Details</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Item</th>
                                <th style={styles.th}>Quantity</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((item) => (
                                <tr key={item.id}>
                                    <td style={styles.td}>{item.name}</td>
                                    <td style={styles.td}>{item.quantity}</td>
                                    <td style={styles.td}>${item.price}</td>
                                    <td style={styles.td}>${item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={styles.total}>
                        <strong>Total: </strong>${totalAmount}
                    </div>
                </div>

                {/* Payment Section */}
                {!isPaid ? (
                    <div style={styles.paymentSection}>
                        <h3 style={styles.subheading}>Payment Details</h3>
                        <form onSubmit={handlePaymentSubmit} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="cardNumber">Card Number:</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="expiryDate">Expiry Date:</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={paymentDetails.expiryDate}
                                    onChange={handlePaymentChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label} htmlFor="cvv">CVV:</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={paymentDetails.cvv}
                                    onChange={handlePaymentChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <button type="submit" style={styles.button}>Pay ${totalAmount}</button>
                        </form>
                    </div>
                ) : (
                    <div style={styles.successMessage}>
                        <h3>Payment Successful!</h3>
                        <p>Thank you for your payment. Your invoice has been settled.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles
const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to right, #1e293b, #0f172a)',
        padding: '20px',
    },
    container: {
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    invoiceSection: {
        marginBottom: '20px',
    },
    subheading: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '10px',
    },
    th: {
        textAlign: 'left',
        borderBottom: '2px solid #ddd',
        padding: '10px',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    total: {
        textAlign: 'right',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '10px',
    },
    paymentSection: {
        marginTop: '20px',
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
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    successMessage: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#e6ffed',
        border: '1px solid #28a745',
        borderRadius: '10px',
    },
};

export default InvoiceAndPayment;
