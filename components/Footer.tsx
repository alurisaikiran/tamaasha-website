"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#c9a84c]/10 bg-[#060606]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/logo.png"
                alt="Tamaasha Lounge & Bar"
                width={128}
                height={128}
                className="w-32 h-32 object-contain mix-blend-screen"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Tucker&apos;s premier lounge experience — where every night becomes a spectacle worth remembering.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://facebook.com/tamaashalounge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#c9a84c]/20 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-all"
              >
                <FaFacebook size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://instagram.com/tamaashalounge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#c9a84c]/20 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-all"
              >
                <FaInstagram size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://g.co/kgs/tamaashalounge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Reviews"
                className="w-9 h-9 rounded-full border border-[#c9a84c]/20 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/50 transition-all"
              >
                <FaGoogle size={15} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]/70 mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[
                ["Home",          "#home"        ],
                ["Menu",          "#menu"        ],
                ["Events",        "#events"      ],
                ["Gallery",       "#gallery"     ],
                ["VIP Experience","#vip"         ],
                ["About Us",      "#about"       ],
                ["Contact",       "#contact"     ],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-white/40 hover:text-[#c9a84c] transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-[#c9a84c]/70 mb-5">Info</h4>
            <div className="space-y-4 text-sm text-white/40">
              <div>
                <div className="text-white/20 text-xs uppercase tracking-wider mb-1">Address</div>
                <p>6330 Lawrenceville Hwy<br />Tucker, GA 30084</p>
              </div>
              <div>
                <div className="text-white/20 text-xs uppercase tracking-wider mb-1">Phone</div>
                <a href="tel:+16786914291" className="hover:text-[#c9a84c] transition-colors">
                  +1 678-691-4291
                </a>
              </div>
              <div>
                <div className="text-white/20 text-xs uppercase tracking-wider mb-1">Hours</div>
                <p>Sun–Thu: 4 PM – 1 AM</p>
                <p>Fri–Sat: 4 PM – 3 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-white font-medium mb-1">Get Weekly Event Updates</h4>
              <p className="text-white/40 text-sm">Never miss a themed night or special offer.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full sm:w-52 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-[#c9a84c]/50 text-sm"
              />
              <button className="w-full sm:w-auto bg-[#c9a84c] text-black px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-[#e8c97a] transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-white/20 text-xs">
            © {year} Tamaasha Lounge &amp; Bar. All rights reserved.
          </p>
          <p className="text-white/10 text-xs">
            Tucker, Georgia · Must be 21+ to enter
          </p>
        </div>
      </div>
    </footer>
  );
}
