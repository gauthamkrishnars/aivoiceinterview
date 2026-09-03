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
  { value: "5", label: "5", desc: "Quick" },
  { value: "8", label: "8", desc: "Standard" },
  { value: "10", label: "10", desc: "Thorough" },
  { value: "15", label: "15", desc: "Deep dive" },
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
    { num: 1, label: "Role", icon: Briefcase },
    { num: 2, label: "Level", icon: Layers },
    { num: 3, label: "Stack", icon: Code2 },
    { num: 4, label: "Count", icon: Hash },
  ];

  return (
    <div className="min-h-screen py-16 px-5">
      <div className="max-w-lg mx-auto">
        <div className="mb-10">
          <h1 className="font-display text-[24px] text-[#1a1714] mb-1">
            Build your interview
          </h1>
          <p className="text-[14px] text-[#6b6560]">
            Answer a few quick questions about the role you are preparing for.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex items-center flex-1">
                <button
                  onClick={() => s.num <= step && setStep(s.num)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[12px] font-medium transition-colors ${
                    s.num === step
                      ? "bg-[#c0392b] text-white border border-[#c0392b]"
                      : s.num < step
                      ? "bg-[#f0fdf4] text-[#276749] border border-[#276749]/20 cursor-pointer hover:bg-[#dcfce7]"
                      : "bg-white text-[#a8a09a] border border-[#ddd6ce]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-[#ddd6ce] mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="bg-white border border-[#ddd6ce] rounded-md p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-[16px] text-[#1a1714] mb-1">
                  What role are you targeting?
                </h2>
                <p className="text-[13px] text-[#a8a09a]">
                  This shapes the type and depth of questions you will get.
                </p>
              </div>
              <Select
                options={roles}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-[16px] text-[#1a1714] mb-1">
                  Your experience level?
                </h2>
                <p className="text-[13px] text-[#a8a09a]">
                  We adjust difficulty and follow-ups based on this.
                </p>
              </div>
              <Select
                options={experiences}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-[16px] text-[#1a1714] mb-1">
                  Your primary tech stack?
                </h2>
                <p className="text-[13px] text-[#a8a09a]">
                  Questions will include topics specific to your tools.
                </p>
              </div>
              <Select
                options={techStacks}
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-[16px] text-[#1a1714] mb-1">
                  How many questions?
                </h2>
                <p className="text-[13px] text-[#a8a09a]">
                  Longer sessions give more detailed feedback.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {questionCounts.map((qc) => (
                  <button
                    key={qc.value}
                    onClick={() => setQuestionCount(qc.value)}
                    className={`p-3 rounded border text-center transition-colors ${
                      questionCount === qc.value
                        ? "bg-[#fdf0ee] border-[#c0392b] text-[#c0392b]"
                        : "bg-white border-[#ddd6ce] text-[#6b6560] hover:border-[#a8a09a]"
                    }`}
                  >
                    <span className="block text-[20px] font-display mb-0.5">
                      {qc.label}
                    </span>
                    <span className="text-[11px] text-[#a8a09a]">
                      {qc.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
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
              variant="primary"
              onClick={handleGenerate}
              loading={loading}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Generate interview
            </Button>
          )}
        </div>

        {/* Config summary */}
        {step >= 2 && (
          <div className="mt-6 p-3 bg-[#f0ece6] border border-[#ebe5dd] rounded">
            <div className="flex flex-wrap gap-1.5">
              {role && (
                <span className="px-2 py-0.5 rounded-sm bg-[#fdf0ee] text-[#c0392b] text-[11px] font-medium border border-[#c0392b]/20">
                  {roles.find((r) => r.value === role)?.label}
                </span>
              )}
              {experience && (
                <span className="px-2 py-0.5 rounded-sm bg-white text-[#6b6560] text-[11px] border border-[#ddd6ce]">
                  {experiences.find((e) => e.value === experience)?.label}
                </span>
              )}
              {techStack && (
                <span className="px-2 py-0.5 rounded-sm bg-white text-[#6b6560] text-[11px] border border-[#ddd6ce]">
                  {techStacks.find((t) => t.value === techStack)?.label}
                </span>
              )}
              <span className="px-2 py-0.5 rounded-sm bg-white text-[#6b6560] text-[11px] border border-[#ddd6ce]">
                {questionCount} Qs
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
