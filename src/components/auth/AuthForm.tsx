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

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Demo Account Not Available",
            description: "Please ask your administrator to set up the demo account.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Could not access demo account. Please try again later.",
            variant: "destructive",
          });
        }
        console.error('Demo login error:', error);
        return;
      }
      
      if (session) {
        toast({
          title: "Success",
          description: "Welcome to the demo account!",
        });
        navigate('/main');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-10">
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#8B5CF6',
                brandAccent: '#7C3AED',
                inputBackground: '#1A1F35',
                inputText: '#FFFFFF',
                inputBorder: '#8B5CF680',
                inputBorderFocus: '#8B5CF6',
                inputBorderHover: '#8B5CF6',
                defaultButtonBackground: '#8B5CF6',
                defaultButtonBackgroundHover: '#7C3AED',
                defaultButtonBorder: 'transparent',
                defaultButtonText: '#FFFFFF',
              },
              space: {
                inputPadding: '16px',
                buttonPadding: '16px',
              },
              borderWidths: {
                buttonBorderWidth: '1px',
                inputBorderWidth: '2px',
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
            button: 'auth-button',
            input: 'auth-input',
            label: 'auth-label block text-sm font-medium text-white/90 mb-2',
            loader: 'auth-loader border-t-2 border-white',
          },
        }}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Try the demo account
          </span>
        </div>
      </div>
      <Button 
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Access Demo Account
      </Button>
    </div>
  );
};