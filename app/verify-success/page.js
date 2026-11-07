"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function VerifySuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false);

  useEffect(() => {
    // 1. Check if this browser already verified an account recently
    const hasVerified = localStorage.getItem("email_verified");
    
    if (hasVerified) {
      setIsAlreadyVerified(true);
    } else {
      // Set the flag so if they click the link again, it knows!
      localStorage.setItem("email_verified", "true");
    }

    // 2. Instantly sign them out of this specific tab
    const clearSession = async () => {
      await supabase.auth.signOut({ scope: 'local' });
      sessionStorage.clear();
      // Do NOT clear localStorage, we need the flag to stay!
    };
    clearSession();

    // 3. Start a 5-second countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/login?message=Account verified successfully! Please log in to proceed.");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-white dark:bg-[#0a0a0a] p-10 rounded-3xl border border-gray-200 dark:border-gray-800 w-full max-w-md shadow-2xl text-center"
      >
        {isAlreadyVerified ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="text-yellow-500" size={40} />
              </div>
            </div>
            <h1 className="text-2xl font-black text-black dark:text-white mb-2 tracking-tight">Already Verified</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              This email link was already used. Your account is active.
            </p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-500" size={40} />
              </div>
            </div>
            <h1 className="text-2xl font-black text-black dark:text-white mb-2 tracking-tight">Account Verified!</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Thank you for verifying your email. Your account is now active.
            </p>
          </>
        )}

        <div className="flex flex-col items-center gap-3 text-sm font-medium text-[#FFD700]">
          <Loader2 className="animate-spin" size={24} />
          <span>Redirecting to login in {countdown} seconds...</span>
        </div>
      </motion.div>
    </div>
  );
}
