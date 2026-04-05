import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Template } from "../../data/templates";
import UpgradeModal from "../ui/UpgradeModal";

interface TemplateCardProps {
  template: Template;
  onUse?: (template: Template) => void;
  compact?: boolean;
}

const LIGHT_HEADERS = new Set([
  "#ffffff",
  "#f9fafb",
  "#fffbeb",
  "#fef2f2",
  "#f3f4f6",
  "#f5f3ff",
  "#ecfdf5",
  "#dbeafe",
  "#ecfeff",
  "#e6f7f8",
  "#eff6ff",
]);

function TemplatePreviewSVG({ template }: { template: Template }) {
  const isGradient = template.headerBg.startsWith("linear-gradient");
  const headerBg = isGradient ? template.accentColor : template.headerBg;
  const isDark =
    headerBg === "#0a0a0a" || headerBg === "#111827" || headerBg === "#1a1a2e";

  const nameColorClass =
    isDark || isGradient
      ? "text-white"
      : LIGHT_HEADERS.has(headerBg)
        ? "text-gray-800"
        : "text-white";

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: isDark ? "#1a1a2e" : "#f9fafb",
        fontFamily:
          template.fontStyle === "serif"
            ? "Georgia, serif"
            : template.fontStyle === "mono"
              ? "monospace"
              : "sans-serif",
      }}
    >
      {/* Header */}
      <div
        className="px-3 py-2"
        style={{
          background: isGradient
            ? `linear-gradient(135deg, ${template.accentColor}, ${template.accentColor}99)`
            : template.headerBg,
          minHeight: "28%",
        }}
      >
        <div className={cn("font-bold text-[9px]", nameColorClass)}>
          John Smith
        </div>
        <div
          className="text-[6px] mt-0.5"
          style={{
            color:
              isGradient || isDark
                ? "rgba(255,255,255,0.7)"
                : template.accentColor,
          }}
        >
          Software Engineer
        </div>
        <div className="flex gap-2 mt-1">
          <span
            className="text-[5px]"
            style={{
              color: isGradient || isDark ? "rgba(255,255,255,0.6)" : "#6b7280",
            }}
          >
            email@example.com
          </span>
          <span
            className="text-[5px]"
            style={{
              color: isGradient || isDark ? "rgba(255,255,255,0.6)" : "#6b7280",
            }}
          >
            New York, NY
          </span>
        </div>
      </div>
      {/* Body */}
      <div
        className={cn(
          "flex-1 px-3 py-2",
          template.layout === "two-column" && "flex gap-2",
        )}
      >
        {template.layout === "two-column" ? (
          <>
            <div className="w-2/5">
              <SkillsSection accentColor={template.accentColor} />
            </div>
            <div className="flex-1">
              <ExperienceSection
                accentColor={template.accentColor}
                isDark={isDark}
              />
            </div>
          </>
        ) : (
          <>
            <ExperienceSection
              accentColor={template.accentColor}
              isDark={isDark}
            />
            <EducationSection
              accentColor={template.accentColor}
              isDark={isDark}
            />
          </>
        )}
      </div>
    </div>
  );
}

function SkillsSection({ accentColor }: { accentColor: string }) {
  return (
    <div>
      <div className="text-[6px] font-bold mb-1" style={{ color: accentColor }}>
        SKILLS
      </div>
      {["React", "TypeScript", "Node.js", "AWS"].map((skill) => (
        <div key={skill} className="flex items-center gap-1 mb-0.5">
          <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: "75%", backgroundColor: accentColor }}
            />
          </div>
          <span className="text-[5px] text-gray-500 w-8">{skill}</span>
        </div>
      ))}
    </div>
  );
}

function ExperienceSection({
  accentColor,
  isDark,
}: { accentColor: string; isDark: boolean }) {
  return (
    <div className="mb-2">
      <div className="text-[6px] font-bold mb-1" style={{ color: accentColor }}>
        EXPERIENCE
      </div>
      <div
        className={cn(
          "text-[6px] font-semibold",
          isDark ? "text-white" : "text-gray-700",
        )}
      >
        Senior Developer
      </div>
      <div className="text-[5px] text-gray-500">
        TechCorp Inc. · 2021–Present
      </div>
      <div className="text-[5px] text-gray-400 mt-0.5">
        Led development of key platform features.
      </div>
    </div>
  );
}

function EducationSection({
  accentColor,
  isDark,
}: { accentColor: string; isDark: boolean }) {
  return (
    <div>
      <div className="text-[6px] font-bold mb-1" style={{ color: accentColor }}>
        EDUCATION
      </div>
      <div
        className={cn(
          "text-[6px] font-semibold",
          isDark ? "text-white" : "text-gray-700",
        )}
      >
        BS Computer Science
      </div>
      <div className="text-[5px] text-gray-500">MIT · 2015–2019</div>
    </div>
  );
}

export default function TemplateCard({
  template,
  onUse,
  compact,
}: TemplateCardProps) {
  const { user } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const canUse =
    template.tier === "free" ||
    (template.tier === "paid" &&
      (user?.plan === "paid" || user?.plan === "premium")) ||
    (template.tier === "premium" && user?.plan === "premium");

  const handleUse = () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    onUse?.(template);
  };

  return (
    <>
      <div
        className={cn(
          "group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5",
          compact && "text-xs",
        )}
        data-ocid={`templates.item.${template.id}`}
      >
        <div className="template-preview-card bg-gray-50 dark:bg-gray-800 relative">
          <TemplatePreviewSVG template={template} />
          <div className="absolute top-2 left-2">
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold",
                template.tier === "free"
                  ? "badge-free"
                  : template.tier === "paid"
                    ? "badge-paid"
                    : "badge-premium",
              )}
            >
              {template.tier.toUpperCase()}
            </span>
          </div>
          {!canUse && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg px-3 py-2 text-center">
                <p className="text-xs font-semibold text-foreground">
                  Upgrade to unlock
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm text-foreground">
              {template.name}
            </h3>
            <span className="text-xs text-muted-foreground shrink-0">
              ATS {template.atsScore}%
            </span>
          </div>
          {!compact && (
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {template.description}
            </p>
          )}
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 h-7 text-xs"
              onClick={handleUse}
              data-ocid={`templates.use.button.${template.id}`}
            >
              <Zap size={12} className="mr-1" />
              Use Template
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs px-2"
              data-ocid={`templates.preview.button.${template.id}`}
            >
              <Eye size={12} />
            </Button>
          </div>
        </div>
      </div>
      <UpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        feature={`the ${template.name} template`}
        requiredPlan={template.tier as "paid" | "premium"}
      />
    </>
  );
}
