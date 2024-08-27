import React, { useState, useEffect, useRef } from 'react';
import '../../style/experience.css';

function MachadoExperience() {
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const iframeRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlaceholderVisible(false);
        }, 8000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="experience-container">
            <img src="/logo.png" alt="Euvatar Logo" className="euvatar-logo-experience" />
            <div className="iframe-container">
                <iframe
                    ref={iframeRef}
                    id="arcane-player-frame"
                    src="https://embed.arcanemirage.com/4e662f5c-1f79-477c-a392-02734a54b34b?key=aWQ9MzQ4OCZrZXk9NGU2NjJmNWMtMWY3OS00NzdjLWEzOTItMDI3MzRhNTRiMzRiJnRva2VuPTg4X3U4cG1TMlpzVg=="
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

export default MachadoExperience;
