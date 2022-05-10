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
        text: {
          secondary: '#95979f',
        },
        background: {
          paper: '#2c2f33',
          default: '#23272a',
        }
      } : {
        background: {
          default: '#fafafa',
        }
      }
      ),
      primary: {
        main: '#404eed',
      },
      secondary: {
        main: '#99AAB5',
      },
    }
  });

  const theme = useMemo(
    () =>
    createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Router>
          <Route path="/" exact component={Join} />
          <Route path="/dashboard" component={Chat} />
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;