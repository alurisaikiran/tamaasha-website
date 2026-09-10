"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Star, Sparkles } from "lucide-react";
import Image from "next/image";

type Category = "starters" | "mains" | "cocktails" | "hookah" | "desserts";

const categories: { id: Category; label: string; emoji: string; heroImg: string; heroAlt: string }[] = [
  {
    id: "starters",
    label: "Starters",
    emoji: "🥗",
    heroImg: "/images/indian-food.jpg",
    heroAlt: "Starters",
  },
  {
    id: "mains",
    label: "Main Course",
    emoji: "🍛",
    heroImg: "/images/indian-curry.jpg",
    heroAlt: "Indian cuisine",
  },
  {
    id: "cocktails",
    label: "Cocktails",
    emoji: "🍹",
    heroImg: "/images/cocktail-glass.jpg",
    heroAlt: "Craft cocktails",
  },
  {
    id: "hookah",
    label: "Hookah",
    emoji: "💨",
    heroImg: "/images/hookah.jpg",
    heroAlt: "Premium hookah",
  },
  {
    id: "desserts",
    label: "Desserts",
    emoji: "🍮",
    heroImg: "/images/food-naan.jpg",
    heroAlt: "Desserts",
  },
];

const menuData: Record<Category, { name: string; desc: string; price: string; badge?: string; img?: string }[]> = {
  starters: [
    { name: "Chicken Tikka", desc: "Marinated chicken, tandoor smoked, mint chutney", price: "$14", badge: "Popular", img: "/images/tikka.jpg" },
    { name: "Crispy Calamari", desc: "Lightly fried, sriracha aioli, lemon zest", price: "$13" },
    { name: "Paneer Chilli", desc: "Crispy cottage cheese, bell peppers, soy glaze", price: "$12" },
    { name: "Prawn Tempura", desc: "Golden battered prawns, sweet chili dip", price: "$16", badge: "Chef's Pick" },
    { name: "Veg Spring Rolls", desc: "Crispy rolls, seasonal vegetables, plum sauce", price: "$10" },
    { name: "Lamb Seekh Kebab", desc: "Spiced minced lamb, tandoor grilled, raita", price: "$15", badge: "Popular" },
  ],
  mains: [
    { name: "Butter Chicken", desc: "Tender chicken, rich tomato cream, naan", price: "$16", badge: "Popular", img: "/images/indian-curry.jpg" },
    { name: "Lamb Biryani", desc: "Slow-cooked basmati, caramelized onion, saffron", price: "$18", badge: "Chef's Pick", img: "/images/food-naan.jpg" },
    { name: "Prawn Masala", desc: "Jumbo prawns, coastal spices, steamed rice", price: "$20" },
    { name: "Paneer Butter Masala", desc: "Cottage cheese, velvety tomato sauce, naan", price: "$15" },
    { name: "Dal Makhani", desc: "Black lentils, cream, slow-cooked overnight", price: "$13" },
    { name: "Chicken Fried Rice", desc: "Wok-tossed, eggs, seasonal vegetables", price: "$14" },
  ],
  cocktails: [
    { name: "Tamaasha Signature", desc: "House blend vodka, elderflower, citrus, gold dust", price: "$15", badge: "Signature", img: "/images/cocktail-glass.jpg" },
    { name: "Spiced Mango Mule", desc: "Dark rum, fresh mango, ginger beer, lime", price: "$15", badge: "Popular", img: "/images/cocktail-craft.jpg" },
    { name: "Midnight Rose", desc: "Gin, rose syrup, lychee, sparkling water", price: "$15" },
    { name: "Saffron Sour", desc: "Bourbon, saffron syrup, lemon, egg white", price: "$15", badge: "Chef's Pick" },
    { name: "Blue Lagoon", desc: "Vodka, blue curacao, lemonade, mint", price: "$15" },
    { name: "Old Fashioned", desc: "Maker's Mark, bitters, orange peel, cherry", price: "$15" },
    { name: "Cosmopolitan", desc: "Citrus vodka, triple sec, cranberry, lime", price: "$15" },
    { name: "Passion Mojito", desc: "White rum, passion fruit, mint, soda", price: "$15" },
  ],
  hookah: [
    { name: "Double Apple", desc: "Classic blend, smooth and sweet", price: "$20 / $25", badge: "Popular" },
    { name: "Blueberry Mint", desc: "Cool mint, fresh blueberry blend", price: "$20 / $25" },
    { name: "Pan Masala", desc: "Traditional Indian flavor profile", price: "$20 / $25", badge: "Specialty" },
    { name: "Watermelon Ice", desc: "Refreshing watermelon, icy finish", price: "$20 / $25" },
    { name: "Lemon Mint", desc: "Tangy citrus, cool mint undertones", price: "$20 / $25" },
    { name: "Weekend Special", desc: "Premium blend, varies weekly", price: "$15", badge: "Special" },
  ],
  desserts: [
    { name: "Gulab Jamun", desc: "Warm milk solids, rose syrup, cardamom", price: "$7", badge: "Popular" },
    { name: "Chocolate Lava", desc: "Warm brownie, vanilla gelato, caramel drizzle", price: "$9", badge: "Chef's Pick" },
    { name: "Rasmalai", desc: "Soft cheese patties, saffron milk, pistachios", price: "$8" },
    { name: "Kulfi Falooda", desc: "Indian ice cream, vermicelli, rose syrup", price: "$8" },
  ],
};

