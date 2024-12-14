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
    <div className="space-y-6">
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgba(139, 92, 246, 0.9)',
                brandAccent: 'rgba(139, 92, 246, 1)',
                inputBackground: 'rgba(26, 31, 53, 0.8)',
                inputText: '#FFFFFF',
                inputBorder: 'rgba(139, 92, 246, 0.5)',
                inputBorderFocus: 'rgba(139, 92, 246, 0.8)',
                inputBorderHover: 'rgba(139, 92, 246, 0.7)',
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
            button: 'auth-button bg-primary/20 hover:bg-primary/30 border border-primary/50 shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:shadow-[0_0_35px_rgba(139,92,246,0.4)] backdrop-blur-sm transition-all duration-300',
            input: 'auth-input bg-background/50 backdrop-blur-md text-white border-2 border-primary/40 focus:border-primary/70 rounded-xl px-6 py-4 w-full transition-all duration-300 mb-4',
            label: 'auth-label block text-sm font-medium text-white mb-3',
            loader: 'auth-loader border-t-2 border-primary',
          },
        }}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-primary/30" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background/80 backdrop-blur-sm px-2 text-muted-foreground">
            Try the demo account
          </span>
        </div>
      </div>
      <Button 
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Access Demo Account
      </Button>
    </div>
  );
};