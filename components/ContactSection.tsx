"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, CheckCircle } from "lucide-react";

// Replace with your Formspree form ID after signing up at https://formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactSection() {
  const [form, setForm] = useState({
    name:     "",
    email:    "",
    phone:    "",
    date:     "",
    guests:   "",
    occasion: "",
    message:  "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify({
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          date:    form.date,
          guests:  form.guests,
          occasion: form.occasion,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please call us directly at +1 678-691-4291.");
      }
    } catch {
      setError("Network error. Please call us directly at +1 678-691-4291.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-6 relative bg-[#111111]">
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
            <Sparkles size={12} /> Get in Touch <Sparkles size={12} />
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Reserve Your <span className="text-gold-gradient">Table</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-6 text-white/50 max-w-xl mx-auto">
            Ready to experience Tamaasha? Fill out the form below and our team will confirm your reservation within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: MapPin, title: "Location",  content: "6330 Lawrenceville Hwy\nTucker, GA 30084" },
              { icon: Phone,  title: "Phone",     content: "+1 678-691-4291",       link: "tel:+16786914291"             },
              { icon: Mail,   title: "Email",     content: "Tamaasha24@gmail.com",  link: "mailto:Tamaasha24@gmail.com"  },
              { icon: Clock,  title: "Hours",     content: "Sun–Thu: 4 PM – 1 AM\nFri–Sat: 4 PM – 3 AM" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card rounded-xl p-5 flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9a84c]/10 flex items-center justify-center">
                    <Icon size={17} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.title}</div>
                    {item.link ? (
                      <a href={item.link} className="text-white hover:text-[#c9a84c] transition-colors text-sm whitespace-pre-line">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-white text-sm whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden border border-[#c9a84c]/10" style={{ height: "220px" }}>
              <iframe
                title="Tamaasha Lounge location"
                src="https://maps.google.com/maps?q=6330+Lawrenceville+Hwy,Tucker,GA+30084&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Reservation form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center gap-6"
              >
                <CheckCircle size={60} className="text-[#c9a84c]" />
                <h3
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Reservation Sent!
                </h3>
                <p className="text-white/50 max-w-xs">
                  Thank you, {form.name}! Our team will contact you within 24 hours to confirm your table.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", date: "", guests: "", occasion: "", message: "" });
                  }}
                  className="text-[#c9a84c] border border-[#c9a84c]/30 px-6 py-2 rounded-full text-sm hover:bg-[#c9a84c]/10 transition-all"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Full Name *</label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Phone *</label>
                    <input
                      required
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (___) ___-____"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Date *</label>
                    <input
                      required
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      type="date"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Number of Guests *</label>
                    <select
                      required
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm"
                    >
                      <option value="" disabled>Select guests</option>
                      {["1-2", "3-4", "5-6", "7-10", "10+"].map((n) => (
                        <option key={n} value={n}>{n} guests</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={form.occasion}
                    onChange={handleChange}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm"
                  >
                    <option value="">Select occasion (optional)</option>
                    {["Birthday", "Anniversary", "Date Night", "Corporate Event", "Girls Night Out", "Bachelor/Bachelorette", "Just for Fun"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Special Requests</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any dietary requirements, seating preferences, or special notes..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 transition-all text-sm resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#c9a84c] text-black font-semibold tracking-widest uppercase text-sm py-4 rounded-xl hover:bg-[#e8c97a] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} /> Confirm Reservation
                    </>
                  )}
                </motion.button>

                <p className="text-center text-white/20 text-xs">
                  Or call us directly at{" "}
                  <a href="tel:+16786914291" className="text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors">
                    +1 678-691-4291
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
