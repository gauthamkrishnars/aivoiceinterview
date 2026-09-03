import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const roleLabels: Record<string, string> = {
  "frontend-developer": "Frontend Developer",
  "backend-developer": "Backend Developer",
  "full-stack-developer": "Full Stack Developer",
  "mobile-developer": "Mobile Developer",
  "devops-engineer": "DevOps Engineer",
  "data-engineer": "Data Engineer",
  "data-scientist": "Data Scientist",
  "ml-engineer": "Machine Learning Engineer",
  "product-manager": "Product Manager",
  "ux-designer": "UX Designer",
  "qa-engineer": "QA Engineer",
  "security-engineer": "Security Engineer",
  "solutions-architect": "Solutions Architect",
  "tech-lead": "Tech Lead",
  "engineering-manager": "Engineering Manager",
};

const experienceLabels: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior",
  lead: "Staff / Principal",
  manager: "Manager / Director",
};

const techLabels: Record<string, string> = {
  "javascript-react": "JavaScript / React",
  "typescript-react": "TypeScript / React",
  nextjs: "Next.js",
  "nodejs-express": "Node.js / Express",
  "python-django": "Python / Django",
  "python-flask": "Python / Flask",
  "python-fastapi": "Python / FastAPI",
  "java-spring": "Java / Spring Boot",
  go: "Go",
  rust: "Rust",
  "php-laravel": "PHP / Laravel",
  "ruby-rails": "Ruby on Rails",
  "swift-ios": "Swift / iOS",
  "kotlin-android": "Kotlin / Android",
  flutter: "Flutter / Dart",
  "react-native": "React Native",
  aws: "AWS / Cloud",
  gcp: "Google Cloud",
  azure: "Microsoft Azure",
  kubernetes: "Kubernetes / Docker",
  "data-science": "Python / Data Science",
  "ml-pytorch": "PyTorch / ML",
  "ml-tensorflow": "TensorFlow / ML",
  sql: "SQL / Databases",
  general: "General / Other",
};

