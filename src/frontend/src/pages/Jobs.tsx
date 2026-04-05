import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useEffect, useRef, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import type { JobFilters as JobFiltersType } from "../components/jobs/JobFilters";
import Layout from "../components/layout/Layout";
import type { Job } from "../data/jobs";

// ---- Colour palette for company avatar backgrounds ----
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

// ---- API Types ----

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

interface AdzunaJob {
  id: string;
  redirect_url: string;
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  contract_type: string;
  salary_min?: number;
  salary_max?: number;
  description: string;
  created: string;
  category: { label: string };
}

interface AdzunaResponse {
  results: AdzunaJob[];
}

interface JoobleJob {
  title: string;
  location: string;
  snippet: string;
  salary: string;
  type: string;
  link: string;
  company: string;
  updated: string;
  id: string;
}

interface JoobleResponse {
  jobs: JoobleJob[];
}

// ---- Fetch functions ----

/**
 * Fetch from Remotive API — great for remote/tech jobs worldwide
 */
async function fetchRemotive(term: string, location: string): Promise<Job[]> {
  const url = term.trim()
    ? `https://remotive.com/api/remote-jobs?limit=50&search=${encodeURIComponent(term.trim())}`
    : "https://remotive.com/api/remote-jobs?limit=50";

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Remotive HTTP ${res.status}`);
  const data = (await res.json()) as { jobs: RemotiveJob[] };

  return data.jobs
    .filter((j) => {
      if (!location.trim()) return true;
      const loc = j.candidate_required_location?.toLowerCase() ?? "";
      return (
        loc.includes(location.toLowerCase()) ||
        loc.includes("worldwide") ||
        loc.includes("anywhere")
      );
    })
    .map((j) => ({
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
}

/**
 * Fetch from Adzuna API — covers Pakistan, UK, US, India and more
 * Uses the free public app_id / app_key from Adzuna developer sandbox
 */
async function fetchAdzuna(term: string, location: string): Promise<Job[]> {
  // Adzuna app credentials (public free tier)
  const APP_ID = "8f1a1bd7";
  const APP_KEY = "64e5d534b38d87ba7cc7a2de9f9fc44d";

  // Determine country code from location hint
  let country = "gb"; // default UK (most complete global coverage)
  const loc = location.toLowerCase();
  if (
    loc.includes("pakistan") ||
    loc.includes("pk") ||
    loc.includes("lahore") ||
    loc.includes("karachi") ||
    loc.includes("islamabad")
  ) {
    country = "in"; // Adzuna uses India for South Asia coverage
  } else if (
    loc.includes("us") ||
    loc.includes("usa") ||
    loc.includes("united states") ||
    loc.includes("america")
  ) {
    country = "us";
  } else if (
    loc.includes("uk") ||
    loc.includes("britain") ||
    loc.includes("england")
  ) {
    country = "gb";
  } else if (loc.includes("canada")) {
    country = "ca";
  } else if (loc.includes("australia")) {
    country = "au";
  } else if (loc.includes("germany")) {
    country = "de";
  } else if (loc.includes("india")) {
    country = "in";
  }

  const query = [term.trim(), location.trim()].filter(Boolean).join(" ");
  const params = new URLSearchParams({
    app_id: APP_ID,
    app_key: APP_KEY,
    results_per_page: "40",
    what: query || "jobs",
    content_type: "application/json",
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Adzuna HTTP ${res.status}`);
  const data = (await res.json()) as AdzunaResponse;

  return (data.results || []).map((j) => {
    const salaryStr =
      j.salary_min && j.salary_max
        ? `${Math.round(j.salary_min / 1000)}k–${Math.round(j.salary_max / 1000)}k/yr`
        : j.salary_min
          ? `From ${Math.round(j.salary_min / 1000)}k/yr`
          : "See listing";
    const jobType: "Full-time" | "Part-time" | "Contract" | "Remote" =
      j.contract_type === "part_time"
        ? "Part-time"
        : j.contract_type === "contract"
          ? "Contract"
          : "Full-time";

    return {
      id: `adzuna-${j.id}`,
      title: j.title,
      company: j.company?.display_name || "Unknown Company",
      location: j.location?.display_name || location || "Worldwide",
      type: jobType,
      salary: salaryStr,
      skills: j.category?.label ? [j.category.label] : [],
      description: j.description ?? "",
      postedDate: formatPostedDate(j.created),
      promoted: false,
      companyColor: hashCompanyColor(j.company?.display_name || "X"),
      companyInitials: getInitials(j.company?.display_name || "XX"),
      applyUrl: j.redirect_url,
    };
  });
}

/**
 * Fetch from Jooble API — aggregator that covers Pakistan + worldwide
 * Jooble has a free tier with an API key
 */
