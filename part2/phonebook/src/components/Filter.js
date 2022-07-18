import React from "react";

const Filter = ({ persons, funct }) => {
  return (
    <>
      search: <input persons={persons} onChange={funct} />
    </>
  );
};
export default Filter;
