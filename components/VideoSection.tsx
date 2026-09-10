"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles } from "lucide-react";
import Image from "next/image";

const videos = [
  {
    id: 1,
    videoSrc: "/videos/cocktail-making.mp4",
    title: "Cocktail Craft",
    subtitle: "Our bartenders at work",
    thumb: "/images/cocktail-craft.jpg",
    tag: "Bar",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    videoSrc: "/videos/hookah-smoke.mp4",
    title: "Hookah Lounge",
    subtitle: "Premium shisha experience",
    thumb: "/images/hookah.jpg",
    tag: "Hookah",
    span: "",
  },
  {
    id: 3,
    videoSrc: "/videos/saturday-night.mp4",
    title: "Saturday Night",
    subtitle: "Live DJ · R&B · Bollywood",
    thumb: "/images/nightclub-crowd.jpg",
    tag: "Events",
    span: "",
  },
  {
    id: 4,
    videoSrc: "/videos/drink-pour.mp4",
    title: "The Pour",
    subtitle: "Craft cocktails, slow motion",
    thumb: "/images/cocktail-glass.jpg",
    tag: "Vibe",
    span: "col-span-2",
  },
];

export default function VideoSection() {
  const [active, setActive] = useState<(typeof videos)[0] | null>(null);

  return (
    <section id="videos" className="py-24 px-6 relative bg-[#080808]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,26,26,0.05)_0%,_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Live Experience <Sparkles size={12} />
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Feel the <span className="text-gold-gradient">Vibe</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-6 text-white/50 max-w-xl mx-auto">
            Words don&apos;t do it justice. Watch what a night at Tamaasha really looks like.
          </p>
        </motion.div>

        {/* Video mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${video.span}`}
              onClick={() => setActive(video)}
            >
              {/* Thumbnail */}
              <Image
                src={video.thumb}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/90 transition-all duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-14 h-14 rounded-full bg-[#c9a84c]/90 flex items-center justify-center shadow-lg shadow-[#c9a84c]/30 group-hover:bg-[#c9a84c] transition-all duration-300"
                >
                  <Play size={20} className="text-black fill-black ml-1" />
                </motion.div>
              </div>

              {/* Tag */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] backdrop-blur-sm border border-[#c9a84c]/20">
                  {video.tag}
                </span>
              </div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                  {video.title}
                </h3>
                <p className="text-white/50 text-xs mt-0.5">{video.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4 md:p-8"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={active.videoSrc}
                className="w-full h-full"
                controls
                autoPlay
                title={active.title}
              />
            </motion.div>

            <button
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X size={20} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-[#c9a84c] font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                {active.title}
              </h3>
              <p className="text-white/40 text-sm">{active.subtitle}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
