import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import { useEffect } from "react";
import WidgetVisibility from "@/components/fleet/WidgetVisibility";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import ExoticMiami from "@/pages/ExoticMiami";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } =
    useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />;
    } else if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/exotic-car-rental-miami" element={<ExoticMiami />} />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    const setTitle = () => {
      document.title = "Rent With Lussaro";
    };

    setTitle();
    const interval = setInterval(setTitle, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <WidgetVisibility />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
