import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  onFilterChange: (filters: JobFilters) => void;
}

export interface JobFilters {
  search: string;
  type: string;
  location: string;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    type: "",
    location: "",
  });

  const update = (updates: Partial<JobFilters>) => {
    const next = { ...filters, ...updates };
    setFilters(next);
    onFilterChange(next);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* Search — triggers API refetch via debounce in Jobs.tsx */}
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search jobs worldwide (e.g. data entry, Pakistan...)"
          className="pl-9"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          data-ocid="jobs.search_input"
        />
      </div>

      {/* Job type select */}
      <Select onValueChange={(v) => update({ type: v === "all" ? "" : v })}>
        <SelectTrigger className="w-40" data-ocid="jobs.type.select">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Full-time">Full-time</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="Contract">Contract</SelectItem>
          <SelectItem value="Part-time">Part-time</SelectItem>
        </SelectContent>
      </Select>

      {/* Location — free-text so users can type Pakistan, UK, Remote, etc. */}
      <div className="relative w-52">
        <MapPin
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Filter by location (e.g. Pakistan, Remote, UK)"
          className="pl-9"
          value={filters.location}
          onChange={(e) => update({ location: e.target.value })}
          data-ocid="jobs.location_input"
        />
      </div>
    </div>
  );
}
