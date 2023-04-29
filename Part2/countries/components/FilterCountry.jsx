import React from "react";
import DetailCountry from "./DetailCountry";
import ShowCountries from "./ShowCountries";

const Filters = ({ filteredCountries, setFilteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <div>too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <DetailCountry countrie={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <ShowCountries
          filteredCountries={filteredCountries}
          setFilteredCountries={setFilteredCountries}
        />
      </div>
    );
  }
};

export default Filters;
