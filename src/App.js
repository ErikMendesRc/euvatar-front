import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import CharacterUpdate from './pages/character/Experience';
import Experience from './pages/character/Experience';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/personagem/einstein" element={<Experience />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;