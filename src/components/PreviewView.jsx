import React from "react";
import { MdPreview } from "react-icons/md";
import { CircleLoader } from "react-spinners";

export default function PreviewView({ code, refreshKey, loading }) {
    const fixedCode = `
        <style>
            html, body { margin: 0; padding: 0; overflow-x: hidden; }
            * { box-sizing: border-box; }
        </style>
        ${code}
    `;
    return (
        <div className="preview-box">
            {
                code === "" ? (
                    <div className="editor-empty-state">
                        {loading ? (
                            <>
                                <CircleLoader size={50} color="#ff79c6" />
                                <p className="empty-text">Generating… Please wait</p>
                            </>
                        ) : (
                            <>
                                <MdPreview size={50} color="#ff79c6" />
                                <p className="empty-text">Your code preview will appear here…</p>
                            </>
                        )}
                    </div>
                ) :
                    <iframe className="preview-frame" key={refreshKey} srcDoc={fixedCode} ></iframe>
            }
        </div>
    );
}
