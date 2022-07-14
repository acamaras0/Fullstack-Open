import React from "react";

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

export default Filter;
