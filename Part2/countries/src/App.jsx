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

  const hookWeather = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_WHEATER_KEY
        }`
      )
      .then((response) => {
        console.log("hola", data.response);
        const updatedCountries = filteredCountries.map((countrie) =>
          countrie.name.common === city
            ? { ...countrie, weather: response.data }
            : countrie
        );
        setFilteredCountries(updatedCountries);
      })
      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  };

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
            <h2>Spoken languages</h2>
            <ul>
              {Object.keys(countrie.languages).map((key) => {
                return <li key={key}>{countrie.languages[key]}</li>;
              })}
            </ul>

            <img alt="" src={countrie.flags.png}></img>
            {hookWeather(countrie.name.common)}
            {countrie.weather && (
              <div>
                <h2>Weather in {countrie.name.common}</h2>
                <p>Temperature: {countrie.weather.main.temp}°C</p>
                <p>Description: {countrie.weather.weather[0].description}</p>
              </div>
            )}
          </div>
        );
      });
    } else {
      return filteredCountries.map((countrie) => {
        return (
          <div key={countrie.population}>
            {countrie.name.common}{" "}
            <button onClick={() => setFilteredCountries([countrie])}>
              Show
            </button>
          </div>
        );
      });
    }
  };

  return (
    <div>
      find countries{" "}
      <input value={searchCountrie} onChange={countrieValueChange} />{" "}
      {filterCountries()}
    </div>
  );
}

export default App;
