import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import MainLayout from "./layouts/MainLayout";


import Home from "./pages/home";

import Portfolio from "./pages/portfolio";
import Forensics from './pages/forensics';
import OPSEC from './pages/opsec';
import Programing from './pages/programing';
import Docker from './pages/docker';

import Interests from "./pages/interests";
import Mythology from './pages/mythology';
import Palontology from './pages/paleontology';
import Ocultism from './pages/ocultism';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/forense-digital" element={<Forensics />} />
          <Route path="/opsec" element={<OPSEC/>} />
          <Route path="/programacao" element={<Programing />} />
          <Route path="/docker" element={<Docker />} />

          <Route path="/interests" element={<Interests />} />
          <Route path="/mitologia" element={<Mythology />} />
          <Route path="/paleontologia" element={<Palontology />} />
          <Route path="/ocultismo" element={<Ocultism />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
