import React from "react";
import {GameOnContextProvider} from "./GameOnContextModule";

const GlobalStateProvider = ({ children }) => 
{
  return(
    <GameOnContextProvider>
        {children}
    </GameOnContextProvider>
  );
};

export default GlobalStateProvider;