import React, { useState, useEffect } from "react";
import axios from "axios";

import FilterCountry from "../components/FilterCountry";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const hookCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(hookCountries, []);

  const countrieValueChange = (e) => {
    setSearchCountrie(e.target.value);
    const filtered = countries.filter((countrie) =>
      countrie.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      find countries{" "}
      <input value={searchCountrie} onChange={countrieValueChange} />{" "}
      <ul>
        <FilterCountry
          filteredCountries={filteredCountries}
          setFilteredCountries={setFilteredCountries}
        />
      </ul>
    </div>
  );
}

export default App;
