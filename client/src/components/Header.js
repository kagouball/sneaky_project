import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, roomName }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div>
        <h3>Room Name</h3>
        <div className="room-name">{roomName}</div>
      </div>
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
