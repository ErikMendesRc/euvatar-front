// ExperienceCanvas.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../../components/Experience';
import { KeyboardControls, Loader } from '@react-three/drei';
import ChatBubble from '../../components/chat/Chat';

function ExperienceCanvas({ client }) {
  // Certifique-se de que o client foi passado corretamente
  if (!client) {
    return <div>Loading...</div>; // Renderiza uma mensagem de carregamento enquanto o cliente está sendo inicializado
  }

  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'sprint', keys: ['Shift'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Loader />
        <Canvas
          shadows
          camera={{
            position: [0, 0.8, 3],
            fov: 75,
          }}
        >
          <Experience client={client} />
        </Canvas>
      </KeyboardControls>
      <ChatBubble client={client} />
    </>
  );
}

export default ExperienceCanvas;