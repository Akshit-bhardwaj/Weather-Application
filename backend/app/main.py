from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.weather_api import router as weather_router

app = FastAPI(
    title="Weather Forecasting API",
    description=(
        "A modern weather forecasting API powered by Weather API. "
        "Provides current weather, 7-days to 14-days forecast, and hourly weather data."
    ),
    docs_url="/docs")

origins = [
    "http://localhost:5173",
    # "http://localhost:3000",
    # "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(weather_router)

@app.get("/")
def home():
    return {
        "response" : "ok"
    }
