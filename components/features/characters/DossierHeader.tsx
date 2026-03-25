"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface DossierHeaderProps {
  onBack: () => void;
}

export const DossierHeader = ({ onBack }: DossierHeaderProps) => (
  <motion.button
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    onClick={onBack}
    className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors font-mono group"
  >
    <ArrowLeft size={14} className="group-hover:icon-glow transition-all" />
    Return to Grid
  </motion.button>
);

export default DossierHeader;
