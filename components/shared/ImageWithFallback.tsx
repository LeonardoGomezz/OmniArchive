import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export const ImageWithFallback = ({ 
  src, 
  alt, 
  fallback = "/placeholder.png",
  className 
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setImageSrc(fallback);
      setHasError(true);
    }
  }, [fallback, hasError]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={cn("object-cover", className)}
    />
  );
};
