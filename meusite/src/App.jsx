import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/home";
import Interests from "./pages/interests";
import Portfolio from "./pages/portfolio";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
