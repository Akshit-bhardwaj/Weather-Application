
from pydantic import BaseModel
from typing import Optional, List


class WeatherCondition(BaseModel):
    text: str
    icon: str


class Wind(BaseModel):
    speed_kph: float
    degree: int
    gust_kph: float | None = None


class SunTimes(BaseModel):
    sunrise: str
    sunset: str

class CurrentWeatherResponse(BaseModel):
    city: str
    country: str

    lat: float
    lon: float

    temperature: float
    feels_like: float

    humidity: int
    pressure: float
    visibility: float

    # ADD THESE
    temp_min: float
    temp_max: float

    wind: Wind
    weather: WeatherCondition
    sun: SunTimes

    last_updated_epoch: int
    timezone: str


class ForecastDay(BaseModel):
    date: str

    temp_min: float
    temp_max: float
    temp_avg: float

    humidity: float
    wind_speed: float

    chance_of_rain: int

    sunrise: str
    sunset: str

    weather: WeatherCondition


class ForecastResponse(BaseModel):
    city: str
    country: str

    days: List[ForecastDay]


class HourlyItem(BaseModel):
    time_epoch: int
    time: str

    temperature: float
    feels_like: float

    humidity: int
    wind_speed: float

    chance_of_rain: int

    weather: WeatherCondition


class HourlyResponse(BaseModel):
    city: str
    country: str

    hourly: List[HourlyItem]