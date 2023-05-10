import React from "react";

const Person = ({ id, name, number, deletePersons }) => {
  return (
    <div>
      {name} {number}{" "}
      <button onClick={() => deletePersons(id, name)}>Delete</button>
    </div>
  );
};
export default Person;
