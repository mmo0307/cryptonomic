import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {Navbar} from "./Component/Navbar/Navbar";
import {CoinMain} from "./Pages/coin/CoinMain";
//import {NewsMain} from "./Pages/news/NewsMain";
import {NewMain} from './Pages/news_2/NewMain';
import { CoinInfo } from "./Component/CoinInfo/CoinInfo";
import {Page404} from "./Component/404/Page404";

import "./globalStyles.css";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route element={<CoinMain />} path="/" />
        <Route element={<NewMain />} path="/news" />
        <Route element={<CoinInfo />} path="/coin/:id" />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
};

export default App;
