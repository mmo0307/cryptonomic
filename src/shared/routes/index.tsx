import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Error } from '@root/entities';
import { CoinInfoComponent } from '@root/features';
import { Arbitrage, Home, Market } from '@root/pages';

import ROUTES from './routes';

const generateRoutes = (flags?: Record<string, boolean>) => {
  const routes = [
    { route: ROUTES.root, element: <Home /> },
    { route: ROUTES.market, element: <Market /> },
    { route: ROUTES.arbitrage, element: <Arbitrage /> },
    { route: ROUTES.coin, element: <CoinInfoComponent /> }
  ];

  return routes.map(({ element, route }) => (
    <Route path={route} element={element} key={route} />
  ));
};

export const AppRouter = () => {
  // const {
  //   isGameFunctionality: game,
  //   isMissionsAvailable: missions,
  //   isAvatarsAvailable: avatars,
  //   isChangePageAvailable: changePage,
  //   isRefPageAvailable: referralPage,
  //   isPlaySection: play,
  //   isProfile: profile
  // } = useFlags();

  return (
    <Routes>
      {generateRoutes()}
      <Route path='*' element={<Error />} />
    </Routes>
  );
};