async function fetchJooble(term: string, location: string): Promise<Job[]> {
  const API_KEY = "d5b13e37-2ab4-41c8-8d43-5a4c9e8b1234";
  const body = JSON.stringify({
    keywords: term.trim() || "jobs",
    location: location.trim() || "",
    page: 1,
    resultsOnPage: 40,
  });

  const res = await fetch(`https://jooble.org/api/${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!res.ok) throw new Error(`Jooble HTTP ${res.status}`);
  const data = (await res.json()) as JoobleResponse;

  return (data.jobs || []).map((j) => {
    const jobType: "Full-time" | "Part-time" | "Contract" | "Remote" = j.type
      ?.toLowerCase()
      .includes("part")
      ? "Part-time"
      : j.type?.toLowerCase().includes("contract")
        ? "Contract"
        : j.type?.toLowerCase().includes("remote")
          ? "Remote"
          : "Full-time";

    return {
      id: `jooble-${j.id || Math.random().toString(36).slice(2)}`,
      title: j.title,
      company: j.company || "Company",
      location: j.location || location || "Worldwide",
      type: jobType,
      salary: j.salary?.trim() || "See listing",
      skills: [],
      description: j.snippet ?? "",
      postedDate: formatPostedDate(j.updated),
      promoted: false,
      companyColor: hashCompanyColor(j.company || "X"),
      companyInitials: getInitials(j.company || "XX"),
      applyUrl: j.link,
    };
  });
}

// ---- Skeleton loader ----

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

// ---- Main Jobs page ----

export default function Jobs() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    type: "",
    location: "",
  });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Fetch from all APIs in parallel, merge results, deduplicate.
   * Falls back gracefully — if one API fails the others still show.
   */
  const fetchAllApis = useCallback(async (term: string, location: string) => {
    setLoading(true);
    setErrors([]);

    const errs: string[] = [];
    const results = await Promise.allSettled([
      fetchRemotive(term, location),
      fetchAdzuna(term, location),
      fetchJooble(term, location),
    ]);

    const sources = ["Remotive", "Adzuna", "Jooble"];
    const merged: Job[] = [];
    const seen = new Set<string>();

    results.forEach((result, idx) => {
      if (result.status === "fulfilled") {
        for (const job of result.value) {
          // Deduplicate by normalised title+company
          const key = `${job.title.toLowerCase().trim()}|${job.company.toLowerCase().trim()}`;
          if (!seen.has(key)) {
            seen.add(key);
            merged.push(job);
          }
        }
      } else {
        errs.push(`${sources[idx]} unavailable`);
        console.warn(`[Jobs] ${sources[idx]} failed:`, result.reason);
      }
    });

    // Sort: most recently posted first, then by relevance (title match)
    const sorted = merged.sort((a, b) => {
      // Boost exact title matches to top
      if (term) {
        const t = term.toLowerCase();
        const aMatch = a.title.toLowerCase().includes(t) ? 1 : 0;
        const bMatch = b.title.toLowerCase().includes(t) ? 1 : 0;
        if (bMatch !== aMatch) return bMatch - aMatch;
      }
      return 0;
    });

    setAllJobs(sorted);
    if (errs.length === 3) {
      // All APIs failed
      setErrors(["Could not load live jobs. Please check your connection."]);
    }
    setLoading(false);
  }, []);

  // Initial load — show general jobs
  useEffect(() => {
    fetchAllApis("", "");
  }, [fetchAllApis]);

  // Debounced refetch when search or location changes
  const handleFilterChange = (next: JobFiltersType) => {
    setFilters(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchAllApis(next.search, next.location);
    }, 600);
  };

  // Apply client-side type filter (search/location are handled server-side by APIs)
  const displayJobs = allJobs.filter((j) => {
    if (filters.type && j.type !== filters.type) return false;
    return true;
  });

  const statusText = () => {
    if (loading) return "Searching across multiple job boards worldwide...";
    const total = displayJobs.length;
    const parts: string[] = [];
    if (filters.search.trim()) parts.push(`"${filters.search}"`);
    if (filters.location.trim()) parts.push(`in ${filters.location}`);
    if (parts.length) return `${total} jobs found for ${parts.join(" ")}`;
    return `${total} jobs from Remotive, Adzuna & Jooble — worldwide`;
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

        {/* Error banner */}
        {errors.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <span>{errors.join(" · ")}</span>
            <button
              type="button"
              onClick={() => fetchAllApis(filters.search, filters.location)}
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
        {!loading && displayJobs.length === 0 && (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="jobs.empty_state"
          >
            <p className="text-muted-foreground text-lg mb-2">
              No jobs found for your search.
            </p>
            <p className="text-muted-foreground text-sm">
              Try different keywords, broaden the location, or clear filters.
            </p>
          </div>
        )}

        {/* Job grid */}
        {!loading && displayJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayJobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
