import { useState } from 'react';
import { useSkillPlayback } from '@/hooks/useSkillPlayback';
import { usePlaylistContent } from './usePlaylistContent';
import { Skill } from '@/types/skill';

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  content: string
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  
  const {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
    utteranceRef,
  } = useSkillPlayback(playbackSpeed, volume, selectedVoice, voices);

  return {
    isPlaying,
    currentTime,
    duration,
    currentIndex,
    handlePlay,
    utteranceRef,
  };
};