import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Experience from './pages/character/Experience';
import PeleExperience from './pages/character/PeleExperience';
import MachadoExperience from './pages/character/MachadoExperience';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/personagem/einstein" element={<Experience />} />
                    <Route path="/personagem/machado" element={<MachadoExperience />} />
                    <Route path="/personagem/pele" element={<PeleExperience />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;