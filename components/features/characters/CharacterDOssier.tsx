"use client";
import { motion } from "framer-motion";
import { Character } from "@/types";
import { DossierHeader } from "./DossierHeader";
import { CharacterPortrait } from "./CharacterPortrait";
import { LocationReadouts } from "./LocationReadouts";
import { SubjectAnalysis } from "./SubjectAnalysis";
import { DimensionalActivity } from "./DimensionalActivity";
import { AppearanceLogs } from "./AppearanceLogs";

interface CharacterDossierProps {
  character: Character;
  onBack: () => void;
}

export const CharacterDossier = ({
  character,
  onBack,
}: CharacterDossierProps) => {
  return (
    <div className="space-y-6">
      {/* Back button */}
      <DossierHeader onBack={onBack} />

      {/* Main split view */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left - Portrait & Scanning Frame */}
        <CharacterPortrait character={character} />

        {/* Right - Technical Readouts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-3 space-y-4"
        >
          {/* Origin & Location cards */}
          <LocationReadouts character={character} />

          {/* Technical Dossier */}
          <SubjectAnalysis character={character} />

          {/* Dimensional Activity Chart */}
          <DimensionalActivity />
        </motion.div>
      </div>

      {/* Bottom - Appearance Logs */}
      <AppearanceLogs character={character} />
    </div>
  );
};

export default CharacterDossier;
