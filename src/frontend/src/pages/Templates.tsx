import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import TemplateCard from "../components/templates/TemplateCard";
import { templates } from "../data/templates";

export default function Templates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");
  const [layout, setLayout] = useState("all");

  const filtered = templates.filter((t) => {
    if (tier !== "all" && t.tier !== tier) return false;
    if (layout !== "all" && t.layout !== layout) return false;
    if (
      search &&
      !t.name.toLowerCase().includes(search.toLowerCase()) &&
      !t.description.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const tierCounts = {
    all: templates.length,
    free: templates.filter((t) => t.tier === "free").length,
    paid: templates.filter((t) => t.tier === "paid").length,
    premium: templates.filter((t) => t.tier === "premium").length,
  };

  return (
    <Layout title="Templates">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Resume Templates
          </h2>
          <p className="text-muted-foreground">
            Choose from {templates.length} professionally designed,
            ATS-optimized templates.
          </p>
        </div>

        {/* Tier tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "free", "paid", "premium"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tier === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
              data-ocid={`templates.${t}.tab`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}{" "}
              <span className="text-xs opacity-70">({tierCounts[t]})</span>
            </button>
          ))}
          <div className="flex-1" />
          {/* Filters */}
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-48"
              data-ocid="templates.search_input"
            />
          </div>
          <Select onValueChange={setLayout}>
            <SelectTrigger className="w-36" data-ocid="templates.layout.select">
              <SelectValue placeholder="Layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Layouts</SelectItem>
              <SelectItem value="single">Single Column</SelectItem>
              <SelectItem value="two-column">Two Column</SelectItem>
              <SelectItem value="modern">Modern</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16" data-ocid="templates.empty_state">
            <p className="text-muted-foreground">
              No templates match your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onUse={() => navigate("/resume/new")}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
