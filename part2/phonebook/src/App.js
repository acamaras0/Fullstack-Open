import React from "react";
import { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import Persons from "./components/Person.js";
import Message from "./components/Messages.js";
import contactService from "./module/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAllPersons, setShowAllPersons] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("1");
  const [messageError, setMessageError] = useState("");
  useEffect(() => {
    contactService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  let infoSearch = showAllPersons.toLowerCase(showAllPersons);

  const contactsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(infoSearch)
  );

  const addPerson = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const check = persons.find((pers) => pers.name === nameObject.name);

    if (
      check &&
      check.name === nameObject.name &&
      window.confirm(
        check.name +
          " is already addedd to the phonebook, replace the old with a new one?"
      )
    ) {
      contactService
        .update(check.id, nameObject)
        .then(() => {
          setMessage(nameObject.name);
          setMessageType(1);
        })
        .catch((error) => {
          setMessageError(error.response.data.error);
          setMessageType(2);
        });
    } else {
      contactService
        .create(nameObject)
        .then((returnedContact) => {
          setMessage(nameObject.name);
          setMessageType(0);
          setPersons(persons.concat(returnedContact));
        })
        .catch((error) => {
          setMessageError(error.response.data.error);
          setMessageType(3);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (contact) => {
    if (
      window.confirm(
        "Are you sure you want to delete " + contact.name + " ?"
      ) === true
    ) {
      contactService.del(contact.id).then(() => {
        setPersons(
          persons.filter((person) => {
            return person.id !== contact.id;
          })
        );
      });
    }
  };

  const handleNewPerson = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleShowPerson = (e) => {
    setShowAllPersons(e.target.value);
  };

  const functions = [addPerson, handleNewPerson, handleNewNumber];

  return (
    <>
      <h2>Phonebook</h2>
      <Message
        name={message}
        type={messageType}
        errorMessage={messageError}
      />
      <Filter value={showAllPersons} funct={handleShowPerson} />
      <h2>Add a new contact</h2>
      <Form helpers={functions} valueName={newName} valueNumber={newNumber} />
      <h2>Contacts</h2>
      <Persons contacts={contactsToShow} funct={deletePerson} />
    </>
  );
};

export default App;
