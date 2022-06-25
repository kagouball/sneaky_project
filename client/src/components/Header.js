import React from "react";
import PropTypes from "prop-types";

const Header = ({ userCount, title, roomName }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <h2>Current players : {userCount}</h2>
      <h2>Room Name : {roomName}</h2>
    </header>
  );
};

Header.defaultProps = {
  title: "SNAKE VERSUS",
  userCount: 1,
  roomName: "NO GAMECODE"
};

Header.propTypes = {
  title: PropTypes.string,
  userCount: PropTypes.number,
  roomName: PropTypes.string
};

export default Header;
