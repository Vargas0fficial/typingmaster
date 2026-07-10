"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { PageTransition } from "@/components/effects/PageTransition";
import { FloatingOrbs } from "@/components/effects/FloatingOrbs";
import { WarpStars } from "@/components/effects/WarpStars";
import { Fireflies } from "@/components/effects/Fireflies";

const AUTH_PAGES = ["/login", "/register"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PAGES.includes(pathname);

  if (isAuthPage) {
    return (
      <div className="relative min-h-screen bg-[#0b0f19]">
        <FloatingOrbs />
        <WarpStars />
        <Fireflies />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen bg-[#0b0f19] text-zinc-100 font-sans select-none">
      <FloatingOrbs />
      <WarpStars />
      <Fireflies />
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}