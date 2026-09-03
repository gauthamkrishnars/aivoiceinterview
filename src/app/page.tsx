"use client";

import Link from "next/link";
import {
  Mic,
  Brain,
  BarChart3,
  MessageSquare,
  ArrowRight,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice first",
    description:
      "Speak naturally. The AI listens and responds in real time, the way a real interviewer would.",
  },
  {
    icon: Brain,
    title: "Tailored questions",
    description:
      "Questions built for your role, your stack, your level. Nothing generic.",
  },
  {
    icon: BarChart3,
    title: "Honest scoring",
    description:
      "Communication, technical depth, confidence. Measured clearly, not sugarcoated.",
  },
  {
    icon: MessageSquare,
    title: "Full transcripts",
    description:
      "Every word, recorded. Review what you said and see exactly where to improve.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center border-b border-[#ebe5dd]">
        <div className="max-w-6xl mx-auto px-5 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#ddd6ce] bg-white text-[12px] text-[#6b6560] mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#276749]" />
                Live now
              </div>

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
                  <Play className="w-4 h-4" />
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

            {/* Decorative element - not a gradient blob */}
            <div className="hidden lg:block lg:col-span-2">
              <div className="aspect-[4/5] bg-[#f0ece6] border border-[#ddd6ce] rounded flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, #1a1714 20px, #1a1714 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #1a1714 20px, #1a1714 21px)`
                }} />
                <div className="text-center relative z-10">
                  <div className="w-16 h-16 rounded bg-[#c0392b] flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-display text-[14px] text-[#1a1714]">
                    Interview in progress
                  </p>
                  <p className="text-[12px] text-[#a8a09a] mt-1">
                    8 questions &middot; 12:34
                  </p>
                </div>
              </div>
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

      {/* Features */}
      <section className="border-b border-[#ebe5dd]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="py-12 border-b border-[#ebe5dd]">
            <h2 className="font-display text-[28px] text-[#1a1714] mb-1">
              What you get
            </h2>
            <p className="text-[14px] text-[#a8a09a]">
              Everything you need to prepare, nothing you do not.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#ebe5dd]">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                  <Icon className="w-5 h-5 text-[#c0392b] mb-3" strokeWidth={1.5} />
                  <h3 className="font-display text-[16px] text-[#1a1714] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[#6b6560] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
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
                <Mic className="w-4 h-4" />
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
