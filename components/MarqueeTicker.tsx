const ITEMS = [
  "Craft Cocktails",
  "Premium Hookah",
  "Bollywood Fridays",
  "R&B Saturdays",
  "VIP Packages",
  "Live DJ Nights",
  "Open Nightly",
  "Tucker, Georgia",
  "Fusion Cuisine",
  "Birthday Celebrations",
];

const SEP = "◆";

export default function MarqueeTicker() {
  // Triple so the scroll looks seamless with no visible seam
  const all = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden bg-[#0d0d0d] border-y border-[#c9a84c]/15 py-3.5 select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-white/50 whitespace-nowrap hover:text-[#c9a84c] transition-colors duration-300 cursor-default">
              {item}
            </span>
            <span className="text-[#c9a84c]/40 text-[8px]">{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
