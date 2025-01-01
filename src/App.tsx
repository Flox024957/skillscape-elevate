import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { Toaster } from "@/components/ui/sonner";
import { AudioProvider } from "@/contexts/AudioContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AudioProvider>
          <AppRoutes isAuthenticated={isAuthenticated} />
          <Toaster />
        </AudioProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;