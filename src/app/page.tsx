"use client";

import Link from "next/link";
import {
  Mic,
  Brain,
  BarChart3,
  History,
  Zap,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: Mic,
    title: "Voice Powered",
    description:
      "Speak your answers naturally. The AI responds in real time, just like a real interviewer across the table.",
  },
  {
    icon: Brain,
    title: "Smart Questions",
    description:
      "Questions tailored to your role, stack, and experience level. No generic cookie cutter lists.",
  },
  {
    icon: BarChart3,
    title: "Honest Feedback",
    description:
    "Get scored on communication, technical depth, and confidence. Clear strengths and real areas to work on.",
  },
  {
    icon: History,
    title: "Full Transcripts",
    description:
      "Review every answer word for word. Track your improvement across sessions over time.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "No lengthy onboarding. Pick your interview topic and start talking in under a minute.",
  },
  {
    icon: Star,
    title: "Score & Grow",
    description:
      "Each session produces a detailed breakdown with practice exercises matched to your weak spots.",
  },
];

const steps = [
  {
    step: "01",
    title: "Pick Your Role",
    description: "Select your target position, experience level, and tech stack.",
  },
  {
    step: "02",
    title: "Start Talking",
    description: "Answer questions through your mic. The AI reacts to what you say.",
  },
  {
    step: "03",
    title: "Review & Improve",
    description: "Read your transcript, check your score, and work on what matters.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-mesh">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm text-brand-300 font-display">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI voice interviews are live
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
              Stop practicing{" "}
              <span className="text-gradient">in your head.</span>
              <br />
              Start speaking out loud.
            </h1>

            <p className="text-lg sm:text-xl text-surface-400 leading-relaxed mb-10 max-w-xl">
              VoicePrep puts you through a real voice interview. You talk. The
              AI listens. You get scored. That is how you actually get better.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/guest">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<Play className="w-5 h-5" />}
                >
                  Try It Free
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-surface-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                No credit card needed
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                Start in 60 seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-surface-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Three steps. Real results.
            </h2>
            <p className="text-surface-400 max-w-lg mx-auto">
              No filler. No bloated onboarding. Just a straight path from
              preparation to improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="relative group">
                <div className="glass-card rounded-2xl p-8 h-full hover-lift">
                  <span className="text-5xl font-display font-bold text-brand-500/20 group-hover:text-brand-500/40 transition-colors">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-display font-bold text-white mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-surface-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-surface-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Everything you need to prepare right
            </h2>
            <p className="text-surface-400 max-w-lg mx-auto">
              Built for people who would rather practice than read about
              practicing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card rounded-2xl p-6 hover-lift group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-surface-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-surface-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-brand-700/20 to-accent-500/10" />
            <div className="relative glass-card rounded-3xl p-12 sm:p-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                Ready to stop guessing?
              </h2>
              <p className="text-surface-400 max-w-lg mx-auto mb-8">
                Get honest feedback on how you actually sound in an interview.
                No opinions. No sugarcoating. Just the truth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/guest">
                  <Button
                    variant="accent"
                    size="lg"
                    icon={<Mic className="w-5 h-5" />}
                  >
                    Start a Free Interview
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="ghost" size="lg">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
