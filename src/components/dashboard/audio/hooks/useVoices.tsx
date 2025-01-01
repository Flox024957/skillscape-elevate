import { useState, useEffect } from 'react';

export const useVoices = () => {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        const frenchVoice = availableVoices.find(voice => voice.lang.startsWith('fr'));
        setSelectedVoice(frenchVoice?.name || availableVoices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return {
    selectedVoice,
    voices,
    setSelectedVoice,
  };
};