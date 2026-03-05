"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { label: string; href: string; id: string };

const NAV: NavItem[] = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Diensten", href: "#diensten", id: "diensten" },
  { label: "Software", href: "#projecten", id: "projecten" },
  { label: "Over mij", href: "#over", id: "over" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastY = useRef(0);

  const [active, setActive] = useState<string>("top");
  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  const ids = useMemo(() => NAV.map((n) => n.id).filter((x) => x !== "top"), []);

  // ===== Scroll: shrink + hide on down / show on up
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 16);

      // لو الموبايل منيو مفتوح، لا نخفي
      if (open) {
        setVisible(true);
        lastY.current = y;
        return;
      }

      // لا نخفي في أول الصفحة
      if (y < 120) {
        setVisible(true);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;

      // نزول = إخفاء، صعود = إظهار (مع عتبات تمنع الرعشة)
      if (delta > 14) setVisible(false);
      else if (delta < -10) setVisible(true);

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // ===== Active section spy (محسّن)
useEffect(() => {
  const sections = NAV.map((n) =>
    document.getElementById(n.id)
  ).filter(Boolean) as HTMLElement[];

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections[0]?.target?.id) {
        setActive(visibleSections[0].target.id);
      }
    },
    {
      threshold: 0.2,
    }
  );

  sections.forEach((section) => observer.observe(section));

  // تفعيل Contact عند الوصول لنهاية الصفحة
  const handleBottom = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 5
    ) {
      setActive("contact");
    }
  };

  window.addEventListener("scroll", handleBottom);

  return () => {
    observer.disconnect();
    window.removeEventListener("scroll", handleBottom);
  };
}, []);


  // ===== Close mobile on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ===== Spotlight follow mouse داخل الهيدر فقط
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const isTouch =
      typeof window !== "undefined" &&
      (("ontouchstart" in window) || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      if (!shellRef.current) return;

      const rect = shellRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Throttle via rAF
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        shellRef.current?.style.setProperty("--mx", `${x}px`);
        shellRef.current?.style.setProperty("--my", `${y}px`);
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMove as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[999]",
          "transition-all duration-500 ease-out",
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-4">
          <div
            ref={shellRef}
            className={cn(
              "wow-header",
              scrolled ? "wow-header--scrolled" : "wow-header--top"
            )}
          >
            <div className={cn("wow-header__inner", scrolled && "wow-header__inner--scrolled")}>
              {/* Logo */}
              <Link href="#top" className="group relative flex items-center gap-3">
                <span className="relative grid place-items-center h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                  <span className="orbit-logo-ring" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,.35),transparent_55%)]" />
                </span>

                <span className="flex items-baseline gap-1">
                  <span className="text-[15px] font-semibold tracking-wide text-white">
                    Falak
                  </span>
                  <span className="text-[15px] font-semibold tracking-wide text-blue-400">
                    Systems
                  </span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-1 py-1">
                {NAV.map((item) => {
                  const isActive =
                    active === item.id || (item.id === "top" && active === "top");
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "wow-nav-item",
                        isActive
                          ? "wow-nav-item--active"
                          : "wow-nav-item--idle"
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>
                      
                    </a>
                  );
                })}
              </nav>

              {/* Right */}
              <div className="flex items-center gap-2">
                <a
                  href="#projecten"
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/[0.07] transition"
                >
                  Bekijk software
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80 shadow-[0_0_10px_rgba(59,130,246,.55)]" />
                </a>

                <a
                href="#contact"
  className="relative rounded-xl p-[2px] neon-border"
>
  <span className="block rounded-xl bg-transparent px-5 py-2 text-sm font-semibold text-white">
    Vraag een demo
  </span>
</a>

                {/* Mobile button */}
                <button
                  className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition"
                  onClick={() => setOpen((v) => !v)}
                  aria-label="Open menu"
                >
                  <span className="sr-only">Menu</span>
                  <div className="grid gap-1.5">
                    <span
                      className={cn(
                        "h-[2px] w-5 bg-white/90 transition",
                        open && "translate-y-[3.5px] rotate-45"
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] w-5 bg-white/65 transition",
                        open && "opacity-0"
                      )}
                    />
                    <span
                      className={cn(
                        "h-[2px] w-5 bg-white/90 transition",
                        open && "-translate-y-[3.5px] -rotate-45"
                      )}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[998] md:hidden transition",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 right-0 top-20 mx-4 rounded-2xl border border-white/10 bg-[#0B0F19]/82 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,.85)] transition-all",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <div className="p-3">
            {NAV.map((item) => {
              const isActive =
                active === item.id || (item.id === "top" && active === "top");
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm transition",
                    isActive
                      ? "bg-white/[0.07] text-white border border-white/10"
                      : "text-white/75 hover:text-white hover:bg-white/[0.06]"
                  )}
                >
                  {item.label}
                  <span className="text-white/35">↗</span>
                </a>
              );
            })}

            <div className="mt-3 grid gap-2">
              <a
                href="#projecten"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/85 hover:bg-white/[0.07] transition"
              >
                Bekijk cases
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="cta-premium w-full justify-center"
              >
                Gratis consultatie
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
