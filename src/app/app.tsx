import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookieComponent, NavbarComponent } from '@root/entities';
import { AppRouter } from '@shared/routes';

import './styles/index.scss';

export const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <AppRouter />
      {/*<Cookie />*/}
    </Router>
  );
};
