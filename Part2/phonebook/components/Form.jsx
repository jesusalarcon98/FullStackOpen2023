import React from "react";

const Form = ({ person, number, addPersons, name, numbers }) => {
  return (
    <form onSubmit={addPersons}>
      <h2>Add a new record</h2>
      <div>
        name: <input value={name} onChange={person} />
      </div>
      <div>
        number: <input value={numbers} onChange={number} />
      </div>
      <div>
        <button type="submit"> add</button>
      </div>
    </form>
  );
};
export default Form;