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
      <footer className="border-t border-[#262626]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-[#e8a44a] flex items-center justify-center">
                  <Mic className="w-3 h-3 text-[#0c0c0c]" />
                </div>
                <span className="font-display text-sm font-medium text-[#f0f0f0]">
                  VoicePrep
                </span>
              </Link>
              <p className="text-[13px] text-[#555] leading-relaxed max-w-xs">
                Practice interviews out loud. Get real feedback. Improve.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#555] uppercase tracking-wider mb-3">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/create" className="text-[13px] text-[#8a8a8a] hover:text-[#f0f0f0] transition-colors">
                    Create Interview
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-[13px] text-[#8a8a8a] hover:text-[#f0f0f0] transition-colors">
                    History
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="text-[13px] text-[#8a8a8a] hover:text-[#f0f0f0] transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-medium text-[#555] uppercase tracking-wider mb-3">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setShowTerms(true)} className="text-[13px] text-[#8a8a8a] hover:text-[#f0f0f0] transition-colors text-left">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacy(true)} className="text-[13px] text-[#8a8a8a] hover:text-[#f0f0f0] transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#1e1e1e]">
            <p className="text-[12px] text-[#333]">
              &copy; {new Date().getFullYear()} VoicePrep. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
        <div className="space-y-5 text-[14px] text-[#8a8a8a] leading-relaxed">
          <p className="text-[12px] text-[#555]">Last updated: September 1, 2026</p>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">1. Acceptance of Terms</h3>
            <p>By accessing or using VoicePrep, you agree to these Terms. If you do not agree, do not use the Service. We may modify these terms at any time. Continued use means you accept any changes.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">2. The Service</h3>
            <p>VoicePrep is an AI interview practice tool. It simulates voice interviews, generates questions, and provides performance feedback. It is for educational and practice purposes only. It is not a substitute for professional career coaching.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">3. Accounts</h3>
            <p>You may create an account or use the Service as a guest. You are responsible for your account credentials. Provide accurate information when signing up. We may terminate accounts that violate these terms.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">4. Acceptable Use</h3>
            <p>Do not use the Service for unlawful purposes. Do not attempt unauthorized access. Do not interfere with the Service or its infrastructure. Do not share your account. Violations may result in immediate termination.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">5. Intellectual Property</h3>
            <p>All content, features, and functionality are owned by VoicePrep and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">6. Disclaimer</h3>
            <p>THE SERVICE IS PROVIDED AS IS WITHOUT WARRANTIES OF ANY KIND. We do not guarantee the accuracy or completeness of AI generated content. Interview feedback is not career advice.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">7. Limitation of Liability</h3>
            <p>VoicePrep and its affiliates are not liable for any indirect, incidental, special, or consequential damages. Our total liability will not exceed the amount you paid in the last 12 months, or $100, whichever is greater.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">8. Governing Law</h3>
            <p>These Terms are governed by the laws of California. Disputes will be resolved in state or federal courts in San Francisco County.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">9. Contact</h3>
            <p>Questions about these Terms? Email legal@voiceprep.app.</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
        <div className="space-y-5 text-[14px] text-[#8a8a8a] leading-relaxed">
          <p className="text-[12px] text-[#555]">Last updated: September 1, 2026</p>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">1. What We Collect</h3>
            <p>Account details (email, name), interview configurations, voice recordings, transcripts, feedback data. Automatically: device info, browser type, IP, usage analytics. We do not sell your data.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">2. How We Use It</h3>
            <p>To provide and improve the Service, generate personalized questions and feedback, store session history, send account communications, detect abuse, and comply with legal obligations.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">3. Voice Data</h3>
            <p>Voice is processed in real time for conversation. Recordings may be stored temporarily for transcripts. Request deletion anytime. Voice data is not used for model training without explicit consent.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">4. Sharing</h3>
            <p>We share data only with service providers who help run the Service. They are contractually bound to protect your information. We may disclose data if required by law.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">5. Security</h3>
            <p>We use encryption in transit and at rest, access controls, and regular security audits. No system is perfectly secure. We take reasonable steps to protect your information.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">6. Retention</h3>
            <p>Account and session data is retained while your account is active. Delete your account and we remove personal data within 30 days, except where required by law.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">7. Your Rights</h3>
            <p>Access, correct, delete, or export your data. Opt out of non-essential collection. Contact privacy@voiceprep.app to exercise these rights.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">8. Cookies</h3>
            <p>Essential cookies maintain your session. Analytics cookies help us improve. Control them through your browser settings.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">9. Children</h3>
            <p>The Service is not for users under 16. We do not knowingly collect data from children.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">10. Changes</h3>
            <p>We may update this policy. Material changes will be posted with an updated date. Continued use means acceptance.</p>
          </div>

          <div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-2">11. Contact</h3>
            <p>Email privacy@voiceprep.app or write to: VoicePrep Inc., 123 Market Street, Suite 400, San Francisco, CA 94105.</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
