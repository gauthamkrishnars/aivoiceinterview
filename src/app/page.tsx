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
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#262626] bg-[#141414] text-[12px] text-[#8a8a8a] mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              Live now
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] font-medium text-[#f0f0f0] mb-6">
              Practice your interview
              <br />
              <span className="text-[#8a8a8a]">out loud.</span>
            </h1>

            <p className="text-[16px] text-[#8a8a8a] leading-relaxed mb-10 max-w-lg">
              VoicePrep runs a real voice interview. You talk. The AI responds.
              You get scored. That is how you actually get better at this.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/auth/guest"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8a44a] text-[#0c0c0c] rounded-md text-[14px] font-medium hover:bg-[#c4873a] transition-colors"
              >
                <Play className="w-4 h-4" />
                Try it free
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#262626] text-[#f0f0f0] rounded-md text-[14px] hover:border-[#444] hover:bg-[#141414] transition-colors"
              >
                Create account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-14 flex items-center gap-6 text-[12px] text-[#555]">
              <span>No credit card</span>
              <span className="w-px h-3 bg-[#262626]" />
              <span>Start in 60 seconds</span>
              <span className="w-px h-3 bg-[#262626]" />
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
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
              <div key={item.step} className="bg-[#0c0c0c] p-8">
                <span className="font-mono text-[11px] text-[#555]">
                  {item.step}
                </span>
                <h3 className="font-display text-[18px] font-medium text-[#f0f0f0] mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#8a8a8a] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-12">
            <h2 className="font-display text-[28px] font-medium text-[#f0f0f0] mb-2">
              What you get
            </h2>
            <p className="text-[14px] text-[#555]">
              Everything you need to prepare, nothing you do not.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e1e]">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-[#0c0c0c] p-7">
                  <Icon className="w-5 h-5 text-[#e8a44a] mb-4" strokeWidth={1.5} />
                  <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-[#8a8a8a] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-xl">
            <h2 className="font-display text-[28px] font-medium text-[#f0f0f0] mb-3">
              Ready to stop guessing?
            </h2>
            <p className="text-[14px] text-[#8a8a8a] mb-8 leading-relaxed">
              Find out how you actually sound in an interview. No opinions.
              No sugarcoating. Just the truth.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/guest"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8a44a] text-[#0c0c0c] rounded-md text-[14px] font-medium hover:bg-[#c4873a] transition-colors"
              >
                <Mic className="w-4 h-4" />
                Start a free interview
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-[#8a8a8a] text-[14px] hover:text-[#f0f0f0] transition-colors"
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
