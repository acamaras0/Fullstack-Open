import React from "react";

const Form = ({ helpers, newName, newNumber }) => {
  return (
    <form onSubmit={helpers[0]}>
      <div>
        name: <input value={newName} onChange={helpers[1]} />
      </div>
      <div>
        number: <input value={newNumber} onChange={helpers[2]} />
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
