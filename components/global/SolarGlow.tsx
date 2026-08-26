"use client";

import { useEffect, useState } from "react";
import {
  calculateSolarPosition,
  LONDON_COORDS,
  MAHENDRAGARH_COORDS,
  SolarPosition,
} from "@/lib/solar-astronomy";

export default function SolarGlow() {
  const [mounted, setMounted] = useState(false);
  const [ldnSolar, setLdnSolar] = useState<SolarPosition | null>(null);
  const [mahSolar, setMahSolar] = useState<SolarPosition | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ldn = calculateSolarPosition(LONDON_COORDS, now);
      const mah = calculateSolarPosition(MAHENDRAGARH_COORDS, now);

      setLdnSolar(ldn);
      setMahSolar(mah);

      // Inject real-time celestial vector variables into CSS root
      const root = document.documentElement;
      
      // London Grazing Vector
      const ldnRad = (ldn.lightAngle * Math.PI) / 180;
      const ldnShadowX = (-Math.sin(ldnRad) * (ldn.shadowLength * 16)).toFixed(2);
      const ldnShadowY = (Math.cos(ldnRad) * (ldn.shadowLength * 16)).toFixed(2);
      root.style.setProperty("--ldn-shadow-x", `${ldnShadowX}px`);
      root.style.setProperty("--ldn-shadow-y", `${ldnShadowY}px`);
      root.style.setProperty("--ldn-solar-alt", `${ldn.altitude.toFixed(1)}°`);

      // Mahendragarh Grazing Vector
      const mahRad = (mah.lightAngle * Math.PI) / 180;
      const mahShadowX = (-Math.sin(mahRad) * (mah.shadowLength * 16)).toFixed(2);
      const mahShadowY = (Math.cos(mahRad) * (mah.shadowLength * 16)).toFixed(2);
      root.style.setProperty("--mah-shadow-x", `${mahShadowX}px`);
      root.style.setProperty("--mah-shadow-y", `${mahShadowY}px`);
      root.style.setProperty("--mah-solar-alt", `${mah.altitude.toFixed(1)}°`);
    };

    update();
    setMounted(true);
    const interval = setInterval(update, 30000); // Re-calculate every 30s
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !ldnSolar || !mahSolar) return null;

  // Dynamic spectral color temperature
  const getSkyColor = (pos: SolarPosition, isNorth: boolean) => {
    if (pos.altitude > 15) {
      return "rgba(251, 191, 36, 0.04)"; // Crisp high-altitude daylight
    } else if (pos.altitude > 0) {
      return "rgba(249, 115, 22, 0.06)"; // Low grazing golden hour
    } else if (pos.altitude > -6) {
      return "rgba(168, 85, 247, 0.04)"; // Civil twilight
    } else {
      return isNorth ? "rgba(99, 102, 241, 0.03)" : "rgba(30, 27, 75, 0.04)"; // Nocturnal deep sky
    }
  };

  const ldnColor = getSkyColor(ldnSolar, true);
  const mahColor = getSkyColor(mahSolar, false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden transition-all duration-1000"
    >
      {/* Astrometric Solar Gradients */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 10% 10%, ${ldnColor}, transparent 65%),
            radial-gradient(ellipse 65% 55% at 90% 90%, ${mahColor}, transparent 65%)
          `,
        }}
      />
    </div>
  );
}