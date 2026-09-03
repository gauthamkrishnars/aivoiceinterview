"use client";

import Link from "next/link";
import { Mic, Github, Twitter } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="border-t border-surface-700/30 bg-surface-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-lg text-white">
                  VoicePrep
                </span>
              </Link>
              <p className="text-surface-400 text-sm leading-relaxed max-w-md">
                AI powered voice interview practice. Get real feedback, sharpen
                your answers, and walk into your next interview with confidence.
              </p>
            </div>

            <div>
              <h3 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Product
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/create"
                    className="text-surface-400 hover:text-white text-sm transition-colors"
                  >
                    Create Interview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-surface-400 hover:text-white text-sm transition-colors"
                  >
                    Session History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className="text-surface-400 hover:text-white text-sm transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => setShowTerms(true)}
                    className="text-surface-400 hover:text-white text-sm transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="text-surface-400 hover:text-white text-sm transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="#"
                  className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-surface-700/30 text-center">
            <p className="text-surface-500 text-xs">
              &copy; {new Date().getFullYear()} VoicePrep. All rights reserved.
              Built for interview practice and career growth.
            </p>
          </div>
        </div>
      </footer>

      <Modal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
      >
        <div className="space-y-4 text-surface-300 text-sm leading-relaxed">
          <p className="text-xs text-surface-500">
            Last updated: September 1, 2026
          </p>

          <h3 className="font-display font-bold text-white text-base">
            1. Acceptance of Terms
          </h3>
          <p>
            By accessing or using VoicePrep ("the Service"), you agree to be
            bound by these Terms of Service. If you do not agree, do not use
            the Service. We reserve the right to modify these terms at any
            time. Your continued use constitutes acceptance of any changes.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            2. Description of Service
          </h3>
          <p>
            VoicePrep is an AI powered interview practice platform that
            provides simulated voice interviews, generates interview questions,
            and delivers performance feedback. The Service is designed for
            educational and practice purposes only.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            3. User Accounts
          </h3>
          <p>
            You may create an account or use the Service as a guest. You are
            responsible for maintaining the confidentiality of your account
            credentials. You agree to provide accurate information when
            creating an account. We reserve the right to terminate accounts
            that violate these terms.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            4. Acceptable Use
          </h3>
          <p>
            You agree not to: use the Service for any unlawful purpose;
            attempt to gain unauthorized access to any part of the Service;
            interfere with or disrupt the Service or servers; use automated
            systems to access the Service; or share your account credentials
            with others. Violations may result in immediate termination of
            your access.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            5. Intellectual Property
          </h3>
          <p>
            All content, features, and functionality of the Service are owned
            by VoicePrep and are protected by copyright, trademark, and other
            intellectual property laws. You may not reproduce, distribute,
            modify, or create derivative works without our express written
            permission.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            6. Disclaimer of Warranties
          </h3>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED. We do not guarantee that interview
            feedback or AI generated content will be accurate, complete, or
            suitable for any specific purpose. The Service is not a substitute
            for professional career advice, coaching, or real interview
            preparation.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            7. Limitation of Liability
          </h3>
          <p>
            In no event shall VoicePrep, its directors, employees, or agents
            be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of the Service. Our total
            liability shall not exceed the amount you paid us in the twelve
            months preceding the claim, or one hundred dollars, whichever is
            greater.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            8. Termination
          </h3>
          <p>
            We may terminate or suspend your access to the Service at our sole
            discretion, without prior notice, for conduct that we determine
            violates these Terms or is harmful to other users, us, or third
            parties, or for any other reason.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            9. Governing Law
          </h3>
          <p>
            These Terms shall be governed by the laws of the State of
            California, United States, without regard to its conflict of law
            provisions. Any disputes arising under these Terms shall be
            resolved in the state or federal courts located in San Francisco
            County, California.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            10. Contact
          </h3>
          <p>
            Questions about these Terms? Contact us at
            legal@voiceprep.app. We respond to inquiries within 5 business
            days.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <div className="space-y-4 text-surface-300 text-sm leading-relaxed">
          <p className="text-xs text-surface-500">
            Last updated: September 1, 2026
          </p>

          <h3 className="font-display font-bold text-white text-base">
            1. Information We Collect
          </h3>
          <p>
            We collect information you provide directly: account details
            (email, name), interview configurations, voice recordings during
            sessions, transcripts of interview conversations, and feedback
            data. We also collect device information, browser type, IP
            address, and usage analytics automatically when you use the
            Service.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            2. How We Use Your Information
          </h3>
          <p>
            We use your information to: provide and improve the Service;
            generate personalized interview questions and feedback; store your
            session history and transcripts; send account related
            communications; detect and prevent fraud or abuse; and comply with
            legal obligations. We do not sell your personal information to
            third parties.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            3. Voice Recording Data
          </h3>
          <p>
            During interview sessions, your voice is processed in real time to
            enable the conversation feature. Voice recordings may be stored
            temporarily to generate transcripts. You can request deletion of
            your recordings at any time by contacting us. Voice data is not
            used for model training without your explicit consent.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            4. Data Sharing
          </h3>
          <p>
            We share your data only with service providers who assist in
            operating the Service (cloud hosting, AI processing). These
            providers are contractually obligated to protect your information
            and may not use it for their own purposes. We may disclose data
            if required by law or to protect the rights and safety of our
            users.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            5. Data Security
          </h3>
          <p>
            We implement industry standard security measures including
            encryption in transit and at rest, access controls, and regular
            security audits. No method of transmission or storage is 100%
            secure. We cannot guarantee absolute security, but we take
            reasonable steps to protect your information.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            6. Data Retention
          </h3>
          <p>
            We retain your account information and session data as long as
            your account is active. If you delete your account, we remove
            your personal data within 30 days, except where retention is
            required by law. Anonymous analytics data may be retained
            indefinitely in aggregated form.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            7. Your Rights
          </h3>
          <p>
            You have the right to: access your personal data; correct
            inaccurate data; delete your account and associated data; export
            your data in a portable format; and opt out of non essential data
            collection. To exercise these rights, contact
            privacy@voiceprep.app.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            8. Cookies
          </h3>
          <p>
            We use essential cookies to maintain your session and preferences.
            Analytics cookies help us understand how the Service is used. You
            can control cookie settings through your browser. Disabling
            essential cookies may impair Service functionality.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            9. Children's Privacy
          </h3>
          <p>
            The Service is not intended for users under 16 years of age. We
            do not knowingly collect information from children. If we learn
            that we have collected data from a child under 16, we delete it
            promptly.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            10. Changes to This Policy
          </h3>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of material changes by posting the new policy on this
            page and updating the "Last updated" date. Your continued use of
            the Service after changes are posted constitutes acceptance of
            the revised policy.
          </p>

          <h3 className="font-display font-bold text-white text-base">
            11. Contact Us
          </h3>
          <p>
            For questions about this Privacy Policy, contact
            privacy@voiceprep.app or write to: VoicePrep Inc., 123 Market
            Street, Suite 400, San Francisco, CA 94105.
          </p>
        </div>
      </Modal>
    </>
  );
}
