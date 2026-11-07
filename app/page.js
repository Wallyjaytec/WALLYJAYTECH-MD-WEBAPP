"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight, Shield, Zap, Sparkles, Menu, X, 
  Play, Bot, Image as ImageIcon, Globe, Star, 
  CheckCircle, ArrowUp, Camera, Mic, Send, CheckCheck, 
  UserPlus, QrCode, Settings, Mail, ChevronLeft, ChevronRight,
  Plus, Minus, Sun, Moon, HelpCircle, FileText, Users, DollarSign
} from "lucide-react";

// --- SVG BRAND ICONS ---
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
const WhatsappIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const TiktokIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

// --- ANIMATED COUNTER ---
function AnimatedCounter({ end, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });

  useEffect(() => {
    if (!isInView) { setCount(0); return; }
    let animationFrame;
    const duration = 2000;
    const startTime = performance.now();
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) animationFrame = requestAnimationFrame(updateCount);
    };
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [aboutSlide, setAboutSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const scrollTimeout = useRef(null);

  useEffect(() => setMounted(true), []);

  // Detect cards per view based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCardsPerView(3);
      else if (window.innerWidth >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logoPath = "/assets/images/web_logo.png";
  const heroImagePath = "/assets/images/web_asset1.jpg";

  const features = [
    { icon: <Zap size={32} />, title: "3000+ Commands", desc: "AI, Downloaders, Games, Moderation, and more. Everything you need in one bot." },
    { icon: <Shield size={32} />, title: "Secure & Private", desc: "Your data is encrypted. Antilink, Antibadword, and full group protection." },
    { icon: <Bot size={32} />, title: "AI Integration", desc: "Built-in GPT and Gemini integration for smart chats and image generation." },
    { icon: <ImageIcon size={32} />, title: "Media Tools", desc: "Sticker makers, image enhancers, and video downloaders built right in." },
    { icon: <Globe size={32} />, title: "Multi-Device", desc: "Seamlessly link multiple devices and manage everything from one dashboard." }
  ];

  const testimonials = [
    { text: "WALLYJAYTECH-MD is the best WhatsApp bot! Super fast, full of features, and always reliable.", name: "David Emmanuel", role: "Developer", img: "https://i.pravatar.cc/150?img=11" },
    { text: "The AI features are insane. I use it for my group management and media downloads every single day.", name: "Sarah K.", role: "Community Manager", img: "https://i.pravatar.cc/150?img=5" },
    { text: "Best bot ever! The 3000+ commands make everything so much easier.", name: "John D.", role: "Content Creator", img: "https://i.pravatar.cc/150?img=12" },
    { text: "I've used many WhatsApp bots, but WALLYJAYTECH-MD is on another level. Super stable.", name: "Ahmed M.", role: "Group Admin", img: "https://i.pravatar.cc/150?img=3" },
    { text: "The UI is amazing and the bot never goes offline. Highly recommended.", name: "Linda O.", role: "Entrepreneur", img: "https://i.pravatar.cc/150?img=9" },
    { text: "The downloader features are lightning fast. YouTube, TikTok, Instagram — no issues.", name: "Michael T.", role: "Student", img: "https://i.pravatar.cc/150?img=15" },
    { text: "The dashboard makes it so easy to toggle features on and off. I love it.", name: "Grace E.", role: "Influencer", img: "https://i.pravatar.cc/150?img=20" },
    { text: "Absolutely fantastic! The AI chatbot feature is scary good.", name: "Peter S.", role: "Tech Enthusiast", img: "https://i.pravatar.cc/150?img=60" }
  ];

  const aboutTeam = [
    { name: "Wally Jay", role: "Creator & Lead Developer", img: "/assets/images/about_us.png", desc: "A 22-year-old professional web developer with a deep passion for coding. His vision for WALLYJAYTECH-MD is to make WhatsApp easier and more fun to use through intelligent automation." },
    { name: "Anonymous", role: "Bot Tester Expert", img: "/assets/images/anonymous.png", desc: "An expert in identifying hidden bugs and pushing the bot to its limits. Anonymous ensures that every feature works flawlessly before it reaches the public." },
    { name: "Winne Tech", role: "Quality Assurance & Tester", img: "/assets/images/winnertech.png", desc: "Specializes in making sure the bot's features meet what people actually want. Winne Tech rigorously tests every update for better improvement." },
    { name: "Young Cash", role: "Beta Tester", img: "/assets/images/youngcash.png", desc: "A dedicated tester who explores the bot from a user's perspective. Young Cash helps verify that the latest features deliver the best possible experience." }
  ];

  const faqs = [
    { q: "What is WALLYJAYTECH-MD?", a: "WALLYJAYTECH-MD is an advanced multi-device WhatsApp bot designed to automate tasks, manage groups, download media, and provide AI chat features." },
    { q: "Is the bot free to use?", a: "Yes! The core features are 100% free. We also offer a Premium tier for users who want access to exclusive commands and higher limits." },
    { q: "Will my WhatsApp account get banned?", a: "We use secure and anti-ban measures, but any unofficial WhatsApp bot carries a slight risk. We recommend using a secondary number for testing." },
    { q: "How do I connect the bot to my WhatsApp?", a: "Simply sign up on our dashboard, generate a pairing code or scan the QR code, and link it to your WhatsApp app." },
    { q: "Can I use the bot in multiple groups?", a: "Yes, once connected, you can add the bot to as many groups as you want. You can also manage its group settings directly from the dashboard." },
    { q: "What are the 3000+ commands?", a: "The bot includes commands for AI (GPT, Gemini), downloaders (TikTok, YouTube, IG), group moderation (Antilink, Antibadword), games, and media tools." },
    { q: "Can I toggle features on and off?", a: "Absolutely. Our SaaS dashboard allows you to turn features like AI, Antilink, and Autostatus on or off instantly." },
    { q: "How do I get support?", a: "You can reach out to us via our WhatsApp support group, Telegram, or email. Links are available in the footer below." }
  ];

  const phoneFeatures = [
    "Multi-Device Support", "3000+ Powerful Commands", "AI Features & Smart Replies", 
    "Media Downloader (Video, Audio)", "Group Management (Admin Tools)", "Anti-Ban Protection"
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      desc: "Perfect for testing the waters and basic personal use.",
      features: ["Basic Commands", "Limited AI Chat", "Standard Support", "Single Device"],
      buttonText: "Current Plan",
      highlight: false
    },
    {
      name: "Premium",
      price: "$5",
      period: "/month",
      desc: "For power users who want advanced automation and AI.",
      features: ["3000+ Commands", "Unlimited AI Chat", "Priority Support", "Multi-Device Access", "No Ads"],
      buttonText: "Upgrade to Premium",
      highlight: true
    },
    {
      name: "Pro",
      price: "$15",
      period: "/month",
      desc: "For businesses and group admins needing max performance.",
      features: ["Everything in Premium", "Custom Bot Persona", "Dedicated Server Node", "VIP Support", "Early Access Features"],
      buttonText: "Upgrade to Pro",
      highlight: false
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, features.length - cardsPerView + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length, cardsPerView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialSlide((prev) => (prev + 1) % Math.max(1, testimonials.length - cardsPerView + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length, cardsPerView]);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      const scrollY = window.scrollY;
      if (scrollY > 400) {
        setShowScrollTop(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setShowScrollTop(false), 3000);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white transition-colors duration-300 overflow-x-hidden relative font-sans flex flex-col">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#FFD700] opacity-10 dark:opacity-15 blur-[150px] rounded-full pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-center py-4 px-4 md:px-12 max-w-7xl mx-auto">
          
          <Link href="/" className="flex items-center gap-3">
            <img src={logoPath} alt="Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.3)] object-contain" />
            <span className="font-black text-xl tracking-tighter">WALLYJAYTECH-MD</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 font-semibold text-sm">
            <a href="#features" className="hover:text-[#FFD700] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#FFD700] transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-[#FFD700] transition-colors">Reviews</a>
            
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 text-gray-600 dark:text-gray-300 hover:text-[#FFD700] dark:hover:text-[#FFD700] transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <Link href="/login" className="bg-[#FFD700] text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all font-bold">
              Login / Dashboard
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {mounted && (
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 text-gray-600 dark:text-gray-300">
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            )}
            <button className="p-2 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsMenuOpen(false)}></div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 shadow-xl z-50">
                <div className="flex flex-col p-4 space-y-1 font-bold text-sm">
                  
                  <p className="text-[10px] uppercase text-gray-400 px-4 pt-2 pb-1 tracking-widest">Navigation</p>
                  <a href="#features" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Zap size={18}/> Features</a>
                  <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Settings size={18}/> How it Works</a>
                  <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Star size={18}/> Reviews</a>
                  <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><DollarSign size={18}/> Pricing</a>
                  <a href="#faq" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><HelpCircle size={18}/> FAQs</a>
                  
                  <p className="text-[10px] uppercase text-gray-400 px-4 pt-4 pb-1 tracking-widest">Company</p>
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Users size={18}/> About Us</a>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Mail size={18}/> Contact Us</a>
                  <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><Shield size={18}/> Privacy Policy</Link>
                  <Link href="/terms" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-[#FFD700] transition-colors flex items-center gap-3"><FileText size={18}/> Terms of Service</Link>

                  <div className="pt-4 pb-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block w-full bg-[#FFD700] text-black text-center py-4 rounded-xl shadow-lg shadow-yellow-500/20">Login / Sign Up</Link>
                  </div>
                </div>
              </motion.div>
            </>
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
              <Link href="/signup" className="flex items-center justify-center gap-2 bg-[#FFD700] text-black font-black px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-[#1a1a1a] transition-all">
                <Play size={20} /> See How It Works
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="absolute inset-0 bg-[#FFD700] blur-[100px] opacity-20 rounded-full"></div>
            <img src={heroImagePath} alt="Interface" className="relative w-full h-auto rounded-3xl border-4 border-white dark:border-[#111] shadow-2xl object-cover" />
          </motion.div>
        </main>

        {/* STATS BANNER */}
        <section className="py-12 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#FFD700] transition-colors">
              <h3 className="text-3xl font-black text-[#FFD700]"><AnimatedCounter end={100} suffix="K+" /></h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">Total Users</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#FFD700] transition-colors">
              <h3 className="text-3xl font-black text-[#FFD700]"><AnimatedCounter end={4.9} decimals={1} suffix="/5" /></h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">User Rating</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#FFD700] transition-colors">
              <h3 className="text-3xl font-black text-[#FFD700]"><AnimatedCounter end={3000} suffix="+" /></h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">Commands</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-sm hover:border-[#FFD700] transition-colors">
              <h3 className="text-3xl font-black text-[#FFD700]"><AnimatedCounter end={1} suffix="M+" /></h3>
              <p className="text-sm text-gray-500 mt-1 font-medium">Messages Handled</p>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
             <img src={logoPath} alt="Logo" className="w-64 h-64 rounded-full border-4 border-[#FFD700] object-contain shadow-[0_0_40px_rgba(255,215,0,0.2)] p-4 bg-[#0a0a0a]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6">WALLYJAYTECH-MD</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              WALLYJAYTECH-MD is an advanced Multi-Device WhatsApp Bot designed to make messaging smarter, easier, and more powerful.
            </p>
            <ul className="space-y-3 mb-8">
              {["3000+ Powerful Commands", "AI-Powered Features", "Multi-Device WhatsApp Support", "Bot Development • JavaScript • Node.js", "Sharing knowledge through open-source"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-semibold"><CheckCircle size={18} className="text-[#FFD700]" /> {item}</li>
              ))}
            </ul>
            <a href="https://github.com/wallyjaytechh" target="_blank" className="inline-flex items-center gap-2 bg-black dark:bg-[#FFD700] text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-yellow-500 transition-colors">
              Learn More <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* FEATURE HIGHLIGHTS & REALISTIC PHONE MOCKUP */}
        <section className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">Why Choose WALLYJAYTECH-MD?</h2>
              
              {/* VIDEO ADDED HERE */}
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg bg-black">
                <video 
                  src="/assets/videos/demo.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover max-h-[300px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {phoneFeatures.map((f, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveFeature(i)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer font-semibold text-sm ${
                      activeFeature === i 
                        ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]' 
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Star size={16} className={activeFeature === i ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-400"} /> {f}
                  </div>
                ))}
              </div>
            </div>
            
            {/* REALISTIC PHONE MOCKUP */}
            <div className="relative mx-auto w-full max-w-[320px] h-[650px] bg-black rounded-[40px] border-[10px] border-gray-900 shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-[#075E54] p-3 text-white flex items-center gap-3 shadow-md z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                  <img src={logoPath} alt="Bot" className="w-full h-full rounded-full object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">WALLYJAYTECH-MD</h4>
                  <p className="text-[10px] text-gray-200">Online</p>
                </div>
              </div>
              
              <div className="flex-grow bg-[#E5DDD5] dark:bg-[#0b141a] p-3 overflow-y-auto flex flex-col gap-3">
                <div className="bg-[#DCF8C6] dark:bg-[#005c4b] p-3 rounded-xl rounded-tr-none shadow-sm text-xs self-end max-w-[85%] text-black dark:text-white relative">
                  .menu
                  <span className="text-[8px] text-gray-500 absolute bottom-1 right-2 flex items-center gap-1">12:00 PM <CheckCheck size={10} className="text-blue-500"/></span>
                </div>
                
                <div className="bg-white dark:bg-[#202c33] p-3 rounded-xl rounded-tl-none shadow-sm text-[10px] self-start max-w-[95%] text-black dark:text-white font-mono whitespace-pre-wrap leading-tight">
{`🌀◈── 𝙼𝙴𝙽𝚄 𝙻𝙸𝚂𝚃 ──◈❃🌸❃

╭──────────●●➤
┊ ❶ 𝙰𝚒 𝙼𝚎𝚗𝚞
┊ ❷ 𝙰𝚗𝚒𝚖𝚎 𝙼𝚎𝚗𝚞
┊ ❸ 𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚛 𝙼𝚎𝚗𝚞
┊ ❹ 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙼𝚎𝚗𝚞
┊ ❺ 𝙴𝚙𝚑𝚘𝚝𝚘 𝙼𝚎𝚗𝚞
┊ ❻ 𝙵𝚞𝚗 𝙼𝚎𝚗𝚞
┊ ❼ 𝙶𝚊𝚖𝚎𝚜 𝙼𝚎𝚗𝚞
┊ ❽ 𝙶𝚎𝚗𝚎𝚛𝚊𝚕 𝙼𝚎𝚗𝚞
┊ ❾ 𝙶𝚒𝚝𝚑𝚞𝚋 𝙼𝚎𝚗𝚞
┊ ❿ 𝙶𝚛𝚘𝚞𝚙 𝙼𝚎𝚗𝚞
┊ ⓫ 𝙼𝚒𝚜𝚌 𝙼𝚎𝚗𝚞
┊ ⓬ 𝙾𝚠𝚗𝚎𝚛 𝙼𝚎𝚗𝚞
┊ ⓭ 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝚜𝚞𝚋 𝙼𝚎𝚗𝚞
┊ ⓮ 𝚂𝚝𝚒𝚌𝚔𝚎𝚛 𝙼𝚎𝚗𝚞
┊ ⓯ 𝚃𝚘𝚘𝚕𝚜 𝙼𝚎𝚗𝚞
╰──────·••─────•────●○

            © 2025-2026

╭──────────●●➤
┊ 𝚆𝙰𝙻𝙻𝚈𝙹𝙰𝚈𝚃𝙴𝙲𝙷-𝙼𝙳
╰──────·••─────•────●○`}
                </div>
              </div>
              
              <div className="bg-[#f0f0f0] dark:bg-[#2a3942] p-2 flex items-center gap-2">
                <div className="flex-grow bg-white dark:bg-[#2a3942] rounded-full px-3 py-2 flex items-center gap-2 border border-gray-300 dark:border-gray-600">
                  <span className="text-gray-400 text-xs">Type a message...</span>
                </div>
                <button className="p-2 text-gray-500"><Camera size={20} /></button>
                <button className="p-2 text-gray-500"><Mic size={20} /></button>
                <button className="p-2 bg-[#00a884] text-white rounded-full shadow-md"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION (NEW) */}
        <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Simple, transparent pricing.</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your needs. Upgrade or downgrade at any time.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col ${
                  plan.highlight 
                    ? 'border-[#FFD700] bg-[#FFD700]/5 dark:bg-[#0a0a0a] shadow-[0_0_30px_rgba(255,215,0,0.15)] scale-105 z-10' 
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] hover:border-[#FFD700]/50'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFD700] text-black text-xs font-black uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500 font-medium">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">{plan.desc}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <CheckCircle size={16} className={plan.highlight ? "text-[#FFD700]" : "text-green-500"} /> {f}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={plan.name === "Free" ? "/signup" : "/dashboard?tab=billing"}
                  className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${
                    plan.highlight 
                      ? 'bg-[#FFD700] text-black hover:bg-yellow-500 shadow-md' 
                      : 'bg-gray-100 dark:bg-[#111] text-black dark:text-white hover:bg-gray-200 dark:hover:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES CAROUSEL */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Everything you need.</h2>
            </div>

            <div className="relative overflow-hidden py-4">
              <motion.div 
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${currentSlide * (100 / cardsPerView)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  const maxSlide = Math.max(0, features.length - cardsPerView);
                  if (offset.x < -50 && currentSlide < maxSlide) setCurrentSlide(currentSlide + 1);
                  else if (offset.x > 50 && currentSlide > 0) setCurrentSlide(currentSlide - 1);
                }}
              >
                {features.map((f, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-3">
                    <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] transition-colors group h-full flex flex-col">
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
              {features.slice(0, Math.max(1, features.length - cardsPerView + 1)).map((_, i) => (
                <button key={i} onClick={() => setCurrentSlide(i)} className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? 'bg-[#FFD700] w-8' : 'bg-gray-300 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Start in 3 steps.</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Get your bot up and running in less than 2 minutes.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <UserPlus size={32} />, title: "Create Account", desc: "Sign up securely with your email and phone number to access your dashboard." },
                { icon: <QrCode size={32} />, title: "Connect Bot", desc: "Scan the QR code or use a pairing code to link your WhatsApp instantly." },
                { icon: <Settings size={32} />, title: "Manage Features", desc: "Toggle AI, Antilink, and other settings on or off directly from your dashboard." }
              ].map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveStep(i)}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer group ${
                    activeStep === i 
                      ? 'border-[#FFD700] bg-white dark:bg-[#0a0a0a] shadow-[0_0_30px_rgba(255,215,0,0.15)] scale-105' 
                      : 'border-transparent bg-gray-50 dark:bg-[#0a0a0a] hover:border-[#FFD700]/50'
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
        <section id="testimonials" className="py-24 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-black">Trusted by Thousands Worldwide</h2>
              <p className="text-gray-500 mt-2">Join our growing community of satisfied users.</p>
            </div>
            
            <div className="relative overflow-hidden py-4">
              <motion.div 
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${testimonialSlide * (100 / cardsPerView)}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset }) => {
                  const maxSlide = Math.max(0, testimonials.length - cardsPerView);
                  if (offset.x < -50 && testimonialSlide < maxSlide) setTestimonialSlide(testimonialSlide + 1);
                  else if (offset.x > 50 && testimonialSlide > 0) setTestimonialSlide(testimonialSlide - 1);
                }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full md:min-w-[50%] px-3">
                    <div className="p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                      <div className="flex gap-1 mb-4 text-[#FFD700]">
                        <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                      </div>
                      <p className="text-lg font-medium mb-6 flex-grow">"{t.text}"</p>
                      <div className="flex items-center gap-4 mt-auto">
                        <img src={t.img} className="w-12 h-12 rounded-full object-cover" alt={t.name} />
                        <div>
                          <h4 className="font-bold">{t.name}</h4>
                          <p className="text-xs text-gray-500">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.slice(0, Math.max(1, testimonials.length - cardsPerView + 1)).map((_, i) => (
                <button key={i} onClick={() => setTestimonialSlide(i)} className={`w-3 h-3 rounded-full transition-all ${testimonialSlide === i ? 'bg-[#FFD700] w-8' : 'bg-gray-300 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT US / TEAM */}
        <section id="about" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">About Us</h2>
              <p className="text-gray-500 dark:text-gray-400">The passionate team behind WALLYJAYTECH-MD.</p>
            </div>

            <div className="relative">
              <div className="overflow-hidden py-4">
                <motion.div 
                  className="flex cursor-grab active:cursor-grabbing"
                  animate={{ x: `-${aboutSlide * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -50 && aboutSlide < aboutTeam.length - 1) setAboutSlide(aboutSlide + 1);
                    else if (offset.x > 50 && aboutSlide > 0) setAboutSlide(aboutSlide - 1);
                  }}
                >
                  {aboutTeam.map((member, i) => (
                    <div key={i} className="min-w-full px-4 flex justify-center">
                      <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 max-w-2xl w-full flex flex-col items-center text-center shadow-lg">
                        <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.3)] mb-6" />
                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                        <p className="text-[#FFD700] font-semibold mb-4">{member.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{member.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <button onClick={() => setAboutSlide(prev => Math.max(0, prev - 1))} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 p-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-full hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all shadow-md z-10" disabled={aboutSlide === 0}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => setAboutSlide(prev => Math.min(aboutTeam.length - 1, prev + 1))} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 p-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-full hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all shadow-md z-10" disabled={aboutSlide === aboutTeam.length - 1}>
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {aboutTeam.map((_, i) => (
                <button key={i} onClick={() => setAboutSlide(i)} className={`w-3 h-3 rounded-full transition-all ${aboutSlide === i ? 'bg-[#FFD700] w-8' : 'bg-gray-300 dark:bg-gray-700'}`} />
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-[#080808] border-y border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto bg-black dark:bg-[#111] rounded-3xl p-8 md:p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-10 blur-[80px] rounded-full"></div>
            <div className="relative z-10 w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Subscribe to our Newsletter</h2>
              <p className="text-gray-400 text-sm">Get the latest updates, new features, and bot tips straight to your inbox.</p>
            </div>
            <div className="relative z-10 w-full md:w-1/2 flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="flex-grow px-5 py-4 rounded-xl bg-[#1a1a1a] border border-gray-700 text-white focus:border-[#FFD700] outline-none" />
              <button className="bg-[#FFD700] text-black font-bold px-6 py-4 rounded-xl hover:bg-yellow-500 transition-all whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto bg-[#FFD700] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.2)]">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-2">Ready to experience the best WhatsApp bot?</h2>
              <p className="text-black/80 font-medium text-lg">Join thousands of users today and transform your messaging.</p>
            </div>
            <Link href="/signup" className="relative z-10 bg-black text-white font-black px-8 py-4 rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap shadow-xl">Get Started Now</Link>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 dark:text-gray-400">Everything you need to know about the bot and the dashboard.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300">
                  <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                    <span className="font-bold text-lg">{faq.q}</span>
                    <div className={`p-2 rounded-full transition-colors ${openFaq === index ? 'bg-[#FFD700] text-black' : 'bg-gray-100 dark:bg-[#111] text-gray-500'}`}>
                      {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer id="contact" className="bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 relative z-10">
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
                  <li><Link href="/login" className="hover:text-[#FFD700]">Dashboard</Link></li>
                  <li><a href="#pricing" className="hover:text-[#FFD700]">Pricing</a></li>
                </ul>
              </div>
              <div id="legal">
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><Link href="/terms" className="hover:text-[#FFD700]">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="hover:text-[#FFD700]">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Connect</h4>
                <ul className="flex flex-col space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <li><a href="https://github.com/wallyjaytechh" target="_blank" className="hover:text-[#FFD700]">GitHub</a></li>
                  <li><a href="https://youtube.com/@wallyjaytechy" target="_blank" className="hover:text-[#FFD700]">YouTube</a></li>
                  <li><a href="https://tiktok.com/@wallyjaytech" target="_blank" className="hover:text-[#FFD700]">TikTok</a></li>
                  <li><a href="https://t.me/wallyjaytechs" target="_blank" className="hover:text-[#FFD700]">Telegram</a></li>
                  <li><a href="mailto:support@wallyjaytech-md.online" className="hover:text-[#FFD700]">Email Support</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <a href="https://github.com/wallyjaytechh" target="_blank" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><GithubIcon size={20} className="text-black dark:text-white" /></a>
            <a href="https://wa.me/2348144317152" target="_blank" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><WhatsappIcon size={20} className="text-[#25D366]" /></a>
            <a href="https://youtube.com/@wallyjaytechy" target="_blank" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><YoutubeIcon size={20} className="text-[#FF0000]" /></a>
            <a href="https://tiktok.com/@wallyjaytech" target="_blank" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><TiktokIcon size={20} className="text-black dark:text-white" /></a>
            <a href="https://t.me/wallyjaytechs" target="_blank" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><TelegramIcon size={20} className="text-[#0088cc]" /></a>
            <a href="mailto:support@wallyjaytech-md.online" className="p-2.5 bg-gray-50 dark:bg-[#111] rounded-full border border-gray-200 dark:border-gray-800 hover:scale-110 transition-transform shadow-sm"><GmailIcon size={20} className="text-[#EA4335]" /></a>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025-2026 WALLYJAYTECH-MD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 z-50 p-4 bg-[#FFD700] text-black rounded-full shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:bg-yellow-500 hover:scale-110 transition-all">
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
