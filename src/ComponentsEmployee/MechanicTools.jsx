import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MechanicTools = () => {
  const navigate = useNavigate();

  // List of tools categorized by their purpose
  const tools = [
    {
      category: "Diagnostic Tools",
      items: [
        { name: "OBD-II Scanner", description: "Used to diagnose vehicle issues via error codes." },
        { name: "Battery Tester", description: "Checks the condition of the vehicle's battery." },
      ],
    },
    {
      category: "Repair Tools",
      items: [
        { name: "Torque Wrench", description: "Ensures bolts and nuts are tightened to the correct torque." },
        { name: "Impact Driver", description: "Helps remove stubborn screws and bolts." },
        { name: "Socket Set", description: "Used for a variety of fastener types and sizes." },
      ],
    },
    {
      category: "Fluid Maintenance Tools",
      items: [
        { name: "Oil Filter Wrench", description: "Removes and installs oil filters easily." },
        { name: "Coolant Tester", description: "Tests the quality and freezing/boiling points of engine coolant." },
      ],
    },
    {
      category: "Body and Suspension Tools",
      items: [
        { name: "Hydraulic Jack", description: "Lifts vehicles for undercarriage work." },
        { name: "Alignment Gauge", description: "Ensures proper wheel alignment." },
      ],
    },
  ];

  // Handle Back Button Navigation
  const handleBack = () => {
    navigate("/mechanics-dashboard");
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-5xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg relative">
        {/* Back Button */}
        <motion.button
          className="absolute top-4 right-6 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md font-bold transition-transform transform hover:scale-105"
          onClick={handleBack}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Back to Dashboard
        </motion.button>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mechanic Tools
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-300 mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore the essential tools required for diagnosing, repairing, and maintaining vehicles.
        </motion.p>

        {/* Tool Categories */}
        {tools.map((category, index) => (
          <motion.div
            key={index}
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
            <ul className="space-y-4">
              {category.items.map((tool, toolIndex) => (
                <motion.li
                  key={toolIndex}
                  className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between items-start hover:bg-gray-700 transition-transform transform hover:scale-105"
                  whileHover={{ scale: 1.03 }}
                >
                  <div>
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <p className="text-gray-400">{tool.description}</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-transform transform hover:scale-105">
                    Details
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MechanicTools;