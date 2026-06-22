from fastapi import APIRouter , Query
from app.schemas.weather_schema import CurrentWeatherResponse , ForecastResponse , HourlyResponse
from app.services.weather_service import get_current_weather , get_forecast , get_hourly , get_weather_by_location

router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)

@router.get("/current/{city}" , response_model = CurrentWeatherResponse)
async def current_weather(city : str):
    return await get_current_weather(city)


@router.get("/forecast/{city}" , response_model = ForecastResponse)
async def forecast(city : str , days : int = 5):
    return await get_forecast(city , days)


@router.get("/hourly/{city}" , response_model = HourlyResponse)
async def hourly(city : str):
    return await get_hourly(city)



@router.get("/location")
async def location(
    lat: float = Query(...),
    lon: float = Query(...)):
    return await get_weather_by_location(lat , lon)
