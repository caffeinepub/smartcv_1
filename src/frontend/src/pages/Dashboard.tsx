import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  FileEdit,
  HelpCircle,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/jobs/JobCard";
import Layout from "../components/layout/Layout";
import TemplateCard from "../components/templates/TemplateCard";
import { useAuth } from "../context/AuthContext";
import { mockJobs } from "../data/jobs";
import { templates } from "../data/templates";
import { useAllCoverLetters } from "../hooks/useCoverLetter";
import { useAllResumes } from "../hooks/useResume";

const QUICK_ACTIONS = [
  {
    label: "New Resume",
    icon: Plus,
    to: "/resume/new",
    colorClass: "text-teal-600 bg-teal-50 dark:bg-teal-900/20",
  },
  {
    label: "New Cover Letter",
    icon: FileEdit,
    to: "/cover-letter/new",
    colorClass: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    label: "Browse Templates",
    icon: Sparkles,
    to: "/templates",
    colorClass: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    label: "Find Jobs",
    icon: Search,
    to: "/jobs",
    colorClass: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { resumes } = useAllResumes();
  const { coverLetters } = useAllCoverLetters();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<
    "all" | "free" | "paid" | "premium"
  >("all");

  const primaryResume = resumes[0];
  const filteredTemplates = templates
    .filter((t) => {
      if (tierFilter !== "all" && t.tier !== tierFilter) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    })
    .slice(0, 8);

  const featuredJobs = mockJobs.slice(0, 4);
  const templateAccessCount =
    user?.plan === "premium" ? 40 : user?.plan === "paid" ? 30 : 15;

  return (
    <Layout title="Dashboard">
      <div className="flex gap-6 h-full">
        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground">
              Welcome Back,{" "}
              <span style={{ color: "oklch(0.52 0.13 195)" }}>
                {user?.name?.split(" ")[0] || "there"}!
              </span>
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Your career dashboard &mdash; pick up where you left off.
            </p>
          </motion.div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                type="button"
                onClick={() => navigate(a.to)}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:shadow-md transition-all text-left"
                data-ocid={`dashboard.quickaction.${a.label.toLowerCase().replace(/\s+/g, "_")}.button`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${a.colorClass}`}
                >
                  <a.icon size={18} />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          {/* Current resume card */}
          {primaryResume && (
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div
                    className="w-12 h-16 rounded-lg flex flex-col overflow-hidden shrink-0 shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #0E7C86, #0a5c63)",
                    }}
                  >
                    <div className="flex-1 p-1">
                      <div
                        className="h-0.5 bg-white/40 rounded mb-0.5"
                        style={{ width: "70%" }}
                      />
                      <div
                        className="h-0.5 bg-white/40 rounded mb-0.5"
                        style={{ width: "60%" }}
                      />
                      <div
                        className="h-0.5 bg-white/40 rounded mb-0.5"
                        style={{ width: "80%" }}
                      />
                      <div
                        className="h-0.5 bg-white/40 rounded mb-0.5"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {primaryResume.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 mb-2">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Last edited{" "}
                        {new Date(
                          primaryResume.lastEdited,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress
                        value={primaryResume.completionPercent}
                        className="flex-1 h-1.5"
                      />
                      <span className="text-xs font-medium text-muted-foreground shrink-0">
                        {primaryResume.completionPercent}% complete
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate(`/resume/${primaryResume.id}`)}
                  data-ocid="dashboard.resume.edit_button"
                >
                  <FileEdit size={14} className="mr-1" /> View/Edit
                </Button>
              </div>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Resumes",
                value: resumes.length,
                colorClass: "text-teal-600",
              },
              {
                label: "Cover Letters",
                value: coverLetters.length,
                colorClass: "text-blue-600",
              },
              {
                label: "Templates Available",
                value: templateAccessCount,
                colorClass: "text-purple-600",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <p className={`text-2xl font-bold ${s.colorClass}`}>
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Template gallery */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">
                Resume Templates
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/templates")}
                data-ocid="dashboard.view_all_templates.button"
              >
                View all 40
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                {(["all", "free", "paid", "premium"] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setTierFilter(tier)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${tierFilter === tier ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    data-ocid={`dashboard.templates.${tier}.tab`}
                  >
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-xs">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 text-xs"
                  data-ocid="dashboard.templates.search_input"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredTemplates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  compact
                  onUse={() => navigate("/resume/new")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div className="w-80 shrink-0 hidden xl:block">
          <div className="sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Job Listings</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/jobs")}
                data-ocid="dashboard.view_all_jobs.button"
              >
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {featuredJobs.map((job, i) => (
                <JobCard key={job.id} job={job} index={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50"
        style={{ backgroundColor: "oklch(0.52 0.13 195)" }}
        data-ocid="dashboard.help.button"
      >
        <HelpCircle size={22} />
      </button>
    </Layout>
  );
}
