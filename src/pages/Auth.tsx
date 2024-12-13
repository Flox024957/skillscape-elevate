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
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#1d1d1f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="w-full bg-white dark:bg-[#2d2d2f] p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-semibold text-center mb-8 bg-gradient-to-r from-[#007AFF] to-[#5856D6] bg-clip-text text-transparent">
            Welcome to FLAP
          </h1>
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#007AFF',
                    brandAccent: '#5856D6',
                    inputBackground: 'white',
                    inputText: '#1d1d1f',
                    inputBorder: '#d1d1d6',
                    inputBorderFocus: '#007AFF',
                    inputBorderHover: '#007AFF',
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
                button: 'auth-button bg-[#007AFF] hover:bg-[#0071EB] text-white font-medium py-3 px-4 rounded-xl transition-colors',
                input: 'auth-input bg-white dark:bg-[#2d2d2f] text-[#1d1d1f] dark:text-white border border-[#d1d1d6] dark:border-[#3d3d3f] focus:border-[#007AFF] dark:focus:border-[#007AFF] rounded-xl px-4 py-3 w-full transition-colors',
                label: 'auth-label block text-sm font-medium text-[#1d1d1f] dark:text-white mb-2',
                loader: 'auth-loader border-t-2 border-[#007AFF]',
              },
            }}
            redirectTo={redirectURL}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;