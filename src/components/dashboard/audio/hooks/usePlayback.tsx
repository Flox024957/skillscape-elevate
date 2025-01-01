import { useSkillPlayback } from '@/hooks/useSkillPlayback';

export const usePlayback = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
  content: string
) => {
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
    handlePlay,
    utteranceRef,
  };
};