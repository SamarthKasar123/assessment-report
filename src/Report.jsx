import React, { useState, useEffect } from "react";
import { MdFitnessCenter } from "react-icons/md";
import { FaBrain, FaHeartbeat } from "react-icons/fa";
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
  // Categories with Icons
  const categories = [
    { id: "physical", name: "Physical", icon: <MdFitnessCenter size={32} className="text-blue-500" /> },
    { id: "mental", name: "Mental", icon: <FaBrain size={32} className="text-purple-500" /> },
    { id: "diet", name: "Diet", icon: <GiFruitBowl size={32} className="text-green-500" /> },
    { id: "lifestyle", name: "Lifestyle", icon: <IoMdBicycle size={32} className="text-orange-500" /> },
  ];

  const defaultScores = {
    physical: 7,
    mental: 8,
    diet: 5,
    lifestyle: 6,
  };

  const [finalScores, setFinalScores] = useState({ ...defaultScores, ...initialScores });

  const [chartData, setChartData] = useState({
    labels: categories.map((category) => category.name),
    datasets: [
      {
        label: "Category Scores (out of 10)",
        data: categories.map((category) => finalScores[category.id]),
        backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Recalculate chart data whenever finalScores changes
    setChartData({
      labels: categories.map((category) => category.name),
      datasets: [
        {
          label: "Category Scores (out of 10)",
          data: categories.map((category) => finalScores[category.id]),
          backgroundColor: ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99"],
          borderWidth: 1,
        },
      ],
    });
  }, [finalScores]);

  // Demo Responses
  const defaultResponses = [
    {
      question: "How often do you exercise?",
      choice: "3-4 times a week",
      advice: "Great job! Consistency is key to staying fit.",
    },
    {
      question: "How often do you experience stress?",
      choice: "Frequently",
      advice: "Consider practicing mindfulness or yoga to manage stress better.",
    },
    {
      question: "Do you eat vegetables daily?",
      choice: "Sometimes",
      advice: "Try to include more vegetables in your meals for better nutrition.",
    },
    {
      question: "How many hours do you sleep daily?",
      choice: "5-6 hours",
      advice: "Aim for 7-8 hours of sleep to improve overall health.",
    },
  ];

  const finalResponses = responses.length > 0 ? responses : defaultResponses;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-blue-600">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 m-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
          Health Check Pro - Assessment Report
        </h2>

        {/* Health Insights Section */}
        <div className="bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-400 rounded-2xl p-8 mt-6 shadow-xl transform transition-all duration-500 hover:scale-105">
          <div className="flex items-center space-x-4 mb-4">
            <FaHeartbeat size={32} className="text-red-600" />
            <h3 className="text-2xl font-semibold text-red-800">
              Health Insights
            </h3>
          </div>
          <p className="text-gray-700">
            Based on your responses, we recommend focusing on maintaining a balanced diet and regular exercise to improve your overall health.
          </p>
        </div>

        {/* Category Scores Section */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Category Scores
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-md transform transition-transform hover:scale-105 hover:shadow-lg"
              >
                {category.icon}
                <h4 className="text-xl font-medium text-gray-800 mt-2">
                  {category.name}
                </h4>
                <p className="text-gray-600">
                  Score: <span className="font-semibold">{finalScores[category.id]} / 10</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Responses Section */}
        <div className="mt-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Responses
          </h3>
          <div className="space-y-4">
            {finalResponses.map((response, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-md border-l-4 border-blue-400"
              >
                <p className="text-lg font-medium text-gray-800">
                  {index + 1}. {response.question}
                </p>
                <p className="text-gray-700 mt-1">
                  <strong>Your Choice:</strong> {response.choice}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Advice:</strong> {response.advice}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="mt-8 bg-gray-100 p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Comparison Chart
          </h3>
          <div className="h-64 w-full">
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6 space-x-4">
          <button
            className="w-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 text-white py-3 rounded-full hover:opacity-90 transition-opacity duration-200"
            onClick={() => window.location.reload()}
          >
            Retake Assessment
          </button>
          <button
            className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-blue-600 text-white py-3 rounded-full hover:opacity-90 transition-opacity duration-200"
            onClick={() => alert("Thank you for using Health Check Pro!")}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
