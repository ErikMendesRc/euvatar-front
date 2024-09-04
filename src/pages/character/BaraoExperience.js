import React, { useState, useEffect, useRef } from 'react';
import '../../style/experience.css';

function BaraoExperience() {
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const iframeRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlaceholderVisible(false); // Esconde o placeholder após 8 segundos
        }, 8000);

        return () => {
            clearTimeout(timer); // Limpa o timer se o componente for desmontado
        };
    }, []);

    return (
        <div className="experience-container">
            <img src="/logo.png" alt="Euvatar Logo" className="euvatar-logo-experience" />
            <div className="iframe-container">
                <iframe
                    ref={iframeRef}
                    id="arcane-player-frame"
                    src="https://embed.arcanemirage.com/59009e4c-b353-4ab1-bf21-bf48f82cf86f?key=aWQ9MzU4MyZrZXk9NTkwMDllNGMtYjM1My00YWIxLWJmMjEtYmY0OGY4MmNmODZmJnRva2VuPXh3R3NKakRxcWdKWQ=="
                    frameBorder="0"
                    width="640px"
                    height="480px"
                    mozallowfullscreen="true"
                    webkitallowfullscreen="true"
                    allow="fullscreen; microphone"
                    className="experience-iframe"
                ></iframe>
                {placeholderVisible && <div className="iframe-placeholder"></div>}
            </div>
            {placeholderVisible && (
                <p className="loading-text">Esta é uma experiência exclusiva Euvatar.ai</p>
            )}
        </div>
    );
}

export default BaraoExperience;