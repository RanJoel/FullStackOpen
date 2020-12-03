import React from "react";

const Notification = ({ message, type }) => {
  if (message === undefined) {
    return null;
  }

  return <div className={type === "error" ? "error" : "notify"}>{message}</div>;
};

export default Notification;
