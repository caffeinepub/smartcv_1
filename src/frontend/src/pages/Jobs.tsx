import { useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobFilters from "../components/jobs/JobFilters";
import type { JobFilters as JobFiltersType } from "../components/jobs/JobFilters";
import Layout from "../components/layout/Layout";
import { mockJobs } from "../data/jobs";

export default function Jobs() {
  const [filters, setFilters] = useState<JobFiltersType>({
    search: "",
    type: "",
    location: "",
  });

  const filtered = mockJobs.filter((job) => {
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
            {mockJobs.length} open positions across top companies.
          </p>
        </div>

        <JobFilters onFilterChange={setFilters} />

        {filtered.length === 0 ? (
          <div
            className="text-center py-16 bg-card border border-border rounded-xl"
            data-ocid="jobs.empty_state"
          >
            <p className="text-muted-foreground">
              No jobs match your search. Try adjusting your filters.
            </p>
          </div>
        ) : (
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
