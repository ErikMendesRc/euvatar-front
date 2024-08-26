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
                    src="https://embed.arcanemirage.com/49e0ebd8-adea-45f3-a398-0f03cb9db8f8?key=aWQ9MzQ1OCZrZXk9NDllMGViZDgtYWRlYS00NWYzLWEzOTgtMGYwM2NiOWRiOGY4JnRva2VuPXdDY3YzdTB4djZZZg=="
                    frameBorder="0"
                    allow="microphone; fullscreen"
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