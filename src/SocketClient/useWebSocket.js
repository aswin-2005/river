import { useEffect, useState } from "react";

const useWebSocket = (url, username, token) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("Connected to WebSocket server");
            if (username && token) {
                ws.send(username);
                ws.send(token);
            }
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "error") {
                console.error("WebSocket Error:", data.message);
                setError(data.message);
                ws.close();
            } else {
                setMessages((prev) => [...prev, data]);
            }
        };

        ws.onerror = (err) => {
            console.error("WebSocket encountered an error:", err);
            setError("WebSocket connection error");
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [url, username, token]);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        }
    };

    return { messages, sendMessage, error };
};

export default useWebSocket;
