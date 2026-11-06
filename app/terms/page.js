"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white font-sans">
      
      {/* HEADER */}
      <nav className="fixed w-full top-0 z-50 bg-white dark:bg-[#050505] border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-4 py-4 px-6 md:px-12 max-w-4xl mx-auto">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-[#111] rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <span className="font-black text-xl tracking-tighter">Terms of Service</span>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD700]/10 text-[#FFD700] text-sm font-bold mb-6">
            <Shield size={16} /> Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
          <p className="text-gray-500">Last updated: November 2026</p>
        </div>

        <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using WALLYJAYTECH-MD ("the Bot", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">2. Description of Service</h2>
            <p>WALLYJAYTECH-MD provides a multi-device WhatsApp automation bot and a web dashboard for managing features. The service is provided "as is" and is subject to change without notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>You must not use the bot for illegal, harmful, or abusive activities (spamming, harassment, etc.).</li>
              <li>You must not attempt to hack, reverse-engineer, or exploit the bot's systems.</li>
              <li>You are responsible for keeping your account credentials safe.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">4. WhatsApp Compliance</h2>
            <p>You acknowledge that this bot uses the unofficial Baileys library. Misuse of the bot (like mass messaging or spamming) may result in your WhatsApp account being banned by WhatsApp Inc. We are not responsible for any account bans or restrictions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">5. Privacy & Data</h2>
            <p>We store minimal data required to operate your dashboard. We do not sell your data to third parties. For more information, please read our <Link href="/privacy" className="text-[#FFD700] hover:underline">Privacy Policy</Link>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">6. Modifications to Service</h2>
            <p>We reserve the right to modify, suspend, or discontinue the service at any time. We will not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-3">7. Contact</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:wallyjaytech@gmail.com" className="text-[#FFD700] hover:underline">wallyjaytech@gmail.com</a>.</p>
          </section>

        </div>
      </main>
    </div>
  );
}
