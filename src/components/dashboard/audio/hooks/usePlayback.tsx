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
    utteranceRef,
  } = useSkillPlayback(playbackSpeed, volume, selectedVoice, voices);

  const getSkillContent = (skill: Skill) => {
    const sections = [
      `Résumé : ${skill.resume}`,
      `Description : ${skill.description}`,
      `Action concrète : ${skill.action_concrete}`,
      skill.exemples && skill.exemples.length > 0 ? `Exemples : ${skill.exemples.join('. ')}` : null
    ].filter(Boolean);

    return sections[currentSection] || null;
  };

  const playNext = () => {
    if (!playlistContent.length) return;

    const currentSkill = playlistContent[currentIndex];
    if (!currentSkill) return;

    const nextSectionContent = getSkillContent(currentSkill);

    if (nextSectionContent) {
      setCurrentSection(prev => prev + 1);
      handlePlay(nextSectionContent);
    } else if (currentIndex < playlistContent.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentSection(0);
      const nextSkill = playlistContent[currentIndex + 1];
      const firstSection = getSkillContent(nextSkill);
      if (firstSection) handlePlay(firstSection);
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
    utteranceRef,
  };
};