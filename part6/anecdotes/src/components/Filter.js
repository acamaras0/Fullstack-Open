import React from "react";
import { useDispatch } from "react-redux";
import { filterReducer } from "../reducers/anecdoteReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterReducer(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default Filter;
