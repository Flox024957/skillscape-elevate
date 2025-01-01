import { useRef, useState, useCallback, useEffect } from 'react';
import { toast } from "sonner";

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  content: string,
  onPlaybackComplete?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSynthesis = window.speechSynthesis;
  const [isPaused, setIsPaused] = useState(false);

  const createUtterance = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    
    if (!selectedVoiceObj) {
      toast.error("La voix sélectionnée n'est pas disponible");
      return null;
    }
    
    utterance.voice = selectedVoiceObj;
    utterance.volume = volume;
    utterance.rate = playbackSpeed;
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      if (onPlaybackComplete) {
        onPlaybackComplete();
      }
    };
    
    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale:', event);
      setIsPlaying(false);
      setIsPaused(false);
      toast.error("Une erreur est survenue lors de la lecture. Veuillez réessayer.");
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };
    
    return utterance;
  }, [selectedVoice, voices, volume, playbackSpeed, onPlaybackComplete]);

  const handlePlay = useCallback((text: string) => {
    if (isPlaying) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
      return;
    }

    if (!text) {
      toast.error("Aucun contenu à lire");
      return;
    }

    // Annuler toute lecture en cours
    speechSynthesis.cancel();

    const utterance = createUtterance(text);
    if (!utterance) return;

    utteranceRef.current = utterance;
    
    try {
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    } catch (error) {
      console.error('Erreur lors du démarrage de la lecture:', error);
      toast.error("Impossible de démarrer la lecture");
    }
  }, [isPlaying, isPaused, createUtterance, speechSynthesis]);

  const handlePause = useCallback(() => {
    if (isPlaying) {
      if (isPaused) {
        speechSynthesis.resume();
        setIsPaused(false);
      } else {
        speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  }, [isPlaying, isPaused]);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const handleSeek = useCallback((time: number) => {
    // Pour l'instant, on redémarre la lecture car l'API Speech ne supporte pas le seek
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      handlePlay(content);
    }
  }, [content, handlePlay]);

  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Gérer les changements de vitesse et de volume
  useEffect(() => {
    if (utteranceRef.current && isPlaying) {
      const currentText = utteranceRef.current.text;
      speechSynthesis.cancel();
      handlePlay(currentText);
    }
  }, [playbackSpeed, volume]);

  return {
    isPlaying,
    isPaused,
    handlePlay,
    handlePause,
    handleStop,
    handleSeek,
    utteranceRef,
  };
};