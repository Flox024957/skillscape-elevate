import { useState, useEffect } from 'react';

export const useVoiceSelection = () => {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      console.log('Voix disponibles:', availableVoices);
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        const frenchVoice = availableVoices.find(voice => voice.lang.startsWith('fr'));
        if (frenchVoice) {
          console.log('Voix française trouvée:', frenchVoice.name);
          setSelectedVoice(frenchVoice.name);
        } else {
          console.log('Aucune voix française trouvée, utilisation de la première voix disponible');
          setSelectedVoice(availableVoices[0].name);
        }
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  return {
    selectedVoice,
    setSelectedVoice,
    voices
  };
};