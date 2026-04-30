import { Outlet } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { SideNav } from "@/components/SideNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Chatbot } from "@/components/Chatbot";

export const AppLayout = () => (
  <div className="min-h-screen relative bg-gradient-ambient overflow-hidden">
    {/* Decorative organic blobs */}
    <div
      aria-hidden
      className="blob animate-float-slow hidden sm:block"
      style={{
        width: 380,
        height: 380,
        top: -120,
        left: -120,
        background: "hsl(28 100% 55% / 0.55)",
      }}
    />
    <div
      aria-hidden
      className="blob animate-float-slower hidden sm:block"
      style={{
        width: 320,
        height: 320,
        top: "30%",
        right: -140,
        background: "hsl(42 100% 55% / 0.45)",
      }}
    />
    <div
      aria-hidden
      className="blob animate-float-slow hidden sm:block"
      style={{
        width: 360,
        height: 360,
        bottom: -160,
        left: "20%",
        background: "hsl(14 70% 50% / 0.35)",
      }}
    />
    {/* Subtle grain overlay */}
    <div aria-hidden className="absolute inset-0 pattern-grain opacity-40 pointer-events-none" />

    {/* Side nav for tablets & desktops */}
    <SideNav />

    {/* Main content: mobile-first column, expands fluidly on larger screens */}
    <main className="relative animate-fade-in lg:pl-64">
      <div className="mx-auto w-full max-w-md sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl pb-24 lg:pb-10 min-h-screen">
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-50 pt-4 px-5 pointer-events-none">
          <div className="flex justify-end pointer-events-auto max-w-md sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <LanguageSwitcher />
          </div>
        </header>
        <Outlet />
      </div>
    </main>

    {/* Bottom nav only on mobile/tablet */}
    <BottomNav />

    {/* Chatbot */}
    <Chatbot />
  </div>
);
