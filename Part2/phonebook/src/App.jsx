import React, { useState } from "react";
import InputFilter from "../components/InputFilter";
import Filter from "../components/Filter";
import Form from "../components/Form";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsFilter, setPersonsFilter] = useState("");

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
