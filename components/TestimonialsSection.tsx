"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "Priya M.",
    location: "Atlanta, GA",
    rating: 5,
    text: "Absolutely stunning ambiance. The hookah was top-notch and the cocktails were creative and delicious. This is our new go-to spot for special nights out!",
    occasion: "Anniversary Dinner",
  },
  {
    name: "Marcus T.",
    location: "Tucker, GA",
    rating: 5,
    text: "The R&B Saturday night was incredible. Great music, amazing service, and the VIP section is worth every penny. Will definitely be back!",
    occasion: "Birthday Celebration",
  },
  {
    name: "Ananya R.",
    location: "Lawrenceville, GA",
    rating: 5,
    text: "Best hookah lounge in the Atlanta area, hands down. The butter chicken is to die for and the cocktails are phenomenal. Beautiful interior too!",
    occasion: "Girls Night Out",
  },
  {
    name: "Jason K.",
    location: "Decatur, GA",
    rating: 5,
    text: "Tamaasha exceeded every expectation. The staff was incredibly attentive, the food was authentic and flavorful, and the atmosphere is unlike anything else in Tucker.",
    occasion: "Date Night",
  },
  {
    name: "Divya S.",
    location: "Norcross, GA",
    rating: 5,
    text: "We hosted a corporate event here and it was flawless. The team went above and beyond to accommodate our group. Highly recommend for any special occasion!",
    occasion: "Corporate Event",
  },
  {
    name: "Carlos H.",
    location: "Stone Mountain, GA",
    rating: 5,
    text: "The Bollywood night is so much fun! Great vibes, great music, and the mango mule is my new favorite drink. A hidden gem in Tucker.",
    occasion: "Weekly Visit",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 px-6 relative bg-[#0a0a0a]">
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
            <Sparkles size={12} /> Guest Reviews <Sparkles size={12} />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What They&apos;re <span className="text-gold-gradient">Saying</span>
          </h2>
          <div className="gold-divider" />

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 glass-card rounded-full"
          >
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} className="text-[#c9a84c] fill-[#c9a84c]" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.9</span>
            <span className="text-white/40 text-sm">from 200+ reviews</span>
          </motion.div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-[#c9a84c]/20 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-[#c9a84c]/40" />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, s) => (
                  <Star key={s} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/60 text-sm leading-relaxed flex-1">{review.text}</p>

              {/* Reviewer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div>
                  <div className="text-white font-medium text-sm">{review.name}</div>
                  <div className="text-white/30 text-xs">{review.location}</div>
                </div>
                <span className="text-xs text-[#c9a84c]/60 bg-[#c9a84c]/10 px-2 py-1 rounded-full">
                  {review.occasion}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
