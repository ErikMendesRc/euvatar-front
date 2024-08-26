import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function CharacterUpdate() {
    const [charID, setCharID] = useState('');
    const [charName, setCharName] = useState('');
    const [backstory, setBackstory] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [placeholderVisible, setPlaceholderVisible] = useState(true);
    const iframeRef = useRef(null);
    const recognitionRef = useRef(null);
    const isSpeaking = useRef(false); // Rastrea se o usuário está falando

    useEffect(() => {
        // Inicializa o reconhecimento de voz em pt-BR
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = 'pt-BR'; // Define o idioma para português do Brasil
            recognition.continuous = true; // Mantém a escuta contínua
            recognition.interimResults = true; // Obter resultados intermediários

            recognition.onstart = () => {
                console.log('Reconhecimento de voz iniciado.');
            };

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');

                // Se o usuário começa a falar, simula o keydown para "T"
                if (!isSpeaking.current && transcript.trim().length > 0) {
                    isSpeaking.current = true;
                    sendKeyPressToIframe('T', 'keydown'); // Pressiona a tecla "T"
                    console.log('Fala detectada, tecla T pressionada.');
                }

                // Quando a fala termina, simula o keyup para "T"
                if (event.results[0].isFinal) {
                    console.log('Transcrição final: ', transcript);
                    sendKeyPressToIframe('T', 'keyup'); // Solta a tecla "T"
                    isSpeaking.current = false;
                    console.log('Fala encerrada, tecla T liberada.');
                }
            };

            recognition.onend = () => {
                console.log('Reconhecimento de voz finalizado.');
                recognition.start(); // Reinicia o reconhecimento de voz ao terminar
            };

            recognitionRef.current = recognition;
            recognition.start(); // Inicia o reconhecimento de voz
        } else {
            console.error('O reconhecimento de voz não é suportado neste navegador.');
        }

        const timer = setTimeout(() => {
            setPlaceholderVisible(false); // Esconde o placeholder após 8 segundos
        }, 8000);

        return () => {
            clearTimeout(timer); // Limpa o timer se o componente for desmontado
            if (recognitionRef.current) {
                recognitionRef.current.stop(); // Para o reconhecimento de voz
            }
        };
    }, []);

    // Função para enviar uma mensagem ao iframe para simular uma tecla pressionada
    const sendKeyPressToIframe = (key, action) => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage(
                { type: action, key: key }, 
                'https://app.euvatar.ai/update-character' // Certifique-se de que esta URL corresponde à origem do iframe
            );
            console.log(`Mensagem enviada para o iframe: ${action} ${key}`);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const updateData = {
            charID: charID,
            charName: charName,
            backstory: backstory
        };

        const token = localStorage.getItem('authToken');

        axios.post('https://euvatar-api-latest.onrender.com/api/v1/characters/update', updateData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.status === 200) {
                setSuccessMessage('Personagem atualizado com sucesso!');
                console.log('Atualização bem-sucedida:', response.data);
                if (iframeRef.current) {
                    iframeRef.current.src = iframeRef.current.src; // Recarrega o iframe
                }
            }
        })
        .catch(error => {
            setError('Falha ao atualizar o personagem. Por favor, tente novamente.');
            console.error('Erro ao atualizar o personagem:', error);
        });
    };

    return (
        <div style={{ maxWidth: '360px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Atualizar Personagem</h2>
            <div style={{ position: 'relative', width: '360px', height: '640px', marginBottom: '20px', borderRadius: '10px' }}>
                <iframe
                    ref={iframeRef}
                    id="arcane-player-frame"
                    src="https://embed.arcanemirage.com/f0eacbee-7e7c-4b2d-8908-7a3c67fa593a?key=aWQ9MzQ1NiZrZXk9ZjBlYWNiZWUtN2U3Yy00YjJkLTg5MDgtN2EzYzY3ZmE1OTNhJnRva2VuPXpXb3FUdGgxSTYybA=="
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allow="microphone; fullscreen"
                    style={{ borderRadius: '10px' }}
                ></iframe>
                {placeholderVisible && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(/euvatar.png)',
                            backgroundSize: 'cover',
                            borderRadius: '10px',
                            pointerEvents: 'none'
                        }}
                    ></div>
                )}
            </div>

            <form onSubmit={handleUpdate} style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ID do Personagem:</label>
                    <input
                        type="text"
                        value={charID}
                        onChange={(e) => setCharID(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        placeholder="Insira o ID do Personagem"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nome do Personagem:</label>
                    <input
                        type="text"
                        value={charName}
                        onChange={(e) => setCharName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        placeholder="Insira o Nome do Personagem"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>História:</label>
                    <textarea
                        value={backstory}
                        onChange={(e) => setBackstory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
                        placeholder="Insira a História"
                    ></textarea>
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                    Atualizar Personagem
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>}
        </div>
    );
}

export default CharacterUpdate;