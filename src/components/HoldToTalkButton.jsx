// HoldToTalkButton.js
import React from "react";

const HoldToTalkButton = ({ onPress, onRelease }) => {
  return (
    <button
      style={{
        position: "absolute", // Absoluto em relação ao contêiner pai
        bottom: "20px", // Espaçamento inferior
        left: "50%", // Centraliza horizontalmente
        transform: "translateX(-50%)", // Ajusta para centralizar completamente
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "none",
        zIndex: 1000, // Garante que o botão esteja na frente do canvas
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onTouchStart={onPress} // Suporte para toque em dispositivos móveis
      onTouchEnd={onRelease} // Suporte para toque em dispositivos móveis
    >
      Segure para Falar
    </button>
  );
};

export default HoldToTalkButton;