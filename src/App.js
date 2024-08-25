import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/Login'; // Caminho para Login.js
import CharacterUpdate from './character/CharacterUpdate'; // Caminho para CharacterUpdate.js

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/update-character" element={<CharacterUpdate />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;