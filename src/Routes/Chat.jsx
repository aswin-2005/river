import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebSocket from '../SocketClient/useWebSocket';
import { Toaster, toast } from 'react-hot-toast';

// Predefined vibrant colors for better distinction
const COLORS = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Light Blue
  '#96CEB4', // Mint
  '#FFEEAD', // Light Yellow
  '#D4A5A5', // Dusty Pink
  '#9B59B6', // Purple
  '#3498DB', // Blue
  '#E67E22', // Orange
  '#2ECC71', // Green
  '#F1C40F', // Yellow
  '#E74C3C', // Dark Red
  '#1ABC9C', // Turquoise
  '#9B59B6', // Violet
  '#FB6964', // Coral
];

// Function to generate a consistent color for a username
const generateUserColor = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use the hash to select a color from our predefined array
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
};

function Chat() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');
  const token = sessionStorage.getItem('userToken');
  const { messages, sendMessage, error, activeUsers } = useWebSocket(import.meta.env.VITE_WS_URL, username, token);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Display error messages as toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error, {
        style: {
          background: '#333',
          color: '#fff',
          border: '1px solid #666',
        },
        iconTheme: {
          primary: '#ff4b4b',
          secondary: '#fff',
        },
      });
    }
  }, [error]);

  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('username');
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

  if (!token || !username) {
    navigate('/');
  }

  return (
    <div className="bg-black text-white h-screen w-screen p-4 font-mono">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="text-2xl px-5 font-bold font-mono cursor-pointer hover:text-gray-500">RIVER</a>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="text-white ml-11 px-4 py-2  border border-white rounded hover:text-gray-500 cursor-pointer text-sm font-mono"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 bg-gray-900 rounded-lg h-[calc(100vh-120px)] p-4">
            <div className="h-[calc(100%-60px)] overflow-y-auto mb-4 hide-scrollbar">
              {messages.map((message, index) => (
                <div key={index} className="mb-2 font-mono">
                  <span style={{ color: generateUserColor(message.sender) }} className="text-l font-mono">
                    {message.sender}:
                  </span>
                  <span className="ml-2 text-l font-mono">{message.message}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex mx-2 border-2 border-white rounded-md">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm px-3 py-3 font-mono focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    sendMessage(input);
                    setInput("");
                  }
                }}
              />
              <div className="flex items-center text-2xl justify-center">
                |
              </div>
              <button
                onClick={() => {
                  if (input.trim()) {
                    sendMessage(input);
                    setInput("");
                  }
                }}
                className="font-bold text-white px-6 py-3 hover:text-gray-500 cursor-pointer text-sm font-mono"
              >
                Send
              </button>
            </div>
          </div>

          {/* Active Users Sidebar */}
          <div className="w-64 bg-gray-900 rounded-lg p-4">
            <h2 className="text-l font-bold mb-4 font-mono">Active Users</h2>
            <div className="space-y-2">
              {activeUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span
                    style={{ color: generateUserColor(user) }}
                    className="text-sm font-mono break-words break-all"
                  >
                    {user}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
