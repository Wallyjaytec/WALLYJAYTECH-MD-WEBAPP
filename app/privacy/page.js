"use client";

import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white font-sans">
      
      {/* HEADER */}
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4 py-4 px-6 md:px-12 max-w-4xl mx-auto">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-[#111] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-black text-xl tracking-tighter">Privacy Policy</span>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-sm font-bold mb-6">
            <Lock size={16} /> Data Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">1. Introduction</h2>
            <p>Welcome to WALLYJAYTECH-MD. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and use our bot.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><b>Identity Data:</b> First name, last name.</li>
              <li><b>Contact Data:</b> Email address, phone number, and country.</li>
              <li><b>Technical Data:</b> Login credentials and dashboard settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we use your data to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Create and manage your dashboard account.</li>
              <li>Operate the WhatsApp bot features (like toggling AI or Antilink).</li>
              <li>Send you newsletter updates (if you subscribe).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way, altered, or disclosed. Your passwords are encrypted, and database access is strictly monitored via Supabase Row Level Security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">5. Data Retention</h2>
            <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">6. Third-Party Links</h2>
            <p>This website may include links to third-party websites, plug-ins, and applications (like GitHub, YouTube, or WhatsApp). Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">7. Contact Us</h2>
            <p>If you have any questions about this privacy policy or our privacy practices, please contact us at <a href="mailto:wallyjaytech@gmail.com" className="text-[#FFD700] hover:underline">wallyjaytech@gmail.com</a>.</p>
          </section>

        </div>
      </main>
    </div>
  );
} 
