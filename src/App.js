import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import PeleExperience from './pages/character/PeleExperience';
import MachadoExperience from './pages/character/MachadoExperience';
import EinsteinExperience from './pages/character/Einstein';
import BaraoExperience from './pages/character/BaraoExperience';
import ExperienceCanvas from './pages/character/ExperienceCanva'; // Importar o ExperienceCanvas
import { useConvaiClient } from './hooks/useConvaiClient'; // Importe o hook para inicializar o cliente

function App() {
  // Inicialize o cliente Convai apenas aqui
  const { client } = useConvaiClient('a1bcc176-6257-11ef-8432-42010a7be011', 'cdcf6a41413a5cd4abc3929bfc18173d');

  if (!client) {
    return <div>Loading client...</div>; // Renderiza uma mensagem de carregamento enquanto o cliente é inicializado
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personagem/pele" element={<PeleExperience />} />
        <Route path="/personagem/machado" element={<MachadoExperience />} />
        <Route path="/personagem/einstein" element={<EinsteinExperience />} />
        <Route path="/personagem/barao" element={<BaraoExperience />} />
        <Route path="/experience-canvas" element={<ExperienceCanvas client={client} />} /> {/* Cliente passado apenas para ExperienceCanvas */}
      </Routes>
    </Router>
  );
}

export default App;