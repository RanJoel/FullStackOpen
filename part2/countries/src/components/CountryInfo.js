import React from "react";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      capital {country.capital}
      <br />
      population {country.population}
      <br />
      <>
        <h3>languages</h3>
        {country.languages.map((language, index) => {
          return <div key={index}>{language.name}</div>;
        })}
      </>
      <br />
      <img src={country.flag} alt={country.name} width="100" height="100" />
    </div>
  );
};

export default CountryInfo;
