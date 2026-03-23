"use client";
import QueryProvider from "@/app/QueryProvider";
import OnmiArchiveSidebar from "@/components/OmniArchiveSidebar";
import { useSidebarPadding } from "@/hooks/ui/useSidebarPadding";

interface LayoutContentProps {
  children: React.ReactNode;
}

export const LayoutContent = ({ children }: LayoutContentProps) => {
  const sidebarWidth = useSidebarPadding();

  return (
    <QueryProvider>
      <div className="min-h-screen bg-background relative">
        {/* Scanline overlay */}
        <div className="scanline-overlay" />
        <OnmiArchiveSidebar />
        <div
          className="min-h-screen flex flex-col transition-all duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
};
