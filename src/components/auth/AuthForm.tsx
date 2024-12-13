import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoLogin = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: 'demo@flap.dev',
        password: 'demo123456'
      });

      if (error) throw error;
      
      if (session) {
        navigate('/main');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access demo account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgba(0, 0, 0, 0.9)',
                brandAccent: 'rgba(0, 0, 0, 0.95)',
                inputBackground: '#1A1F35',
                inputText: '#FFFFFF',
                inputBorder: '#8B5CF680',
                inputBorderFocus: '#8B5CF6',
                inputBorderHover: '#8B5CF6',
              },
              space: {
                inputPadding: '16px',
                buttonPadding: '16px',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '3px',
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
            container: 'auth-container space-y-6',
            button: 'auth-button bg-black/90 hover:bg-black/95 border border-orange-500/80 shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] backdrop-blur-sm transition-all duration-300',
            input: 'auth-input bg-futuristic-gray/50 backdrop-blur-md text-white border-[3px] border-[#8B5CF6]/40 focus:border-[#8B5CF6]/70 rounded-xl px-6 py-4 w-full transition-all duration-300 mb-4',
            label: 'auth-label block text-sm font-medium text-white mb-3',
            loader: 'auth-loader border-t-2 border-orange-500',
          },
        }}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or try the demo
          </span>
        </div>
      </div>
      <Button 
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
      >
        Access Demo Account
      </Button>
    </div>
  );
};