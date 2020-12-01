import React from "react";

const Filter = ({ nameFilter, setFilter }) => {
  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div>
      filter shown with:{" "}
      <input value={nameFilter} onChange={handleFilterInput} />
    </div>
  );
};

export default Filter;
