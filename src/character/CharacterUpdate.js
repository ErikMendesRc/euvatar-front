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

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlaceholderVisible(false); // Esconde o placeholder após 8 segundos
        }, 8000);

        return () => {
            clearTimeout(timer); // Limpa o timer se o componente for desmontado
        };
    }, []);

    // Função para simular o pressionamento da tecla "T"
    const simulateKeyPress = (action) => {
        const keyEvent = new KeyboardEvent(action, {
            key: 'T',
            keyCode: 84,
            which: 84,
            bubbles: true,
            cancelable: true
        });

        if (iframeRef.current) {
            iframeRef.current.contentWindow.dispatchEvent(keyEvent);
            console.log(`Simulando ${action} para a tecla "T".`);
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
                    iframeRef.current.innerHTML = ''; // Limpa o conteúdo atual
                    iframeRef.current.appendChild(createIframeContent()); // Recria o conteúdo do iframe
                }
            }
        })
        .catch(error => {
            setError('Falha ao atualizar o personagem. Por favor, tente novamente.');
            console.error('Erro ao atualizar o personagem:', error);
        });
    };

    const createIframeContent = () => {
        const container = document.createElement('div');
        container.id = "am-container";
        container.style.width = "640px";
        container.style.height = "480px";

        const playerDiv = document.createElement('div');
        playerDiv.id = "arcane-player";
        playerDiv.setAttribute('data-project-id', '3458');
        playerDiv.setAttribute('data-project-key', '49e0ebd8-adea-45f3-a398-0f03cb9db8f8');
        playerDiv.setAttribute('data-token', 'wCcv3u0xv6Yf');

        const script = document.createElement('script');
        script.src = "https://embed.arcanemirage.com/49e0ebd8-adea-45f3-a398-0f03cb9db8f8/e";
        script.defer = true;

        container.appendChild(playerDiv);
        container.appendChild(script);

        return container;
    };

    return (
        <div style={{ maxWidth: '360px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Atualizar Personagem</h2>
            <div style={{ position: 'relative', width: '360px', height: '640px', marginBottom: '20px', borderRadius: '10px' }}>
                <div
                    ref={iframeRef}
                    id="am-container"
                    style={{ width: '640px', height: '480px', borderRadius: '10px' }}
                >
                    <div
                        id="arcane-player"
                        data-project-id="3458"
                        data-project-key="49e0ebd8-adea-45f3-a398-0f03cb9db8f8"
                        data-token="wCcv3u0xv6Yf"
                    ></div>
                    <script 
                        src="https://embed.arcanemirage.com/49e0ebd8-adea-45f3-a398-0f03cb9db8f8/e"
                        defer>
                    </script>
                </div>
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

            <button
                onMouseDown={() => simulateKeyPress('keydown')}
                onMouseUp={() => simulateKeyPress('keyup')}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    cursor: 'pointer'
                }}
            >
                Pressione para Falar
            </button>

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