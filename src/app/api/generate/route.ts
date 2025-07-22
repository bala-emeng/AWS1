import { NextRequest, NextResponse } from "next/server";
const API = process.env.LITCODER_API_KEY || "your-key";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    
    // Validate input
    if (!prompt || typeof prompt !== 'object') {
      return NextResponse.json({ error: "Invalid prompt format" }, { status: 400 });
    }

    // Log the prompt for debugging
    //console.log("Received prompt:", JSON.stringify(prompt, null, 2));
    
    // Also log the stringified body that will be sent to Azure
    //console.log("Body being sent to Azure:", JSON.stringify({ prompt }));
    
    const response = await fetch("https://litcoder-aifunction.azurewebsites.net/genericapi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-api-key": API,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Azure API Error:", {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: err
      });
      return NextResponse.json({ 
        error: "API Error", 
        detail: err,
        status: response.status 
      }, { status: 500 });
    }

    const data = await response.json();
    // want to see what api give the resonse by console.log..
    //console.log("Azure API response:", data);

    // Validate response data
    if (!data) {
      return NextResponse.json({ error: "Empty response from API" }, { status: 500 });
    }

    // Return the response with proper error handling
    return NextResponse.json({ reply: data || "No response" });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ 
      error: "Server Error", 
      detail: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
}