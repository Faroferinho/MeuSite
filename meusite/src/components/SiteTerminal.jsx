import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import '@xterm/xterm/css/xterm.css';

export default function SiteTerminal(){
    const terminalRef = useRef(null);

    useEffect(
        () => {
            const term = new Terminal(
                {
                    cursorBlink: true,
                    theme: {
                        background: '#1e1e1e',
                        foreground: '2F58CD'
                    }
                }
            );
            const fitAddon = new FitAddon();

            term.loadAddon(fitAddon);
            term.open(terminalRef.current);
            fitAddon.fit();

            const ws = new WebSocket('ws://localhost:4000');

            ws.onmessage = (event) => {
                term.write(event.data);
            }

            term.onData(
                (data) => {
                    if(ws.readyState === WebSocket.OPEN){
                        ws.send(data);
                    }
                }
            )

            const handleResize = () => fitAddon.fit();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                ws.close();
                term.dispose();
            };
        },
    []);

    return (
        <>
            <div ref={terminalRef} className="terminal" />
        </>
    );
}