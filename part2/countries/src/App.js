import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter
        filter={filter}
        setFilter={setFilter}
        setCountry={setCountry}
        setWeather={setWeather}
      />
      <Country
        countries={countries}
        country={country}
        setCountry={setCountry}
        filter={filter}
        weather={weather}
        setWeather={setWeather}
        api_key={api_key}
      />
    </div>
  );
};

export default App;
