import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "./layouts/AppLayout";
import Index from "./pages/Index.tsx";
import Jambaar from "./pages/Jambaar.tsx";
import Xibaar from "./pages/Xibaar.tsx";
import EpreuveDetail from "./pages/xibaar/EpreuveDetail.tsx";
import AthleteDetail from "./pages/xibaar/AthleteDetail.tsx";
import ActualiteDetail from "./pages/xibaar/ActualiteDetail.tsx";
import YoonWi from "./pages/YoonWi.tsx";
import Cosaan from "./pages/Cosaan.tsx";
import PlatDetail from "./pages/cosaan/PlatDetail.tsx";
import LieuDetail from "./pages/cosaan/LieuDetail.tsx";
import ArtisanatDetail from "./pages/cosaan/ArtisanatDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Welcome from "./pages/Welcome.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { GuestProvider } from "./contexts/GuestContext";
import { RouteGate } from "./components/RouteGate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GuestProvider>
        <AuthProvider>
        <RouteGate>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Index />} />
            <Route path="/jambaar" element={<Jambaar />} />
            <Route path="/xibaar" element={<Xibaar />} />
            <Route path="/xibaar/epreuve/:id" element={<EpreuveDetail />} />
            <Route path="/xibaar/athlete/:id" element={<AthleteDetail />} />
            <Route path="/xibaar/actu/:id" element={<ActualiteDetail />} />
            <Route path="/yoon-wi" element={<YoonWi />} />
            <Route path="/cosaan" element={<Cosaan />} />
            <Route path="/cosaan/plat/:id" element={<PlatDetail />} />
            <Route path="/cosaan/lieu/:id" element={<LieuDetail />} />
            <Route path="/cosaan/artisanat/:id" element={<ArtisanatDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </RouteGate>
        </AuthProvider>
        </GuestProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
