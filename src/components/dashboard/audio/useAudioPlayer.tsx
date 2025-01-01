import { useState, useEffect } from 'react';
import { useVoices } from './hooks/useVoices';
import { usePlayback } from './hooks/usePlayback';

export const useAudioPlayer = (selectedContent: string, playbackSpeed: number = 1) => {
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const {
    isPlaying,
    handlePlay,
    handlePause,
    handleSeek,
    utteranceRef,
  } = usePlayback(playbackSpeed, volume, selectedVoice, voices, selectedContent);

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

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 50, duration));
      }, 50);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    if (selectedContent) {
      // Estimation approximative de la durée basée sur le nombre de caractères
      setDuration(selectedContent.length * 50);
    }
  }, [selectedContent]);

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
    handleSeek,
  };
};