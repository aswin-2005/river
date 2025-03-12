import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText';
import { toast, Toaster } from 'react-hot-toast';

function Login() {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Keep input focused at all times
    useEffect(() => {
        // Focus input on component mount
        if (inputRef.current) {
            inputRef.current.focus();
        }

        // Add click event listener to document
        const handleDocumentClick = () => {
            if (inputRef.current && !isLoading) {
                inputRef.current.focus();
            }
        };

        document.addEventListener('click', handleDocumentClick);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [isLoading]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            return;
        }

        setIsLoading(true);
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
                toast.error('Username already exists', {
                    style: {
                        background: '#333',
                        color: '#fff',
                        border: '1px solid #666',
                    },
                });
                setUsername(''); // Clear input on error
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Connection error', {
                style: {
                    background: '#333',
                    color: '#fff',
                    border: '1px solid #666',
                },
            });
            setUsername(''); // Clear input on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-black text-white h-screen w-screen">
            <Toaster position="top-center" />
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
                <form onSubmit={handleLogin} className="flex flex-col gap-4 items-center mt-10 font-mono">
                    <div className="flex flex-col gap-2">
                        <div className="text-left">$ ~ enter your user name and press enter</div>
                        <div className="flex items-center">
                            <span className="mr-2">{'>_'}</span>
                            <div className="relative w-full max-w-md">
                                <div className="flex items-center pl-3">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && username.trim()) {
                                                e.preventDefault();
                                                handleLogin(e);
                                            }
                                        }}
                                        className="bg-transparent text-gray-400 border-none outline-none w-full"
                                        autoFocus
                                        disabled={isLoading}
                                        placeholder="type username here..."
                                    />
                                </div>
                            </div>
                        </div>
                        {isLoading && (
                            <div className="text-white ">$ ~ logging in user...</div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
