"use client";

import { motion } from "framer-motion";
import { Crown, Star, Gift, Sparkles, Check } from "lucide-react";
import Image from "next/image";

const packages = [
  {
    name: "Gold",
    icon: Star,
    price: "$150",
    per: "per table",
    gradient: "from-yellow-800 to-yellow-700",
    border: "border-yellow-600/30",
    features: [
      "Reserved table (2–4 guests)",
      "1 hookah of choice",
      "Bottle of house spirits",
      "Priority seating",
      "Welcome drinks",
    ],
  },
  {
    name: "Platinum",
    icon: Crown,
    price: "$300",
    per: "per table",
    gradient: "from-[#c9a84c] to-[#9a7a2a]",
    border: "border-[#c9a84c]/50",
    featured: true,
    features: [
      "Reserved VIP booth (4–6 guests)",
      "2 hookahs of choice",
      "Premium bottle service",
      "Dedicated table host",
      "Custom cake (birthdays)",
      "Complimentary sparkler entrance",
    ],
  },
  {
    name: "Royal",
    icon: Gift,
    price: "$500",
    per: "per table",
    gradient: "from-[#8b1a1a] to-[#5a0a0a]",
    border: "border-red-800/40",
    features: [
      "Exclusive VIP suite (8+ guests)",
      "Unlimited hookah (3 hrs)",
      "Top-shelf bottle package",
      "Personal event coordinator",
      "Custom floral arrangement",
      "Photo & video package",
      "Red carpet welcome",
    ],
  },
];

export default function VIPSection() {
  return (
    <section id="vip" className="py-16 sm:py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      {/* Real background photo with deep overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bar-interior.jpg"
          alt="VIP lounge"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.05)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Exclusive Packages <Sparkles size={12} />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            VIP <span className="text-gold-gradient">Experience</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-6 text-white/50 max-w-xl mx-auto">
            Celebrate birthdays, anniversaries, and milestones in unparalleled style.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden border ${pkg.border} transition-all duration-300 ${
                  pkg.featured ? "shadow-2xl shadow-[#c9a84c]/15" : ""
                }`}
              >
                {pkg.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-[#c9a84c] text-black text-xs font-bold px-3 py-1 rounded-full tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-br ${pkg.gradient} p-8 text-center`}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                    {pkg.name}
                  </h3>
                  <div className="text-3xl font-bold text-white mt-2">{pkg.price}</div>
                  <div className="text-white/60 text-sm">{pkg.per}</div>
                </div>

                <div className="bg-[#111111] p-6 space-y-3">
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <Check size={14} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span className="text-white/70 text-sm">{feat}</span>
                    </div>
                  ))}
                  <motion.a
                    href="tel:+16786914291"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block text-center mt-6 py-3 rounded-full font-semibold tracking-wider text-sm transition-all duration-300 ${
                      pkg.featured
                        ? "bg-[#c9a84c] text-black hover:bg-[#e8c97a]"
                        : "border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10"
                    }`}
                  >
                    Book This Package
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Birthday callout with real photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 relative rounded-2xl overflow-hidden"
        >
          <div className="relative min-h-[220px] sm:h-64">
            <Image
              src="/images/nightclub-crowd.jpg"
              alt="Birthday celebration"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60" />
            <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 py-8 sm:py-0">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎂</div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                Celebrating a Birthday?
              </h3>
              <p className="text-white/50 max-w-lg mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                Custom decor, surprise sparkler moments, and a dedicated team to ensure the night is all about you.
              </p>
              <a
                href="tel:+16786914291"
                className="inline-flex items-center gap-2 bg-[#c9a84c] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold tracking-wider text-xs sm:text-sm hover:bg-[#e8c97a] transition-all duration-300 w-fit"
              >
                🎉 Plan My Celebration
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
