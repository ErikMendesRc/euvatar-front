// src/AppRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Experience from './pages/character/Experience';
import PeleExperience from './pages/character/PeleExperience';
import MachadoExperience from './pages/character/MachadoExperience';
import ChatPage from './pages/chat/ChatPage';
import CharacterPage from './pages/character/CharacterPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/personagem/einstein" element={<Experience />} />
      <Route path="/personagem/machado" element={<MachadoExperience />} />
      <Route path="/personagem/pele" element={<PeleExperience />} />
      <Route path="/character" element={<CharacterPage />} /> {/* Nova rota para o personagem */}
    </Routes>
  );
};

export default AppRoutes;