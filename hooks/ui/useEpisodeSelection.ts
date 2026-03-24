"use client";
import { useState, useCallback } from "react";

export const useEpisodeSelection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
  }, []);

  return {
    expandedId,
    isExpanded: (id: number) => expandedId === id,
    handleToggle,
    handleClose,
  };
};
