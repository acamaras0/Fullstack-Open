import React from "react";

const Persons = ({ contacts, funct }) => {
  const iterateObj = contacts.map((contact) => (
    <p key={contact.id}>
      {contact.name} {contact.number}{" "} <br/>
      {<button onClick={() => funct(contact)}>Delete</button>}
    </p>
  ));
  return <>{iterateObj}</>;
};

export default Persons;
