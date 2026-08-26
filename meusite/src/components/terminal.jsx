import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import '@xterm/xterm/css/xterm.css';

export default function Terminal(){
    const terminalRef = useRef(null);

    useEffect(
        () => {
            const term = new Terminal(
                {
                    cursorBlink: true,
                    theme: {
                        background: '#2f58cd'
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

            const handleResize = () => fitAddon.fit();

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                ws.close();
                term.dispose();
            }
        },
    []);

    return (
        <>
            <div ref={terminalRef} className="terminal"/>
        </>
    );
}