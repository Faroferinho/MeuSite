import { useState } from "react";

export default function CodeBlock({code, language}){
    const [copied, setCopied] = useState(false);

    const copyingCode = async () => {
        try{
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 3000)
        }catch(error){
            console.error("Failed to copy code:\n", error);
        }
    };

    return(
        <>
            <div className="code-container">
                <span className="code-label">
                    {language}
                </span>

                <button
                    className="copy-button"
                    onClick={copyingCode}
                    aria-label="Copy Code"
                    title="Copy Code"
                >
                    📎
                </button>

                <pre className="code-contet">
                    <code>{code}</code>
                </pre>
            </div>

            {copied && (
                <div className="copy-popup">
                    Successfully copied to clipboard
                </div>
            )}
        </>
    );
}