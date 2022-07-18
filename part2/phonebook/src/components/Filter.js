import React from "react";

const Filter = ({ value, funct }) => {
  return (
    <>
      search: <input value={value} onChange={funct} />
    </>
  );
};
export default Filter;
