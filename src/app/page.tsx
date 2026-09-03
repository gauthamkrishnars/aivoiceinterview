"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center border-b border-[#ebe5dd]">
        <div className="max-w-6xl mx-auto px-5 w-full py-20">
          <div className="max-w-2xl">
            <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] text-[#1a1714] mb-6">
              Practice your interview
              <br />
              <span className="text-[#c0392b]">out loud.</span>
            </h1>

            <p className="text-[16px] text-[#6b6560] leading-relaxed mb-10 max-w-lg">
              VoicePrep runs a real voice interview. You talk. The AI responds.
              You get scored. That is how you actually get better at this.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/auth/guest"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0392b] text-white rounded text-[14px] font-medium hover:bg-[#a93226] transition-colors"
              >
                Try it free
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#ddd6ce] text-[#1a1714] rounded text-[14px] hover:border-[#a8a09a] hover:bg-[#f0ece6] transition-colors"
              >
                Create account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6 text-[12px] text-[#a8a09a]">
              <span>No credit card</span>
              <span className="w-px h-3 bg-[#ddd6ce]" />
              <span>Start in 60 seconds</span>
              <span className="w-px h-3 bg-[#ddd6ce]" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[#ebe5dd]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#ebe5dd]">
            {[
              {
                step: "01",
                title: "Pick your role",
                desc: "Choose the position, experience level, and tech stack you are preparing for.",
              },
              {
                step: "02",
                title: "Start talking",
                desc: "Answer questions through your mic. The AI reacts to what you say in real time.",
              },
              {
                step: "03",
                title: "Review and improve",
                desc: "Read your transcript, check your score, and work on what matters.",
              },
            ].map((item) => (
              <div key={item.step} className="py-10 md:py-12 md:px-8 first:md:pl-0 last:md:pr-0">
                <span className="font-mono text-[11px] text-[#a8a09a]">
                  {item.step}
                </span>
                <h3 className="font-display text-[18px] text-[#1a1714] mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#6b6560] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="max-w-xl">
            <h2 className="font-display text-[28px] text-[#1a1714] mb-3">
              Ready to stop guessing?
            </h2>
            <p className="text-[14px] text-[#6b6560] mb-8 leading-relaxed">
              Find out how you actually sound in an interview. No opinions.
              No sugarcoating. Just the truth.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/guest"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0392b] text-white rounded text-[14px] font-medium hover:bg-[#a93226] transition-colors"
              >
                Start a free interview
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[#6b6560] text-[14px] hover:text-[#1a1714] transition-colors"
              >
                Create free account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
