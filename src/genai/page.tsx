"use client";
import React, { useState } from "react";
import { getAIResponse } from "./components/aiService";
import CodeEditor from "./components/CodeEditor";

const Page: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [code, setCode] = useState("// Write your code here");
  const [genAIResponse, setGenAIResponse] = useState("");
  const [loading, setLoading] = useState(false);
  //const [jsonEncodeCode, setJsonEncodeCode] = useState(false);

  function escapeCurlyBraces(input: string): string {
  return input.replace(/{/g, '{{').replace(/}/g, '}}');
}

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Escape curly braces in the Userprompt. Problem statement and code..
    const escapeduserPrompt = escapeCurlyBraces(userPrompt);
    const escapedproblemStaement = escapeCurlyBraces(problemStatement);
    const escapedCode = escapeCurlyBraces(code);

      // Create a simple, clean prompt format
      const promptText = `Instruction: ${escapeduserPrompt}\n\nProblem: ${escapedproblemStaement}\n\nCode:\n${escapedCode}`;

      // Create the payload with proper string content
      const payload = {
        prompt: [
          {
            "role": "system",
            "content": "You are a very good programming evaluator expert."
          },
          {
            "role": "user",
            "content": [{ "text": promptText }]
          }
        ]
      };

      

      // Send the payload
      const response = await getAIResponse(payload);
      setGenAIResponse(response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setGenAIResponse("Error fetching AI response. Please check for special characters or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* User Prompt */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          User Prompt
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
      </div>

      {/* Coding Problem Statement */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Coding Problem Statement
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          value={problemStatement}
          onChange={(e) => setProblemStatement(e.target.value)}
        />
      </div>

      {/* Code Editor */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Code</label>
        <div className="border border-gray-300 rounded-md overflow-hidden min-h-40">
          <CodeEditor
            code={code}
            theme="light"
            fontSize={16}
            onChange={setCode}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Submit"}
        </button>
      </div>

      {/* AI Response */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Gen AI Response
        </label>
        <textarea
          readOnly
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] bg-gray-50"
          value={genAIResponse}
        />
      </div>
    </div>
  );
};

export default Page;
