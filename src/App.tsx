import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from '@component/Navbar/Navbar';
import { AppRouter } from '@globals/router';

import './globalStyles.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRouter />
    </Router>
  );
};

export default App;
