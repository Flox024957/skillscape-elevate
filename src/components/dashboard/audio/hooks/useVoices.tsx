import { useState, useEffect } from 'react';

export const useVoices = () => {
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      // Ne garder que les voix qui fonctionnent réellement
      const workingVoices = availableVoices.filter(voice => 
        voice.localService || voice.voiceURI.includes('Google') || voice.voiceURI.includes('Microsoft')
      );
      
      setVoices(workingVoices);
      
      if (workingVoices.length > 0) {
        // Priorité aux voix françaises
        const frenchVoice = workingVoices.find(voice => 
          voice.lang.startsWith('fr') && 
          (voice.localService || voice.voiceURI.includes('Google') || voice.voiceURI.includes('Microsoft'))
        );
        
        if (frenchVoice) {
          setSelectedVoice(frenchVoice.name);
        } else {
          // Si pas de voix française, prendre la première voix disponible
          setSelectedVoice(workingVoices[0].name);
        }
      }
    };

    // Charger les voix immédiatement si elles sont déjà disponibles
    loadVoices();
    
    // Écouter l'événement onvoiceschanged
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