import { useState } from 'react';
import { useSkillPlayback } from '@/hooks/useSkillPlayback';
import { usePlaylistContent } from './usePlaylistContent';
import { Skill } from '@/types/skill';

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  currentPlaylist: string | null
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const { data: playlistContent = [] } = usePlaylistContent(currentPlaylist);
  
  const {
    isPlaying,
    currentTime,
    duration,
    handlePlay,
  } = useSkillPlayback(playbackSpeed, volume, selectedVoice, voices);

  const getSectionContent = (skill: Skill, section: number) => {
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
      setCurrentIndex(0);
      setCurrentSection(0);
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    currentIndex,
    handlePlay,
    playNext,
  };
};