import React from "react";
import Select from 'react-select';
import { GiRegeneration } from "react-icons/gi";
import { PulseLoader } from "react-spinners";

export default function Sidebar({
    framework,
    setFramework,
    description,
    setDescription,
    handleGenerate,
    options,
    loading
}) {
    return (
        <aside className="sidebar">
            <h1 className="logo">RenderFlow<span className="accent">+</span></h1>
            <h2 className="section-title accent">AI Component Generator</h2>
            <p className="description-line">Describe your component and let <span>AI</span> build it for you...</p>

            <label className="label">Framework</label>
            <Select
                defaultValue={framework}
                onChange={setFramework}
                options={options}
                className="dropdown"
                classNamePrefix="dropdown"
            />

            <label className="label">Describe your component</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Example: create a pricing card..."
                className="textarea"
            ></textarea>

            <button className={`generate-btn ${loading ? "disabled" : ""}`} onClick={handleGenerate} disabled={loading}>
                <GiRegeneration />  Generate
                <PulseLoader color="#ffffff" loading={loading} size={8} />
            </button>

            <p className="note">Click “Generate” to get your component code.</p>
        </aside>
    );
}
