import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          console.log('Not authenticated, redirecting to auth page');
          navigate('/auth', { replace: true });
          return;
        }

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          toast.error("Erreur lors de la vérification de la session");
          navigate('/auth', { replace: true });
          return;
        }

        if (!session) {
          console.log('No session found, redirecting to auth page');
          navigate('/auth', { replace: true });
          return;
        }

        console.log('Session found:', session.user.id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error in checkAuth:', error);
        toast.error("Erreur lors de la vérification de l'authentification");
        navigate('/auth', { replace: true });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.id);
      if (!session) {
        navigate('/auth', { replace: true });
      }
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate, isAuthenticated]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};