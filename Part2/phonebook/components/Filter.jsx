import React from "react";
import Person from "./Person";
const Filter = ({ persons, personsFilter, deletePersons }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toUpperCase().includes(personsFilter.toUpperCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            name={person.name}
            number={person.number}
            id={person.id}
            deletePersons={(id) => deletePersons(id, person.name)}
          />
        ))}
    </div>
  );
};

export default Filter;
