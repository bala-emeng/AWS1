/* eslint-disable @typescript-eslint/no-explicit-any */
// components/aiService.ts

export async function getAIResponse(payload: { prompt: any[]; temperature?: number }): Promise<string> {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // LOG the data for debugging
    console.log("Reply sent to frontend:", data.reply);
    
    // Check if we have a valid response
    if (!data.reply || data.reply.trim() === '') {
      throw new Error("Empty response received from API");
    }
    
    return data.reply || "No response";
  } catch (error) {
    console.error("Error in getAIResponse:", error);
    throw new Error(`Failed to fetch AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
