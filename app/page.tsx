"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import TiltCard from "../components/TiltCard";
import MagneticButton from "../components/MagneticButton";
import { useState } from "react";

// Lazy load heavy 3D scene (تحسين أداء كبير)
const HeroSceneDynamic = dynamic(
  () => import("../components/HeroSceneDynamic"),
  { ssr: false }
);

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
const [sent, setSent] = useState(false);
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget as HTMLFormElement;
  const data = new FormData(form);

  await fetch("https://formspree.io/f/mlgprjdo", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json"
    }
  });

  setSent(true);
form.reset();

setTimeout(() => {
  setSent(false);
}, 4000);
};
  const services = [
    {
      title: "IT Support & Infrastructuur",
      desc: "Troubleshooting, netwerkconfiguratie, installatie en gebruikersbeheer.",
    },
    {
      title: "AI Automatisering",
      desc: "Chat-assistenten, slimme workflows en automatische rapporten.",
    },
    {
      title: "Systemen op Maat",
      desc: "RBAC, dashboards, API-integraties en veilige deployments.",
    },
  ];

  const projects = [
  {
    title: "Professioneel Kassasysteem (POS)",
    desc: "Volledig verkoopsysteem met realtime voorraadbeheer, rapportage en ondersteuning voor meerdere vestigingen.",
    tag: "Retail • POS • Voorraadbeheer",
  },
  {
    title: "Bedrijfssoftware (Windows & Linux)",
    desc: "Maatwerk desktop- en webapplicaties afgestemd op uw interne processen en bedrijfsstructuur.",
    tag: "Windows • Linux • Maatwerk",
  },
  {
    title: "Professionele Websites & Webshops",
    desc: "Moderne websites en e-commerce oplossingen met veilige betaalintegraties en schaalbare technologie.",
    tag: "Web • E-commerce • Security",
  },
];

  return (
    <main
      id="top"
      className="mx-auto max-w-6xl px-6 pb-24"
    >
      {/* ================= HERO ================= */}
<section
  className="hero-cinematic relative overflow-hidden rounded-3xl border border-white/10 p-10 backdrop-blur-xl sm:p-14"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mx", `${x}px`);
    e.currentTarget.style.setProperty("--my", `${y}px`);
  }}
>
  {/* 3D Background */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    <HeroSceneDynamic />
  </div>

  {/* Dynamic Glow Layer */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
  </div>

  <motion.div
  variants={fadeUp}
  initial="hidden"
  animate="visible"
  className="relative z-10 max-w-5xl xl:max-w-6xl"
>
    <p className="text-xs font-semibold tracking-[0.25em] text-white/50">
      FALAK SYSTEMS
    </p>

<h1 className="mt-6 leading-[1.15] tracking-[-0.02em] font-semibold">
  <span className="block text-4xl sm:text-5xl lg:text-6xl hero-gradient-move">
    Slimme IT- & AI-systemen
  </span>

  <span className="block text-3xl sm:text-4xl lg:text-5xl hero-gradient-move">
    voor groeiende organisaties
  </span>
</h1>

    <p className="mt-6 text-base lg:text-lg leading-7 text-white/60 max-w-2xl">
      IT-ondersteuning, veilige interne tools en AI-automatisering op maat —
      gebouwd voor betrouwbaarheid, snelheid en schaalbaarheid.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">
      <MagneticButton
  href="#contact"
  className="relative rounded-xl p-[2px] neon-border"
>
  <span className="block rounded-xl bg-transparent px-6 py-3 text-sm font-semibold text-white">
    Vraag een demo
  </span>
</MagneticButton>

      <a
        href="#diensten"
        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition duration-300 hover:bg-white/10 hover:-translate-y-1"
      >
        Bekijk diensten
      </a>
    </div>
  </motion.div>
</section>


      {/* ================= DIENSTEN ================= */}
      <motion.section
        id="diensten"
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">Diensten</h2>
          <span className="text-sm text-white/55">
            Praktisch. Veilig. Schaalbaar.
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {services.map((c) => (
            <TiltCard key={c.title}>
              <article className="rounded-2xl border border-white/10 bg-[#0B0F19]/35 p-6 backdrop-blur transition hover:bg-white/[0.08]">
                <h3 className="text-sm font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {c.desc}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* ================= PROJECTEN ================= */}
      <motion.section
        id="projecten"
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-semibold">
           Beschikbare Software & Systemen
          </h2>
          <a
            className="text-sm text-blue-300 hover:text-blue-200"
            href="#contact"
          >
            Ontvang een offerte →
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <TiltCard key={p.title}>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/[0.08]">
                <span className="text-[11px] text-white/55">
                  {p.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {p.desc}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </motion.section>

      {/* ================= OVER ================= */}
      <motion.section
        id="over"
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold">Over mij</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">
            Ik help organisaties met IT-support, systeemconfiguratie en
            AI-automatisering. Focus op veilige en schaalbare oplossingen.
          </p>
        </div>
      </motion.section>

      {/* ================= CONTACT ================= */}
      <motion.section
        id="contact"
        className="mt-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-white/70">
            Vertel kort wat je nodig hebt.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-3 sm:grid-cols-2"
          >
          <input type="text" name="_gotcha" style={{ display: "none" }} />
          
            <input
              required
              type="text"
              name="name"
              placeholder="Naam"
              className="rounded-xl border border-white/10 bg-[#0B0F19]/50 px-4 py-3 text-sm outline-none focus:border-blue-500/60"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="E-mail"
              className="rounded-xl border border-white/10 bg-[#0B0F19]/50 px-4 py-3 text-sm outline-none focus:border-blue-500/60"
            />

            <textarea
              required
              name="message"
              placeholder="Bericht"
              className="sm:col-span-2 min-h-[120px] rounded-xl border border-white/10 bg-[#0B0F19]/50 px-4 py-3 text-sm outline-none focus:border-blue-500/60"
            />

            <button
  type="submit"
  className="sm:col-span-2 relative rounded-xl p-[2px] neon-border"
>
  <span className="block rounded-xl bg-transparent px-6 py-3 text-sm font-semibold text-white">
    Verstuur
  </span>
</button>
          </form>
{sent && (
  <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
    ✓ Bedankt! Uw bericht is verzonden. Wij nemen snel contact met u op.
  </div>
)}
        </div>
      </motion.section>
    </main>
  );
}



