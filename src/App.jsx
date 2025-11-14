import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./App.css";
// import "./index.css";
import { GoogleGenAI } from "@google/genai";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { toast } from "react-toastify";
import FullscreenPreview from "./components/FullscreenPreview";
import Home from "../src/Pages/Home"


export default function App() {
  const options = [
    { value: 'html-css', label: 'HTML+CSS' },
    { value: 'html-css-js', label: 'HTML+CSS+JS' },
    { value: 'html-tailwind css-js', label: 'HTML+Tailwind CSS+JS' },
    { value: 'html-bootstrap css-js', label: 'HTML+Bootstrap CSS+JS' },
  ];

  const [framework, setFramework] = useState(options);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState();
  const [view, setView] = useState("code");
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  async function handleGenerate() {

    if (!description.trim()) return toast.error("Please describe your component first");
    try {
      setLoading(true);
      setCode("");
      setView("code");
      let prompt = import.meta.env.VITE_PROMPT;
      prompt = prompt
        .replace("{{DESCRIPTION}}", description)
        .replace("{{FRAMEWORK}}", framework.value);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const codeText = response.text
        .replace(/^```(?:html|jsx|js|tsx)?\n?/, "")
        .replace(/\n?```$/, "");
      setCode(codeText)
      console.log(codeText);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      let msg = "Something went wrong";
      try {
        const parsed = JSON.parse(err.message.replace("ApiError: ", ""));
        msg = parsed?.error?.message || msg;
      } catch {
        msg = err?.error?.message || err?.message || msg;
      }
      console.error("My error:", err);
      toast.error(`${msg} 😥`, { autoClose: 6000 })
    }
  }

  // Copy to clipboard fuc
  const copyCode = async () => {
    if (!code) return toast.warn("There is no code to copy", { autoClose: 1500 });
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard", { autoClose: 1500 })
    } catch (err) {
      toast.error('Failed to copy: Code', { autoClose: 1500 });
    }
  }

  //handle code download
  const handleDownload = () => {
    if (!code) {
      toast.warn("No code to download yet!", { autoClose: 1500 });
      return;
    }
    const fileName = "GenUi-code.html"
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success("Code Downloaded", { autoClose: 1500 });
  }

  // handleReload Preview
  const handleReload = () => {
    setRefreshKey(prev => prev + 1);
  };
  return (
    <>
      <div className="app-container">
        <Sidebar
          framework={framework}
          setFramework={setFramework}
          description={description}
          setDescription={setDescription}
          handleGenerate={handleGenerate}
          options={options}
          loading={loading}
        />
        <MainContent view={view} setView={setView} code={code} loading={loading} copyCode={copyCode} handleDownload={handleDownload} setIsFullscreen={setIsFullscreen} handleReload={handleReload} setRefreshKey={setRefreshKey} refreshKey={refreshKey} />
        {
          isFullscreen ? <FullscreenPreview code={code} setIsFullscreen={setIsFullscreen} refreshKey={refreshKey} /> : ""
        }


      </div>
    </>
  );
}

{/* <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter> */}