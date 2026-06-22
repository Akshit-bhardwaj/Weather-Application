from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WEATHER_API_KEY: str
    WEATHER_API_BASE_URL: str = "https://api.weatherapi.com/v1"

    class Config:
        env_file = ".env"


settings = Settings()