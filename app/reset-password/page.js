'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const checkToken = async () => {
      // 1. Supabase puts the secure token in the URL hash (#access_token=...)
      // We extract it manually so the user is NOT auto-logged in globally.
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const errorDescription = params.get('error_description');

      if (errorDescription) {
        if (mounted) {
          setIsExpired(true);
          setLoading(false);
        }
        return;
      }

      if (accessToken) {
        // 2. Manually set the session JUST for this page
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          if (mounted) setIsExpired(true);
        } else {
          // 3. Check if the link is older than 30 minutes
          const linkCreatedAt = new Date(data.session.user.updated_at || data.session.user.created_at).getTime();
          const now = new Date().getTime();
          const minutesSinceCreation = (now - linkCreatedAt) / 1000 / 60;

          if (minutesSinceCreation > 30) {
            if (mounted) setIsExpired(true);
          } else {
            if (mounted) setIsExpired(false);
          }
        }
      } else {
        // No token in URL. Check if they already have a valid session (e.g. refreshed page)
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          if (mounted) setIsExpired(true);
        } else {
          if (mounted) setIsExpired(false);
        }
      }
      if (mounted) setLoading(false);
    };

    checkToken();

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
      
      // Log out of ALL devices immediately. This kicks the original Chrome tab out!
      await supabase.auth.signOut({ scope: 'global' }); 
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white dark:bg-[#050505] text-[#FFD700] flex items-center justify-center font-bold animate-pulse">VERIFYING LINK...</div>;
  }

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 font-sans">
        <div className="max-w-md w-full bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800 text-center">
          <Link href="/" className="flex justify-center mb-6">
            <img src="/assets/images/web_logo.png" alt="Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2 hover:scale-105 transition-transform" />
          </Link>
          <h2 className="text-2xl font-black text-black dark:text-white mb-2">Link Expired or Used</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            This password reset link is invalid, has already been used, or has expired (links are only valid for 30 minutes). Please request a new one from the login page.
          </p>
          <Link href="/dashboard" className="block w-full bg-[#FFD700] text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition-colors">
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 font-sans">
      <div className="max-w-md w-full bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
        
        <div className="text-center mb-8">
          <Link href="/" className="flex justify-center mb-4">
            <img src="/assets/images/web_logo.png" alt="Logo" className="w-16 h-16 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.3)] object-contain bg-black p-2 hover:scale-105 transition-transform" />
          </Link>
          <h2 className="text-2xl font-black text-black dark:text-white mb-2 tracking-tight">Set New Password</h2>
          <p className="text-[#FFD700] text-xs font-mono tracking-widest uppercase">WALLYJAYTECH-MD</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center rounded-lg">{error}</div>}
        {message && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 text-green-500 text-sm text-center rounded-lg">{message}</div>}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white focus:border-[#FFD700] outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFD700] text-black font-black py-4 mt-2 rounded-xl hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)] disabled:opacity-50"
          >
            {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#FFD700] transition-colors">
              Cancel and return home
            </Link>
        </div>
      </div>
    </div>
  );
}
