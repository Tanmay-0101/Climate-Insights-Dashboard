import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp() {
  let info = {
    feelsLike: 35.74,
    humidity: 16,
    temp: 37.88,
    tempMax: 37.88,
    tempMin: 37.88,
    weather: "overcast clouds",
    city: "Delhi",
  };

  const [weatherInfo, setWeatherInfo] = useState(info);

  let updateWeatherInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div className="app-container">
      <h1>🌦️ Climate Insights Dashboard</h1>
      <div className="search-area"><SearchBox updateWeatherInfo={updateWeatherInfo} /></div>
      <br />
      <div className="card-wrapper"><InfoBox info={weatherInfo} /></div>
    </div>
  );
}
