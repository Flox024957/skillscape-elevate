import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/auth', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/auth', { replace: true });
      }
    });

    checkAuth();

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};