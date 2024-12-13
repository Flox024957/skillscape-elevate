import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthForm } from "@/components/auth/AuthForm";

const Auth = () => {
  const navigate = useNavigate();

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
    <AuthContainer>
      <AuthHeader />
      <AuthForm />
    </AuthContainer>
  );
};

export default Auth;