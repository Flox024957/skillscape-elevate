import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import { AudioProvider } from "./contexts/AudioContext";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AudioProvider>
          <AppRoutes />
          <Toaster richColors position="top-center" />
        </AudioProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;