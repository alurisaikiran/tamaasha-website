"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, Sparkles } from "lucide-react";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${3 + i * 4}%`,
  top: `${10 + ((i * 41) % 80)}%`,
  size: 1.5 + (i % 3),
  duration: 2.5 + (i % 5) * 0.5,
  delay: i * 0.15,
}));

export default function CinematicSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isIdle, setIsIdle] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Normalised mouse position (0–1)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springCfg = { stiffness: 50, damping: 18 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  // Video background tilts with mouse (scaled up so edges never show)
  const videoRotateY = useTransform(springX, [0, 1], [-10, 10]);
  const videoRotateX = useTransform(springY, [0, 1], [6, -6]);

  // Content floats in the opposite direction — creates parallax depth
  const contentX = useTransform(springX, [0, 1], [14, -14]);
  const contentY = useTransform(springY, [0, 1], [8, -8]);

  // Cursor spotlight across the full screen
  const spotlightBg = useTransform(
    [springX, springY],
    ([x, y]) =>
      `radial-gradient(circle 500px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(201,168,76,0.15) 0%, transparent 70%)`
  );

  const triggerActivity = useCallback(() => {
    setIsIdle(false);
    setHasInteracted(true);

    if (videoRef.current?.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setIsIdle(true);
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, 2500);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
      triggerActivity();
    },
    [rawX, rawY, triggerActivity]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  // Auto-play when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play()
              .then(() => { setIsPlaying(true); setIsIdle(false); setHasInteracted(true); })
              .catch(() => {});
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
            setIsIdle(true);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    const onScroll = () => triggerActivity();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer.current);
    };
  }, [triggerActivity]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={triggerActivity}
      onTouchMove={triggerActivity}
      style={{ perspective: "1200px" }}
    >
      {/* ── Full-screen video background with 3D tilt ── */}
      <motion.div
        style={{
          rotateX: videoRotateX,
          rotateY: videoRotateY,
          transformStyle: "preserve-3d",
          scale: 1.18,           // overshoot so edges never peek through during tilt
        }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          src="/videos/drink-pour.mp4"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      {/* Base dark veil — lifts when playing */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isPlaying ? 0.35 : 0.72 }}
        transition={{ duration: 0.9 }}
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.75) 100%)" }}
      />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Ambient gold glow from centre */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: isPlaying
            ? "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)",
        }}
        transition={{ duration: 1.2 }}
      />

      {/* Scanlines — cinematic film texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)" }}
      />

      {/* ── Gold particles ── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: isPlaying ? [0, -32, 0] : [0, -7, 0],
            opacity: isPlaying ? [0.1, 0.6, 0.1] : [0.03, 0.1, 0.03],
            scale: isPlaying ? [1, 1.8, 1] : [1, 1.2, 1],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Centre content — parallax counter to video ── */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs tracking-[0.45em] uppercase text-[#c9a84c] mb-6 flex items-center gap-2"
        >
          <Sparkles size={11} /> Cinematic Experience <Sparkles size={11} />
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold text-white leading-none mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Step Inside
          <br />
          <span className="text-gold-gradient">Tamaasha</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="gold-divider mb-8"
        />

        {/* Idle play button with ripple rings */}
        <AnimatePresence>
          {isIdle && (
            <motion.div
              key="idle-btn"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative">
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-full border border-[#c9a84c]/40"
                    animate={{ scale: [1, 2.8], opacity: [0.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: r * 0.6, ease: "easeOut" }}
                  />
                ))}
                <div className="w-24 h-24 rounded-full bg-black/30 backdrop-blur-md border-2 border-[#c9a84c]/70 flex items-center justify-center">
                  <Play size={36} className="text-[#c9a84c] fill-[#c9a84c] ml-1" />
                </div>
              </div>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/50 text-xs tracking-[0.4em] uppercase"
              >
                {hasInteracted ? "Interact to continue" : "Move or tap to play"}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── LIVE badge (top-left) ── */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="live"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35 }}
            className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 z-20"
          >
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-white/80 text-xs tracking-widest uppercase font-semibold">Live</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Waveform + mute (bottom-left) ── */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="absolute bottom-8 left-8 z-20 flex items-center gap-4"
          >
            {/* Waveform bars */}
            <div className="flex items-end gap-[3px]">
              {[3, 6, 9, 6, 4, 8, 5, 7, 3, 6].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[3px] rounded-full bg-[#c9a84c]"
                  animate={{ height: [`${h}px`, `${h * 2.8}px`, `${h}px`] }}
                  transition={{ duration: 0.45 + (i % 3) * 0.18, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
                />
              ))}
            </div>

            {/* Mute button */}
            <button
              className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-[#c9a84c] transition-colors"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll hint (bottom-centre) ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
        animate={{ opacity: isIdle ? 0.5 : 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/40 text-[10px] tracking-[0.4em] uppercase">Scroll or move · Unmute for sound</p>
      </motion.div>

      {/* Gold border frame around the full screen */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{
          boxShadow: isPlaying
            ? "inset 0 0 0 2px rgba(201,168,76,0.5), inset 0 0 80px rgba(201,168,76,0.08)"
            : "inset 0 0 0 1px rgba(201,168,76,0.12)",
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Corner brackets on the screen edges */}
      {[
        "top-5 left-5 border-t-2 border-l-2",
        "top-5 right-5 border-t-2 border-r-2",
        "bottom-5 left-5 border-b-2 border-l-2",
        "bottom-5 right-5 border-b-2 border-r-2",
      ].map((cls, i) => (
        <motion.div
          key={i}
          className={`absolute w-10 h-10 border-[#c9a84c] z-20 ${cls}`}
          animate={{ opacity: isPlaying ? 0.9 : 0.3 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </section>
  );
}
