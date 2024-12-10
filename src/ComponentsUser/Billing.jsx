import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Billing = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/services/payment-history/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          const errorData = await response.json();
          setError(errorData.detail || "Failed to fetch payment history.");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      {/* Back Button */}
      <div>
        <button
          onClick={() => (window.location.href = "/Dashboard")}
          className="bg-gray-600 hover:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center mt-8 mb-10">
        Billing History
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse bg-gray-700 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-6 py-3 border-b border-gray-600">Invoice Number</th>
                <th className="px-6 py-3 border-b border-gray-600">Total Cost</th>
                <th className="px-6 py-3 border-b border-gray-600">Estimated Cost</th>
                <th className="px-6 py-3 border-b border-gray-600">Payment Status</th>
                <th className="px-6 py-3 border-b border-gray-600">Parts Used</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  }
                >
                  <td className="px-6 py-4 border-b border-gray-600">
                    {payment.invoice_number}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    ${payment.total_cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    ${payment.estimated_cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {payment.payment_status}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-600">
                    {payment.parts_used || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No payment history available.</p>
      )}
    </motion.div>
  );
};

export default Billing;
