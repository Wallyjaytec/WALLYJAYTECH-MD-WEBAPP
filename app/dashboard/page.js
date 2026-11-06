"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Shield, Settings, LogOut, Activity, Zap, CreditCard, 
  LayoutDashboard, Cpu, MessageSquare, ChevronRight, Mail, 
  User, Lock, Eye, EyeOff, Globe, Phone, X
} from "lucide-react";

// --- SVG GOOGLE ICON ---
const GoogleIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" className={className}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const countries = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
];

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Auth State
  const [isLogin, setIsLogin] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [authError, setAuthError] = useState("");
  
  // Bot Settings State
  const [settings, setSettings] = useState({
    bot_connected: false,
    ai_enabled: false,
    antilink_enabled: false,
    autostatus_enabled: false,
    autorecord_enabled: false,
    plan_type: 'Free',
    first_name: '',
    last_name: ''
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchSettings(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchSettings(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSettings = async (userId) => {
    const { data, error } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();
    if (data) setSettings(data);
  };

  const toggleFeature = async (feature) => {
    const newValue = !settings[feature];
    setSettings(prev => ({ ...prev, [feature]: newValue }));
    await supabase.from('user_settings').update({ [feature]: newValue }).eq('user_id', session.user.id);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!isLogin) {
      if (password !== confirmPassword) {
        setAuthError("Passwords do not match.");
        return;
      }
      
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) { setAuthError(error.message); return; }

      if (data.user) {
        await supabase.from('user_settings').insert([{
          user_id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          phone: selectedCountry.code + phone,
          country: selectedCountry.name
        }]);
        setAuthError("Success! Check your email to confirm your account, then Log in.");
        setIsLogin(true);
      }
    } else {
      // Supabase login only supports email by default. 
      // If user entered a username, we would need to look up their email first. 
      // For simplicity, we are assuming they enter their email to log in.
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setAuthError(error.message);
    }
  };

  if (loading) return <div className="h-screen bg-white dark:bg-[#050505] text-[#FFD700] flex items-center justify-center font-bold animate-pulse">LOADING...</div>;

  // ==========================================
  // 1. AUTH SCREEN (Sign Up / Login)
  // ==========================================
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 py-10 font-sans transition-colors duration-300 relative">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-2xl my-auto relative"
        >
          <Link 
            href="/" 
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <X size={20} />
          </Link>

          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/web_logo.png" 
              alt="Logo" 
              className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2"
            />
          </div>
          <h1 className="text-2xl font-black text-black dark:text-white text-center mb-1 tracking-tight">WALLYJAYTECH-MD</h1>
          <p className="text-center text-[#FFD700] mb-8 text-xs font-mono tracking-widest uppercase">
            {isLogin ? "Login to your dashboard" : "Create your dashboard"}
          </p>
          
          {authError && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg text-center">{authError}</div>}

          <form onSubmit={handleAuth} className="space-y-4">
            
            {!isLogin && (
              <div className="flex gap-3">
                <div className="relative w-1/2">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required
                    className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                </div>
                <div className="relative w-1/2">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required
                    className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type={isLogin ? "text" : "email"} 
                placeholder={isLogin ? "Email or Username" : "Email Address"} 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
                className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" 
              />
            </div>

            {!isLogin && (
              <>
                <div className="flex gap-3">
                  <div className="relative w-1/2">
                    <Globe className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <select 
                      value={selectedCountry.name}
                      onChange={(e) => {
                        const country = countries.find(c => c.name === e.target.value);
                        if (country) setSelectedCountry(country);
                      }}
                      className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none appearance-none cursor-pointer"
                    >
                      {countries.map((c, i) => (
                        <option key={i} value={c.name}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative w-1/2">
                    <input 
                      type="text" 
                      value={selectedCountry.code} 
                      readOnly 
                      className="w-full p-3 pl-3 rounded-xl bg-gray-200 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required
                    className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                </div>
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required
                className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Confirm Password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)} 
                  required
                  className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            <button type="submit" className="w-full p-4 mt-2 rounded-xl bg-[#FFD700] text-black font-black hover:bg-yellow-500 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)]">
              {isLogin ? "LOG IN" : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
            <span className="text-xs text-gray-400 font-medium uppercase">Or</span>
            <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-bold text-sm">
            <GoogleIcon size={20} />
            {isLogin ? "Log in with Google" : "Sign up with Google"}
          </button>
          
          <div className="mt-8 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setAuthError(""); }} className="text-sm text-gray-500 hover:text-[#FFD700] transition-colors">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN DASHBOARD
  // ==========================================
  return (
    <div className="flex h-screen bg-white dark:bg-[#050505] text-black dark:text-white overflow-hidden font-sans transition-colors duration-300">
      
      <aside className="w-64 bg-gray-50 dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800 flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          <img src="/assets/images/web_logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-black p-1" />
          <div>
            <h1 className="font-black text-lg">WALLYJAY</h1>
            <p className="text-[10px] text-[#FFD700] tracking-widest font-mono">TECH-MD</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Cpu size={20}/>} label="Bot Features" active={activeTab === 'features'} onClick={() => setActiveTab('features')} />
          <SidebarItem icon={<CreditCard size={20}/>} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
          <SidebarItem icon={<Settings size={20}/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={() => supabase.auth.signOut()} className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FFD700] opacity-5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="p-6 md:p-10 relative z-10">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back, {settings.first_name || session.user.email.split('@')[0]}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-[#111] px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800">
               <span className={`w-2 h-2 rounded-full ${settings.bot_connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
               <span className="text-xs font-mono">{settings.bot_connected ? 'BOT ONLINE' : 'BOT OFFLINE'}</span>
            </div>
          </header>

          <AnimatePresence mode="wait">
            
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <StatCard title="Current Plan" value={settings.plan_type} icon={<Zap className="text-[#FFD700]"/>} />
                  <StatCard title="Server Status" value={settings.bot_connected ? "Online" : "Offline"} icon={<Activity className={settings.bot_connected ? "text-green-500" : "text-red-500"}/>} />
                  <StatCard title="Commands Run" value="0" icon={<MessageSquare className="text-[#FFD700]"/>} />
                </div>

                <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold mb-4">Quick Start</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg">Your bot dashboard is ready. Go to the <b>Bot Features</b> tab to turn on AI, Antilink, and Autostatus.</p>
                  <button onClick={() => setActiveTab('features')} className="bg-[#FFD700] text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                    Manage Features
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div key="feat" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FeatureToggle title="AI Chat" desc="Auto-reply using GPT/Gemini" isOn={settings.ai_enabled} onToggle={() => toggleFeature('ai_enabled')} />
                  <FeatureToggle title="Antilink Protection" desc="Delete links in groups" isOn={settings.antilink_enabled} onToggle={() => toggleFeature('antilink_enabled')} />
                  <FeatureToggle title="Autostatus" desc="Auto-view & react to statuses" isOn={settings.autostatus_enabled} onToggle={() => toggleFeature('autostatus_enabled')} />
                  <FeatureToggle title="AutoRecord" desc="Show recording while typing" isOn={settings.autorecord_enabled} onToggle={() => toggleFeature('autorecord_enabled')} />
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div key="prof" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl max-w-2xl">
                  <h3 className="text-xl font-bold mb-6">My Profile</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">First Name</label>
                        <p className="font-bold text-lg mt-1">{settings.first_name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Last Name</label>
                        <p className="font-bold text-lg mt-1">{settings.last_name || 'N/A'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-bold text-lg mt-1">{session.user.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div key="bill" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="text-center py-20">
                <CreditCard size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                <p className="text-gray-500 mb-8">Connect Stripe or Flutterwave here to accept payments.</p>
                <button className="bg-[#FFD700] text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all">
                  Setup Payment Gateway
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// COMPONENTS
// ==========================================

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between w-full p-3 rounded-xl transition-all ${active ? "bg-[#FFD700] text-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.4)]" : "hover:bg-gray-200 dark:hover:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`}>
      <div className="flex items-center gap-3">
        {icon} <span>{label}</span>
      </div>
      {active && <ChevronRight size={16} />}
    </button>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl flex flex-col hover:border-[#FFD700]/50 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white dark:bg-black rounded-xl">{icon}</div>
      </div>
      <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
      <p className="text-3xl font-black mt-1">{value}</p>
    </div>
  );
}

function FeatureToggle({ title, desc, isOn, onToggle }) {
  return (
    <div className={`p-6 rounded-2xl border transition-all ${isOn ? 'border-[#FFD700] bg-[#FFD700]/5' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a]'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold text-lg ${isOn ? 'text-[#FFD700]' : 'text-black dark:text-white'}`}>{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
        <button 
          onClick={onToggle}
          className={`w-14 h-8 rounded-full p-1 transition-colors flex ${isOn ? 'bg-[#FFD700] justify-end shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}
        >
          <motion.div layout className="w-6 h-6 rounded-full bg-white dark:bg-black shadow-md" />
        </button>
      </div>
    </div>
  );
}
