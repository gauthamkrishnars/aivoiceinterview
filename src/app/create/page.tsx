"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Code2,
  Layers,
  Hash,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

const roles = [
  { value: "", label: "Select a role" },
  { value: "frontend-developer", label: "Frontend Developer" },
  { value: "backend-developer", label: "Backend Developer" },
  { value: "full-stack-developer", label: "Full Stack Developer" },
  { value: "mobile-developer", label: "Mobile Developer" },
  { value: "devops-engineer", label: "DevOps Engineer" },
  { value: "data-engineer", label: "Data Engineer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "ml-engineer", label: "Machine Learning Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "ux-designer", label: "UX Designer" },
  { value: "qa-engineer", label: "QA Engineer" },
  { value: "security-engineer", label: "Security Engineer" },
  { value: "solutions-architect", label: "Solutions Architect" },
  { value: "tech-lead", label: "Tech Lead" },
  { value: "engineering-manager", label: "Engineering Manager" },
];

const experiences = [
  { value: "", label: "Select experience level" },
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior (6-10 years)" },
  { value: "lead", label: "Staff / Principal (10+ years)" },
  { value: "manager", label: "Manager / Director" },
];

const techStacks = [
  { value: "", label: "Select your tech stack" },
  { value: "javascript-react", label: "JavaScript / React" },
  { value: "typescript-react", label: "TypeScript / React" },
  { value: "nextjs", label: "Next.js" },
  { value: "nodejs-express", label: "Node.js / Express" },
  { value: "python-django", label: "Python / Django" },
  { value: "python-flask", label: "Python / Flask" },
  { value: "python-fastapi", label: "Python / FastAPI" },
  { value: "java-spring", label: "Java / Spring Boot" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php-laravel", label: "PHP / Laravel" },
  { value: "ruby-rails", label: "Ruby on Rails" },
  { value: "swift-ios", label: "Swift / iOS" },
  { value: "kotlin-android", label: "Kotlin / Android" },
  { value: "flutter", label: "Flutter / Dart" },
  { value: "react-native", label: "React Native" },
  { value: "aws", label: "AWS / Cloud" },
  { value: "gcp", label: "Google Cloud" },
  { value: "azure", label: "Microsoft Azure" },
  { value: "kubernetes", label: "Kubernetes / Docker" },
  { value: "data-science", label: "Python / Data Science" },
  { value: "ml-pytorch", label: "PyTorch / ML" },
  { value: "ml-tensorflow", label: "TensorFlow / ML" },
  { value: "sql", label: "SQL / Databases" },
  { value: "general", label: "General / Other" },
];

const questionCounts = [
  { value: "5", label: "5 Questions (Quick)" },
  { value: "8", label: "8 Questions (Standard)" },
  { value: "10", label: "10 Questions (Thorough)" },
  { value: "15", label: "15 Questions (Deep Dive)" },
];

export default function CreateInterviewPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [techStack, setTechStack] = useState("");
  const [questionCount, setQuestionCount] = useState("8");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const canProceed = step === 1 ? !!role : step === 2 ? !!experience : step === 3 ? !!techStack : !!questionCount;

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          experience,
          techStack,
          questionCount: parseInt(questionCount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate interview");
      }

      localStorage.setItem("currentInterview", JSON.stringify(data));
      router.push(`/interview/${data.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: "Role", icon: Briefcase, active: step === 1 },
    { num: 2, label: "Level", icon: Layers, active: step === 2 },
    { num: 3, label: "Stack", icon: Code2, active: step === 3 },
    { num: 4, label: "Count", icon: Hash, active: step === 4 },
  ];

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-mesh">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-display mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI Generated Questions
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Build your interview
          </h1>
          <p className="text-surface-400 max-w-md mx-auto">
            Answer a few quick questions about the role you are preparing for.
            We will handle the rest.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex items-center">
                <button
                  onClick={() => s.num <= step && setStep(s.num)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-display transition-all duration-200 ${
                    s.active
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                      : s.num < step
                      ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-pointer hover:bg-green-500/20"
                      : "bg-surface-800/50 text-surface-500 border border-surface-700/30"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-surface-600 mx-1" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card className="animate-fade-in">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-white">
                What role are you targeting?
              </h2>
              <p className="text-sm text-surface-400">
                This shapes the type and depth of questions you will get.
              </p>
              <Select
                options={roles}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-white">
                Your experience level?
              </h2>
              <p className="text-sm text-surface-400">
                We adjust question difficulty and follow-ups based on this.
              </p>
              <Select
                options={experiences}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-white">
                Your primary tech stack?
              </h2>
              <p className="text-sm text-surface-400">
                We will include questions specific to your tools and platform.
              </p>
              <Select
                options={techStacks}
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-display font-bold text-white">
                How many questions?
              </h2>
              <p className="text-sm text-surface-400">
                Longer sessions give more detailed feedback. Short ones are
                great for quick practice.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {questionCounts.map((qc) => (
                  <button
                    key={qc.value}
                    onClick={() => setQuestionCount(qc.value)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      questionCount === qc.value
                        ? "bg-brand-500/10 border-brand-500/30 text-white"
                        : "bg-surface-800/30 border-surface-700/30 text-surface-300 hover:border-surface-500/50 hover:bg-surface-800/50"
                    }`}
                  >
                    <span className="block text-2xl font-display font-bold mb-1">
                      {qc.value}
                    </span>
                    <span className="text-xs text-surface-400">
                      {qc.value === "5"
                        ? "Quick"
                        : qc.value === "8"
                        ? "Standard"
                        : qc.value === "10"
                        ? "Thorough"
                        : "Deep"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              variant="primary"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="accent"
              onClick={handleGenerate}
              loading={loading}
              icon={<Sparkles className="w-4 h-4" />}
              size="lg"
            >
              Generate Interview
            </Button>
          )}
        </div>

        {/* Summary */}
        {step >= 2 && (
          <div className="mt-8 glass-card rounded-xl p-4">
            <h3 className="text-xs font-display font-semibold text-surface-500 uppercase tracking-wider mb-3">
              Your Config
            </h3>
            <div className="flex flex-wrap gap-2">
              {role && (
                <span className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-300 text-xs font-display">
                  {roles.find((r) => r.value === role)?.label}
                </span>
              )}
              {experience && (
                <span className="px-3 py-1 rounded-lg bg-accent-500/10 text-accent-300 text-xs font-display">
                  {experiences.find((e) => e.value === experience)?.label}
                </span>
              )}
              {techStack && (
                <span className="px-3 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs font-display">
                  {techStacks.find((t) => t.value === techStack)?.label}
                </span>
              )}
              <span className="px-3 py-1 rounded-lg bg-surface-700/50 text-surface-300 text-xs font-display">
                {questionCount} Questions
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
