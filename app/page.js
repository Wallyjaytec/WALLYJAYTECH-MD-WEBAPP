"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Sparkles, Menu, X, 
  Play, Bot, Image as ImageIcon, Globe, Star, Quote, 
  Users, CheckCircle, Download, Settings, ArrowUp, Phone, 
  MessageSquare, ChevronRight
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
  const [activeStep, setActiveStep] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const logoPath = "/assets/images/web_logo.png";
  const heroImagePath = "/assets/images/web_asset1.jpg";

  const features = [
    { icon: <Zap size={32} />, title: "3000+ Commands", desc: "AI, Downloaders, Games, Moderation, and more. Everything you need in one bot." },
    { icon: <Shield size={32} />, title: "Secure & Private", desc: "Your data is encrypted. Antilink, Antibadword, and full group protection." },
    { icon: <Bot size={32} />, title: "AI Integration", desc: "Built-in GPT and Gemini integration for smart chats and image generation." },
    { icon: <ImageIcon size={32} />, title: "Media Tools", desc: "Sticker makers, image enhancers, and video downloaders built right in." },
    { icon: <Globe size={32} />, title: "Multi-Device", desc: "Seamlessly link multiple devices and manage everything from one dashboard." }
  ];

  // Auto-slide effect for features
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [features.length]);

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="#testimonials" className="hover:text-[#FFD700] transition-colors">Reviews</a>
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
                <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="hover:text-[#FFD700]">Reviews</a>
                <Link href="/dashboard" className="bg-[#FFD700] text-black text-center py-3 rounded-xl mt-4">Login / Sign Up</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-grow pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <main className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-sm font-medium mb-6">
              <Sparkles size={16} className="text-[#FFD700]" />
              <span>Advanced WhatsApp Automation</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              The Ultimate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">
                Multi-Device <br /> WhatsApp Bot.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-lg leading-relaxed">
              Meet WALLYJAYTECH-MD — your all-in-one WhatsApp automation solution. Experience 3000+ powerful commands, AI features, and smart automation.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm font-bold text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-[#FFD700]"/> 3000+ Commands</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-[#FFD700]"/> Multi-Device Support</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-[#FFD700]"/> AI Powered</div>
              <div className="flex items-center gap-2"><CheckCircle size={18} className="text-[#FFD700]"/> 24/7 Active</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all">
                <Play size={20} /> Watch Demo
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="absolute inset-0 bg-[#FFD700] blur-[100px] opacity-20 rounded-full"></div>
            <img src={heroImagePath} alt="Interface" className="relative w-full h-auto rounded-3xl border-4 border-white dark:border-[#111] shadow-2xl object-cover" />
          </motion.div>
        </main>

        {/* STATS BANNER */}
        <section className="bg-black text-white py-8 border-y border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><h3 className="text-3xl font-black text-[#FFD700]">100K+</h3><p className="text-sm text-gray-400">Total Users</p></div>
            <div><h3 className="text-3xl font-black text-[#FFD700]">4.9/5</h3><p className="text-sm text-gray-400">User Rating</p></div>
            <div><h3 className="text-3xl font-black text-[#FFD700]">3000+</h3><p className="text-sm text-gray-400">Commands</p></div>
            <div><h3 className="text-3xl font-black text-[#FFD700]">1M+</h3><p className="text-sm text-gray-400">Messages Handled</p></div>
          </div>
        </section>

        {/* ABOUT / CREATOR SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
             <img src={logoPath} alt="Logo" className="w-64 h-64 rounded-full border-4 border-[#FFD700] object-contain shadow-[0_0_40px_rgba(255,215,0,0.2)] p-4 bg-[#0a0a0a]" />
          </div>
          <div>
            <div className="inline-block bg-[#FFD700]/10 text-[#FFD700] font-bold px-3 py-1 rounded-full text-xs mb-4">About WALLYJAYTECH-MD</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">Creator of WALLYJAYTECH-MD</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              WALLYJAYTECH-MD is an advanced Multi-Device WhatsApp Bot designed to make messaging smarter, easier, and more powerful.
            </p>
            <ul className="space-y-3 mb-8">
              {["3000+ Powerful Commands", "AI-Powered Features", "Multi-Device WhatsApp Support", "Bot Development • JavaScript • Node.js", "Sharing knowledge through open-source"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold"><CheckCircle size={18} className="text-[#FFD700]" /> {item}</li>
              ))}
            </ul>
            <a href="https://github.com/wallyjaytechh" target="_blank" className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Learn More <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* LIVE CHAT MOCKUP */}
        <section className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#FFD700]/10 text-[#FFD700] font-bold px-3 py-1 rounded-full text-xs mb-4">Powerful Features</div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Why Choose WALLYJAYTECH-MD?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Packed with amazing features to give you the best WhatsApp experience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Multi-Device Support", "3000+ Powerful Commands", "AI Features & Smart Replies",
                  "Media Downloader (Video, Audio)", "Group Management (Admin Tools)", "Anti-Ban Protection"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-[#0a0a0a] rounded-xl border border-gray-200 dark:border-gray-800 font-semibold text-sm">
                    <Star size={16} className="text-[#FFD700]" /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Fake Phone UI */}
            <div className="relative mx-auto w-full max-w-[300px] h-[600px] bg-black rounded-[40px] border-8 border-gray-800 shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-[#075E54] p-4 text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center"><Bot size={20} className="text-[#075E54]"/></div>
                <div><h4 className="font-bold text-sm">WALLYJAYTECH-MD</h4><p className="text-[10px] opacity-80">Online</p></div>
              </div>
              <div className="flex-grow bg-[#E5DDD5] p-4 flex flex-col gap-4">
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-sm self-start max-w-[80%]">
                  Bot is Active! 3000+ Commands Ready to Help!
                </div>
                <div className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none shadow-sm text-sm self-end max-w-[80%]">
                  .menu
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-sm self-start max-w-[80%]">
                  📌 Welcome to WALLYJAYTECH-MD! Reply 1 for AI, 2 for Downloads...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES CAROUSEL */}
        <section id="features" className="py-24 overflow-hidden">
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
                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] transition-colors group h-full flex flex-col">
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

        {/* HOW IT WORKS (TAPPABLE) */}
        <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Get Started in 3 Simple Steps</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", icon: <Download size={32} />, title: "Download & Add", desc: "Add WALLYJAYTECH-MD to your WhatsApp." },
                { step: "02", icon: <Settings size={32} />, title: "Configure", desc: "Set your preferences and customize the bot." },
                { step: "03", icon: <CheckCircle size={32} />, title: "Enjoy!", desc: "Start using the bot and enjoy amazing features." }
              ].map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveStep(i)}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group ${
                    activeStep === i 
                      ? 'border-[#FFD700] bg-white dark:bg-[#0a0a0a] shadow-[0_0_30px_rgba(255,215,0,0.15)] scale-105' 
                      : 'border-transparent bg-white dark:bg-[#0a0a0a] hover:border-[#FFD700]/50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${activeStep === i ? 'bg-[#FFD700] text-black' : 'bg-[#FFD700]/10 text-[#FFD700]'}`}>
                    {s.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${activeStep === i ? 'text-[#FFD700]' : 'text-black dark:text-white'}`}>{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <div className="inline-block bg-[#FFD700]/10 text-[#FFD700] font-bold px-3 py-1 rounded-full text-xs mb-4">What Our Users Say</div>
                <h2 className="text-3xl md:text-5xl font-black">Trusted by Thousands Worldwide</h2>
                <p className="text-gray-500 mt-2">Join our growing community of satisfied users.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "WALLYJAYTECH-MD is the best WhatsApp bot! Super fast, full of features, and always reliable.", name: "David Emmanuel", role: "Developer", img: "https://i.pravatar.cc/150?img=11" },
                { text: "The AI features are insane. I use it for my group management and media downloads every single day.", name: "Sarah K.", role: "Community Manager", img: "https://i.pravatar.cc/150?img=5" }
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800">
                  <div className="flex gap-1 mb-4 text-[#FFD700]">
                    <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                  </div>
                  <p className="text-lg font-medium mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.img} className="w-12 h-12 rounded-full" alt={t.name} />
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto bg-black rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Ready to experience the best WhatsApp bot?</h2>
              <p className="text-gray-400 text-lg">Join thousands of users today!</p>
            </div>
            <Link href="/dashboard" className="relative z-10 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] whitespace-nowrap">
              Get Started Now
            </Link>
          </div>
        </section>
      </div>

      {/* FOOTER */}
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

      {/* AUTO SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-[#FFD700] text-black rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:bg-yellow-500 hover:scale-110 transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
