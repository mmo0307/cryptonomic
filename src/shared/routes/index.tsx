import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '@root/entities';
import { CoinInfo } from '@root/features';
import { Arbitrage, Home, NewMain } from '@root/pages';

import ROUTES from './routes';

const generateRoutes = (flags?: Record<string, boolean>) => {
  const routes = [
    { route: ROUTES.root, element: <Home /> },
    { route: ROUTES.news, element: <NewMain /> },
    { route: ROUTES.arbitrage, element: <Arbitrage /> },
    { route: ROUTES.coin, element: <CoinInfo /> }
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
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
};
