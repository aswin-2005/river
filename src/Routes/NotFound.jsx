import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen bg-black text-white">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg">Page does not exist, go back Ni**a</p>
            <Link to="/" className="text-blue-500 hover:text-blue-600">Go back to home</Link>
        </div>
    );
}

export default NotFound;