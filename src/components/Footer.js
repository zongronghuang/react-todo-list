import React from "react";

const Footer = ({ numOfRemainingTodos }) => {
  return (
    <footer>
      <p>剩餘項目: {numOfRemainingTodos}</p>
    </footer>
  );
};

export default Footer;
