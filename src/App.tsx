import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { AudioProvider } from "@/contexts/AudioContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <BrowserRouter>
      <AudioProvider>
        <AppRoutes isAuthenticated={isAuthenticated} />
        <Toaster />
      </AudioProvider>
    </BrowserRouter>
  );
}

export default App;