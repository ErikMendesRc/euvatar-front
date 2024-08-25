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
        // Não precisamos solicitar permissão manualmente,
        // o navegador cuidará disso automaticamente quando necessário.

        const timer = setTimeout(() => {
            setPlaceholderVisible(false); // Esconde o placeholder após 5 segundos
        }, 5000);

        return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }, []);

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

        axios.post('http://localhost:8080/api/v1/characters/update', updateData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.status === 200) {
                setSuccessMessage('Character updated successfully!');
                console.log('Update successful:', response.data);
                if (iframeRef.current) {
                    iframeRef.current.src = iframeRef.current.src; // Recarrega o iframe
                }
            }
        })
        .catch(error => {
            setError('Failed to update character. Please try again.');
            console.error('Error updating character:', error);
        });
    };

    return (
        <div style={{ maxWidth: '360px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#4CAF50' }}>Update Character</h2>
            <div style={{ position: 'relative', width: '360px', height: '640px', marginBottom: '20px', borderRadius: '10px' }}>
                <iframe
                    ref={iframeRef}
                    id="arcane-player-frame"
                    src="https://embed.arcanemirage.com/f0eacbee-7e7c-4b2d-8908-7a3c67fa593a?key=aWQ9MzQ1NiZrZXk9ZjBlYWNiZWUtN2U3Yy00YjJkLTg5MDgtN2EzYzY3ZmE1OTNhJnRva2VuPQ=="
                    frameBorder="0"
                    width="360px"
                    height="640px"
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
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Character ID:</label>
                    <input
                        type="text"
                        value={charID}
                        onChange={(e) => setCharID(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        placeholder="Enter Character ID"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Character Name:</label>
                    <input
                        type="text"
                        value={charName}
                        onChange={(e) => setCharName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        placeholder="Enter Character Name"
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Backstory:</label>
                    <textarea
                        value={backstory}
                        onChange={(e) => setBackstory(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
                        placeholder="Enter Backstory"
                    ></textarea>
                </div>
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                    Update Character
                </button>
            </form>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green', marginTop: '20px' }}>{successMessage}</p>}
        </div>
    );
}

export default CharacterUpdate;