const badgeColors: Record<string, string> = {
  Popular: "bg-[#c9a84c]/20 text-[#c9a84c]",
  "Chef's Pick": "bg-[#8b1a1a]/30 text-red-400",
  Signature: "bg-purple-900/30 text-purple-400",
  Specialty: "bg-emerald-900/30 text-emerald-400",
  Special: "bg-blue-900/30 text-blue-400",
};

export default function MenuSection() {
  const [active, setActive] = useState<Category>("cocktails");
  const activeCat = categories.find((c) => c.id === active)!;

  return (
    <section id="menu" className="py-24 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Curated Selection <Sparkles size={12} />
          </p>
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our <span className="text-gold-gradient">Menu</span>
          </h2>
          <div className="gold-divider" />
          <p className="mt-6 text-white/50 max-w-xl mx-auto">
            From hand-crafted cocktails to fragrant biryanis — every item is crafted to elevate your evening.
          </p>
        </motion.div>

        {/* Category hero image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-hero"}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-52 rounded-2xl overflow-hidden mb-10"
          >
            <Image
              src={activeCat.heroImg}
              alt={activeCat.heroAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-5 left-6">
              <span className="text-3xl mr-2">{activeCat.emoji}</span>
              <span className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                {activeCat.label}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Category tabs */}
        <div className="flex overflow-x-auto gap-3 mb-10 pb-1 justify-start sm:justify-center scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 ${
                active === cat.id
                  ? "bg-[#c9a84c] text-black font-semibold shadow-lg shadow-[#c9a84c]/20"
                  : "glass-card text-white/60 hover:text-white hover:border-[#c9a84c]/30"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Menu items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {menuData[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-xl p-4 flex items-start gap-4 hover:border-[#c9a84c]/30 transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-medium text-base">{item.name}</h3>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColors[item.badge] || ""}`}>
                        {item.badge === "Popular" && <Flame size={10} className="inline mr-1" />}
                        {item.badge === "Chef's Pick" && <Star size={10} className="inline mr-1 fill-current" />}
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="text-[#c9a84c] font-semibold text-base whitespace-nowrap flex-shrink-0">
                  {item.price}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {active === "hookah" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/30 text-xs mt-6 tracking-wide"
          >
            Pricing shown as Weekday / Weekend · Weekend Special available Fri & Sat only
          </motion.p>
        )}
      </div>
    </section>
  );
}
