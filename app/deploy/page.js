"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle, Zap, Shield, Crown, ArrowRight, 
  ArrowLeft, Phone, Bot, Sparkles 
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    icon: <Zap className="text-gray-400" size={32} />,
    features: ["Basic Commands", "1 Group Limit", "Standard Support", "Ad-Supported"],
    color: "border-gray-200 dark:border-gray-800",
    button: "bg-gray-100 dark:bg-[#1a1a1a] text-black dark:text-white",
    popular: false
  },
  {
    name: "Premium",
    price: "$5",
    period: "per month",
    icon: <Crown className="text-[#FFD700]" size={32} />,
    features: ["3000+ Commands", "Unlimited Groups", "AI Features (GPT/Gemini)", "Priority Support", "No Ads"],
    color: "border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.15)]",
    button: "bg-[#FFD700] text-black",
    popular: true
  },
  {
    name: "Pro",
    price: "$15",
    period: "per month",
    icon: <Shield className="text-blue-500" size={32} />,
    features: ["Everything in Premium", "5 Bot Instances", "Custom Branding", "24/7 Dedicated Support", "API Access"],
    color: "border-gray-200 dark:border-gray-800",
    button: "bg-blue-500 text-white",
    popular: false
  }
];

export default function DeployPage() {
  const [step, setStep] = useState(1); // 1 = Plans, 2 = Phone Number, 3 = Success
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleDeployClick = (plan) => {
    setSelectedPlan(plan);
    setStep(2);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) return alert("Please enter a valid phone number.");
    // Here we would normally send the API request to Pterodactyl to create the bot.
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white font-sans transition-colors duration-300 flex flex-col">
      
      {/* HEADER */}
      <nav className="w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 py-4 px-6 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors font-semibold">
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2">
            <img src="/assets/images/web_logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-black text-lg">Deploy New Bot</span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex items-center justify-center p-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FFD700] opacity-5 blur-[150px] rounded-full pointer-events-none"></div>

        {/* STEP 1: CHOOSE PLAN */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black mb-4">Choose Your Plan</h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg">Deploy your bot in seconds. Upgrade anytime.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <div key={i} className={`relative bg-white dark:bg-[#0a0a0a] rounded-3xl border-2 ${plan.color} p-8 flex flex-col transition-all hover:-translate-y-2`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">{plan.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-gray-500 font-medium">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                        <CheckCircle size={18} className="text-[#FFD700] shrink-0" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleDeployClick(plan)} className={`w-full py-4 rounded-xl font-bold transition-all ${plan.button} hover:opacity-90`}>
                    Deploy {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: ENTER PHONE NUMBER */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#FFD700]/10 text-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} />
              </div>
              <h2 className="text-2xl font-black mb-2">Link Your WhatsApp</h2>
              <p className="text-gray-500 text-sm">You selected the <b className="text-[#FFD700]">{selectedPlan?.name}</b> plan.</p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-500 mb-2 block">WhatsApp Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g., 2348144317152" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-4 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none text-lg font-mono"
                />
                <p className="text-xs text-gray-400 mt-2">Include your country code but no spaces or symbols.</p>
              </div>
              <button type="submit" className="w-full py-4 mt-4 rounded-xl bg-[#FFD700] text-black font-black hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2">
                Continue to Payment <ArrowRight size={20} />
              </button>
            </form>

            <button onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-500 hover:text-black dark:hover:text-white mt-6 transition-colors">
              ← Change Plan
            </button>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS (MOCKUP) */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-black mb-2">Deployment Started!</h2>
            <p className="text-gray-500 mb-8">Your bot is being created. We will send the pairing code to your WhatsApp shortly.</p>
            
            <div className="p-4 bg-gray-50 dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-2">Pairing Code</p>
              <p className="text-4xl font-mono font-black tracking-widest text-[#FFD700] animate-pulse">----</p>
            </div>

            <Link href="/dashboard" className="block w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold hover:opacity-80 transition-all">
              Return to Dashboard
            </Link>
          </motion.div>
        )}

      </main>
    </div>
  );
}
