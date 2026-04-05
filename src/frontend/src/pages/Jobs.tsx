import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import type { JobFilters as JobFiltersType } from "../components/jobs/JobFilters";
import Layout from "../components/layout/Layout";
import type { Job } from "../data/jobs";

// Colour palette for company avatar backgrounds (deterministic by hash)
const COMPANY_COLORS = [
  "#1a3a8f",
  "#0e6b8f",
  "#1a7a4a",
  "#6b3fa0",
  "#b5451b",
  "#1b5e7a",
  "#2c5f2e",
  "#8b2252",
  "#4a5568",
  "#2d6a8a",
];

function hashCompanyColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return COMPANY_COLORS[hash % COMPANY_COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function formatJobType(
  jobType: string,
): "Full-time" | "Part-time" | "Contract" | "Remote" {
  switch (jobType) {
    case "full_time":
      return "Full-time";
    case "part_time":
      return "Part-time";
    case "contract":
      return "Contract";
    default:
      return "Remote";
  }
}

function formatPostedDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  } catch {
    return "Recently";
  }
}

interface RemotiveJob {
  id: number;
  url: string;
  title: string;
  company_name: string;
  candidate_required_location: string;
  job_type: string;
  salary: string;
  tags: string[];
  description: string;
  publication_date: string;
}

function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
      </div>
      <div className="flex gap-1">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-18 rounded-full" />
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    type: "",
    location: "",
  });

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://remotive.com/api/remote-jobs?limit=20");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { jobs: RemotiveJob[] };
      const mapped: Job[] = data.jobs.map((j) => ({
        id: String(j.id),
        title: j.title,
        company: j.company_name,
        location:
          j.candidate_required_location &&
          j.candidate_required_location.trim() !== ""
            ? j.candidate_required_location
            : "Remote",
        type: formatJobType(j.job_type),
        salary: j.salary && j.salary.trim() !== "" ? j.salary : "See listing",
        skills: j.tags ?? [],
        description: j.description ?? "",
        postedDate: formatPostedDate(j.publication_date),
        promoted: false,
        companyColor: hashCompanyColor(j.company_name),
        companyInitials: getInitials(j.company_name),
        applyUrl: j.url,
      }));
      setJobs(mapped);
    } catch (_err) {
      setError(
        "Could not load job listings. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const filtered = jobs.filter((job) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !job.title.toLowerCase().includes(q) &&
        !job.company.toLowerCase().includes(q) &&
        !job.skills.some((s) => s.toLowerCase().includes(q))
      ) {
        return false;
      }
    }
    if (filters.type && job.type !== filters.type) return false;
    if (filters.location && job.location !== filters.location) return false;
    return true;
  });

  return (
    <Layout title="Job Listings">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Find Your Next Opportunity
          </h2>
          <p className="text-muted-foreground">
            {loading
              ? "Loading live remote job listings..."
              : error
                ? "Could not load jobs."
                : `${jobs.length} remote positions from around the world.`}
          </p>
        </div>

        <JobFilters onFilterChange={setFilters} />

        {/* Error state */}
        {error && (
          <div
            className="flex flex-col items-center gap-4 py-16 bg-card border border-border rounded-xl text-center"
            data-ocid="jobs.error_state"
          >
            <p className="text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={fetchJobs}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              data-ocid="jobs.retry_button"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="jobs.loading_state"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="jobs.empty_state"
          >
            <p className="text-muted-foreground">
              {jobs.length === 0
                ? "No jobs available right now. Try again later."
                : "No jobs match your search. Try adjusting your filters."}
            </p>
          </div>
        )}

        {/* Job grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job, i) => (
              <JobCard key={job.id} job={job} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
