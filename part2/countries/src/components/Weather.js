import React, { useEffect } from "react";
import axios from "axios";

const Weather = ({ country, weather, api_key, setWeather }) => {
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  });
  return (
    <>
      {weather ? (
        <div>
          <h3>Weather in {country.capital}</h3>
          <b>temperature:</b> {weather.current.temperature} celsius
          <br />
          <img
            src={weather.current.weather_icons[0]}
            alt={weather.current.weather_descriptions[0]}
            width="100"
            height="100"
          />
          <br />
          <b>wind:</b> {weather.current.wind_speed} mph direction{" "}
          {weather.current.wind_dir}
        </div>
      ) : null}
    </>
  );
};

export default Weather;
