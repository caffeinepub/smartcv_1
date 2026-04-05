import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import type { JobFilters as JobFiltersType } from "../components/jobs/JobFilters";
import Layout from "../components/layout/Layout";
import type { Job } from "../data/jobs";
import { pakistanJobs, searchPakistanJobs } from "../data/pakistanJobs";

// ---- Colour palette for API job avatar backgrounds ----
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
  t: string,
): "Full-time" | "Part-time" | "Contract" | "Remote" {
  switch (t) {
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
    const diff = Math.floor(
      (Date.now() - new Date(isoDate).getTime()) / 86400000,
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "1 day ago";
    if (diff < 7) return `${diff} days ago`;
    if (diff < 14) return "1 week ago";
    if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
    return `${Math.floor(diff / 30)} months ago`;
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

// Build the Remotive URL — search param sends query to their API
function buildUrl(term: string): string {
  const base = "https://remotive.com/api/remote-jobs?limit=100";
  return term.trim()
    ? `${base}&search=${encodeURIComponent(term.trim())}`
    : base;
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
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>
    </div>
  );
}

export default function Jobs() {
  // apiJobs = jobs fetched from Remotive
  const [apiJobs, setApiJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appliedSearch, setAppliedSearch] = useState("");
  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    type: "",
    location: "",
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch from Remotive API
  const fetchFromApi = useCallback(async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(buildUrl(term));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { jobs: RemotiveJob[] };
      const mapped: Job[] = data.jobs.map((j) => ({
        id: `remotive-${j.id}`,
        title: j.title,
        company: j.company_name,
        location: j.candidate_required_location?.trim() || "Remote (Worldwide)",
        type: formatJobType(j.job_type),
        salary: j.salary?.trim() || "See listing",
        skills: j.tags ?? [],
        description: j.description ?? "",
        postedDate: formatPostedDate(j.publication_date),
        promoted: false,
        companyColor: hashCompanyColor(j.company_name),
        companyInitials: getInitials(j.company_name),
        applyUrl: j.url,
      }));
      setApiJobs(mapped);
    } catch {
      setError(
        "Could not load live job listings. Showing offline jobs instead.",
      );
      setApiJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFromApi("");
  }, [fetchFromApi]);

  // Debounced API re-fetch when search term changes
  const handleFilterChange = (next: JobFiltersType) => {
    setFilters(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (next.search !== appliedSearch) {
      debounceRef.current = setTimeout(() => {
        setAppliedSearch(next.search);
        fetchFromApi(next.search);
      }, 600);
    }
  };

  // ---------------------------------------------------------------------------
  // Merge Pakistan jobs + API jobs then apply client-side filters
  // ---------------------------------------------------------------------------
  const allJobs: Job[] = (() => {
    const search = filters.search.toLowerCase();
    const loc = filters.location.toLowerCase();
    const type = filters.type;

    // Pick relevant Pakistan jobs
    const pkMatched = search
      ? searchPakistanJobs(filters.search)
      : pakistanJobs;

    // Combine: Pakistan jobs first, then API jobs (deduplicate by id)
    const seen = new Set<string>();
    const combined: Job[] = [];
    for (const j of [...pkMatched, ...apiJobs]) {
      if (!seen.has(j.id)) {
        seen.add(j.id);
        combined.push(j);
      }
    }

    // Client-side filter: location text + job type
    return combined.filter((j) => {
      if (type && j.type !== type) return false;
      if (loc && !j.location.toLowerCase().includes(loc)) return false;
      return true;
    });
  })();

  const statusText = () => {
    if (loading) return "Loading live job listings worldwide...";
    const total = allJobs.length;
    if (filters.search.trim())
      return `${total} jobs found for "${filters.search}"`;
    if (filters.location.trim())
      return `${total} jobs in "${filters.location}"`;
    return `${total} jobs — Pakistan, remote & worldwide`;
  };

  return (
    <Layout title="Job Listings">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Find Your Next Opportunity
          </h2>
          <p className="text-muted-foreground">{statusText()}</p>
        </div>

        <JobFilters onFilterChange={handleFilterChange} />

        {/* Soft error — still show offline Pakistan jobs */}
        {error && (
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => fetchFromApi(appliedSearch)}
              className="ml-4 px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-800 hover:opacity-80 text-xs font-medium transition-opacity"
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
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && allJobs.length === 0 && (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="jobs.empty_state"
          >
            <p className="text-muted-foreground">
              No jobs match your search. Try different keywords or clear the
              location filter.
            </p>
          </div>
        )}

        {/* Job grid */}
        {!loading && allJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
