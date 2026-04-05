import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";
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
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search jobs, companies..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          data-ocid="jobs.search_input"
        />
      </div>
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
      <Select onValueChange={(v) => update({ location: v === "all" ? "" : v })}>
        <SelectTrigger className="w-44" data-ocid="jobs.location.select">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="Remote">Remote</SelectItem>
          <SelectItem value="San Francisco, CA">San Francisco</SelectItem>
          <SelectItem value="New York, NY">New York</SelectItem>
          <SelectItem value="Austin, TX">Austin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
