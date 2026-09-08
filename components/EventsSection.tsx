"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Music, Ticket, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Bollywood Nights",
    date: "Every Friday",
    time: "9 PM – 3 AM",
    dj: "DJ Kiran",
    theme: "Bollywood & Bhangra",
    dresscode: "Glamorous",
    tag: "Weekly",
    description: "Dance the night away to the biggest Bollywood hits and bhangra beats.",
    img: "/images/dj-silhouette.jpg",
    accent: "from-[#8b1a1a]/80 to-[#c9a84c]/30",
  },
  {
    id: 2,
    title: "R&B & Hip-Hop Saturday",
    date: "Every Saturday",
    time: "9 PM – 3 AM",
    dj: "DJ Phoenix",
    theme: "Urban & Soul",
    dresscode: "Upscale Casual",
    tag: "Weekly",
    description: "The smoothest R&B and hottest hip-hop in Tucker. VIP tables fill fast.",
    img: "/images/dj-turntable.jpg",
    accent: "from-purple-900/80 to-[#8b1a1a]/40",
  },
  {
    id: 3,
    title: "Hookah & Cocktail Thursdays",
    date: "Every Thursday",
    time: "7 PM – 1 AM",
    dj: "DJ Ravi",
    theme: "Chill Vibes",
    dresscode: "Smart Casual",
    tag: "Weekly",
    description: "Discounted hookah packs and specialty cocktail menu. Perfect midweek escape.",
    img: "/images/hookah.jpg",
    accent: "from-emerald-900/70 to-teal-900/40",
  },
  {
    id: 4,
    title: "New Year's Eve Gala",
    date: "2026-12-31",
    time: "8 PM – 4 AM",
    dj: "DJ Arjun + DJ Kiran",
    theme: "Black Tie Optional",
    dresscode: "Black Tie / Glamorous",
    tag: "Special",
    description: "Ring in the new year with champagne toasts, live performances, and a night to remember.",
    img: "/images/nightclub-crowd.jpg",
    accent: "from-[#c9a84c]/60 to-amber-900/60",
  },
];

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div className="flex gap-3 mt-3">
      {[["d", "Days"], ["h", "Hrs"], ["m", "Min"], ["s", "Sec"]].map(([k, label]) => (
        <div key={k} className="text-center min-w-[36px]">
          <div className="text-xl font-bold text-[#c9a84c]">{String(timeLeft[k as keyof typeof timeLeft]).padStart(2, "0")}</div>
          <div className="text-[10px] text-white/30 uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventsSection() {
  return (
    <section id="events" className="py-24 px-6 relative bg-[#0a0a0a]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Live & Upcoming <Sparkles size={12} />
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Events & <span className="text-gold-gradient">Entertainment</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Real background photo */}
              <div className="relative h-56">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${event.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className={`text-xs px-3 py-1 rounded-full backdrop-blur-sm ${
                    event.tag === "Special"
                      ? "bg-[#c9a84c]/30 text-[#c9a84c] border border-[#c9a84c]/30"
                      : "bg-white/10 text-white/60"
                  }`}>
                    {event.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-white/50 text-xs">
                  <Calendar size={11} />
                  {event.tag === "Special"
                    ? new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : event.date}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-2xl font-bold text-white group-hover:text-[#c9a84c] transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {event.title}
                  </h3>
                </div>
              </div>

              {/* Details card */}
              <div className="bg-[#111] p-5 border border-white/5 border-t-0">
                <p className="text-white/50 text-sm mb-4 leading-relaxed">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock size={13} className="text-[#c9a84c]" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Music size={13} className="text-[#c9a84c]" />
                    {event.dj} · {event.theme}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Ticket size={13} className="text-[#c9a84c]" />
                    Dress Code: {event.dresscode}
                  </div>
                </div>

                {event.tag === "Special" && (
                  <div className="border-t border-white/10 pt-4 mb-4">
                    <p className="text-xs text-white/30 mb-1">Countdown to the event:</p>
                    <Countdown targetDate={event.date} />
                  </div>
                )}

                <motion.a
                  href="tel:+16786914291"
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-[#c9a84c] text-sm hover:text-[#e8c97a] transition-colors"
                >
                  Reserve your spot <ChevronRight size={16} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h3 className="text-center text-sm tracking-[0.3em] uppercase text-[#c9a84c] mb-6">Weekly Schedule</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {[
              { day: "Sun", note: "Chill Vibes" },
              { day: "Mon", note: "Lounge Night" },
              { day: "Tue", note: "Lounge Night" },
              { day: "Wed", note: "Mid-Week Mix" },
              { day: "Thu", note: "Hookah Thurs", highlight: true },
              { day: "Fri", note: "Bollywood Nights", highlight: true },
              { day: "Sat", note: "R&B Saturday", highlight: true },
            ].map((d) => (
              <div
                key={d.day}
                className={`rounded-xl p-3 text-center ${
                  d.highlight ? "bg-[#c9a84c]/10 border border-[#c9a84c]/20" : "bg-white/3"
                }`}
              >
                <div className={`text-sm font-bold mb-1 ${d.highlight ? "text-[#c9a84c]" : "text-white/60"}`}>
                  {d.day}
                </div>
                <div className="text-[10px] text-white/30 leading-tight">{d.note}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
