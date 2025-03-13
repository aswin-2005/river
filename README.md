# River Chat 🌊

A real-time chat application with a modern UI, powered by React and dual backend servers for enhanced functionality.

## 🌟 Live Demo

Visit the live application at: [river-chat.vercel.app](https://river-chat.vercel.app)

## 🚀 Tech Stack

### Frontend
- **Framework:** React (v19)
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Routing:** React Router DOM
- **Real-time Communication:** WebSocket (ws)
- **UI Components:** React Hot Toast
- **Development Tools:**
  - ESLint
  - TypeScript

### Backend
The application uses a dual-backend architecture for optimal performance:

#### Flask Server
- **Framework:** Flask
- **Features:**
  - RESTful API endpoints
  - User authentication
  - Database operations
- **Database:** Supabase
- **Middleware:** Flask-CORS

#### WebSocket Server
- **Technology:** Python Websockets
- **Features:**
  - Real-time bidirectional communication
  - Async operations with asyncio
  - Message broadcasting

## 🏗️ Architecture

The application follows a three-tier architecture:
1. **Frontend** (Hosted on Vercel)
   - Handles user interface and interactions
   - Manages real-time connections
   - Routes and state management

2. **Flask Backend** (Hosted on Railway)
   - Manages user authentication
   - Handles database operations
   - Provides RESTful API endpoints

3. **WebSocket Backend** (Hosted on Railway)
   - Manages real-time message delivery
   - Handles user presence
   - Enables instant chat functionality

## 🛠️ Setup and Installation

### Frontend Setup
1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with necessary environment variables
```env
VITE_API_URL=your_flask_backend_url
VITE_WS_URL=your_websocket_backend_url
```

4. Run the development server
```bash
npm run dev
```

### Backend Setup

#### Flask Server
1. Navigate to the flask server directory
```bash
cd backend/flask_server
```

2. Create a virtual environment and activate it
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables in `.env`
```env
DATABASE_URL=your_supabase_url
API_KEY=your_api_key
```

5. Run the server
```bash
python flask_server.py
```

#### WebSocket Server
1. Navigate to the socket server directory
```bash
cd backend/socket_server
```

2. Create a virtual environment and activate it (if not already done)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables in `.env`
```env
WS_PORT=your_websocket_port
```

5. Run the server
```bash
python socket_server.py
```

## 🚀 Deployment

- Frontend is deployed on [Vercel](https://vercel.com)
- Both backend servers are deployed on [Railway](https://railway.app)

## 🔒 Environment Variables

### Frontend (.env)
```
VITE_API_URL=
VITE_WS_URL=
```

### Flask Backend (.env)
```
DATABASE_URL=
API_KEY=
```

### WebSocket Backend (.env)
```
WS_PORT=
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
