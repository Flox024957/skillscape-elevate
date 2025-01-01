import { useState, useEffect } from 'react';
import { useVoices } from './hooks/useVoices';
import { usePlayback } from './hooks/usePlayback';

export const useAudioPlayer = (
  selectedContent: string, 
  playbackSpeed: number = 1,
  onPlaybackComplete?: () => void
) => {
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const {
    isPlaying,
    handlePlay,
    handlePause,
    handleSeek,
    utteranceRef,
  } = usePlayback(
    playbackSpeed, 
    volume, 
    selectedVoice, 
    voices, 
    selectedContent,
    onPlaybackComplete
  );

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
    if (isPlaying && !isPaused) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 50, duration));
      }, 50);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isPaused, duration]);

  useEffect(() => {
    if (selectedContent) {
      // Estimation plus précise de la durée basée sur le nombre de caractères et la vitesse de lecture
      const durationPerChar = 50 / playbackSpeed;
      setDuration(selectedContent.length * durationPerChar);
    }
  }, [selectedContent, playbackSpeed]);

  return {
    isPlaying,
    isPaused,
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