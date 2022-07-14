import { useState } from "react";

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Filter = ({ input, contact }) => {
  const filterData = contact.filter((element) => {
    if (input === "") {
      return null;
    } else {
      return element.name.toLowerCase().includes(input);
    }
  });
  const returnData = filterData.map((item) => (
    <li key={item.id}>{item.name} </li>
  ));
  return <ul>{returnData}</ul>;
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll] = useState("");
  const [searchField, setSearchField] = useState("");
  const personsToShow = showAll ? persons : persons;

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let alreadyExists = persons.some((person) => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    let lowerCase = event.target.value.toLowerCase();
    setSearchField(lowerCase);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      search: <input value={searchField} onChange={handleSearchChange} />
      <Filter input={searchField} contact={persons} />
      <h2>Add new contact</h2>
      <form onSubmit={addName}>
        <div>
          <div>
            name: <input value={newName} onChange={handlePersonChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
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
