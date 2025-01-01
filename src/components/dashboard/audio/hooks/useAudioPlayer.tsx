import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useVoiceSelection } from './useVoiceSelection';
import { usePlaybackProgress } from './usePlaybackProgress';

export const useAudioPlayer = (
  selectedContent: string, 
  playbackSpeed: number = 1,
  onEnd?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const { selectedVoice, setSelectedVoice, voices } = useVoiceSelection();
  const { 
    currentTime, 
    duration, 
    startProgress, 
    stopProgress, 
    formatTime,
    progressInterval 
  } = usePlaybackProgress();

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handlePlay = () => {
    console.log('handlePlay appelé avec le contenu:', selectedContent);
    
    if (!selectedContent) {
      toast({
        title: "Aucun contenu sélectionné",
        description: "Veuillez sélectionner du contenu à lire",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      console.log('Pause de la lecture');
      speechSynthesis.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(selectedContent);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    
    if (selectedVoiceObj) {
      console.log('Utilisation de la voix:', selectedVoiceObj.name);
      utterance.voice = selectedVoiceObj;
    } else {
      console.log('Voix sélectionnée non trouvée');
    }

    utterance.volume = volume;
    utterance.rate = playbackSpeed;
    utterance.lang = 'fr-FR';

    utterance.onstart = () => {
      console.log('Début de la lecture');
      startProgress(utterance.text.length);
    };

    utterance.onend = () => {
      console.log('Fin de la lecture');
      setIsPlaying(false);
      stopProgress();
      if (onEnd) {
        onEnd();
      }
    };

    utterance.onerror = (event) => {
      console.error('Erreur de synthèse vocale:', event);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la lecture",
        variant: "destructive",
      });
      setIsPlaying(false);
      stopProgress();
    };

    utteranceRef.current = utterance;
    try {
      console.log('Démarrage de la lecture');
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } catch (error) {
      console.error('Erreur lors du démarrage de la lecture:', error);
      toast({
        title: "Erreur",
        description: "Impossible de démarrer la lecture audio",
        variant: "destructive",
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume;
    }
  };

  return {
    isPlaying,
    selectedVoice,
    voices,
    volume,
    currentTime,
    duration,
    setSelectedVoice,
    handlePlay,
    handleVolumeChange,
    formatTime,
    onEnd
  };
};