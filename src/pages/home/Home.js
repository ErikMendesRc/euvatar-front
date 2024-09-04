import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/home.css';

function Home() {
  const [showLogo, setShowLogo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000); // 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (character) => {
    navigate(`/personagem/${character}`);
  };

  return (
    <div className="Home">
      {showLogo ? (
        <div className="logo-container">
          <img src="/logo.png" className="logo blinking" alt="Logo" />
        </div>
      ) : (
        <div className="content">
          <img src="/logo.png" className="logo small" alt="Logo" />
          <div className="text-container">
            <h1>Converse com nossos Euvatares</h1>
            <div className="avatar-container">
              <img
                src="/einstein-bg.png"
                alt="Albert Einstein"
                className="avatar-image"
                onClick={() => handleClick('einstein')}
              />
              <img
                src="/pele.png"
                alt="Pelé"
                className="avatar-image"
                onClick={() => handleClick('pele')}
              />
              <img
                src="/machado.png"
                alt="Machado de Assis"
                className="avatar-image"
                onClick={() => handleClick('machado')}
              />
              <img
                src="/barao.png"
                alt="Barão de Mauá"
                className="avatar-image"
                onClick={() => handleClick('barao')}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;