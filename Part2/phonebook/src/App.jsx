import React, { useEffect, useState } from "react";
import InputFilter from "../components/InputFilter";
import Filter from "../components/Filter";
import Form from "../components/Form";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsFilter, setPersonsFilter] = useState("");

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const changeText = (e) => {
    setNewName(e.target.value);
  };
  const changeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const findPersons = (e) => {
    setPersonsFilter(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const duplicate = persons.some((element) => element.name === newName);
    if (duplicate) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <InputFilter personFilter={personsFilter} change={findPersons} />

      <Form
        name={newName}
        numbers={newNumber}
        number={changeNumber}
        person={changeText}
        addPersons={addPerson}
      />

      <h2>Numbers</h2>
      <ul>
        <Filter persons={persons} personsFilter={personsFilter} />
      </ul>
    </div>
  );
};

export default App;
