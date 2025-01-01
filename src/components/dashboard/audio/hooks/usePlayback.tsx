import { useRef, useState, useCallback } from 'react';
import { toast } from "sonner";

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  content: string
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSynthesis = window.speechSynthesis;

  const createUtterance = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    } else {
      toast.error("La voix sélectionnée n'est pas disponible");
      return null;
    }
    
    utterance.volume = volume;
    utterance.rate = playbackSpeed;
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale:', event);
      toast.error("Une erreur est survenue lors de la lecture");
      setIsPlaying(false);
    };
    
    return utterance;
  }, [selectedVoice, voices, volume, playbackSpeed]);

  const handlePlay = useCallback((text: string) => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!text) {
      toast.error("Aucun contenu à lire");
      return;
    }

    const utterance = createUtterance(text);
    if (!utterance) return;

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }, [isPlaying, createUtterance]);

  const handlePause = useCallback(() => {
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      speechSynthesis.resume();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleSeek = useCallback((time: number) => {
    if (utteranceRef.current) {
      // Pour l'instant, on doit redémarrer la lecture car l'API Speech ne supporte pas le seek
      speechSynthesis.cancel();
      handlePlay(content);
    }
  }, [content, handlePlay]);

  return {
    isPlaying,
    handlePlay,
    handlePause,
    handleSeek,
    utteranceRef,
  };
};