"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin, Clock } from "lucide-react";

const PARTICLES = [
  { x: 8,  y: 15, s: 2,   dur: 7,  del: 0   },
  { x: 22, y: 72, s: 1.5, dur: 9,  del: 1   },
  { x: 38, y: 30, s: 3,   dur: 6,  del: 2   },
  { x: 55, y: 80, s: 1,   dur: 8,  del: 0.5 },
  { x: 68, y: 20, s: 2.5, dur: 7,  del: 3   },
  { x: 80, y: 60, s: 1.5, dur: 10, del: 1.5 },
  { x: 92, y: 40, s: 2,   dur: 8,  del: 2.5 },
  { x: 14, y: 50, s: 1,   dur: 9,  del: 0.8 },
  { x: 45, y: 88, s: 2,   dur: 6,  del: 1.8 },
  { x: 75, y: 10, s: 1.5, dur: 11, del: 3.5 },
  { x: 30, y: 55, s: 1,   dur: 7,  del: 4   },
  { x: 60, y: 45, s: 2,   dur: 8,  del: 0.3 },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background video */}
      <div className="absolute inset-0">
        {/* Mobile video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.6; }}
          className="sm:hidden absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/mobile-hero.mp4" type="video/mp4" />
        </video>

        {/* Desktop video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => { if (videoRef.current) videoRef.current.playbackRate = 0.4; }}
          className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center scale-105"
        >
          <source src="/videos/drink-pour.mp4" type="video/mp4" />
        </video>
        {/* Layered overlays — lighter on mobile so video is visible */}
        <div className="absolute inset-0 bg-black/25 sm:bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_55%,rgba(201,168,76,0.08)_0%,transparent_100%)]" />
        {/* Vignette — softer on mobile */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,rgba(0,0,0,0.35)_100%)] sm:bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Gold particles */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -35, 0], opacity: [0.1, 0.55, 0.1], scale: [1, 1.4, 1] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Left decorative line */}
      <div className="absolute left-8 top-0 bottom-0 flex flex-col items-center justify-center gap-3 hidden lg:flex pointer-events-none">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent max-h-40" />
        <span className="text-vertical text-[10px] tracking-[0.5em] text-[#c9a84c]/40 uppercase">Tamaasha</span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent max-h-40" />
      </div>

      {/* Right decorative line */}
      <div className="absolute right-8 top-0 bottom-0 flex flex-col items-center justify-center gap-3 hidden lg:flex pointer-events-none">
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent max-h-40" />
        <span className="text-vertical text-[10px] tracking-[0.5em] text-[#c9a84c]/40 uppercase">2019 – Now</span>
        <div className="w-px flex-1 bg-gradient-to-b from-transparent via-[#c9a84c]/30 to-transparent max-h-40" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full pt-8 pb-16 sm:py-0">



        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold leading-none tracking-tight mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span className="block text-white text-3xl md:text-5xl lg:text-6xl mb-3 drop-shadow-2xl">
            Your Night
          </span>
          <span className="block shimmer text-3xl md:text-6xl lg:text-7xl">
            Starts Here
          </span>
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="flex items-center justify-center gap-4 my-4 sm:my-8"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#c9a84c]/60" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]" />
          <div className="w-2.5 h-2.5 rotate-45 border border-[#c9a84c]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#c9a84c]/60" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-sm md:text-xl text-white/55 max-w-xl mx-auto mb-3 sm:mb-5 leading-relaxed"
        >
          An opulent sanctuary of craft cocktails, premium hookah,
          and unforgettable nights in Tucker, Georgia.
        </motion.p>

        {/* Hours + location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4 sm:mb-10 text-xs sm:text-sm text-white/35"
        >
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#c9a84c]/60" />
            Sun–Thu 4 PM – 1 AM
          </span>
          <span className="text-[#c9a84c]/40">◆</span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#c9a84c]/60" />
            Fri–Sat 4 PM – 3 AM
          </span>
          <span className="text-[#c9a84c]/40">◆</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#c9a84c]/60" />
            Tucker, Georgia
          </span>
        </motion.div>

        {/* Stats stripe — compact single row on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="grid grid-cols-4 rounded-xl overflow-hidden border border-[#c9a84c]/15 backdrop-blur-md w-full mx-auto mb-5 sm:mb-10 sm:max-w-none sm:rounded-2xl"
        >
          {[
            { val: "4.9★", label: "Rating" },
            { val: "200+", label: "Reviews" },
            { val: "50+",  label: "Cocktails" },
            { val: "5+",   label: "Years" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-1 sm:px-7 py-2 sm:py-4 text-center bg-black/30
                ${i < 3 ? "border-r border-[#c9a84c]/15" : ""}
              `}
            >
              <div
                className="text-sm sm:text-2xl font-bold text-gold-gradient mb-0"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.val}
              </div>
              <div className="text-[7px] sm:text-[9px] tracking-[0.2em] text-white/30 uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: "0 0 40px rgba(201,168,76,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="relative overflow-hidden btn-shimmer px-8 py-3 sm:px-10 sm:py-4 bg-[#c9a84c] text-black font-bold tracking-[0.2em] uppercase text-sm rounded-full transition-all duration-300"
          >
            Reserve a Table
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04, borderColor: "rgba(201,168,76,0.7)", color: "#c9a84c" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 sm:px-10 sm:py-4 border border-white/20 text-white/70 font-medium tracking-[0.2em] uppercase text-sm rounded-full backdrop-blur-sm transition-all duration-300 hover:bg-white/5"
          >
            View Menu
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/25 cursor-pointer hover:text-white/50 transition-colors"
          onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#c9a84c]/50" />
          <ChevronDown size={16} className="text-[#c9a84c]/60" />
        </motion.div>
      </motion.div>

      {/* Bottom fade to dark */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
