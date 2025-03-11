import { Link } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText'

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-screen bg-black text-white">
            <FuzzyText
                baseIntensity={0.1}
                hoverIntensity={0.3}
                enableHover={true}
            >
                404
            </FuzzyText>
            <p className="text-lg">Page does not exist, go back Ni**a</p>
            <Link to="/" className="text-blue-500 hover:text-blue-600">Go back to home</Link>
        </div>
    );
}

export default NotFound;