import React from "react";
import CountryInfo from "./CountryInfo";
import Weather from "./Weather";

const Country = ({
  countries,
  country,
  setCountry,
  filter,
  weather,
  setWeather,
  api_key,
}) => {
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredCountries.length > 10
        ? "Too many matches, specify another filter"
        : filteredCountries.length > 1
        ? filteredCountries.map((country, index) => {
            return (
              <div key={index}>
                {country.name}
                <button onClick={() => setCountry(country)}>show</button>
              </div>
            );
          })
        : filteredCountries.map((country, index) => {
            return (
              <div key={index}>
                <CountryInfo country={country} />
                <Weather
                  country={country}
                  weather={weather}
                  api_key={api_key}
                  setWeather={setWeather}
                />
              </div>
            );
          })}
      {country ? (
        <>
          <CountryInfo country={country} />
          <Weather
            country={country}
            weather={weather}
            api_key={api_key}
            setWeather={setWeather}
          />
        </>
      ) : null}
    </>
  );
};

export default Country;
