import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark, DollarSign, ExternalLink, MapPin } from "lucide-react";
import type { Job } from "../../data/jobs";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface JobCardProps {
  job: Job;
  index: number;
}

export default function JobCard({ job, index }: JobCardProps) {
  const [saved, setSaved] = useLocalStorage<string[]>("smartcv_saved_jobs", []);
  const isSaved = saved.includes(job.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved((prev) =>
      prev.includes(job.id)
        ? prev.filter((id) => id !== job.id)
        : [...prev, job.id],
    );
  };

  const typeColors: Record<string, string> = {
    "Full-time":
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "Part-time":
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Contract:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Remote:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
      data-ocid={`jobs.item.${index}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{
              backgroundColor:
                job.companyColor === "#ffe01b" ? "#f59e0b" : job.companyColor,
            }}
          >
            {job.companyInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-foreground">
                {job.title}
              </h3>
              {job.promoted && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{job.company}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleSave}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            isSaved
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
          data-ocid={`jobs.bookmark.${index}`}
        >
          <Bookmark size={15} className={isSaved ? "fill-current" : ""} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin size={12} /> {job.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign size={12} /> {job.salary}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            typeColors[job.type] || typeColors["Full-time"],
          )}
        >
          {job.type}
        </span>
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{job.postedDate}</span>
        <Button
          size="sm"
          className="h-7 text-xs"
          data-ocid={`jobs.apply.button.${index}`}
        >
          <ExternalLink size={12} className="mr-1" /> Apply
        </Button>
      </div>
    </div>
  );
}
