"use client";
import dynamic from "next/dynamic";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";


const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

interface CodeEditorProps {
  code: string;
  theme: "light" | "dark";
  fontSize?: number;
  onChange: (value: string) => void;
}

export default function CodeEditor({
  code,
  theme,
  fontSize = 14,
  onChange,
}: CodeEditorProps) {
  const isDark = theme === "dark";
  const appliedTheme = isDark ? githubDark : githubLight;
  const bgColor = isDark ? "bg-[#23272f]" : "bg-white";
  const textColor = isDark ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`h-full w-full min-w-0 ${bgColor} ${textColor}`}>
      <CodeMirror
        value={code}
        theme={appliedTheme}
        extensions={[javascript()]} // Only JavaScript mode
        onChange={(value) => onChange(value)} // Corrected onChange handler
        height="100%"
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
        }}
        style={{
          fontSize: fontSize, // Ensure fontSize is passed as a number
          height: "100%",
        }}
      />
    </div>
  );
}