import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Character } from "@/types";

export const useCharacterNavigation = () => {
  const router = useRouter();

  const handleViewDossier = useCallback((character: Character) => {
    router.push(`/dossier/${character.id}`);
  }, [router]);

  return { handleViewDossier };
};
