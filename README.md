# 🌦️ Weather Forecast Application

A full-stack Weather Forecast Application built using **React** and **FastAPI**. The application allows users to search for any city and get real-time weather information along with a multi-day forecast using external weather APIs.

## 🚀 Features

- Search weather by city name
- Real-time weather data
- Multi-day weather forecast
- Clean and responsive user interface
- FastAPI backend with REST APIs
- React frontend with modern UI
- Environment variable support for API keys
- Error handling for invalid locations

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- FastAPI
- Python
- HTTPX
- Pydantic

### APIs
- OpenWeather API (or your weather provider)

## 📂 Project Structure

```text
Weather-Application/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Weather-Application.git
cd Weather-Application
```

### Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```env
WEATHER_API_KEY=your_api_key
```

Run Backend:

```bash
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🌐 API Endpoint

```http
GET /weather?city={city_name}
```

Example:

```http
GET /weather?city=Delhi
```

##  Future Improvements
- Dark mode
- Weather alerts
- Deployment with custom domain

## 👨‍💻 Author

Akshit Bhardwaj
