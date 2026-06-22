import httpx
from fastapi import HTTPException

from app.core.config import settings

from app.schemas.weather_schema import (
    CurrentWeatherResponse,
    ForecastResponse,
    ForecastDay,
    HourlyResponse,
    HourlyItem,
    WeatherCondition,
    Wind,
    SunTimes,
)

async def get_current_weather(
    city: str
) -> CurrentWeatherResponse:

    city = city.strip()
    if len(city) < 3:
        raise HTTPException(
            status_code=400,
            detail="Please enter at least 3 characters"
        )
    try:
        async with httpx.AsyncClient(
            timeout=10.0
        ) as client:

            response = await client.get(
                f"{settings.WEATHER_API_BASE_URL}/forecast.json",
                params={
                    "key": settings.WEATHER_API_KEY,
                    "q": city,
                    "days": 1,
                    "aqi": "yes"
                }
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="No matching location found."
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=500,
            detail="Weather service unavailable"
        )

    data = response.json()

    location = data["location"]
    current = data["current"]

    day = data["forecast"]["forecastday"][0]["day"]
    astro = data["forecast"]["forecastday"][0]["astro"]

    return CurrentWeatherResponse(
        city=location["name"],
        country=location["country"],

        lat=location["lat"],
        lon=location["lon"],

        temperature=current["temp_c"],
        feels_like=current["feelslike_c"],

        humidity=current["humidity"],
        pressure=current["pressure_mb"],
        visibility=current["vis_km"],

        temp_min=day["mintemp_c"],
        temp_max=day["maxtemp_c"],

        wind=Wind(
            speed_kph=current["wind_kph"],
            degree=current["wind_degree"],
            gust_kph=current.get("gust_kph")
        ),

        weather=WeatherCondition(
            text=current["condition"]["text"],
            icon=current["condition"]["icon"]
        ),

        sun=SunTimes(
            sunrise=astro["sunrise"],
            sunset=astro["sunset"]
        ),

        last_updated_epoch=current["last_updated_epoch"],
        timezone=location["tz_id"]
    )
async def get_forecast(
    city: str,
    days: int
) -> ForecastResponse:

    if days < 1 or days > 14:
        raise HTTPException(
            status_code=400,
            detail="Days must be between 1 and 14"
        )

    try:

        async with httpx.AsyncClient(
            timeout=10.0
        ) as client:

            response = await client.get(
                f"{settings.WEATHER_API_BASE_URL}/forecast.json",
                params={
                    "key": settings.WEATHER_API_KEY,
                    "q": city,
                    "days": days
                }
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Unable to fetch forecast"
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=500,
            detail="Weather service unavailable"
        )

    data = response.json()

    forecast_days = []

    for day in data["forecast"]["forecastday"]:

        forecast_days.append(
            ForecastDay(
                date=day["date"],

                temp_min=day["day"]["mintemp_c"],
                temp_max=day["day"]["maxtemp_c"],
                temp_avg=day["day"]["avgtemp_c"],

                humidity=day["day"]["avghumidity"],
                wind_speed=day["day"]["maxwind_kph"],

                chance_of_rain=int(
                    day["day"]["daily_chance_of_rain"]
                ),

                sunrise=day["astro"]["sunrise"],
                sunset=day["astro"]["sunset"],

                weather=WeatherCondition(
                    text=day["day"]["condition"]["text"],
                    icon=day["day"]["condition"]["icon"]
                )
            )
        )

    return ForecastResponse(
        city=data["location"]["name"],
        country=data["location"]["country"],
        days=forecast_days
    )
async def get_hourly(
    city: str
) -> HourlyResponse:

    try:

        async with httpx.AsyncClient(
            timeout=10.0
        ) as client:

            response = await client.get(
                f"{settings.WEATHER_API_BASE_URL}/forecast.json",
                params={
                    "key": settings.WEATHER_API_KEY,
                    "q": city,
                    "days": 1
                }
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=response.status_code,
                detail="Unable to fetch hourly data"
            )

    except httpx.RequestError:
        raise HTTPException(
            status_code=500,
            detail="Weather service unavailable"
        )

    data = response.json()

    hourly_items = []

    for hour in data["forecast"]["forecastday"][0]["hour"]:

        hourly_items.append(
            HourlyItem(
                time_epoch=hour["time_epoch"],
                time=hour["time"],

                temperature=hour["temp_c"],
                feels_like=hour["feelslike_c"],

                humidity=hour["humidity"],
                wind_speed=hour["wind_kph"],

                chance_of_rain=int(
                    hour.get(
                        "chance_of_rain",
                        0
                    )
                ),

                weather=WeatherCondition(
                    text=hour["condition"]["text"],
                    icon=hour["condition"]["icon"]
                )
            )
        )

    return HourlyResponse(
        city=data["location"]["name"],
        country=data["location"]["country"],
        hourly=hourly_items
    )

async def get_weather_by_location(
    lat: float,
    lon: float,
) -> CurrentWeatherResponse:

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(
            f"{settings.WEATHER_API_BASE_URL}/forecast.json",
            params={
                "key": settings.WEATHER_API_KEY,
                "q": f"{lat},{lon}",
                "days": 1,
                "aqi": "yes",
            },
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=response.status_code,
            detail="Unable to fetch location weather",
        )

    data = response.json()

    location = data["location"]
    current = data["current"]

    astro = data["forecast"]["forecastday"][0]["astro"]
    day_info = data["forecast"]["forecastday"][0]["day"]

    return CurrentWeatherResponse(
        city=location["name"],
        country=location["country"],

        lat=location["lat"],
        lon=location["lon"],

        temperature=current["temp_c"],
        feels_like=current["feelslike_c"],

        humidity=current["humidity"],
        pressure=current["pressure_mb"],
        visibility=current["vis_km"],

        temp_min=day_info["mintemp_c"],
        temp_max=day_info["maxtemp_c"],

        wind=Wind(
            speed_kph=current["wind_kph"],
            degree=current["wind_degree"],
            gust_kph=current.get("gust_kph"),
        ),

        weather=WeatherCondition(
            text=current["condition"]["text"],
            icon=current["condition"]["icon"],
        ),

        sun=SunTimes(
            sunrise=astro["sunrise"],
            sunset=astro["sunset"],
        ),

        last_updated_epoch=current["last_updated_epoch"],
        timezone=location["tz_id"],
    )