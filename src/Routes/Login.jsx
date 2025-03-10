import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (data.token) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('username', username);
                console.log("username", username);
                console.log("token", data.token);
                navigate('/chat');
            } else if (data.userExists) {
                console.error('Username already exists');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-black text-white h-screen w-screen">
            <div className="flex flex-col items-center justify-center h-screen gap-10">
                <h1 className="text-4xl font-bold">BlackChat</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border-2 border-white rounded-md p-2 bg-transparent"
                    />
                    <button
                        type="submit"
                        className="bg-white text-black rounded-md px-8 py-2 hover:bg-gray-200"
                        disabled={!username.trim()}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
