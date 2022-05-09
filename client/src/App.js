import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import CssBaseline from '@mui/material/CssBaseline';

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Route path="/" exact component={Join} />
      <Route path="/:id" component={Chat} />
    </Router>
  );
}

export default App;
