import { useEffect, useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { WbSunny, NightsStay, LocationOn, Search } from "@mui/icons-material";

function App() {
  const { weather, forecast, loading, error, fetchWeather, setCity } = useWeather("New York");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Automatically fetch user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
          );
          const data = await res.json();
          setCity(data.name);
          fetchWeather(data.name);
        } catch (error) {
          console.error("Error fetching location-based weather:", error);
        }
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  // ✅ Formik for input validation
  const formik = useFormik({
    initialValues: { city: "" },
    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
    }),
    onSubmit: (values) => {
      fetchWeather(values.city);
    },
  });

  // ✅ MUI Dark/Light Mode Theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // ✅ Dynamic Background Gradient
  const getBackground = () => {
    if (!weather) return darkMode ? "#121212" : "#f0f0f0";

    const weatherMain = weather.weather[0].main.toLowerCase();
    const gradients: Record<string, string> = {
      clear: "linear-gradient(to right, #56CCF2, #2F80ED)",
      clouds: "linear-gradient(to right, #D3CCE3, #E9E4F0)",
      rain: "linear-gradient(to right, #3a6186, #89253e)",
      thunderstorm: "linear-gradient(to right, #1F1C2C, #928DAB)",
      snow: "linear-gradient(to right, #ECE9E6, #FFFFFF)",
      default: darkMode ? "#121212" : "#f0f0f0",
    };

    return gradients[weatherMain] || gradients.default;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: getBackground(),
          transition: "background 0.5s ease-in-out",
          color: darkMode ? "#fff" : "#000",
          padding: "20px",
        }}
      >
        {/* Theme Toggle Icon */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: darkMode ? "#ffeb3b" : "#f57c00",
          }}
        >
          {darkMode ? <NightsStay fontSize="large" /> : <WbSunny fontSize="large" />}
        </IconButton>

        {/* Title */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Weather App
        </Typography>

        {/* Search Form */}
        <form onSubmit={formik.handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
          <TextField
            fullWidth
            label="Enter city name..."
            variant="outlined"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.2)", borderRadius: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton type="submit" color="primary">
                  <Search />
                </IconButton>
              ),
            }}
          />
        </form>

        {/* Weather Info */}
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {weather && (
          <Card
            sx={{
              mt: 4,
              p: 3,
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5">
                <LocationOn /> {weather.name}
              </Typography>
              <Typography variant="h6">🌡 Temperature: {weather.main.temp}°C</Typography>
              <Typography>🌥 {weather.weather[0].description}</Typography>
              <Typography>💧 Humidity: {weather.main.humidity}%</Typography>
            </CardContent>
          </Card>
        )}

        {/* 7-Day Forecast */}
        {forecast.length > 0 && (
          <>
            <Typography variant="h5" sx={{ mt: 4 }}>
              7-Day Forecast
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {forecast.slice(0, 7).map((day, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      p: 2,
                      textAlign: "center",
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: 3,
                      boxShadow: 2,
                    }}
                  >
                    <Typography variant="h6">{day.date}</Typography>
                    <Typography>🌡 Temp: {day.temp}°C</Typography>
                    <Typography>🌥 {day.weather}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
