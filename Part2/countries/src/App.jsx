import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchCountrie, setSearchCountrie] = useState("");

  const hookCountries = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
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

  const filterCountries = () => {
    if (filteredCountries.length > 10) {
      return <div>too many matches, specify another filter</div>;
    } else if (filteredCountries.length === 1) {
      return filteredCountries.map((countrie) => {
        return (
          <div key={countrie.population}>
            <h1>{countrie.name.common}</h1>
            <p>capital {countrie.capital}</p>
            <p>capital {countrie.population}</p>
            <h2>languages</h2>
            <ul>
              {Object.keys(countrie.languages).map((key) => {
                return <li key={key}>{countrie.languages[key]}</li>;
              })}
            </ul>
            <img alt="" src={countrie.flags.png}></img>
          </div>
        );
      });
    } else {
      return filteredCountries.map((countrie) => {
        return <div key={countrie.population}>{countrie.name.common}</div>;
      });
    }
  };

  return (
    <div>
      find countries{" "}
      <input value={searchCountrie} onChange={countrieValueChange} />
      {filterCountries()}
    </div>
  );
}

export default App;
