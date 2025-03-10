import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Routes/Chat';
import Login from './Routes/Login';
import NotFound from './Routes/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
