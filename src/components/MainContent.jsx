import React from "react";
import CodeView from "./CodeView";
import PreviewView from "./PreviewView";
import { BiSolidCopy } from "react-icons/bi";
import { PiExportBold } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";
import { BsArrowsFullscreen } from "react-icons/bs";

export default function MainContent({ view, setView, code, loading, copyCode, handleDownload, setIsFullscreen, handleReload, refreshKey }) {
    return (
        <main className="main-content">
            {/* Full-width Tab Buttons */}
            <div className="tab-bar-full">
                <button
                    className={view === "code" ? "active" : ""}
                    onClick={() => setView("code")}
                >
                    Code
                </button>
                <button
                    className={`
                        ${view === "preview" ? "active" : ""}
                        ${!code || code.trim() === "" ? "disabled" : ""}
                    `}
                    onClick={() => setView("preview")}
                    disabled={!code || code.trim() === ""}
                >
                    Preview
                </button>
            </div>

            {/* Action Buttons Below Tabs */}
            <div className="action-bar">
                {view === "code" && (
                    <div className="action-bar-grp">
                        <h3>Code Editor</h3>
                        <div className="action-bar-btn">
                            <button className={`action-btn ${!code || code.trim() === "" ? "disabled" : ""}`} disabled={!code || code.trim() === ""} onClick={copyCode}><BiSolidCopy /> Copy code</button>

                            <button className={`action-btn ${!code || code.trim() === "" ? "disabled" : ""}`} disabled={!code || code.trim() === ""} onClick={handleDownload}><PiExportBold /> Export code</button>
                        </div>
                    </div>
                )}
                {view === "preview" && (

                    <div className="action-bar-grp">
                        <h3>Code Preview</h3>
                        <div className="action-bar-btn">
                            <button className="action-btn " onClick={() => setIsFullscreen(true)}><BsArrowsFullscreen />  Fullscreen</button>
                            <button className="action-btn " onClick={handleReload}><TfiReload />  Reload</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="content-box">
                {view === "code" ? <CodeView code={code} loading={loading} /> : <PreviewView code={code} refreshKey={refreshKey} loading={loading} />}
            </div>
        </main >
    );
}





