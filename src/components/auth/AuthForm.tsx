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
      <Button 
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Access Demo Account
      </Button>
    </div>
  );
};