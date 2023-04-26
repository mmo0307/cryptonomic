import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Cookie, Navbar } from '@root/entities';
import { AppRouter } from '@shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <Router>
      <Navbar />
      <AppRouter />
      {/*<Cookie />*/}
    </Router>
  );
};
