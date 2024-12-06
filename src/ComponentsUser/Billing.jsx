import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Billing = () => {
  const [view, setView] = useState("default");
  const [cards, setCards] = useState([]);
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "" });
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the current view based on query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setView(params.get("view") === "summary" ? "summary" : "default");
  }, [location.search]);

  // Handle input changes for adding a card
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  // Add a new card to the saved cards list
  const addCard = () => {
    if (cardDetails.name && cardDetails.number && cardDetails.expiry) {
      setCards([...cards, cardDetails]);
      setCardDetails({ name: "", number: "", expiry: "" });
      alert("Card added successfully!");
    } else {
      alert("Please fill out all fields!");
    }
  };

  // Delete a card with confirmation
  const deleteCard = (index) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter((_, i) => i !== index));
      alert("Card deleted successfully!");
    }
  };

  // Navigate back to the Dashboard
  const handleBack = () => {
    navigate("/Dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition duration-200"
        >
          ← Back to Dashboard
        </motion.button>
        <h1 className="text-4xl font-bold">Billing</h1>
      </div>

      {view === "summary" ? (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
          <ul className="space-y-4">
            {[
              { date: "March 1, 2020", amount: "$180" },
              { date: "February 10, 2021", amount: "$250" },
              { date: "April 5, 2020", amount: "$560" },
              { date: "June 25, 2019", amount: "$300" },
            ].map((payment, idx) => (
              <li
                key={idx}
                className="flex justify-between bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
              >
                <span>{payment.date}</span>
                <span className="font-bold">{payment.amount}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-600 p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-2xl font-bold mb-4">Outstanding Payments</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Oil Change</span>
                <span className="font-bold">$100</span>
              </li>
              <li className="flex justify-between">
                <span>Brake Check</span>
                <span className="font-bold">$150</span>
              </li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView("default")}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full transition duration-200"
            >
              Go to Add Payment Method
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">Outstanding Payments</h2>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Oil Change</span>
                <span className="font-bold">$100</span>
              </li>
              <li className="flex justify-between">
                <span>Brake Check</span>
                <span className="font-bold">$150</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">Add Payment Method</h2>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800 text-white rounded-lg p-4 shadow-md w-96 mx-auto"
            >
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md mb-4 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name on Card"
              />
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md mb-4 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Card Number (1234 5678 9101 1121)"
              />
              <input
                type="text"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md mb-4 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Expiry Date (MM/YY)"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={addCard}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full transition duration-200"
              >
                Add Card
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-700 p-6 rounded-lg shadow-lg mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">Saved Cards</h2>
            <div className="flex flex-wrap gap-4">
              {cards.length > 0 ? (
                cards.map((card, index) => (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    key={index}
                    className="bg-gray-800 text-white rounded-lg p-4 shadow-md w-96"
                  >
                    <p className="text-lg font-semibold mb-2">{card.name}</p>
                    <p className="text-xl font-bold mb-2">**** {card.number.slice(-4)}</p>
                    <p className="text-sm mb-4">{card.expiry}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => deleteCard(index)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full transition duration-200"
                    >
                      Delete Card
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <p className="text-center">No saved cards yet!</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Billing;