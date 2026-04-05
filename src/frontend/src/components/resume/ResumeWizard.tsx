import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useResume } from "../../hooks/useResume";
import PdfExportButton from "../ui/PdfExportButton";
import ResumePreview from "./ResumePreview";
import StepCertifications from "./StepCertifications";
import StepEducation from "./StepEducation";
import StepExperience from "./StepExperience";
import StepPersonalInfo from "./StepPersonalInfo";
import StepProjects from "./StepProjects";
import StepSkills from "./StepSkills";
import StepSummary from "./StepSummary";

const STEPS = [
  { label: "Personal Info", short: "Info" },
  { label: "Education", short: "Education" },
  { label: "Experience", short: "Experience" },
  { label: "Skills", short: "Skills" },
  { label: "Projects", short: "Projects" },
  { label: "Certifications", short: "Certs" },
  { label: "Summary", short: "Summary" },
];

interface ResumeWizardProps {
  resumeId?: string;
}

export default function ResumeWizard({ resumeId }: ResumeWizardProps) {
  const navigate = useNavigate();
  const {
    resume,
    currentStep,
    setCurrentStep,
    updateResume,
    updatePersonalInfo,
  } = useResume(resumeId);
  const [saving, setSaving] = useState(false);

  // Ref for the editor scroll area viewport
  const editorScrollRef = useRef<HTMLDivElement>(null);
  // Ref for the preview scroll container
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Scroll the editor (left) panel up or down
  const scrollEditor = (direction: "up" | "down") => {
    // ScrollArea renders a [data-radix-scroll-area-viewport] child — target that
    const viewport = editorScrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    ) as HTMLElement | null;
    const el = viewport ?? editorScrollRef.current;
    if (el) {
      el.scrollBy({
        top: direction === "down" ? 220 : -220,
        behavior: "smooth",
      });
    }
  };

  // Scroll the live preview (right) panel up or down
  const scrollPreview = (direction: "up" | "down") => {
    const el = previewScrollRef.current;
    if (el) {
      el.scrollBy({
        top: direction === "down" ? 200 : -200,
        behavior: "smooth",
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Resume saved!");
  };

  const next = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepPersonalInfo
            data={resume.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 1:
        return (
          <StepEducation
            data={resume.education}
            onChange={(education) => updateResume({ education })}
          />
        );
      case 2:
        return (
          <StepExperience
            data={resume.experience}
            onChange={(experience) => updateResume({ experience })}
          />
        );
      case 3:
        return (
          <StepSkills
            data={resume.skills}
            onChange={(skills) => updateResume({ skills })}
          />
        );
      case 4:
        return (
          <StepProjects
            data={resume.projects}
            onChange={(projects) => updateResume({ projects })}
          />
        );
      case 5:
        return (
          <StepCertifications
            data={resume.certifications}
            onChange={(certifications) => updateResume({ certifications })}
          />
        );
      case 6:
        return (
          <StepSummary
            value={resume.summary}
            onChange={(summary) => updateResume({ summary })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* ===== LEFT PANEL — Editor ===== */}
      <div className="w-[480px] flex flex-col border-r border-border bg-background shrink-0 overflow-hidden h-full">
        {/* Step navigation tabs — fixed, never scrolls */}
        <div className="shrink-0 px-6 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-1 flex-wrap">
            {STEPS.map((step, i) => (
              <button
                key={step.label}
                type="button"
                onClick={() => setCurrentStep(i)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium transition-all",
                  i === currentStep
                    ? "bg-primary text-primary-foreground"
                    : i < currentStep
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
                data-ocid={`resume.wizard.step.${i + 1}`}
              >
                {i < currentStep ? (
                  <Check size={11} />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.short}</span>
              </button>
            ))}
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Completion</span>
              <span>{resume.completionPercent}%</span>
            </div>
            <Progress value={resume.completionPercent} className="h-1.5" />
          </div>
        </div>

        {/* Editor scroll controls — always visible above the form */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border bg-muted/20">
          <span className="text-xs text-muted-foreground font-medium">
            {STEPS[currentStep].label}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollEditor("up")}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Scroll editor up"
              data-ocid="resume.editor.scroll_up_button"
            >
              <ChevronUp size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollEditor("down")}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Scroll editor down"
              data-ocid="resume.editor.scroll_down_button"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable form content — flex-1 + min-h-0 so it fills remaining space */}
        <div ref={editorScrollRef} className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6">{renderStep()}</div>
          </ScrollArea>
        </div>

        {/* Navigation buttons — shrink-0 keeps them always pinned at bottom */}
        <div className="shrink-0 p-4 border-t border-border flex items-center justify-between gap-3 bg-background">
          <Button
            variant="outline"
            onClick={prev}
            disabled={currentStep === 0}
            className="gap-1"
            data-ocid="resume.wizard.prev_button"
          >
            <ChevronLeft size={16} /> Previous
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
              disabled={saving}
              data-ocid="resume.save_button"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            {currentStep === STEPS.length - 1 ? (
              <Button
                onClick={() => navigate("/dashboard")}
                data-ocid="resume.finish_button"
              >
                Finish
              </Button>
            ) : (
              <Button
                onClick={next}
                className="gap-1"
                data-ocid="resume.wizard.next_button"
              >
                Next <ChevronRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL — Live Preview ===== */}
      <div className="flex-1 flex flex-col bg-muted/30 min-w-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background shrink-0">
          <h3 className="text-sm font-medium text-foreground">Live Preview</h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollPreview("up")}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Scroll preview up"
              data-ocid="resume.preview.scroll_up_button"
            >
              <ChevronUp size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollPreview("down")}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Scroll preview down"
              data-ocid="resume.preview.scroll_down_button"
            >
              <ChevronDown size={16} />
            </button>
            <div className="w-px h-4 bg-border mx-1" />
            <PdfExportButton
              targetId="resume-preview"
              filename={`${resume.personalInfo.firstName || "resume"}-resume.pdf`}
            />
          </div>
        </div>
        {/* Scrollable preview — plain div so useRef scrollBy works */}
        <div ref={previewScrollRef} className="flex-1 min-h-0 overflow-y-auto">
          <div className="p-6 flex justify-center">
            <div className="w-full max-w-[794px] shadow-xl">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
