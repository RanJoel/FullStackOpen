import React from "react";

const Filter = ({ filter, setFilter, setCountry, setWeather }) => {
  const handleFilterInput = (event) => {
    setFilter(event.target.value);
    setCountry("");
    setWeather("");
  };
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterInput} />
    </div>
  );
};

export default Filter;
