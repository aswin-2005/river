import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText';

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
                sessionStorage.setItem('userToken', data.token);
                sessionStorage.setItem('username', username);
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
                <div>
                    <FuzzyText
                        baseIntensity={0.1}
                        hoverIntensity={0.2}
                        enableHover={true}
                    >
                        RIVER
                    </FuzzyText>
                </div>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center mt-10">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 bg-transparent"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-white text-black rounded-md px-8 py-2 hover:bg-gray-200 w-full"
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
