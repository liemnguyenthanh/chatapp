import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import "./styles/global.css";
import { contrast, generateName, hexToRgb } from "./utils";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {
  const [mode, setMode] = useState("dark")

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            text: {
              secondary: "#95979f",
            },
            background: {
              paper: "#2c2f33",
              default: "#23272a",
              container: "#3E4042",
            },
          }
        : {
            background: {
              default: "#fafafa",
              container: "#E4E6EB",
            },
          }),
      primary: {
        main: "#404eed",
      },
      secondary: {
        main: "#99AAB5",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#6b6b6b #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "4px",
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "transparent",
              minHeight: 24,
            },
          },
        },
      },
    },
  });

  const CustomTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={{colorMode,mode}}>
      <ThemeProvider theme={CustomTheme}>
        <CssBaseline enableColorScheme />
          <Router>
            <Route path="/" exact component={Join} />
            <Route path="/dashboard" component={Chat} />
          </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
