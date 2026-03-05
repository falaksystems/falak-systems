"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useEffect } from "react";

export default function BackgroundFX() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  // ✅ الطريقة الصحيحة
  const spotlight = useMotionTemplate`
    radial-gradient(
      500px circle at ${smoothX}px ${smoothY}px,
      rgba(255,255,255,0.08),
      transparent 70%
    )
  `;

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060A14] via-[#0B0F19] to-[#050910]" />

      {/* AI Core glow */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 35%, rgba(59,130,246,0.25), transparent 75%)",
        }}
      />

      {/* Mouse reactive spotlight */}
      <motion.div
        className="absolute inset-0 opacity-[0.18]"
        style={{ background: spotlight }}
      />

      {/* Slow light sweep */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        animate={{ x: ["-40%", "40%", "-40%"] }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
          maskImage:
            "radial-gradient(70% 60% at 50% 40%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 40%, black 30%, transparent 90%)",
        }}
      />

      {/* Premium noise */}
      <div className="absolute inset-0 opacity-[0.025] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.7%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />

    </div>
  );
}
