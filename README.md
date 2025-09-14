# PG Management AI System

This project is a full-stack solution for managing Paying Guest (PG) accommodations, featuring an AI-powered backend and a modern React frontend.

## Features

- **Tenant Management:** Add, view, update, and delete tenants.
- **Room Management:** Track room occupancy and manage room details.
- **Maintenance Requests:** Log, categorize, and update maintenance tickets.
- **Dashboard:** View key stats (rooms, tenants, maintenance, occupancy).
- **AI Agent:** Chatbot assistant for PG management tasks.
- **ML Model:** Automatic classification of maintenance requests.
- **Authentication:** Secure login and registration for users.

## Project Structure

```
backend/
  ├── main.py                # FastAPI application entry point
  ├── config.py              # Configuration (env variables)
  ├── database.py            # Database setup (SQLAlchemy, async)
  ├── models/                # ORM models (tenants, maintenance)
  ├── schemas/               # Pydantic schemas for API
  ├── crud/                  # CRUD operations
  ├── routers/               # API route definitions
  ├── agent/                 # AI agent logic and tools
  ├── train.py               # ML model training script
  ├── maintenance_classifier.pkl # Trained ML model
  ├── maintenance_data.csv   # Sample data for ML
  └── .env                   # Environment variables

mypg-frontend/
  ├── src/                   # React source code
  │   ├── components/        # UI components
  │   ├── services/          # API service layer
  │   ├── context/           # Auth context
  │   ├── App.js             # Main app component
  │   └── index.js           # Entry point
  ├── public/                # Static files
  ├── package.json           # Frontend dependencies
  └── README.md              # Frontend instructions
```

## Getting Started

### Backend (FastAPI)

1. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set `DATABASE_URL` and `GEMINI_API_KEY`.
3. **Run the backend:**
   ```sh
   uvicorn backend.main:app --reload
   ```
   - API runs at `http://localhost:8000/api`

### Frontend (React)

1. **Install dependencies:**
   ```sh
   cd mypg-frontend
   npm install
   ```
2. **Start the frontend:**
   ```sh
   npm start
   ```
   - App runs at `http://localhost:3000`

## Usage

- Access the web app at [http://localhost:3000](http://localhost:3000)
- Register/login to manage tenants, rooms, and maintenance.
- Use the dashboard for an overview.
- Chat with the AI agent for automated assistance.

## Technologies Used

- **Backend:** FastAPI, SQLAlchemy, Pydantic, LangChain, scikit-learn, joblib
- **Frontend:** React, React Bootstrap, Axios, React Router
- **Database:** MySQL (configurable)
- **AI/ML:** Google Gemini API, custom ML model for maintenance classification

## License

This project is for educational/demo purposes.

---

For more details, see