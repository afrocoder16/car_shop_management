import React from "react";

const MechanicTools = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto bg-gray-700 p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Mechanic Tools</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Explore the essential tools required for diagnosing, repairing, and maintaining vehicles.
        </p>

        {/* Tool Categories */}
        {tools.map((category, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
            <ul className="space-y-4">
              {category.items.map((tool, toolIndex) => (
                <li
                  key={toolIndex}
                  className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between items-start"
                >
                  <div>
                    <h3 className="text-xl font-bold">{tool.name}</h3>
                    <p className="text-gray-400">{tool.description}</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicTools;