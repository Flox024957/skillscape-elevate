import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useAudioPlayer = (selectedContent: string, playbackSpeed: number = 1) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const { toast } = useToast();
  const speechSynthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressInterval = useRef<number>();

  // Fetch playlist content when currentPlaylist changes
  const { data: playlistContent } = useQuery({
    queryKey: ['playlist-content', currentPlaylist],
    queryFn: async () => {
      if (!currentPlaylist) return [];

      const { data: playlist, error } = await supabase
        .from('skill_playlists')
        .select('skills')
        .eq('id', currentPlaylist)
        .single();

      if (error) throw error;

      if (!playlist?.skills?.length) return [];

      const { data: skills, error: skillsError } = await supabase
        .from('skills')
        .select('titre')
        .in('id', playlist.skills);

      if (skillsError) throw skillsError;

      return skills.map(skill => skill.titre);
    },
    enabled: !!currentPlaylist,
  });

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        const frenchVoice = availableVoices.find(voice => voice.lang.startsWith('fr'));
        setSelectedVoice(frenchVoice?.name || availableVoices[0].name);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handlePlay = (content?: string) => {
    const textToSpeak = content || selectedContent;
    
    if (!textToSpeak) {
      toast({
        title: "Aucun contenu sélectionné",
        description: "Veuillez sélectionner du contenu à lire",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      speechSynthesis.pause();
      setIsPlaying(false);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
    if (selectedVoiceObj) {
      utterance.voice = selectedVoiceObj;
    }
    utterance.volume = volume;
    utterance.rate = playbackSpeed;

    utterance.onstart = () => {
      setDuration(utterance.text.length * 50);
      progressInterval.current = window.setInterval(() => {
        setCurrentTime(prev => Math.min(prev + 50, utterance.text.length * 50));
      }, 50);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      // Play next content in playlist if available
      if (currentPlaylist && playlistContent && playlistContent.length > 0) {
        const currentIndex = playlistContent.indexOf(textToSpeak);
        if (currentIndex < playlistContent.length - 1) {
          handlePlay(playlistContent[currentIndex + 1]);
        }
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la lecture",
        variant: "destructive",
      });
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

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
    currentPlaylist,
    setSelectedVoice,
    handlePlay,
    handleVolumeChange,
    formatTime,
    setCurrentPlaylist,
  };
};