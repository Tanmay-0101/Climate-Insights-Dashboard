import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({ updateWeatherInfo }) {
  const API_KEY = '5b311ea4a5d004051c39baeec676a13b';
  const geoAPI = 'https://api.openweathermap.org/data/2.5/weather';

  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let getWeatherInfo = async () => {
    try {
      let res = await fetch(`${geoAPI}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonRes = await res.json();

      let result = {
        temp: jsonRes.main.temp,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        humidity: jsonRes.main.humidity,
        feelsLike: jsonRes.main.feels_like,
        weather: jsonRes.weather[0].description,
        city: jsonRes.name,
      };

      return result;
    } catch (error) {
      throw error;
    }
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      let newInfo = await getWeatherInfo();
      updateWeatherInfo(newInfo);
      setCity("");
    } catch (error) {
      setError(true);
      setCity("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Search your city</h2>
        <TextField 
          id="outlined-basic" 
          label="Enter here" 
          variant="outlined" 
          value={city} 
          onChange={handleChange} 
        />
        <br /> <br />
        <Button variant="contained" type='submit'>Search</Button>
        {error && <p style={{ color: "red" }}>No such place exists!</p>}
      </form>
    </>
  );
}
