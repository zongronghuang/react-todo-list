import React from "react";

const Footer = ({ numOfTodos }) => (
  <footer>
    {console.log('footer render')}
    <p>剩餘項目: {numOfTodos}</p>
  </footer>
);

export default Footer;
