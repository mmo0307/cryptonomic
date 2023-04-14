import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from '@root/entities';
import { AppRouter } from '@shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRouter />
    </Router>
  );
};
