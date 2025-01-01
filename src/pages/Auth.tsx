import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthForm } from "@/components/auth/AuthForm";
import { useIsMobile } from "@/hooks/use-mobile";

const Auth = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/main");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/main");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden",
      isMobile && "pb-16"
    )}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/10 via-background to-background" />
      <AuthContainer>
        <AuthHeader />
        <AuthForm />
      </AuthContainer>
    </div>
  );
};

export default Auth;