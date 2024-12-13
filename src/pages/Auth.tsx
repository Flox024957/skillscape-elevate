import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const redirectURL = window.location.origin + '/auth';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Neon border container */}
        <div className="absolute inset-0 border-2 rounded-lg animate-snake-border"></div>
        
        {/* Main content */}
        <div className="w-full bg-card p-8 rounded-lg shadow-lg relative z-10">
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome to <span className="text-primary">FLAP</span>
          </h1>
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#B026FF',
                    brandAccent: '#9215DE',
                  }
                }
              }
            }}
            redirectTo={redirectURL}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;