"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Sparkles } from "lucide-react";
import Image from "next/image";

type Filter = "all" | "ambiance" | "events" | "drinks" | "food" | "hookah";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ambiance", label: "Ambiance" },
  { id: "events", label: "Events" },
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Food" },
  { id: "hookah", label: "Hookah" },
];

// Real Unsplash photos
const galleryItems = [
  {
    id: 1,
    category: "ambiance",
    src: "/images/hero-bg.jpg",
    label: "Main Bar",
    span: "col-span-2",
  },
  {
    id: 2,
    category: "drinks",
    src: "/images/cocktail-glass.jpg",
    label: "Signature Cocktails",
  },
  {
    id: 3,
    category: "events",
    src: "/images/dj-silhouette.jpg",
    label: "DJ Night",
  },
  {
    id: 4,
    category: "ambiance",
    src: "/images/bar-interior.jpg",
    label: "Bar Counter",
    rowSpan: "row-span-2",
  },
  {
    id: 5,
    category: "food",
    src: "/images/indian-curry.jpg",
    label: "Chef Specials",
  },
  {
    id: 6,
    category: "drinks",
    src: "/images/cocktail-colorful.jpg",
    label: "Craft Cocktails",
  },
  {
    id: 7,
    category: "events",
    src: "/images/nightclub-crowd.jpg",
    label: "Saturday Night",
  },
  {
    id: 8,
    category: "hookah",
    src: "/images/hookah.jpg",
    label: "Premium Hookah",
  },
  {
    id: 9,
    category: "food",
    src: "/images/food-naan.jpg",
    label: "Biryani Collection",
  },
  {
    id: 10,
    category: "ambiance",
    src: "/images/bar-dark.jpg",
    label: "Lounge Atmosphere",
    span: "col-span-2",
  },
  {
    id: 11,
    category: "drinks",
    src: "/images/cocktail-craft.jpg",
    label: "Cocktail Crafting",
  },
  {
    id: 12,
    category: "events",
    src: "/images/dj-turntable.jpg",
    label: "Live DJ Sets",
  },
];

export default function GallerySection() {
  const [active, setActive] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  const filtered = active === "all" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-16 sm:py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Visual Experience <Sparkles size={12} />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The <span className="text-gold-gradient">Gallery</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(f.id)}
              className={`px-5 py-2 rounded-full text-sm tracking-wider transition-all duration-300 ${
                active === f.id
                  ? "bg-[#c9a84c] text-black font-semibold"
                  : "glass-card text-white/60 hover:text-white"
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span || ""} ${item.rowSpan || ""}`}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                {/* Hover zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex flex-col items-center gap-2">
                    <ZoomIn size={28} className="text-[#c9a84c]" />
                    <span className="text-white text-sm tracking-wider font-medium">{item.label}</span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] text-white/70 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-4">Follow us for nightly updates and event previews</p>
          <a
            href="https://instagram.com/tamaashalounge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c9a84c]/30 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all duration-300 text-sm tracking-wider"
          >
            📸 @tamaashalounge
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light z-10"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.label}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[#c9a84c] text-sm tracking-widest uppercase">{lightbox.category}</p>
                <h3 className="text-white text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                  {lightbox.label}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
