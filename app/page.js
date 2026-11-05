"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Sparkles, Menu, X, 
  Play, Bot
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Paths starting with "/" automatically look inside the "public" folder in Next.js
  const logoPath = "/assets/images/web_logo.png";
  const heroImagePath = "/assets/images/web_asset1.jpg";

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative font-sans flex flex-col">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#FFD700] opacity-10 dark:opacity-15 blur-[150px] rounded-full pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-4 md:px-12 max-w-7xl mx-auto">
          
          {/* Logo & Text */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={logoPath} 
              alt="WALLYJAYTECH Logo" 
              className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.3)] object-contain"
            />
            <span className="font-black text-xl tracking-tighter">WALLYJAYTECH-MD</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#features" className="hover:text-[#FFD700] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#FFD700] transition-colors">How it Works</a>
            <a href="#terms" className="hover:text-[#FFD700] transition-colors">Terms</a>
            <a href="#contact" className="hover:text-[#FFD700] transition-colors">Contact</a>
            <Link href="/dashboard" className="bg-[#FFD700] text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all font-bold">
              Login / Dashboard
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-xl"
            >
              <div className="flex flex-col p-4 space-y-4 font-bold text-lg">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Features</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">How it Works</a>
                <a href="#terms" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Terms of Service</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Contact</a>
                <Link href="/dashboard" className="bg-[#FFD700] text-black text-center py-3 rounded-xl mt-4">
                  Login / Sign Up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <main className="max-w-4xl mx-auto px-6 pb-20 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-[#FFD700]" />
              <span>Trusted by 1,000+ users worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">
                WhatsApp Bot.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Manage your bot, toggle features, unlock AI capabilities, and run a full SaaS business. Built for developers, communities, and content creators.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all">
                <Play size={20} /> See How it Works
              </a>
            </div>
          </motion.div>

          {/* Hero Image Below Text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative w-full max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-[#FFD700] blur-[100px] opacity-20 rounded-full"></div>
            <img 
              src={heroImagePath} 
              alt="Advanced Bot Interface" 
              className="relative w-full h-auto rounded-3xl border-4 border-white dark:border-[#111] shadow-2xl object-cover"
            />
          </motion.div>
        </main>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Everything you need.</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">All the advanced tools to run, manage, and scale your bot in one sleek dashboard.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap size={32} />, title: "3000+ Commands", desc: "AI, Downloaders, Games, Moderation, and more. Everything you need in one bot." },
                { icon: <Shield size={32} />, title: "Secure & Private", desc: "Your data is encrypted. Antilink, Antibadword, and full group protection." },
                { icon: <Bot size={32} />, title: "AI Integration", desc: "Built-in GPT and Gemini integration for smart chats and image generation." }
              ].map((f, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center mb-6 group-hover:bg-[#FFD700] group-hover:text-black transition-all">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-2xl mb-3">{f.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-16">Start in 3 steps.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                { step: "1", title: "Create Account", desc: "Sign up with your email and phone number." },
                { step: "2", title: "Connect Bot", desc: "Scan the QR code to link your WhatsApp." },
                { step: "3", title: "Manage Features", desc: "Toggle AI, Antilink, and status settings instantly." }
              ].map((s, i) => (
                <div key={i} className="relative">
                  <div className="text-6xl font-black text-gray-200 dark:text-[#1a1a1a] absolute -top-8 -left-4 z-0">{s.step}</div>
                  <div className="relative z-10 pt-4">
                    <h3 className="text-xl font-bold mb-2 text-[#FFD700]">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-50 dark:bg-[#080808] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Footer Top */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
            
            {/* Footer Logo */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img 
                  src={logoPath} 
                  alt="WALLYJAYTECH Logo" 
                  className="w-8 h-8 rounded-lg object-contain"
                />
                <span className="font-black text-xl tracking-tighter">WALLYJAYTECH</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">The ultimate bot dashboard.</p>
            </div>

            {/* Horizontal Links Container */}
            <div className="flex flex-wrap gap-12 md:gap-20">
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><a href="#features" className="hover:text-[#FFD700]">Features</a></li>
                  <li><Link href="/dashboard" className="hover:text-[#FFD700]">Dashboard</Link></li>
                  <li><a href="#" className="hover:text-[#FFD700]">Pricing</a></li>
                </ul>
              </div>

              <div id="terms">
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><a href="#" className="hover:text-[#FFD700]">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#FFD700]">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#FFD700]">Refund Policy</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><a href="https://github.com/wallyjaytechh" target="_blank" className="hover:text-[#FFD700]">GitHub</a></li>
                  <li><a href="https://youtube.com/@wallyjaytechy" target="_blank" className="hover:text-[#FFD700]">YouTube</a></li>
                  <li><a href="https://wa.me/2348144317152" target="_blank" className="hover:text-[#FFD700]">WhatsApp Support</a></li>
                </ul>
              </div>
            </div>

          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center md:text-left text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025-2026 WALLYJAYTECH-MD. All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
