import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8080",
});

export const getCurrentWeather = async (city) => {
  const response = await api.get(`/weather/current/${city}`);
  return response.data;
};

export const getForecast = async (city, days = 7) => {
  const response = await api.get(`/weather/forecast/${city}?days=${days}`);
  return response.data;
};

export const getHourlyWeather = async (city) => {
  const response = await api.get(`/weather/hourly/${city}`);
  return response.data;
};

export const getWeatherByLocation = async (lat, lon) => {
  const response = await api.get(`/weather/location?lat=${lat}&lon=${lon}`);
  return response.data;
};