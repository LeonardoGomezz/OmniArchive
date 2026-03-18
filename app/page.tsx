"use client";
import { useNavigation } from "@/store/use-navigation";

export default function Home() {
  const { activeSection } = useNavigation();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-glow mb-4">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h1>
      <p className="text-muted-foreground">Current section: {activeSection}</p>
    </div>
  );
}
