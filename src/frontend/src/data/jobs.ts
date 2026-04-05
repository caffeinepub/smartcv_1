export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary: string;
  skills: string[];
  description: string;
  postedDate: string;
  promoted: boolean;
  companyColor: string;
  companyInitials: string;
  applyUrl?: string;
}

// Kept as empty — real data is fetched from Remotive API in Jobs.tsx
export const mockJobs: Job[] = [];
