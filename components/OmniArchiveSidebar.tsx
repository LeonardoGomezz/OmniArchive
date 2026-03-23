"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useNavigation } from "@/store/use-navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { navItems } from "@/lib/data/data";

const OnmiArchiveSidebar = () => {
  const {
    activeSection,
    setActiveSection,
    isCollapsed,
    toggleCollapsed,
    setCollapsed,
  } = useNavigation();
  const isMobile = useIsMobile();

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile, setCollapsed]);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-56"
      }`}
      style={{
        background: "hsla(0, 0%, 2%, 0.85)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderRight: "1px solid hsla(120, 100%, 50%, 0.15)",
        boxShadow: "4px 0 30px hsla(120, 100%, 50%, 0.05)",
      }}
    >
      {/* Logo area */}
      <div className="p-4 border-b border-border/30">
        {!isCollapsed && (
          <div className="text-glow">
            <h2 className="font-display text-xs font-bold tracking-[0.25em] text-primary">
              CITADEL
            </h2>
            <p className="text-[10px] tracking-[0.15em] text-muted-foreground mt-0.5">
              DATABASE TERMINAL
            </p>
          </div>
        )}
        {isCollapsed && (
          <div className="text-primary text-glow text-center font-display text-sm font-bold">
            C
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 group relative ${
                isActive ? "bg-primary/10" : "hover:bg-primary/5"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-primary rounded-r"
                  style={{ boxShadow: "0 0 8px hsl(120 100% 50% / 0.6)" }}
                />
              )}

              <item.icon
                size={18}
                className={`transition-all duration-200 ${
                  isActive
                    ? "text-primary icon-glow"
                    : "text-muted-foreground group-hover:text-primary group-hover:icon-glow"
                }`}
              />

              {!isCollapsed && (
                <span
                  className={`text-[11px] tracking-[0.1em] uppercase transition-all duration-200 ${
                    isActive
                      ? "text-primary text-glow font-medium"
                      : "text-muted-foreground group-hover:text-primary group-hover:text-glow"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => toggleCollapsed()}
        className="p-3 border-t border-border/30 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default OnmiArchiveSidebar;
