"use client";
import { useEffect, useState } from "react";
import { useNavigation } from "@/store/use-navigation";
import { NAVIGATION_CONFIG } from "@/lib/config/navigation";

export const useSidebarPadding = () => {
  const { isCollapsed } = useNavigation();
  const [sidebarWidth, setSidebarWidth] = useState<number>(
    NAVIGATION_CONFIG.SIDEBAR.EXPANDED_WIDTH,
  );

  useEffect(() => {
    // Update the padding based on the sidebar's state
    const newWidth = isCollapsed
      ? NAVIGATION_CONFIG.SIDEBAR.COLLAPSED_WIDTH
      : NAVIGATION_CONFIG.SIDEBAR.EXPANDED_WIDTH;
    setSidebarWidth(newWidth);
  }, [isCollapsed]);

  return sidebarWidth;
};
