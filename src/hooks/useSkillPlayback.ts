import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useSkillPlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[]
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;

  const createUtterance = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    }
    utterance.volume = volume;
    utterance.rate = playbackSpeed;
    return utterance;
  };

  const handlePlay = (content: string) => {
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    if (!content) {
      toast({
        title: "Aucun contenu sélectionné",
        description: "Veuillez sélectionner du contenu à lire",
        variant: "destructive",
      });
      return;
    }

    const utterance = createUtterance(content);

    utterance.onstart = () => {
      setDuration(utterance.text.length * 50);
      progressInterval.current = window.setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 50, utterance.text.length * 50));
      }, 50);
    };

    utterance.onend = () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setCurrentTime(0);
      setIsPlaying(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
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
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      speechSynthesis.cancel();
    };
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
    utteranceRef,
    speechSynthesis,
  };
};