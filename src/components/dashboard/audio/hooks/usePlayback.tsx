import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { usePlaylistContent } from './usePlaylistContent';

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  currentPlaylist: string | null
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const progressInterval = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const { data: playlistContent = [] } = usePlaylistContent(currentPlaylist);

  const getSectionContent = (skill: any, section: number) => {
    switch (section) {
      case 0:
        return `Résumé : ${skill.resume}`;
      case 1:
        return `Description : ${skill.description}`;
      case 2:
        return `Action concrète : ${skill.action_concrete}`;
      case 3:
        if (skill.exemples && skill.exemples.length > 0) {
          return `Exemples : ${skill.exemples.join('. ')}`;
        }
        return null;
      default:
        return null;
    }
  };

  const playNext = () => {
    const currentSkill = playlistContent[currentIndex];
    const nextSection = getSectionContent(currentSkill, currentSection + 1);

    if (nextSection) {
      setCurrentSection(prev => prev + 1);
      handlePlay(nextSection);
    } else if (currentIndex < playlistContent.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentSection(0);
      const nextSkill = playlistContent[currentIndex + 1];
      handlePlay(getSectionContent(nextSkill, 0));
    } else {
      setIsPlaying(false);
      setCurrentIndex(0);
      setCurrentSection(0);
      setCurrentTime(0);
    }
  };

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

  const handlePlay = (content?: string) => {
    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    let textToSpeak = content;
    if (!textToSpeak && playlistContent.length > 0) {
      const currentSkill = playlistContent[currentIndex];
      textToSpeak = getSectionContent(currentSkill, currentSection);
    }

    if (!textToSpeak) {
      toast({
        title: "Aucun contenu sélectionné",
        description: "Veuillez sélectionner du contenu à lire",
        variant: "destructive",
      });
      return;
    }

    const utterance = createUtterance(textToSpeak);

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
      playNext();
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
    currentIndex,
    handlePlay,
    utteranceRef,
    speechSynthesis,
  };
};