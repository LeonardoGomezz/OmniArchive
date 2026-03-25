"use client";
import QueryProvider from "@/app/QueryProvider";
import OnmiArchiveSidebar from "@/components/OmniArchiveSidebar";
import { useSidebarPadding } from "@/hooks/ui/useSidebarPadding";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigation } from "@/store/use-navigation";

interface LayoutContentProps {
  children: React.ReactNode;
}

export const LayoutContent = ({ children }: LayoutContentProps) => {
  const sidebarWidth = useSidebarPadding();
  const isMobile = useIsMobile();
  const { isCollapsed } = useNavigation();

  return (
    <QueryProvider>
      <div className="min-h-screen bg-background relative">
        {/* Scanline overlay */}
        <div className="scanline-overlay" />
        <OnmiArchiveSidebar />
        <div
          className="min-h-screen flex flex-col transition-all duration-300"
          style={{
            marginLeft: isMobile && !isCollapsed ? "0px" : `${sidebarWidth}px`,
          }}
        >
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
};
