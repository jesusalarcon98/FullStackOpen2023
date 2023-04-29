import React from "react";

const ShowCountries = ({ filteredCountries, setFilteredCountries }) => {
  return filteredCountries.map((countrie, index) => {
    return (
      <div key={index}>
        {countrie.name.common}
        <button onClick={() => setFilteredCountries([countrie])}>Show</button>
      </div>
    );
  });
};
export default ShowCountries;
