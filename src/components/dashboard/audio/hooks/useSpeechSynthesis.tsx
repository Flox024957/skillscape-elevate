import { useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useSpeechSynthesis = (
  playbackSpeed: number,
  volume: number,
  selectedVoice: string,
  voices: SpeechSynthesisVoice[],
) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const createUtterance = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    }
    utterance.volume = volume;
    utterance.rate = playbackSpeed;
    return utterance;
  };

  return {
    createUtterance,
    speechSynthesis,
    utteranceRef,
    toast,
  };
};