import { useState } from "react";

const Person = ({ person }) => {
  return <div>{person.content}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [showAll] = useState("");

  const personsToShow = showAll ? persons : persons;

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      content: newName,
      id: persons.length + 1,
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
};

export default App;
