import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
}

export interface CertificationEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export interface ResumeData {
  id: string;
  title: string;
  templateId: number;
  lastEdited: string;
  completionPercent: number;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    summary: string;
  };
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  summary: string;
  sectionOrder: string[];
}

const DEFAULT_RESUME: ResumeData = {
  id: "",
  title: "My Resume",
  templateId: 1,
  lastEdited: new Date().toISOString(),
  completionPercent: 0,
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  summary: "",
  sectionOrder: [
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
  ],
};

function calculateCompletion(resume: ResumeData): number {
  let score = 0;
  const info = resume.personalInfo;
  if (info.firstName && info.lastName) score += 15;
  if (info.email) score += 10;
  if (info.phone) score += 5;
  if (info.location) score += 5;
  if (resume.experience.length > 0) score += 25;
  if (resume.education.length > 0) score += 20;
  if (resume.skills.length > 0) score += 10;
  if (resume.summary) score += 10;
  return Math.min(score, 100);
}

export function useResume(resumeId?: string) {
  const storageKey = resumeId
    ? `smartcv_resume_${resumeId}`
    : "smartcv_resume_new";
  const [resume, setResume] = useLocalStorage<ResumeData>(storageKey, {
    ...DEFAULT_RESUME,
    id: resumeId || `resume-${Date.now()}`,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const updateResume = (updates: Partial<ResumeData>) => {
    setResume((prev) => {
      const next = {
        ...prev,
        ...updates,
        lastEdited: new Date().toISOString(),
      };
      next.completionPercent = calculateCompletion(next);
      return next;
    });
  };

  const updatePersonalInfo = (updates: Partial<ResumeData["personalInfo"]>) => {
    setResume((prev) => {
      const next = {
        ...prev,
        personalInfo: { ...prev.personalInfo, ...updates },
        lastEdited: new Date().toISOString(),
      };
      next.completionPercent = calculateCompletion(next);
      return next;
    });
  };

  return {
    resume,
    currentStep,
    setCurrentStep,
    updateResume,
    updatePersonalInfo,
  };
}

export function useAllResumes() {
  const [resumes, setResumes] = useLocalStorage<ResumeData[]>(
    "smartcv_all_resumes",
    [
      {
        ...DEFAULT_RESUME,
        id: "resume-demo-001",
        title: "Alex's Tech Resume",
        completionPercent: 72,
        templateId: 4,
        lastEdited: new Date(Date.now() - 86400000 * 2).toISOString(),
        personalInfo: {
          firstName: "Alex",
          lastName: "Johnson",
          email: "alex@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          website: "alexjohnson.dev",
          linkedin: "linkedin.com/in/alexjohnson",
          summary:
            "Experienced software engineer with a passion for building scalable applications.",
        },
        experience: [
          {
            id: "exp-1",
            company: "TechCorp",
            title: "Senior Developer",
            location: "San Francisco, CA",
            startDate: "2021-01",
            endDate: "",
            current: true,
            description: "Led development of microservices architecture.",
          },
        ],
        education: [
          {
            id: "edu-1",
            school: "UC Berkeley",
            degree: "Bachelor of Science",
            field: "Computer Science",
            startDate: "2015-09",
            endDate: "2019-05",
            gpa: "3.7",
            description: "",
          },
        ],
        skills: [
          { id: "sk-1", name: "React", level: "Expert" },
          { id: "sk-2", name: "TypeScript", level: "Advanced" },
          { id: "sk-3", name: "Node.js", level: "Advanced" },
        ],
        summary:
          "Experienced software engineer with a passion for building scalable web applications using modern technologies.",
        sectionOrder: [
          "experience",
          "education",
          "skills",
          "projects",
          "certifications",
        ],
      },
    ],
  );

  const addResume = (resume: ResumeData) => {
    setResumes((prev) => [...prev, resume]);
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return { resumes, addResume, deleteResume };
}
