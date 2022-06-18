import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './Component/Navbar/Navbar';
import CoinMain from './Pages/coin/CoinMain';
import NewsMain from './Pages/news/NewsMain';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route element={<CoinMain />} path="/" />
        <Route element={<NewsMain />} path="/news" />
      </Routes>
    </Router>
  );
}

export default App;
