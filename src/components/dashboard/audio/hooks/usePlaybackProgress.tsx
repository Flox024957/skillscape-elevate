import { useState, useRef } from 'react';

export const usePlaybackProgress = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressInterval = useRef<number>();

  const startProgress = (textLength: number) => {
    setDuration(textLength * 50);
    progressInterval.current = window.setInterval(() => {
      setCurrentTime(prev => Math.min(prev + 50, textLength * 50));
    }, 50);
  };

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setCurrentTime(0);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    duration,
    startProgress,
    stopProgress,
    formatTime,
    progressInterval
  };
};