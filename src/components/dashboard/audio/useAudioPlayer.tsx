import { useState, useRef } from 'react';
import { useVoices } from './hooks/useVoices';
import { usePlaylistContent } from './hooks/usePlaylistContent';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';

export const useAudioPlayer = (selectedContent: string, playbackSpeed: number = 1) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressInterval = useRef<number>();

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const { data: playlistContent } = usePlaylistContent(currentPlaylist);
  const { createUtterance, speechSynthesis, utteranceRef, toast } = useSpeechSynthesis(
    playbackSpeed,
    volume,
    selectedVoice,
    voices
  );

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

    if (!textToSpeak && playlistContent && playlistContent.length > 0) {
      textToSpeak = playlistContent[currentIndex];
    }
    
    if (!textToSpeak) {
      toast({
        title: "Aucun contenu sélectionné",
        description: "Veuillez sélectionner du contenu à lire ou une playlist",
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
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      // Passer au contenu suivant de la playlist
      if (playlistContent && currentIndex < playlistContent.length - 1) {
        setCurrentIndex(currentIndex + 1);
        handlePlay(playlistContent[currentIndex + 1]);
      } else {
        setCurrentIndex(0);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la lecture",
        variant: "destructive",
      });
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
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
    currentPlaylist,
    setSelectedVoice,
    handlePlay,
    handleVolumeChange,
    formatTime,
    setCurrentPlaylist,
  };
};