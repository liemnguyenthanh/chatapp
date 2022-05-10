import React, { createContext, useContext, useMemo, useState } from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

import { BrowserRouter as Router, Route } from "react-router-dom";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'dark' ? 
      {
        background: {
          main: 'rgba(255, 255, 255, 0.12)',
          default: 'rgba(255, 255, 255, 0.12) ',
        }
      } : null
      )
    }
  });

  const theme = useMemo(
    () =>
    createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <>
    <CssBaseline enableColorScheme />
    <ColorModeContext.Provider value={colorMode}>
                {/* <CssBaseline /> */}
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/dashboard" component={Chat} />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}

export default App;