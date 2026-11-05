"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Sparkles, Menu, X, 
  Play, Bot, Image as ImageIcon, Globe
} from "lucide-react";

// ORIGINAL SVG ICONS FOR FOOTER
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TelegramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const GmailIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(null); // Tracks clicked step

  const logoPath = "/assets/images/web_logo.png";
  const heroImagePath = "/assets/images/web_asset1.jpg";

  const features = [
    { icon: <Zap size={32} />, title: "3000+ Commands", desc: "AI, Downloaders, Games, Moderation, and more. Everything you need in one bot." },
    { icon: <Shield size={32} />, title: "Secure & Private", desc: "Your data is encrypted. Antilink, Antibadword, and full group protection." },
    { icon: <Bot size={32} />, title: "AI Integration", desc: "Built-in GPT and Gemini integration for smart chats and image generation." },
    { icon: <ImageIcon size={32} />, title: "Media Tools", desc: "Sticker makers, image enhancers, and video downloaders built right in." },
    { icon: <Globe size={32} />, title: "Multi-Device", desc: "Seamlessly link multiple devices and manage everything from one dashboard." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative font-sans flex flex-col">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#FFD700] opacity-10 dark:opacity-15 blur-[150px] rounded-full pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-4 md:px-12 max-w-7xl mx-auto">
          
          <Link href="/" className="flex items-center gap-3">
            <img src={logoPath} alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.3)] object-contain" />
            <span className="font-black text-xl tracking-tighter">WALLYJAYTECH-MD</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#features" className="hover:text-[#FFD700] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#FFD700] transition-colors">How it Works</a>
            <a href="#terms" className="hover:text-[#FFD700] transition-colors">Terms</a>
            <a href="#contact" className="hover:text-[#FFD700] transition-colors">Contact</a>
            <Link href="/dashboard" className="bg-[#FFD700] text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all font-bold">
              Login / Dashboard
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden absolute w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-xl">
              <div className="flex flex-col p-4 space-y-4 font-bold text-lg">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Features</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">How it Works</a>
                <a href="#terms" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Terms of Service</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Contact</a>
                <Link href="/dashboard" className="bg-[#FFD700] text-black text-center py-3 rounded-xl mt-4">Login / Sign Up</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-grow pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <main className="max-w-4xl mx-auto px-6 pb-20 text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-[#FFD700]" />
              <span>Advanced WhatsApp Automation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">
                Multi-Device WhatsApp Bot.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto font-semibold">
              Meet WALLYJAYTECH-MD — your all-in-one WhatsApp automation solution.
            </p>
            <p className="text-md md:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience 3000+ powerful commands, AI-powered features, smart automation, media tools, and much more. Built for seamless messaging, communities, developers, and everyday productivity.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all">
                <Play size={20} /> See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative w-full max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-[#FFD700] blur-[100px] opacity-20 rounded-full"></div>
            <img src={heroImagePath} alt="Interface" className="relative w-full h-auto rounded-3xl border-4 border-white dark:border-[#111] shadow-2xl object-cover" />
          </motion.div>
        </main>

        {/* FEATURES CAROUSEL (Fixed sliding logic) */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Everything you need.</h2>
            </div>

            <div className="relative overflow-hidden py-4">
              <motion.div 
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50 && currentSlide < features.length - 1) setCurrentSlide(currentSlide + 1);
                  else if (offset.x > 50 && currentSlide > 0) setCurrentSlide(currentSlide - 1);
                }}
              >
                {features.map((f, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3">
                    <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-colors group h-full flex flex-col">
                      <div className="w-16 h-16 rounded-2xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center mb-6 group-hover:bg-[#FFD700] group-hover:text-black transition-all flex-shrink-0">
                        {f.icon}
                      </div>
                      <h3 className="font-bold text-2xl mb-3">{f.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 leading-relaxed flex-grow">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-[#FFD700] w-8' : 'bg-gray-300 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (Tappable/Hoverable Steps) */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Start in 3 steps.</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Get your bot up and running in less than 2 minutes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Create Account", desc: "Sign up securely with your email and phone number to access your dashboard." },
                { step: "02", title: "Connect Bot", desc: "Scan the QR code or use a pairing code to link your WhatsApp instantly." },
                { step: "03", title: "Manage Features", desc: "Toggle AI, Antilink, and other settings on or off directly from your dashboard." }
              ].map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveStep(i)}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group ${
                    activeStep === i 
                      ? 'border-[#FFD700] bg-[#FFD700]/5 shadow-[0_0_30px_rgba(255,215,0,0.15)] scale-105' 
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:border-[#FFD700]/50'
                  }`}
                >
                  <div className={`text-6xl font-black mb-4 transition-colors ${activeStep === i ? 'text-[#FFD700]' : 'text-gray-100 dark:text-[#151515] group-hover:text-[#FFD700]/30'}`}>
                    {s.step}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 transition-colors ${activeStep === i ? 'text-[#FFD700]' : 'text-black dark:text-white'}`}>{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER (Original SVG Icons & Colors) */}
      <footer id="contact" className="bg-gray-50 dark:bg-[#080808] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-12 mb-12">
            
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-3">
                <img src={logoPath} alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
                <span className="font-black text-xl tracking-tighter">WALLYJAYTECH</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Empowering your WhatsApp experience with next-gen automation.</p>
            </div>

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
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><a href="https://github.com/wallyjaytechh" target="_blank" className="hover:text-[#FFD700]">GitHub</a></li>
                  <li><a href="https://youtube.com/@wallyjaytechy" target="_blank" className="hover:text-[#FFD700]">YouTube</a></li>
                  <li><a href="https://tiktok.com/@wallyjaytechy" target="_blank" className="hover:text-[#FFD700]">TikTok</a></li>
                  <li><a href="https://t.me/wallyjaytech" target="_blank" className="hover:text-[#FFD700]">Telegram</a></li>
                  <li><a href="mailto:wallyjay111@gmail.com" className="hover:text-[#FFD700]">Gmail</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* BRAND SVG ICONS */}
            <div className="flex gap-4 order-1 md:order-2">
              <a href="https://github.com/wallyjaytechh" target="_blank" className="p-2.5 bg-white dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm">
                <GithubIcon size={20} className="text-black dark:text-white" />
              </a>
              <a href="https://youtube.com/@wallyjaytechy" target="_blank" className="p-2.5 bg-white dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm">
                <YoutubeIcon size={20} className="text-[#FF0000]" />
              </a>
              <a href="https://t.me/wallyjaytech" target="_blank" className="p-2.5 bg-white dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm">
                <TelegramIcon size={20} className="text-[#0088cc]" />
              </a>
              <a href="mailto:wallyjay111@gmail.com" className="p-2.5 bg-white dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm">
                <GmailIcon size={20} className="text-[#EA4335]" />
              </a>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1">© 2025-2026 WALLYJAYTECH-MD. All rights reserved.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
