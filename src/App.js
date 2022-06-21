import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './Component/Navbar/Navbar';
import CoinMain from './Pages/coin/CoinMain';
import NewsMain from './Pages/news/NewsMain';
import CoinInfo from './Component/CoinInfo/CoinInfo';
import Page404 from './Component/404/404';


import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route element={<CoinMain />} path="/" />
        <Route element={<NewsMain />} path="/news" />
        <Route path="/:id" element={<CoinInfo />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
