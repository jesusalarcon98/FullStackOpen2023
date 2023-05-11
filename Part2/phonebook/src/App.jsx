import React, { useEffect, useState } from "react";
import InputFilter from "../components/InputFilter";
import Filter from "../components/Filter";
import Form from "../components/Form";
import PersonService from "./services/persons";
import Notification from "../components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personsFilter, setPersonsFilter] = useState("");
  const [successNotification, setSuccessNotification] = useState(null);

  const hook = () => {
    PersonService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        PersonService.updatePerson(person.id, changedPerson).then(
          (updatedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : updatedPerson))
            );
            setSuccessNotification(`${newName} changed is number.`);
            setTimeout(() => {
              setSuccessNotification(null);
            }, 5000);
          }
        );
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      };
      PersonService.create(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setSuccessNotification(`Added ${newName}. `);
        setTimeout(() => {
          setSuccessNotification(null);
        }, 5000);
      });
    }
  };

  const deletePersons = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      PersonService.deletePerson(id);
      const eliminate = persons.filter((person) => person.id !== id);
      setPersons(eliminate);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successNotification} />
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
        <Filter
          persons={persons}
          personsFilter={personsFilter}
          deletePersons={deletePersons}
        />
      </ul>
    </div>
  );
};

export default App;
