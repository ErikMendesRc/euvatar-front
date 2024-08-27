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
                    src="https://embed.arcanemirage.com/40dfb222-339b-401b-b875-ef9250bf6197?key=aWQ9MzQ5MCZrZXk9NDBkZmIyMjItMzM5Yi00MDFiLWI4NzUtZWY5MjUwYmY2MTk3JnRva2VuPWI1TENoLVc2LTdJLQ=="
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