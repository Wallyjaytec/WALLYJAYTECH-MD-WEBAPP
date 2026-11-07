"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";

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

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) setSuccess(message);
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error("Invalid email or password.");
      
      if (rememberMe) sessionStorage.setItem("remember_me", "true");
      else sessionStorage.setItem("remember_me", "false");
      sessionStorage.setItem("session_active", "true");
      
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      sessionStorage.setItem("oauth_flow", "true");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      sessionStorage.setItem("oauth_flow", "true");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDiscordLogin = async () => {
    try {
      sessionStorage.setItem("oauth_flow", "true");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return setError("Please enter your email to reset password.");
    await supabase.auth.signOut({ scope: 'local' });
    sessionStorage.clear();

    const { error } = await supabase.auth.resetPasswordForEmail(email, { 
      redirectTo: `${window.location.origin}/reset-password` 
    });
    
    if (error) setError(error.message);
    else setSuccess("If your email is registered, you will receive a password reset link. Please check your inbox and spam folder.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 py-10 font-sans transition-colors duration-300 relative overflow-x-hidden">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#0a0a0a] p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-2xl my-auto relative">
        <Link href="/" className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"><X size={20} /></Link>
        
        <Link href="/" className="flex justify-center mb-4">
          <img src="/assets/images/web_logo.png" alt="Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2 hover:scale-105 transition-transform" />
        </Link>
        
        <h1 className="text-2xl font-black text-black dark:text-white text-center mb-1 tracking-tight">WALLYJAYTECH-MD</h1>
        <p className="text-center text-[#FFD700] mb-8 text-xs font-mono tracking-widest uppercase">Login to your dashboard</p>
        
        {error && <div className="mb-4 p-3 border rounded-lg text-sm text-center bg-red-500/10 border-red-500/50 text-red-500">{error}</div>}
        {success && <div className="mb-4 p-3 border rounded-lg text-sm text-center bg-green-500/10 border-green-500/50 text-green-500">{success}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type="text" placeholder="Email or Username" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 pl-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 pl-10 pr-10 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-[#FFD700]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 accent-[#FFD700]" />
              Remember me
            </label>
            <button type="button" onClick={handleForgotPassword} className="text-[#FFD700] font-semibold hover:underline">Forgot password?</button>
          </div>

          <button type="submit" disabled={submitting} className={`w-full p-4 mt-2 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] ${submitting ? 'bg-gray-300 dark:bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-[#FFD700] text-black hover:bg-yellow-500'}`}>
            {submitting ? "PLEASE WAIT..." : "LOG IN"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-xs text-gray-400 font-medium uppercase">Or</span>
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-800"></div>
        </div>

        <div className="space-y-3">
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-bold text-sm">
            <GoogleIcon size={20} />
            Continue with Google
          </button>
          <button onClick={handleGithubLogin} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all font-bold text-sm">
            <GithubIcon size={20} className="text-black dark:text-white" />
            Continue with GitHub
          </button>
          <button onClick={handleDiscordLogin} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all font-bold text-sm shadow-[0_0_15px_rgba(88,101,242,0.3)]">
            <DiscordIcon size={20} />
            Continue with Discord
          </button>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/signup" className="text-sm text-gray-500 hover:text-[#FFD700] transition-colors">Don't have an account? Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="h-screen bg-white dark:bg-[#050505] text-[#FFD700] flex items-center justify-center font-bold animate-pulse">LOADING...</div>}>
      <LoginForm />
    </Suspense>
  );
}
