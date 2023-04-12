import React from "react";

const gameOnState = { gameOn: false, setGameOn: undefined };
const GameOnContext = React.createContext(gameOnState);

const GameOnContextProvider = ({ children }) => 
{
  const [gameOn, setGameOn] = React.useState(gameOnState.gameOn);
  const gameOnContextValue = React.useMemo(() => ({gameOn, setGameOn}), [gameOn, setGameOn]);

  return(
    <GameOnContext.Provider value={gameOnContextValue}>
      {children}
    </GameOnContext.Provider>
  );
};

export {GameOnContextProvider, GameOnContext};