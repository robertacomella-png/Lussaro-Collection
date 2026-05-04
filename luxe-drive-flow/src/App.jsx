import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import WidgetVisibility from "@/components/fleet/WidgetVisibility";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import ExoticMiami from "@/pages/ExoticMiami";
import LamborghiniMiami from "@/pages/LamborghiniMiami";
import GWagonMiami from "@/pages/GWagonMiami";
import LuxurySuvMiami from "@/pages/LuxurySuvMiami";
import RollsRoyceMiami from "@/pages/RollsRoyceMiami";
import ExoticBrickell from "@/pages/ExoticBrickell";
import ExoticSouthBeach from "@/pages/ExoticSouthBeach";
import Footer from "@/components/footer/Footer";

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
      <Route path="/home" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/exotic-car-rental-miami" element={<ExoticMiami />} />
      <Route path="/g-wagon-rental-miami" element={<GWagonMiami />} />
      <Route path="/lamborghini-rental-miami" element={<LamborghiniMiami />} />
      <Route path="/luxury-suv-rental-miami" element={<LuxurySuvMiami />} />
      <Route path="/rolls-royce-rental-miami" element={<RollsRoyceMiami />} />
      <Route path="/exotic-car-rental-brickell" element={<ExoticBrickell />} />
      <Route path="/exotic-car-rental-south-beach" element={<ExoticSouthBeach />} />
      <Route path="*" element={<PageNotFound />} /> {/* ✅ ALWAYS LAST */}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>

          <WidgetVisibility />

          <AuthenticatedApp />

          {/* 🔥 GLOBAL FOOTER */}
          <Footer />

        </Router>

        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
