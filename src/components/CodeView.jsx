import React from "react";
import Editor from '@monaco-editor/react';
import { FaCode } from "react-icons/fa";
import { CircleLoader } from "react-spinners";

export default function CodeView({ code, loading }) {

    return (
        <>
            {
                code ? <Editor height="100%" theme="vs-dark" defaultLanguage="html" defaultValue={code} /> :
                    (
                        <div className="editor-empty-state">
                            {loading ? (
                                <>
                                    <CircleLoader size={50} color="#ff79c6" />
                                    <p className="empty-text">Generating… Please wait</p>
                                </>
                            ) : (
                                <>
                                    <FaCode size={50} color="#ff79c6" />
                                    <p className="empty-text">Your generated code will appear here…</p>
                                </>
                            )}
                        </div>

                        // <p> // Your generated code will appear here...      < FaCode color="#ff00e7" size={30} loading={loading} /> </p>
                    )
            }
        </>
    );
}

// <pre className="code-box">
//     <code>{code || "// Your generated code will appear here..."}</code>
// </pre>