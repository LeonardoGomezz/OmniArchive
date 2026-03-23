import { useState, useEffect } from "react";
import { APP_CONFIG } from "@/lib/config/constants";

export const useDebounce = <T>(value: T, delay: number = APP_CONFIG.UI.DEBOUNCE_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
