"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { 
  Mail, User, Lock, Eye, EyeOff, Phone, X, ChevronDown 
} from "lucide-react";

const GoogleIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" className={className}>
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const DiscordIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 127.14 96.36" fill="currentColor" className={className}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-18.24-72.12ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
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

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const checkAvailability = async () => {
    const { data: usernameData } = await supabase.from('user_settings').select('username').ilike('username', username).maybeSingle();
    if (usernameData) throw new Error("This username is already taken. Please choose another.");

    const fullPhone = selectedCountry.code + phone;
    const { data: phoneData } = await supabase.from('user_settings').select('phone').eq('phone', fullPhone).maybeSingle();
    if (phoneData) throw new Error("This phone number is already registered.");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
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
          // UPDATED: Points to the new success page
          emailRedirectTo: `${window.location.origin}/verify-success`,
          data: { username }
        }
      });
      
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("Signup failed. Please try again.");
      if (data.user.identities && data.user.identities.length === 0) {
        throw new Error("This email is already registered. Please log in instead.");
      }

      const { error: insertError } = await supabase.from('user_settings').insert({
        user_id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        username: username,
        phone: selectedCountry.code + phone,
        country: selectedCountry.name
      });

      if (insertError) {
        if (insertError.message.includes("row-level security")) {
          throw new Error("Profile save blocked by security policy. Please try again or contact support.");
        }
        if (insertError.message.includes("duplicate key")) {
          throw new Error("This username or phone was just registered by someone else. Please try again.");
        }
        throw new Error("Account created but profile save failed: " + insertError.message);
      }

      router.push("/login?message=Verify your email to activate your account. Check your inbox, then log in.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDiscordSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 py-10 font-sans transition-colors duration-300 relative overflow-x-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-2xl my-auto relative">
        <Link href="/" className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"><X size={20} /></Link>
        
        <Link href="/" className="flex justify-center mb-4">
          <img src="/assets/images/web_logo.png" alt="Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2 hover:scale-105 transition-transform" />
        </Link>
        
        <h1 className="text-2xl font-black text-black dark:text-white text-center mb-1 tracking-tight">WALLYJAYTECH-MD</h1>
        <p className="text-center text-[#FFD700] mb-8 text-xs font-mono tracking-widest uppercase">Create your dashboard</p>
        
        {error && <div className="mb-4 p-3 border rounded-lg text-sm text-center bg-red-500/10 border-red-500/50 text-red-500">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
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

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
          </div>

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

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]">{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="w-4 h-4 mt-1 accent-[#FFD700]" />
            <label className="text-gray-600 dark:text-gray-400">
              I agree to the <Link href="/terms" className="text-[#FFD700] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#FFD700] hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" disabled={!agreedToTerms || submitting} className={`w-full p-4 mt-2 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] ${!agreedToTerms || submitting ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#FFD700] text-black hover:bg-yellow-500'}`}>
            {submitting ? "PLEASE WAIT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-xs text-gray-400 font-medium uppercase">Or</span>
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <div className="space-y-3">
          <button onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-bold text-sm">
            <GoogleIcon size={20} />
            Continue with Google
          </button>
          <button onClick={handleGithubSignup} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-bold text-sm">
            <GithubIcon size={20} className="text-black dark:text-white" />
            Continue with GitHub
          </button>
          <button onClick={handleDiscordSignup} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold text-sm shadow-[0_0_15px_rgba(88,101,242,0.3)]">
            <DiscordIcon size={20} />
            Continue with Discord
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:text-[#FFD700] transition-colors">Already have an account? Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}
