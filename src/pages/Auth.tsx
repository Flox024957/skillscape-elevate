import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-futuristic-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-panel p-8">
          <h1 className="text-4xl font-semibold text-center mb-8 futuristic-text">
            Welcome to FLAP
          </h1>
          
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#00A3FF',
                    brandAccent: '#9D4EDD',
                    inputBackground: '#1A1F35',
                    inputText: '#FFFFFF',
                    inputBorder: '#00A3FF40',
                    inputBorderFocus: '#9D4EDD',
                    inputBorderHover: '#00A3FF',
                  },
                  space: {
                    inputPadding: '16px',
                    buttonPadding: '16px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '0px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '12px',
                    buttonBorderRadius: '12px',
                    inputBorderRadius: '12px',
                  },
                  fonts: {
                    bodyFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                    buttonFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                    inputFontFamily: `ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button bg-gradient-to-r from-futuristic-blue to-futuristic-violet hover:opacity-90 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300',
                input: 'auth-input bg-futuristic-gray/30 backdrop-blur-md text-white border border-futuristic-blue/20 focus:border-futuristic-violet/50 rounded-xl px-4 py-3 w-full transition-all duration-300',
                label: 'auth-label block text-sm font-medium text-white/80 mb-2',
                loader: 'auth-loader border-t-2 border-futuristic-blue',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;