function generateQuestions(
  role: string,
  experience: string,
  techStack: string,
  count: number
) {
  const roleName = roleLabels[role] || role;

  // Questions by stack
  const technicalQuestions: Record<string, Array<{
    question: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
  }>> = {
    "typescript-react": [
      { question: `Walk me through how you would architect a new feature in a large React application. What decisions do you make first and why?`, category: "Architecture", difficulty: "medium" },
      { question: `How do you handle state management in a complex TypeScript React app? What trade-offs do you consider when choosing between Context, Redux, Zustand, or other solutions?`, category: "Technical", difficulty: "medium" },
      { question: `Describe a time you had to optimize a React component that was causing performance issues. What tools did you use and what was the outcome?`, category: "Performance", difficulty: "hard" },
      { question: `How do you approach TypeScript type safety in a React codebase? Can you give an example of when you created custom types or utility types to solve a real problem?`, category: "TypeScript", difficulty: "medium" },
      { question: `Tell me about a tricky bug you solved recently. How did you diagnose it and what did you learn from the process?`, category: "Problem Solving", difficulty: "medium" },
      { question: `How do you write and organize tests for React components? What is your testing philosophy and how do you decide what to test?`, category: "Testing", difficulty: "medium" },
      { question: `What is your approach to code reviews? Can you describe a review where your feedback actually changed the design for the better?`, category: "Process", difficulty: "easy" },
      { question: `How do you handle authentication and authorization in a React app? Walk me through the flow from login to protected routes.`, category: "Security", difficulty: "medium" },
      { question: `Describe your approach to building accessible UIs. What specific patterns or tools do you use to ensure your components work for everyone?`, category: "Accessibility", difficulty: "medium" },
      { question: `Tell me about a time you had to refactor legacy code. How did you approach it without breaking existing functionality?`, category: "Refactoring", difficulty: "hard" },
      { question: `How do you handle API integration in React? What patterns work well for error handling, loading states, and caching?`, category: "Integration", difficulty: "medium" },
      { question: `What is your experience with server-side rendering or static generation in Next.js? When would you choose one over the other?`, category: "Architecture", difficulty: "hard" },
      { question: `How do you manage complex forms in React? What libraries or patterns have you used and what trade-offs did you find?`, category: "Technical", difficulty: "medium" },
      { question: `Tell me about a time you disagreed with a technical decision. How did you handle it and what was the outcome?`, category: "Communication", difficulty: "easy" },
      { question: `How do you stay current with the fast-moving JavaScript ecosystem? What resources do you rely on and how do you decide what to adopt?`, category: "Growth", difficulty: "easy" },
    ],
    "nodejs-express": [
      { question: `How do you design REST APIs? Walk me through your approach to versioning, error handling, and pagination.`, category: "API Design", difficulty: "medium" },
      { question: `Describe a time you had to optimize a slow database query. What was the problem and how did you fix it?`, category: "Performance", difficulty: "hard" },
      { question: `How do you handle background jobs and task queues in Node.js? What tools have you used and why?`, category: "Architecture", difficulty: "medium" },
      { question: `Tell me about your approach to testing backend services. What layers do you test and how do you handle external dependencies?`, category: "Testing", difficulty: "medium" },
      { question: `How do you implement authentication in a Node.js API? Compare JWT, sessions, and OAuth approaches.`, category: "Security", difficulty: "medium" },
      { question: `What is your approach to error handling and logging in production Node.js applications?`, category: "Operations", difficulty: "medium" },
      { question: `Describe a system you built that had to handle high traffic. What scaling decisions did you make?`, category: "Architecture", difficulty: "hard" },
      { question: `How do you manage database migrations and schema changes in a live system without downtime?`, category: "Database", difficulty: "hard" },
      { question: `Tell me about a time you introduced a new tool or practice to your team. How did you get buy-in?`, category: "Leadership", difficulty: "easy" },
      { question: `How do you approach security in backend development? What common vulnerabilities do you watch for?`, category: "Security", difficulty: "medium" },
      { question: `What is your experience with microservices vs monoliths? When does each approach make sense?`, category: "Architecture", difficulty: "hard" },
      { question: `How do you handle real-time features like WebSockets or Server-Sent Events in your applications?`, category: "Technical", difficulty: "medium" },
      { question: `Describe your approach to API documentation. What tools do you use and how do you keep docs up to date?`, category: "Process", difficulty: "easy" },
      { question: `How do you handle cross-cutting concerns like rate limiting, caching, and request validation?`, category: "Architecture", difficulty: "medium" },
      { question: `Tell me about a production incident you handled. What went wrong and what did you learn?`, category: "Operations", difficulty: "medium" },
    ],
    default: [
      { question: `Tell me about your background and what draws you to this ${roleName} position.`, category: "Introduction", difficulty: "easy" },
      { question: `Describe a challenging project you worked on recently. What made it difficult and how did you overcome those challenges?`, category: "Experience", difficulty: "medium" },
      { question: `How do you approach learning new technologies? Walk me through a recent example where you picked up something unfamiliar.`, category: "Growth", difficulty: "easy" },
      { question: `Tell me about a time you had to collaborate with a difficult team member. How did you handle the situation?`, category: "Teamwork", difficulty: "medium" },
      { question: `How do you prioritize your work when you have multiple competing deadlines? Give me a specific example.`, category: "Time Management", difficulty: "medium" },
      { question: `Describe your ideal work environment. What helps you do your best work?`, category: "Culture Fit", difficulty: "easy" },
      { question: `Tell me about a mistake you made at work. How did you handle it and what did you learn?`, category: "Self Awareness", difficulty: "medium" },
      { question: `How do you stay organized and keep track of your tasks and responsibilities?`, category: "Process", difficulty: "easy" },
      { question: `Describe a time you went above and beyond what was expected. What drove you to do that?`, category: "Motivation", difficulty: "easy" },
      { question: `How do you handle feedback? Tell me about a time critical feedback actually made you better at your job.`, category: "Growth", difficulty: "medium" },
      { question: `What questions do you have for us about the role, team, or company?`, category: "Engagement", difficulty: "easy" },
      { question: `Where do you see yourself in three years, and how does this role fit into that vision?`, category: "Career Goals", difficulty: "easy" },
      { question: `How do you approach documentation? How do you balance writing docs with shipping code quickly?`, category: "Process", difficulty: "medium" },
      { question: `Tell me about a technical decision you made that you later regretted. What would you do differently?`, category: "Reflection", difficulty: "hard" },
      { question: `What is the most interesting problem you have worked on in your career so far?`, category: "Experience", difficulty: "medium" },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedBank: Record<string, any[]> = technicalQuestions as any;
  const stackQuestions = typedBank[techStack] || typedBank["default"];
  const generalQuestions = typedBank["default"];

  // Mix stack-specific and general questions
  const selectedQuestions = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < count; i++) {
    if (i < stackQuestions.length && !usedIndices.has(i)) {
      selectedQuestions.push({
        id: uuidv4(),
        ...stackQuestions[i],
      });
      usedIndices.add(i);
    } else {
      const generalIdx = i % generalQuestions.length;
      if (!usedIndices.has(generalIdx + 100)) {
        selectedQuestions.push({
          id: uuidv4(),
          ...generalQuestions[generalIdx],
        });
        usedIndices.add(generalIdx + 100);
      }
    }
  }

  return selectedQuestions;
}

export async function POST(request: Request) {
  try {
    const { role, experience, techStack, questionCount } =
      await request.json();

    if (!role || !experience || !techStack || !questionCount) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const questions = generateQuestions(role, experience, techStack, questionCount);

    const roleName = roleLabels[role] || role;

    const interview = await prisma.interview.create({
      data: {
        title: `${roleName} Interview`,
        role,
        experience,
        techStack,
        questionCount,
        questions: JSON.stringify(questions),
      },
    });

    return NextResponse.json({
      id: interview.id,
      title: interview.title,
      role: interview.role,
      experience: interview.experience,
      techStack: interview.techStack,
      questionCount: interview.questionCount,
      questions,
      createdAt: interview.createdAt,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate interview" },
      { status: 500 }
    );
  }
}
