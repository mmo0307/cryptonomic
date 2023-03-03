import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from '@component/404/Page404';
import { CoinInfo } from '@component/CoinInfo/CoinInfo';
import { Arbitrage } from '@features/Pages/arbitrage/Arbitrage';
import { CoinMain } from '@features/Pages/coin/CoinMain';
import { NewMain } from '@features/Pages/news_2/NewMain';

import ROUTES from './routes';

const generateRoutes = (flags?: Record<string, boolean>) => {
  const routes = [
    { route: ROUTES.root, element: <CoinMain /> },
    { route: ROUTES.news, element: <NewMain /> },
    { route: ROUTES.arbitrage, element: <Arbitrage /> },
    { route: ROUTES.coin, element: <CoinInfo /> }
  ];

  // if (flags.profile) {
  //   routes.push({ route: ROUTES.profile, element: <ProfilePage /> });
  // }

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
