"use client";

import Link from "next/link";
import { Mic } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="border-t border-[#ebe5dd] bg-[#f0ece6]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#c0392b] flex items-center justify-center">
                  <Mic className="w-3 h-3 text-white" />
                </div>
                <span className="font-display text-[15px] text-[#1a1714]">
                  VoicePrep
                </span>
              </Link>
              <p className="text-[13px] text-[#6b6560] leading-relaxed max-w-xs">
                Practice interviews out loud. Get real feedback. Improve.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#a8a09a] uppercase tracking-wider mb-3">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/create" className="text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors">
                    Create Interview
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors">
                    History
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#a8a09a] uppercase tracking-wider mb-3">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setShowTerms(true)} className="text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors text-left">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacy(true)} className="text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#ddd6ce]">
            <p className="text-[12px] text-[#a8a09a]">
              &copy; {new Date().getFullYear()} VoicePrep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <div className="space-y-5 text-[14px] text-[#6b6560] leading-relaxed">
          <p className="text-[12px] text-[#a8a09a]">Last updated: September 1, 2026</p>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">1. Acceptance</h3>
            <p>By using VoicePrep you agree to these terms. If you do not agree, do not use the Service.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">2. The Service</h3>
            <p>VoicePrep is an AI interview practice tool. It simulates voice interviews and provides feedback. It is for educational purposes only.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">3. Accounts</h3>
            <p>You may create an account or use the Service as a guest. You are responsible for your credentials.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">4. Acceptable Use</h3>
            <p>Do not use the Service for unlawful purposes. Do not attempt unauthorized access. Do not share your account.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">5. Disclaimer</h3>
            <p>THE SERVICE IS PROVIDED AS IS. We do not guarantee the accuracy of AI generated content. Interview feedback is not career advice.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">6. Contact</h3>
            <p>Email legal@voiceprep.app.</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <div className="space-y-5 text-[14px] text-[#6b6560] leading-relaxed">
          <p className="text-[12px] text-[#a8a09a]">Last updated: September 1, 2026</p>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">1. What We Collect</h3>
            <p>Account details, interview configurations, voice recordings, transcripts, feedback data. We do not sell your data.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">2. How We Use It</h3>
            <p>To provide and improve the Service, generate feedback, store history, and comply with legal obligations.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">3. Voice Data</h3>
            <p>Voice is processed in real time. Recordings may be stored temporarily for transcripts. Request deletion anytime.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">4. Security</h3>
            <p>We use encryption in transit and at rest. No system is perfectly secure, but we take reasonable steps to protect your information.</p>
          </div>
          <div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-2">5. Contact</h3>
            <p>Email privacy@voiceprep.app.</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
