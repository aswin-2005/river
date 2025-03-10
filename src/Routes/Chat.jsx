import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../SocketClient/useWebSocket';

function Chat() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('userToken');
  const { messages, sendMessage, error } = useWebSocket(import.meta.env.VITE_WS_URL, username, token);
  const [input, setInput] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    fetch(`${backendUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    }).then(() => {
      console.log("Logged out");
      navigate('/');
    });
  };

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div className="bg-black text-white h-screen w-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">BlackChat</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg h-[calc(100vh-120px)] p-4">
          <div className="h-[calc(100%-60px)] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">{message.sender}:</span> {/* Fixed sender field */}
                <span className="ml-2">{message.message}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-2 border-white rounded-md p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={() => {
                if (input.trim()) {
                  sendMessage(input);
                  setInput(""); // Clear input after sending
                }
              }}
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
