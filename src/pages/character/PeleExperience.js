import React, { useState, useEffect, useRef } from 'react';
import '../../style/experience.css';

function PeleExperience() {
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
                    src="https://embed.arcanemirage.com/a72582bb-a580-40f9-b503-258a00c8c1f7?key=aWQ9MzQ4NyZrZXk9YTcyNTgyYmItYTU4MC00MGY5LWI1MDMtMjU4YTAwYzhjMWY3JnRva2VuPUVyX3VmY1p5VnB1eg=="
                    frameBorder="0"
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

export default PeleExperience;