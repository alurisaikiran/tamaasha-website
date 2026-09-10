"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Music, Utensils, Sparkles } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "4+",   label: "Years of Excellence" },
  { value: "200+", label: "5-Star Reviews"       },
  { value: "50+",  label: "Cocktail Varieties"   },
  { value: "500+", label: "Events Hosted"        },
];

const highlights = [
  { icon: Utensils, title: "Fusion Cuisine",       desc: "Indian-inspired dishes with modern presentation and global influences."         },
  { icon: Music,    title: "Live Entertainment",   desc: "Weekly DJ nights spanning Bollywood, R&B, hip-hop, and lounge sets."            },
  { icon: Clock,    title: "Open Late",            desc: "Serving Tucker nightly — weekdays until 1 AM, weekends until 3 AM."            },
  { icon: MapPin,   title: "Prime Location",       desc: "6330 Lawrenceville Hwy, Tucker GA — easily accessible from Atlanta."          },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 px-6 relative">
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
            <Sparkles size={12} /> Our Story <Sparkles size={12} />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About <span className="text-gold-gradient">Tamaasha</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-3xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              An Opulent Sanctuary for the <span className="text-[#c9a84c]">Discerning</span>
            </h3>
            <p className="text-white/55 leading-relaxed mb-5">
              Tamaasha — meaning &quot;spectacle&quot; in Hindi — was born from a vision to create Tucker&apos;s most captivating nightlife destination. We blend rich South Asian heritage with contemporary luxury to craft an atmosphere that is truly unlike anything else in Georgia.
            </p>
            <p className="text-white/55 leading-relaxed mb-8">
              From our hand-crafted cocktail program to our premium hookah selection and authentic fusion cuisine, every detail is designed to transport you into an evening of pure indulgence. Whether you&apos;re celebrating a milestone or simply unwinding after a long week, Tamaasha is your stage.
            </p>
            <a
              href="tel:+16786914291"
              className="inline-flex items-center gap-2 text-[#c9a84c] border border-[#c9a84c]/30 px-6 py-3 rounded-full hover:bg-[#c9a84c]/10 transition-all duration-300 text-sm tracking-wider"
            >
              📞 +1 678-691-4291
            </a>
          </motion.div>

          {/* Real interior photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-[#c9a84c]/15">
              <Image
                src="/images/bar-interior.jpg"
                alt="Tamaasha Lounge interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gold overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />

              {/* Emblem watermark bottom-left */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#c9a84c]/60 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <span className="text-[#c9a84c] font-bold text-sm" style={{ fontFamily: "var(--font-playfair)" }}>T</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[#c9a84c] text-xs font-semibold tracking-widest" style={{ fontFamily: "var(--font-playfair)" }}>TAMAASHA</span>
                  <span className="text-[#c9a84c]/50 text-[9px] tracking-widest uppercase">Tucker, GA</span>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass-card border border-[#c9a84c]/20 rounded-2xl p-4 text-center"
            >
              <div className="text-2xl font-bold text-[#c9a84c]" style={{ fontFamily: "var(--font-playfair)" }}>4.9★</div>
              <div className="text-[10px] text-white/40 tracking-wider">Google Reviews</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div
                className="text-4xl font-bold text-gold-gradient mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {stat.value}
              </div>
              <div className="text-white/40 text-xs tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card rounded-xl p-5 flex items-start gap-4 hover:border-[#c9a84c]/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">{h.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
