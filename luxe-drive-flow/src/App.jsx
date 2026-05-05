import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ExoticMiami = lazy(() => import("./pages/ExoticMiami"));
const LamborghiniMiami = lazy(() => import("./pages/LamborghiniMiami"));
const GWagonMiami = lazy(() => import("./pages/GWagonMiami"));
const LuxurySuvMiami = lazy(() => import("./pages/LuxurySuvMiami"));
const RollsRoyceMiami = lazy(() => import("./pages/RollsRoyceMiami"));
const ExoticBrickell = lazy(() => import("./pages/ExoticBrickell"));
const ExoticSouthBeach = lazy(() => import("./pages/ExoticSouthBeach"));
const PageNotFound = lazy(() => import("./lib/PageNotFound"));
const Footer = lazy(() => import("@/components/footer/Footer"));

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
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
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
    </Suspense>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center bg-black text-white">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading...</p>
                </div>
              </div>
            }>
              <AuthenticatedApp />
            </Suspense>

            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </div>
        </Router>

        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
