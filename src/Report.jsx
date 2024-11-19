import React, { useState, useEffect } from "react";
import { MdFitnessCenter } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { IoMdBicycle } from "react-icons/io";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report = ({ initialScores = {}, responses = [] }) => {
  const categories = [
    { id: "physical", name: "Physical Fitness", icon: <MdFitnessCenter size={24} className="text-blue-600" />, tooltip: "Track your physical activity and stamina." },
    { id: "mental", name: "Mental Wellness", icon: <FaBrain size={24} className="text-purple-600" />, tooltip: "Measure your mental clarity and stress levels." },
    { id: "diet", name: "Diet", icon: <GiFruitBowl size={24} className="text-green-600" />, tooltip: "Evaluate your daily nutritional habits." },
    { id: "lifestyle", name: "Daily Routine", icon: <IoMdBicycle size={24} className="text-orange-600" />, tooltip: "Analyze your daily routine and productivity." },
  ];

  const defaultScores = {
    physical: 7,
    mental: 8,
    diet: 6,
    lifestyle: 5,
  };

  const [finalScores, setFinalScores] = useState({ ...defaultScores, ...initialScores });
  const [showConfirm, setShowConfirm] = useState(false); // Confirmation dialog state
  const [toggleView, setToggleView] = useState("chart"); // Toggle between chart and scores
  const [date, setDate] = useState("");

  const [chartData, setChartData] = useState({
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Category Scores (out of 10)",
        data: categories.map((category) => finalScores[category.id]),
        backgroundColor: ["#42a5f5", "#ab47bc", "#66bb6a", "#ffa726"],
        borderRadius: 8,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: categories.map((category) => category.name),
      datasets: [
        {
          label: "Category Scores (out of 10)",
          data: categories.map((category) => finalScores[category.id]),
          backgroundColor: ["#42a5f5", "#ab47bc", "#66bb6a", "#ffa726"],
          borderRadius: 8,
        },
      ],
    });

    // Set current date
    const today = new Date();
    setDate(today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));
  }, [finalScores]);

  const finalResponses = responses.length > 0 ? responses : [
    {
      question: "How often do you exercise?",
      choice: "3-4 times a week",
      advice: "Keep up the good work! Consistency is key.",
    },
    {
      question: "How often do you experience stress?",
      choice: "Frequently",
      advice: "Practice mindfulness or yoga to reduce stress levels.",
    },
    {
      question: "Do you eat vegetables daily?",
      choice: "Sometimes",
      advice: "Increase your daily vegetable intake for better nutrition.",
    },
  ];

  const handleRetake = () => setShowConfirm(true); // Show confirmation dialog
  const handleFinish = () => alert("Thank you for completing your assessment!"); // Simulate finish action
  const handleSaveReport = () => alert("Report saved successfully!"); // Simulate report save
  const handlePrintReport = () => window.print(); // Trigger print dialog

  const handleConfirmRetake = () => {
    setShowConfirm(false);
    alert("Redirecting to retake the assessment...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-100 to-green-400 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-lg p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 hover:underline cursor-pointer transition">
            Assessment Report
          </h1>
          <p className="text-gray-500 text-sm">{date}</p>
        </header>

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${toggleView === "chart" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-600 hover:text-white`}
            onClick={() => setToggleView("chart")}
          >
            Show Chart
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium shadow-md transition ${toggleView === "scores" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-600 hover:text-white`}
            onClick={() => setToggleView("scores")}
          >
            Show Scores
          </button>
        </div>

        {/* Main Content */}
        {toggleView === "scores" ? (
          <div className="grid grid-cols-1 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between bg-gradient-to-br from-white to-gray-100 p-4 rounded-xl shadow hover:shadow-lg hover:bg-gray-200 transition"
              >
                <div className="flex items-center space-x-3">
                  {category.icon}
                  <span className="text-gray-800 font-medium">
                    {category.name}
                  </span>
                </div>
                <span className="text-gray-600">{finalScores[category.id] * 10}%</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Comparison Chart</h2>
            <div className="h-64">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-400 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Recommendations</h2>
          <ul>
            {finalResponses.map((response, index) => (
              <li
                key={index}
                className="mb-4 bg-white rounded-lg p-4 shadow-md hover:shadow-lg hover:bg-yellow-200 transition"
              >
                <p className="text-gray-800 font-medium">
                  {index + 1}. {response.question}
                </p>
                <p className="text-gray-600">Your Answer: {response.choice}</p>
                <p className="text-gray-600 italic">{response.advice}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-full font-medium shadow-md hover:bg-red-600 hover:scale-105 transition"
              onClick={handleRetake}
            >
              Retake Assessment
            </button>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium shadow-md hover:bg-blue-600 hover:scale-105 transition"
              onClick={handleFinish}
            >
              Finish Assessment
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className="px-6 py-3 bg-green-500 text-white rounded-full font-medium shadow-md hover:bg-green-600 hover:scale-105 transition"
              onClick={handleSaveReport}
            >
              Save Report
            </button>
            <button
              className="px-6 py-3 bg-gray-500 text-white rounded-full font-medium shadow-md hover:bg-gray-600 hover:scale-105 transition"
              onClick={handlePrintReport}
            >
              Print Report
            </button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <p className="text-gray-800 font-medium">
                Are you sure you want to retake the assessment? Your current progress will be lost.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleConfirmRetake}
                >
                  Yes, Retake
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
