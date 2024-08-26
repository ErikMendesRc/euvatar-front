import React, { useState, useEffect, useRef } from 'react';
import '../../style/experience.css';

function Experience() {
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
                    src="https://embed.arcanemirage.com/b47cb3d7-9ee8-4964-81da-3ff93ec455fc?key=aWQ9MzQ3NSZrZXk9YjQ3Y2IzZDctOWVlOC00OTY0LTgxZGEtM2ZmOTNlYzQ1NWZjJnRva2VuPUdpa1RzQ2dvOVo2UQ=="
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

export default Experience;