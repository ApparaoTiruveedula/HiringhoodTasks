import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = (initialCity: string) => {
  const [city, setCity] = useState(initialCity);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (newCity?: string) => {
    try {
      setLoading(true);
      setError(null);
      const cityToFetch = newCity || city;

      // ✅ Fetch Current Weather
      const weatherResponse = await axios.get(`${BASE_URL}/weather`, {
        params: { q: cityToFetch, units: "metric", appid: API_KEY },
      });

      setWeather(weatherResponse.data);

      // ✅ Fetch 5-day Forecast (3-hour intervals)
      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          lat,
          lon,
          units: "metric",
          appid: API_KEY,
        },
      });

      // ✅ Process forecast to get daily average
      const dailyForecast: Record<string, any> = {};
      forecastResponse.data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!dailyForecast[date]) {
          dailyForecast[date] = { temp: [], weather: item.weather[0].description };
        }

        dailyForecast[date].temp.push(item.main.temp);
      });

      // ✅ Compute daily average temperature
      const finalForecast = Object.entries(dailyForecast).map(([date, data]: any) => ({
        date,
        temp: (data.temp.reduce((a: number, b: number) => a + b, 0) / data.temp.length).toFixed(1),
        weather: data.weather,
      }));

      setForecast(finalForecast);
      setCity(cityToFetch);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { weather, forecast, loading, error, fetchWeather, setCity };
};
