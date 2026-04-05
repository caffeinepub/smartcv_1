import { useLocalStorage } from "./useLocalStorage";

export interface CoverLetterData {
  id: string;
  title: string;
  yourName: string;
  jobTitle: string;
  company: string;
  date: string;
  body: string;
  templateId: string;
  lastEdited: string;
}

const DEFAULT_COVER_LETTER: CoverLetterData = {
  id: "",
  title: "My Cover Letter",
  yourName: "",
  jobTitle: "",
  company: "",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  body: "",
  templateId: "cl-1",
  lastEdited: new Date().toISOString(),
};

export function useCoverLetter(coverId?: string) {
  const storageKey = coverId ? `smartcv_cover_${coverId}` : "smartcv_cover_new";
  const [coverLetter, setCoverLetter] = useLocalStorage<CoverLetterData>(
    storageKey,
    {
      ...DEFAULT_COVER_LETTER,
      id: coverId || `cover-${Date.now()}`,
    },
  );

  const updateCoverLetter = (updates: Partial<CoverLetterData>) => {
    setCoverLetter((prev) => ({
      ...prev,
      ...updates,
      lastEdited: new Date().toISOString(),
    }));
  };

  return { coverLetter, updateCoverLetter };
}

export function useAllCoverLetters() {
  const [coverLetters, setCoverLetters] = useLocalStorage<CoverLetterData[]>(
    "smartcv_all_covers",
    [
      {
        ...DEFAULT_COVER_LETTER,
        id: "cover-demo-001",
        title: "Software Engineer @ Google",
        yourName: "Alex Johnson",
        jobTitle: "Senior Software Engineer",
        company: "Google",
        body: "Dear Hiring Manager,\n\nI am writing to express my strong interest in the Senior Software Engineer position at Google. With over 5 years of experience in full-stack development and a deep passion for building scalable systems, I believe I would be a valuable addition to your team.\n\nThroughout my career, I have developed expertise in React, TypeScript, and Node.js, successfully delivering high-impact projects that serve millions of users. I am particularly excited about Google's commitment to innovation and the opportunity to work on products that shape how the world communicates and accesses information.\n\nI would welcome the opportunity to discuss how my background and skills align with your needs.\n\nSincerely,\nAlex Johnson",
        lastEdited: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
  );

  const addCoverLetter = (cl: CoverLetterData) => {
    setCoverLetters((prev) => [...prev, cl]);
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters((prev) => prev.filter((c) => c.id !== id));
  };

  return { coverLetters, addCoverLetter, deleteCoverLetter };
}
