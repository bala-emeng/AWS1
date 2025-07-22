import React from "react";
import { getAIResponse } from "./components/aiService";

const TestAPI: React.FC = () => {
  // Hardcoded prompt payload
  const payload = {
    prompt: [
      {
        role: "system",
        content: "You are a strict JavaScript evaluator.",
      },
      {
        role: "user",
        content: [{ text: "Write a JavaScript function to reverse a string." }],
      },
    ],
    temperature: 0,
  };

  // Call API on button click
  const handleTest = async () => {
    try {
      const response = await getAIResponse(payload);
      console.log("AI Response123:", response);
    } catch (error) {
      console.error("API Test Error:", error);
    }
  };

  return (
    <div className="p-8">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleTest}
      >
        Test AI API (see console)
      </button>
    </div>
  );
};

export default TestAPI;