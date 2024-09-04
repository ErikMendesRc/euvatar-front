import { ConvaiClient } from "convai-web-sdk";

export const initializeConvaiClient = (apiKey, characterId) => {
  const convaiClient = new ConvaiClient({
    apiKey,
    characterId,
    enableAudio: true,
    enableFacialData: true,
    faceModel: 3,
    disableAudioGeneration: false,
  });

  return convaiClient;
};