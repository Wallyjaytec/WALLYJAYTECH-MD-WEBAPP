"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, Shield, Settings, LogOut, Activity, Zap, CreditCard, 
  LayoutDashboard, Cpu, MessageSquare, ChevronRight, Mail, 
  User, Lock, Eye, EyeOff, Globe, Phone, X, ChevronDown,
  Users, Download, Power, RefreshCw, Key, Bell, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Play, Terminal, Menu, 
  CheckCircle, Clock, Send, BarChart3, Star, Crown, Sparkles
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
  { name: "Select Country", code: "", flag: "", phoneLength: 0 },
  { name: "Nigeria", code: "+234", flag: "🇳🇬", phoneLength: 10 },
  { name: "United States", code: "+1", flag: "🇺🇸", phoneLength: 10 },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧", phoneLength: 10 },
  { name: "Ghana", code: "+233", flag: "🇬🇭", phoneLength: 9 },
  { name: "South Africa", code: "+27", flag: "🇿🇦", phoneLength: 9 },
  { name: "Kenya", code: "+254", flag: "🇰🇪", phoneLength: 9 },
  { name: "Canada", code: "+1", flag: "🇨🇦", phoneLength: 10 },
  { name: "India", code: "+91", flag: "🇮🇳", phoneLength: 10 },
];

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [isLogin, setIsLogin] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [authError, setAuthError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [settings, setSettings] = useState({
    bot_connected: false,
    ai_enabled: false,
    antilink_enabled: false,
    autostatus_enabled: false,
    autorecord_enabled: false,
    plan_type: 'Free',
    first_name: '',
    last_name: '',
    username: '',
    phone: '',
    country: ''
  });

  // --- VALIDATION FUNCTIONS ---
  const validateUsername = (name) => /^[a-zA-Z]{5,}[0-9]*$/.test(name);
  const validateName = (name) => /^[a-zA-Z]+$/.test(name);
  const validateEmail = (email) => /^[a-zA-Z]{1,}[0-9]*@gmail\.com$/.test(email);
  const validatePhone = (number, len) => number.length === len;

  const validatePassword = (pass) => {
    return pass.length >= 8 && /[A-Z]/.test(pass) && /[a-z]/.test(pass) && /[0-9]/.test(pass) && /[!@#$%^&*(),.?":{}|<>_\-]/.test(pass);
  };

  const getPasswordErrorMessage = (pass) => {
    const errors = [];
    if (pass.length < 8) errors.push("8+ characters");
    if (!/[A-Z]/.test(pass)) errors.push("1 uppercase");
    if (!/[a-z]/.test(pass)) errors.push("1 lowercase");
    if (!/[0-9]/.test(pass)) errors.push("1 number");
    if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(pass)) errors.push("1 symbol (!@#$...)");
    return "Password must contain: " + errors.join(", ");
  };

  // --- SESSION VALIDATION + USER EXISTENCE CHECK ---
  useEffect(() => {
    const validateSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSession(null);
        setLoading(false);
        return;
      }

      // Verify the user still exists in user_settings table
      const { data: profile } = await supabase
        .from('user_settings')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      // If profile is missing, the user was deleted by admin → force logout
      if (!profile) {
        await supabase.auth.signOut({ scope: 'local' });
        sessionStorage.clear();
        localStorage.clear();
        setSession(null);
        setLoading(false);
        window.location.href = '/';
        return;
      }

      setSession(session);
      fetchSettings(session.user.id);
      setLoading(false);
    };

    validateSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        validateSession();
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- POLL EVERY 60s TO DETECT DELETED USERS ---
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(async () => {
      const { data: profile } = await supabase
        .from('user_settings')
        .select('user_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (!profile) {
        // User deleted mid-session → force logout immediately
        await supabase.auth.signOut({ scope: 'local' });
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/';
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [session]);

  const fetchSettings = async (userId) => {
    const { data } = await supabase.from('user_settings').select('*').eq('user_id', userId).single();
    if (data) setSettings(data);
  };

  const toggleFeature = async (feature) => {
    const newValue = !settings[feature];
    setSettings(prev => ({ ...prev, [feature]: newValue }));
    if(session?.user) await supabase.from('user_settings').update({ [feature]: newValue }).eq('user_id', session.user.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    sessionStorage.clear();
    router.push("/");
  };

  const handleForgotPassword = async () => {
    if (!email) return setAuthError("Please enter your email to reset password.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/dashboard` });
    if (error) setAuthError(error.message);
    else setAuthError("✅ Password reset link sent! Check your email.");
  };

  const checkAvailability = async () => {
    const { data: usernameData } = await supabase.from('user_settings').select('username').ilike('username', username).maybeSingle();
    if (usernameData) throw new Error("❌ This username is already taken. Please choose another.");

    const fullPhone = selectedCountry.code + phone;
    const { data: phoneData } = await supabase.from('user_settings').select('phone').eq('phone', fullPhone).maybeSingle();
    if (phoneData) throw new Error("❌ This phone number is already registered.");
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSubmitting(true);

    try {
      if (!isLogin) {
        if (!validateName(firstName)) throw new Error("First name must contain only letters.");
        if (!validateName(lastName)) throw new Error("Last name must contain only letters.");
        if (!validateUsername(username)) throw new Error("Username must be 5+ letters, followed by optional numbers.");
        if (!validateEmail(email)) throw new Error("Email must be a valid @gmail.com address.");
        if (!selectedCountry.code) throw new Error("Please select a country.");
        if (!validatePhone(phone, selectedCountry.phoneLength)) throw new Error(`Phone must be ${selectedCountry.phoneLength} digits for ${selectedCountry.name}.`);
        if (!validatePassword(password)) throw new Error(getPasswordErrorMessage(password));
        if (password !== confirmPassword) throw new Error("Passwords do not match.");
        if (!agreedToTerms) throw new Error("You must agree to the Terms of Service and Privacy Policy.");

        await checkAvailability();

        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password, 
          options: { 
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { username }
          }
        });
        
        if (error) throw new Error(error.message);
        if (!data.user) throw new Error("Signup failed. Please try again.");
        if (data.user.identities && data.user.identities.length === 0) {
          throw new Error("❌ This email is already registered. Please log in instead.");
        }

        // Insert profile row
        const { error: insertError } = await supabase.from('user_settings').insert({
          user_id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          username: username,
          phone: selectedCountry.code + phone,
          country: selectedCountry.name
        });

        if (insertError) {
          console.error("Profile save error:", insertError);
          if (insertError.message.includes("row-level security")) {
            throw new Error("Profile save blocked by security policy. Please try again or contact support.");
          }
          if (insertError.message.includes("duplicate key")) {
            throw new Error("❌ This username or phone was just registered by someone else. Please try again.");
          }
          throw new Error("Account created but profile save failed: " + insertError.message);
        }

        setAuthError("✅ Verify your email to activate your account. Check your inbox, then log in.");
        setIsLogin(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        
        if (rememberMe) sessionStorage.setItem("remember_me", "true");
        else sessionStorage.setItem("remember_me", "false");
        sessionStorage.setItem("session_active", "true");
      }
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="h-screen bg-white dark:bg-[#050505] text-[#FFD700] flex items-center justify-center font-bold animate-pulse">LOADING...</div>;

  // ==========================================
  // 1. AUTH SCREEN (Login/Signup)
  // ==========================================
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 py-10 font-sans transition-colors duration-300 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-2xl my-auto relative">
          <Link href="/" className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"><X size={20} /></Link>
          
          <Link href="/" className="flex justify-center mb-4">
            <img src="/assets/images/web_logo.png" alt="Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2 hover:scale-105 transition-transform" />
          </Link>
          
          <h1 className="text-2xl font-black text-black dark:text-white text-center mb-1 tracking-tight">WALLYJAYTECH-MD</h1>
          <p className="text-center text-[#FFD700] mb-8 text-xs font-mono tracking-widest uppercase">{isLogin ? "Login to your dashboard" : "Create your dashboard"}</p>
          
          {authError && <div className={`mb-4 p-3 border rounded-lg text-sm text-center ${authError.startsWith("✅") ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>{authError}</div>}

          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div className="flex gap-3">
                  <div className="relative w-1/2">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                  </div>
                  <div className="relative w-1/2">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                  </div>
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <select value={selectedCountry.name} onChange={(e) => { const c = countries.find(x => x.name === e.target.value); if(c) setSelectedCountry(c); }} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none appearance-none cursor-pointer">
                    {countries.map((c, i) => (<option key={i} value={c.name}>{c.flag} {c.name}</option>))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
                </div>
                <div className="relative flex items-center rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 focus-within:border-[#FFD700] transition-colors">
                  <div className="pl-4 pr-2 text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
                    <Phone size={18} />
                    {selectedCountry.code && <span className="ml-1">{selectedCountry.code}</span>}
                  </div>
                  <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full p-3 bg-transparent text-black dark:text-white outline-none" />
                </div>
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 accent-[#FFD700]" />
                  Remember me
                </label>
                <button type="button" onClick={handleForgotPassword} className="text-[#FFD700] font-semibold hover:underline">Forgot password?</button>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-1 accent-[#FFD700]" />
                <label className="text-gray-600 dark:text-gray-400">
                  I agree to the <Link href="/terms" className="text-[#FFD700] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#FFD700] hover:underline">Privacy Policy</Link>
                </label>
              </div>
            )}

            <button type="submit" disabled={(!isLogin && !agreedToTerms) || submitting} className={`w-full p-4 mt-2 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] ${(!isLogin && !agreedToTerms) || submitting ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#FFD700] text-black hover:bg-yellow-500'}`}>
              {submitting ? "PLEASE WAIT..." : (isLogin ? "LOG IN" : "CREATE ACCOUNT")}
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
            <button onClick={() => { setIsLogin(!isLogin); setAuthError(""); }} className="text-sm text-gray-500 hover:text-[#FFD700] transition-colors">{isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // 2. PROFESSIONAL DASHBOARD
  // ==========================================
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#050505] text-black dark:text-white overflow-hidden font-sans">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 z-50 flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/assets/images/web_logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-black p-0.5" />
          <span className="font-black text-lg">WALLYJAY</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            <motion.aside initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }} transition={{ type: "tween" }} className="md:hidden fixed top-0 right-0 h-full w-80 bg-white dark:bg-[#0a0a0a] z-50 border-l border-gray-200 dark:border-gray-800 flex flex-col shadow-2xl">
              
              <div className="p-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <img src="/assets/images/web_logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-black p-1" />
                  <div>
                    <h1 className="font-black text-base">WALLYJAYTECH</h1>
                    <p className="text-[10px] text-[#FFD700] tracking-widest font-mono">SAAS DASHBOARD</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"><X size={20} /></button>
              </div>

              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#111]">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-black">
                    {(settings.first_name?.[0] || 'W').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{settings.first_name || 'User'} {settings.last_name || ''}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-[#FFD700] text-black px-2 py-1 rounded-full">
                    {settings.plan_type === 'Premium' ? 'PRO' : 'FREE'}
                  </span>
                </div>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</p>
                <MobileNavItem icon={<LayoutDashboard size={18}/>} label="Overview" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }} />
                <MobileNavItem icon={<Bot size={18}/>} label="AI Settings" active={activeTab === 'ai'} onClick={() => { setActiveTab('ai'); setIsMobileMenuOpen(false); }} />
                <MobileNavItem icon={<Users size={18}/>} label="Group Management" active={activeTab === 'groups'} onClick={() => { setActiveTab('groups'); setIsMobileMenuOpen(false); }} />
                <MobileNavItem icon={<Download size={18}/>} label="Downloader" active={activeTab === 'downloads'} onClick={() => { setActiveTab('downloads'); setIsMobileMenuOpen(false); }} />
                <MobileNavItem icon={<Settings size={18}/>} label="Bot Controls" active={activeTab === 'controls'} onClick={() => { setActiveTab('controls'); setIsMobileMenuOpen(false); }} />
                
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Account</p>
                <MobileNavItem icon={<CreditCard size={18}/>} label="Billing" active={activeTab === 'billing'} onClick={() => { setActiveTab('billing'); setIsMobileMenuOpen(false); }} />
                <MobileNavItem icon={<User size={18}/>} label="Profile" active={activeTab === 'profile'} onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }} />
              </nav>

              <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <Link href="/deploy" className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[#FFD700] text-black font-bold shadow-lg">
                  <Bot size={18} /> Deploy New Bot
                </Link>
                <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm">
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="w-72 bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-gray-800 flex-col hidden md:flex">
        
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src="/assets/images/web_logo.png" alt="Logo" className="w-10 h-10 rounded-xl object-contain bg-black p-1" />
            <div>
              <h1 className="font-black text-base tracking-tight">WALLYJAYTECH</h1>
              <p className="text-[10px] text-[#FFD700] tracking-widest font-mono">SAAS DASHBOARD</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#111]">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-black">
              {(settings.first_name?.[0] || 'W').toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate">{settings.first_name || 'User'} {settings.last_name || ''}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Link href="/deploy" className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[#FFD700] text-black font-bold shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105 transition-all">
            <Bot size={18} /> Deploy New Bot
          </Link>
        </div>

        <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</p>
          <SidebarItem icon={<LayoutDashboard size={18}/>} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={<Bot size={18}/>} label="AI Settings" active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} />
          <SidebarItem icon={<Users size={18}/>} label="Group Management" active={activeTab === 'groups'} onClick={() => setActiveTab('groups')} />
          <SidebarItem icon={<Download size={18}/>} label="Downloader" active={activeTab === 'downloads'} onClick={() => setActiveTab('downloads')} />
          <SidebarItem icon={<Settings size={18}/>} label="Bot Controls" active={activeTab === 'controls'} onClick={() => setActiveTab('controls')} />
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Account</p>
          <SidebarItem icon={<CreditCard size={18}/>} label="Billing" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
          <SidebarItem icon={<User size={18}/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFD700] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="p-4 md:p-8 relative z-10 max-w-7xl mx-auto">
          
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl md:text-3xl font-black capitalize">
                  {activeTab === 'dashboard' ? 'Overview' : activeTab}
                </h2>
                <span className="text-[10px] font-bold bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-full uppercase">
                  {settings.plan_type}
                </span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Welcome back, {settings.first_name || session.user.email.split('@')[0]} 👋</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-[#111] px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                <span className={`w-2 h-2 rounded-full ${settings.bot_connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-xs font-bold">{settings.bot_connected ? 'BOT ONLINE' : 'BOT OFFLINE'}</span>
              </div>
              <button className="p-2 rounded-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors">
                <Bell size={18} />
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'dashboard' && (
              <motion.div key="dash" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                
                {/* Welcome Banner */}
                <div className="relative bg-gradient-to-br from-black via-gray-900 to-black dark:from-[#111] dark:via-[#0a0a0a] dark:to-[#111] rounded-3xl p-6 md:p-8 overflow-hidden border border-gray-800 shadow-2xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700] opacity-20 blur-[100px] rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD700] opacity-10 blur-[80px] rounded-full"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="text-[#FFD700]" size={20} />
                        <span className="text-[#FFD700] text-xs font-bold tracking-wider uppercase">System Status</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                        {settings.bot_connected ? 'Your Bot is Online 🚀' : 'Bot is Offline'}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base max-w-lg">
                        {settings.bot_connected 
                          ? 'Everything is running smoothly. Manage features and monitor activity in real-time.'
                          : 'Your bot is currently disconnected. Connect it from the Deploy page.'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button className="bg-[#FFD700] text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-all text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                        <RefreshCw size={16} /> Restart Bot
                      </button>
                      <button className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-all text-sm flex items-center justify-center gap-2 border border-white/20 backdrop-blur-sm">
                        <Terminal size={16} /> View Logs
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Messages Handled" value="14,203" change="+12%" trend="up" icon={<MessageSquare size={22}/>} color="yellow" />
                  <StatCard title="Active Groups" value="32" change="+5%" trend="up" icon={<Users size={22}/>} color="blue" />
                  <StatCard title="Commands Used" value="3,120" change="-2%" trend="down" icon={<Zap size={22}/>} color="purple" />
                  <StatCard title="Server Uptime" value="99.9%" change="Stable" trend="neutral" icon={<Activity size={22}/>} color="green" />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-bold">Message Activity</h3>
                        <p className="text-xs text-gray-500">Last 7 days performance</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#FFD700] text-black">Week</button>
                        <button className="text-xs font-bold px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]">Month</button>
                      </div>
                    </div>
                    <div className="flex items-end justify-between h-56 gap-3">
                      {[{ day: 'Mon', val: 40 },{ day: 'Tue', val: 65 },{ day: 'Wed', val: 45 },{ day: 'Thu', val: 85 },{ day: 'Fri', val: 60 },{ day: 'Sat', val: 90 },{ day: 'Sun', val: 75 }].map((item, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gray-100 dark:bg-[#1a1a1a] rounded-t-lg relative h-full flex items-end overflow-hidden">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${item.val}%` }} transition={{ duration: 1, delay: i * 0.1 }} className="w-full bg-gradient-to-t from-[#FFD700] to-yellow-400 rounded-t-lg" />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Recent Activity</h3>
                      <button className="text-xs text-[#FFD700] font-bold hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      <ActivityItem icon={<Bot size={16} className="text-[#FFD700]" />} text="AI replied to John" time="2m" />
                      <ActivityItem icon={<Download size={16} className="text-blue-500" />} text="Downloaded YouTube Video" time="15m" />
                      <ActivityItem icon={<Shield size={16} className="text-red-500" />} text="Blocked link in Group" time="1h" />
                      <ActivityItem icon={<User size={16} className="text-green-500" />} text="New member joined" time="2h" />
                      <ActivityItem icon={<Star size={16} className="text-purple-500" />} text="Sticker created" time="3h" />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <QuickAction icon={<Bot size={22} />} label="AI Chat" onClick={() => setActiveTab('ai')} />
                    <QuickAction icon={<Users size={22} />} label="Groups" onClick={() => setActiveTab('groups')} />
                    <QuickAction icon={<Download size={22} />} label="Downloader" onClick={() => setActiveTab('downloads')} />
                    <QuickAction icon={<Settings size={22} />} label="Controls" onClick={() => setActiveTab('controls')} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI SETTINGS */}
            {activeTab === 'ai' && (
              <motion.div key="ai" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureToggle title="Enable AI Chat" desc="Allow the bot to reply using GPT/Gemini." isOn={settings.ai_enabled} onToggle={() => toggleFeature('ai_enabled')} />
                  <FeatureToggle title="Smart Context Memory" desc="The AI remembers previous messages in the chat." isOn={true} onToggle={() => {}} />
                </div>
                <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
                  <h3 className="font-bold text-lg mb-2">Custom AI Persona</h3>
                  <p className="text-sm text-gray-500 mb-3">Tell the AI how to behave</p>
                  <textarea placeholder="You are a helpful assistant for WALLYJAYTECH-MD..." className="w-full h-32 p-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none resize-none"></textarea>
                </div>
              </motion.div>
            )}

            {/* GROUPS */}
            {activeTab === 'groups' && (
              <motion.div key="groups" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureToggle title="Antilink Protection" desc="Delete messages with links from non-admins." isOn={settings.antilink_enabled} onToggle={() => toggleFeature('antilink_enabled')} />
                  <FeatureToggle title="Antibadword" desc="Delete messages with bad words." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Welcome Messages" desc="Send a welcome message when new users join." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Anti-Delete" desc="Reveal deleted messages in the group." isOn={true} onToggle={() => {}} />
                </div>
              </motion.div>
            )}

            {/* DOWNLOADS */}
            {activeTab === 'downloads' && (
              <motion.div key="downloads" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureToggle title="YouTube Downloader" desc="Allow users to download YouTube videos and audio." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="TikTok Downloader" desc="Allow users to download TikTok videos." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Instagram Downloader" desc="Allow users to download Instagram reels." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Spotify Downloader" desc="Allow users to search and download songs." isOn={true} onToggle={() => {}} />
                </div>
              </motion.div>
            )}

            {/* CONTROLS */}
            {activeTab === 'controls' && (
              <motion.div key="controls" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureToggle title="Auto-Read Messages" desc="Mark messages as read automatically." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Auto-Typing" desc="Show 'typing...' while processing." isOn={true} onToggle={() => {}} />
                  <FeatureToggle title="Auto-Status View" desc="Automatically view and like statuses." isOn={settings.autostatus_enabled} onToggle={() => toggleFeature('autostatus_enabled')} />
                  <FeatureToggle title="Auto-Record Voice Notes" desc="Show 'recording audio...' status." isOn={settings.autorecord_enabled} onToggle={() => toggleFeature('autorecord_enabled')} />
                </div>
              </motion.div>
            )}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <motion.div key="prof" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="max-w-2xl">
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center text-black font-black text-3xl">
                      {(settings.first_name?.[0] || 'W').toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{settings.first_name || 'User'} {settings.last_name || ''}</h3>
                      <p className="text-sm text-gray-500">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField label="Username" value={settings.username || 'N/A'} />
                    <ProfileField label="Phone" value={settings.phone || 'N/A'} />
                    <ProfileField label="Country" value={settings.country || 'N/A'} />
                    <ProfileField label="Plan" value={settings.plan_type || 'Free'} />
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                    <button className="flex items-center gap-2 text-sm font-bold text-[#FFD700] hover:underline">
                      <Lock size={16}/> Change Password
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BILLING */}
            {activeTab === 'billing' && (
              <motion.div key="bill" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl text-center max-w-2xl mx-auto">
                  <div className="w-16 h-16 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown className="text-[#FFD700]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                  <p className="text-gray-500 mb-6">Unlock unlimited commands, priority support, and more.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-500">Current Plan</p>
                      <p className="font-bold text-lg">{settings.plan_type}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-500">Billing Cycle</p>
                      <p className="font-bold text-lg">Monthly</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-500">Next Payment</p>
                      <p className="font-bold text-lg">—</p>
                    </div>
                  </div>
                  <button className="bg-[#FFD700] text-black font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 transition-all shadow-lg">
                    Upgrade Now
                  </button>
                </div>
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
    <button onClick={onClick} className={`flex items-center justify-between w-full p-3 rounded-xl transition-all text-sm ${active ? "bg-[#FFD700] text-black font-bold shadow-[0_0_15px_rgba(255,215,0,0.3)]" : "hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"}`}>
      <div className="flex items-center gap-3">{icon} <span>{label}</span></div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}

function MobileNavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-between w-full p-3 rounded-xl transition-all text-sm ${active ? "bg-[#FFD700] text-black font-bold" : "hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400"}`}>
      <div className="flex items-center gap-3">{icon} <span>{label}</span></div>
      {active && <ChevronRight size={14} />}
    </button>
  );
}

function StatCard({ title, value, change, trend, icon, color }) {
  const colorMap = {
    yellow: 'bg-[#FFD700]/10 text-[#FFD700]',
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    green: 'bg-green-500/10 text-green-500'
  };
  return (
    <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl hover:border-[#FFD700]/50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>{icon}</div>
        <span className={`text-xs font-bold flex items-center gap-1 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
          {trend === 'up' && <TrendingUp size={12}/>}
          {trend === 'down' && <ArrowDownRight size={12}/>}
          {change}
        </span>
      </div>
      <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{title}</h3>
      <p className="text-2xl font-black mt-1">{value}</p>
    </div>
  );
}

function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="p-1.5 bg-white dark:bg-black rounded-lg shadow-sm">{icon}</div>
        <span className="text-xs font-semibold truncate">{text}</span>
      </div>
      <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{time}</span>
    </div>
  );
}

function QuickAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:border-[#FFD700] hover:bg-[#FFD700]/5 transition-all group">
      <div className="text-gray-600 dark:text-gray-400 group-hover:text-[#FFD700] transition-colors">{icon}</div>
      <span className="text-xs font-bold group-hover:text-[#FFD700] transition-colors">{label}</span>
    </button>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">{label}</label>
      <p className="font-bold text-sm mt-1 truncate">{value}</p>
    </div>
  );
}

function FeatureToggle({ title, desc, isOn, onToggle }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${isOn ? 'border-[#FFD700] bg-[#FFD700]/5' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]'}`}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base ${isOn ? 'text-[#FFD700]' : 'text-black dark:text-white'}`}>{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
        <button onClick={onToggle} className={`w-12 h-7 rounded-full p-1 transition-colors flex flex-shrink-0 ${isOn ? 'bg-[#FFD700] justify-end shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'bg-gray-300 dark:bg-gray-700 justify-start'}`}>
          <motion.div layout className="w-5 h-5 rounded-full bg-white dark:bg-black shadow-md" />
        </button>
      </div>
    </div>
  );
}
