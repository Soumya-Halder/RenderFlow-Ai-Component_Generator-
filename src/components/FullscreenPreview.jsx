import React from 'react'
import { GrClose } from "react-icons/gr";

export default function FullscreenPreview({ code, setIsFullscreen, refreshKey }) {
    const fixedCode = `
        <style>
            html, body { margin: 0; padding: 0; overflow-x: hidden; }
            * { box-sizing: border-box; }
        </style>
        ${code}
    `;
    return (
        <div>
            <div className="fullscreen-overlay">
                <button className="close-btn" onClick={() => setIsFullscreen(false)}>
                    <GrClose size={22} />
                </button>

                <iframe
                    key={refreshKey}
                    srcDoc={fixedCode}
                    title="Fullscreen Preview"
                    className="fullscreen-frame"
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    )
}
