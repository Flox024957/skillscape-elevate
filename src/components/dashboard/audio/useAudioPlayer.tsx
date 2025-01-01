import { useState, useEffect } from 'react';
import { useVoices } from './hooks/useVoices';
import { usePlayback } from './hooks/usePlayback';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useAudioPlayer = (selectedContent: string, playbackSpeed: number = 1) => {
  const [volume, setVolume] = useState(1);
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);

  const { selectedVoice, voices, setSelectedVoice } = useVoices();
  const {
    isPlaying,
    currentTime,
    duration,
    currentIndex,
    handlePlay,
    utteranceRef,
    speechSynthesis
  } = usePlayback(playbackSpeed, volume, selectedVoice, voices, currentPlaylist);

  // Récupérer la playlist "lecture en cours"
  const { data: defaultPlaylist } = useQuery({
    queryKey: ['default-playlist'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: playlist, error } = await supabase
        .from('skill_playlists')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', 'Lecture en cours')
        .single();

      if (error) throw error;
      return playlist;
    },
  });

  // Sélectionner automatiquement la playlist "lecture en cours"
  useEffect(() => {
    if (defaultPlaylist?.id && !currentPlaylist) {
      setCurrentPlaylist(defaultPlaylist.id);
    }
  }, [defaultPlaylist, currentPlaylist]);

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