import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { usePlaylistContent } from './usePlaylistContent';

export const usePlaylist = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomMode, setRandomMode] = useState(false);

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

  const { data: playlistContent = [] } = usePlaylistContent(currentPlaylist);

  // Sélectionner automatiquement la playlist "lecture en cours"
  useEffect(() => {
    if (defaultPlaylist?.id && !currentPlaylist) {
      setCurrentPlaylist(defaultPlaylist.id);
    }
  }, [defaultPlaylist, currentPlaylist]);

  const nextTrack = () => {
    if (randomMode) {
      const randomIndex = Math.floor(Math.random() * playlistContent.length);
      setCurrentIndex(randomIndex);
      return playlistContent[randomIndex];
    } else {
      const nextIndex = (currentIndex + 1) % playlistContent.length;
      setCurrentIndex(nextIndex);
      return playlistContent[nextIndex];
    }
  };

  const previousTrack = () => {
    if (randomMode) {
      const randomIndex = Math.floor(Math.random() * playlistContent.length);
      setCurrentIndex(randomIndex);
      return playlistContent[randomIndex];
    } else {
      const prevIndex = currentIndex === 0 ? playlistContent.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      return playlistContent[prevIndex];
    }
  };

  const getCurrentTrack = () => playlistContent[currentIndex];

  const toggleRandomMode = () => setRandomMode(!randomMode);

  return {
    currentPlaylist,
    setCurrentPlaylist,
    playlistContent,
    currentIndex,
    randomMode,
    nextTrack,
    previousTrack,
    getCurrentTrack,
    toggleRandomMode,
  };
};