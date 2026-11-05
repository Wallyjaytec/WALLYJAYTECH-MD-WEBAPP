"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 overflow-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD700] opacity-10 dark:opacity-20 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFD700] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            <Bot className="text-black" size={24} />
          </div>
          <span className="font-black text-xl tracking-tighter">WALLYJAYTECH</span>
        </div>
        <Link href="/dashboard" className="bg-[#FFD700] text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition-all text-sm md:text-base">
          Login / Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-sm font-medium mb-8">
            <Sparkles size={16} className="text-[#FFD700]" />
            <span>The Most Advanced Multi-Device WhatsApp Bot</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            WALLYJAYTECH-MD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-yellow-600">
              Reimagined.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Manage your bot, toggle features, and unlock AI capabilities. Built for developers, communities, and content creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              Get Started <ArrowRight size={20} />
            </Link>
            <a href="https://github.com/wallyjaytechh/WALLYJAYTECH-MD" target="_blank" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#111] text-black dark:text-white border border-gray-200 dark:border-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all">
              View GitHub Repo
            </a>
          </div>
        </motion.div>

        {/* Feature Grid (Like your README) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left"
        >
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-colors">
            <Zap className="text-[#FFD700] mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">3000+ Commands</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">AI, Downloaders, Games, Moderation, and more. Everything you need in one bot.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-colors">
            <Shield className="text-[#FFD700] mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">7 Menu Styles</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Customizable fonts, dynamic media, and fully branded menus for your groups.</p>
          </div>
          <div className="p-8 rounded-3xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] dark:hover:border-[#FFD700] transition-colors">
            <Bot className="text-[#FFD700] mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">Web Dashboard</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Control your bot directly from this website. Toggle features on/off instantly.</p>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
