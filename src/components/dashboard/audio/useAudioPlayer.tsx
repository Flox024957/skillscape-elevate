import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (
  selectedContent: string, 
  playbackSpeed: number = 1,
  onEnd?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressInterval = useRef<number>();

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
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

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

    // Annuler toute lecture en cours
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
    utterance.lang = 'fr-FR'; // Forcer la langue française

    utterance.onstart = () => {
      console.log('Début de la lecture');
      setDuration(utterance.text.length * 50);
      progressInterval.current = window.setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 50, utterance.text.length * 50));
      }, 50);
    };

    utterance.onend = () => {
      console.log('Fin de la lecture');
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
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
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
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

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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