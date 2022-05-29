import React from "react";
import PropTypes from "prop-types";

const Header = ({ userCount, title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <h2>Current players : {userCount}</h2>
    </header>
  );
};

Header.defaultProps = {
  title: "SNAKE VERSUS",
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
