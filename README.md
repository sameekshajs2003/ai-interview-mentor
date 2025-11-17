# 🎯 AI Interview Mentor

An AI-powered interview preparation platform that helps candidates ace their technical interviews with personalized questions, detailed explanations, and smart organization features.

![AI Interview Mentor](https://img.shields.io/badge/AI-Powered-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🎯 **Tailored Just for You**
Get interview questions and model answers based on your role, experience, and specific focus areas — no generic prep, only what truly matters to you.

### 📚 **Learn at Your Own Pace**
Expand answers only when you're ready. Dive deeper into any concept instantly with AI-powered detailed explanations and real-time insights.

### 📝 **Capture Your Insights**
Add personal notes to any question, highlight key takeaways, and pin important ones to the top — making your learning more organized and meaningful.

### 🧠 **Understand the "Why" Behind Answers**
Go beyond memorizing answers — unlock AI-generated concept breakdowns that explain the logic and reasoning behind each solution to truly master it.

### 💾 **Save, Organize, and Revisit**
Easily save your interview sets, organize them neatly in your dashboard, and pick up your preparation right where you left off — anytime, anywhere.

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP Client
- **React Markdown** - Markdown Rendering
- **React Syntax Highlighter** - Code Highlighting

### Backend
- **Node.js & Express** - Server Framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Multer** - File Upload
- **Google Generative AI (Gemini)** - AI Integration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-interview-mentor.git
cd ai-interview-mentor
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env` with your credentials:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PORT=8000
```

### 3. Frontend Setup
```bash
cd frontend/AI-Interview-Mentor
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:8000`

### Start Frontend Development Server
```bash
cd frontend/AI-Interview-Mentor
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
ai-interview-mentor/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Auth & upload middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions & prompts
│   ├── uploads/         # User uploaded files
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   └── AI-Interview-Mentor/
│       ├── src/
│       │   ├── assets/      # Images & static files
│       │   ├── components/  # Reusable components
│       │   ├── context/     # React context
│       │   ├── pages/       # Page components
│       │   └── utils/       # Utility functions
│       ├── index.html
│       ├── vite.config.js
│       └── package.json
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `GEMINI_API_KEY` | Google Gemini API key |
| `PORT` | Server port (default: 8000) |

## 🎨 Key Features Implementation

### Authentication System
- JWT-based authentication
- Bcrypt password hashing
- Protected routes with middleware
- Profile image upload

### AI Integration
- Google Gemini AI for question generation
- Concept explanation generation
- Retry mechanism for API reliability
- Error handling for rate limits

### Question Management
- Create interview sessions
- Generate AI-powered Q&A
- Pin important questions
- Load more questions dynamically
- Delete sessions

### User Interface
- Responsive design (mobile & desktop)
- Smooth animations with Framer Motion
- Markdown rendering for AI responses
- Syntax highlighting for code blocks
- Dark/light theme support

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/upload-image` - Upload profile image

### Sessions
- `POST /api/sessions/create` - Create new session (protected)
- `GET /api/sessions/my-sessions` - Get all user sessions (protected)
- `GET /api/sessions/:id` - Get session by ID (protected)
- `DELETE /api/sessions/:id` - Delete session (protected)

### Questions
- `POST /api/questions/add` - Add questions to session (protected)
- `PUT /api/questions/:id/pin` - Toggle pin status (protected)
- `PUT /api/questions/:id/note` - Update question note (protected)

### AI
- `POST /api/ai/generate-questions` - Generate interview questions (protected)
- `POST /api/ai/generate-explanation` - Generate concept explanation (protected)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Google Gemini AI for powerful question generation
- React and Vite communities
- Tailwind CSS for amazing styling utilities

## 📧 Contact

For any queries or suggestions, please reach out!

---

**Built with ❤️ using React, Node.js, MongoDB, and Google Gemini AI**
