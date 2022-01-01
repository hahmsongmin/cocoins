import { createContext, useContext, useState } from 'react';

const UseContexts = createContext();

function UseContextProvider({ children }) {
  const [mode, setMode] = useState(false);

  const modeChange = () => setMode(!mode);

  return <UseContexts.Provider value={{ modeChange, mode }}>{children}</UseContexts.Provider>;
}

export default UseContextProvider;

export const useModeChange = () => {
  const { modeChange, mode } = useContext(UseContexts);
  return { modeChange, mode };
};
