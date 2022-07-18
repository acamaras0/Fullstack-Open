import React from "react";
import "../index.css";

const Message = ({ name, type, errorMessage }) => {
  if (name === "") {
    return null;
  }

  if (type === 2) {
    return (
      <div className="errorStyle">
        <p className="errorMessage">{errorMessage}</p>
      </div>
    );
  }

  if (type === 1) {
    return (
      <div className="messageStyle">
        <p className="message">{name} updated</p>
      </div>
    );
  }

  return (
    <div className="messageStyle">
      <p className="message">{name} added</p>
    </div>
  );
};

export default Message;
