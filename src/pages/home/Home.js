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

  const handleClick = () => {
    navigate('/personagem/einstein');
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
            <h1>Converse agora com Albert Einstein</h1>
            <img
              src="/einstein-bg.png"
              alt="Albert Einstein"
              className="einstein-image"
              onClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;