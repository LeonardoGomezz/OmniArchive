"use client";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { Character } from "@/types";
import { getCharacterById } from "@/lib/services/characters";
import { characterKeys } from "@/queries/characters/character.keys";
import CharacterDossier from "@/components/features/characters/CharacterDOssier";
import { useRouter } from "next/navigation";

export default function Dossier({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const {
    data: character,
    isLoading,
    error,
  } = useQuery<Character>({
    queryKey: characterKeys.detail(id),
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });

  const handleBack = () => {
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-primary/50 animate-spin border-t-transparent" />
          <p className="text-muted-foreground font-mono text-sm">
            Loading dossier...
          </p>
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive font-mono">Character not found</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 text-sm font-mono rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to Database
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <CharacterDossier character={character} onBack={handleBack} />
    </div>
  );
}
