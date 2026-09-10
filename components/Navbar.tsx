"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home",    href: "#home"    },
  { label: "Menu",    href: "#menu"    },
  { label: "Events",  href: "#events"  },
  { label: "Gallery", href: "#gallery" },
  { label: "VIP",     href: "#vip"     },
  { label: "About",   href: "#about"   },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("home");

  // Scroll-position tracking (header height + a bit of offset)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver: update active link as sections scroll into view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "nav-blur bg-black/90 border-b border-[#c9a84c]/20 py-3"
            : "bg-black/70 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer flex items-center gap-3"
            onClick={() => handleNav("#home")}
          >
            <div className="w-9 h-9 rounded-full border border-[#c9a84c]/50 flex items-center justify-center bg-[#c9a84c]/5 flex-shrink-0">
              <span className="text-[#c9a84c] font-bold text-base" style={{ fontFamily: "var(--font-playfair)" }}>T</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="text-lg sm:text-xl font-bold shimmer tracking-wide sm:tracking-widest"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                TAMAASHA
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#c9a84c]/55 uppercase">
                Lounge &amp; Bar
              </span>
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`text-sm tracking-widest uppercase transition-all duration-300 relative group ${
                    active === id ? "text-[#c9a84c]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#c9a84c] transition-all duration-300 ${
                      active === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+16786914291"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-black bg-[#c9a84c] px-5 py-2.5 rounded-full hover:bg-[#e8c97a] transition-all duration-300 tracking-wider"
            >
              <Phone size={13} />
              Reserve
            </a>

            <button
              className="lg:hidden text-white p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[99] bg-black/95 nav-blur flex flex-col justify-center items-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => handleNav(link.href)}
                className="text-2xl tracking-widest uppercase text-white/80 hover:text-[#c9a84c] transition-colors"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {link.label}
              </motion.button>
            ))}
            <a
              href="tel:+16786914291"
              className="mt-4 flex items-center gap-2 text-[#c9a84c] border border-[#c9a84c] px-6 py-3 rounded-full"
            >
              <Phone size={16} />
              +1 678-691-4291
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
