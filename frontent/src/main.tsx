import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./AppRouter.tsx";
import { Auth0ProviderToNavigate } from "./auth/Auth0ProviderToNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderToNavigate>
          <AppRouter />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0ProviderToNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
