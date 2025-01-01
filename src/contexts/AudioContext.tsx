import React, { createContext, useContext, useState, useCallback } from 'react';
import { useVoices } from '@/components/dashboard/audio/hooks/useVoices';
import { usePlayback } from '@/components/dashboard/audio/hooks/usePlayback';
import { toast } from "sonner";

interface AudioContextType {
  isPlaying: boolean;
  isPaused: boolean;
  selectedVoice: string;
  voices: SpeechSynthesisVoice[];
  volume: number;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  selectedContent: string;
  setSelectedContent: (content: string) => void;
  setSelectedVoice: (voice: string) => void;
  handlePlay: (content: string) => void;
  handleVolumeChange: (value: number[]) => void;
  formatTime: (ms: number) => string;
  handleSeek: (time: number) => void;
  setPlaybackSpeed: (speed: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedContent, setSelectedContent] = useState("");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const {
    isPlaying,
    isPaused,
    handlePlay: playbackHandlePlay,
    handleSeek,
    utteranceRef,
  } = usePlayback(
    playbackSpeed,
    volume,
    selectedVoice,
    voices,
    selectedContent
  );

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (utteranceRef.current) {
      utteranceRef.current.volume = newVolume;
    }
  }, [utteranceRef]);

  const handlePlay = useCallback((content: string) => {
    if (!selectedVoice) {
      toast.error("Veuillez sélectionner une voix avant de démarrer la lecture");
      return;
    }
    playbackHandlePlay(content);
    setSelectedContent(content);
  }, [selectedVoice, playbackHandlePlay]);

  const formatTime = useCallback((ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const value = {
    isPlaying,
    isPaused,
    selectedVoice,
    voices,
    volume,
    currentTime,
    duration,
    playbackSpeed,
    selectedContent,
    setSelectedContent,
    setSelectedVoice,
    handlePlay,
    handleVolumeChange,
    formatTime,
    handleSeek,
    setPlaybackSpeed,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};