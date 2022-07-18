import React from "react";

const Persons = ({ contacts, funct }) => {
  const iteratedObject = contacts.map((contact) => (
    <p key={contact.id}>
      {contact.name} {contact.number}{" "}
      {<button onClick={() => funct(contact)}>Delete</button>}
    </p>
  ));
  return <>{iteratedObject}</>;
};

export default Persons;
