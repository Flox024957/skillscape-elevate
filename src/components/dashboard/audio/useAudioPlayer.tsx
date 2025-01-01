import { useState } from 'react';
import { useVoices } from './hooks/useVoices';
import { usePlayback } from './hooks/usePlayback';

export const useAudioPlayer = (selectedContent: string, playbackSpeed: number = 1) => {
  const [volume, setVolume] = useState(1);

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
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
  };
};