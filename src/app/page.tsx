import Page from "@/genai/page";
import { useState } from "react";

export default function Home() {
  return (
    <><div>
    <div className="flex items-center justify-center h-screen text-center font-bold text-3xl">
    Litcoder AI Chat
    </div>
    <Page/>
    </div></>
  );
}
