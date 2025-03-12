import { useEffect, useState } from "react";

const useWebSocket = (url, username, token) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);

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

            switch (data.code) {
                case 100: // Join/Leave messages
                    setMessages((prev) => [...prev, {
                        type: 'system',
                        message: data.message,
                        sender: data.sender
                    }]);
                    // Update active users list
                    if (data.active_users) {
                        setActiveUsers(data.active_users);
                    }
                    break;

                case 200: // Regular chat messages
                    setMessages((prev) => [...prev, {
                        type: 'message',
                        message: data.message,
                        sender: data.sender
                    }]);
                    break;

                case 300: // Error messages
                    console.error("WebSocket Error:", data.message);
                    setError(data.message);
                    ws.close();
                    break;

                default:
                    console.warn("Unknown message code:", data.code);
            }
        };

        ws.onerror = (err) => {
            console.error("WebSocket encountered an error:", err);
            setError("WebSocket connection error");
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setActiveUsers([]); // Clear active users when connection closes
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

    return { messages, sendMessage, error, activeUsers };
};

export default useWebSocket;
