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
            title: "Compte de démonstration non disponible",
            description: "Veuillez contacter l'administrateur pour configurer le compte de démonstration.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: "Impossible d'accéder au compte de démonstration. Veuillez réessayer plus tard.",
            variant: "destructive",
          });
        }
        console.error('Demo login error:', error);
        return;
      }
      
      if (session) {
        toast({
          title: "Succès",
          description: "Bienvenue sur le compte de démonstration !",
        });
        navigate('/main');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
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
                brand: '#0EA5E9',
                brandAccent: '#0284C7',
                inputBackground: '#1A1F35',
                inputText: '#FFFFFF',
                inputBorder: '#0EA5E980',
                inputBorderFocus: '#0EA5E9',
                inputBorderHover: '#0EA5E9',
                defaultButtonBackground: '#0EA5E9',
                defaultButtonBackgroundHover: '#0284C7',
                defaultButtonBorder: 'transparent',
                defaultButtonText: '#FFFFFF',
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
        providers={[]}
      />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Essayer le compte de démonstration
          </span>
        </div>
      </div>
      <Button 
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Accéder au compte de démonstration
      </Button>
    </div>
  );
};