import React from 'react';
import ChatBubble from '../components/chat/ChatBubble'; 

const ChatPage = () => {
  const apiKey = "your-api-key";
  const characterId = "your-character-id"; 

  return (
    <div className="chat-page-container">
      <h1>Interaja com o NPC</h1>
      {/* Renderiza o componente de chat */}
      <ChatBubble chatHistory="Show" client={{ apiKey, characterId }} />
    </div>
  );
};

export default ChatPage;