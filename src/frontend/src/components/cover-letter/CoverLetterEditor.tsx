import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Italic,
  Lightbulb,
  Sparkles,
  Type,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCoverLetter } from "../../hooks/useCoverLetter";
import PdfExportButton from "../ui/PdfExportButton";

const CL_TEMPLATES = [
  { id: "cl-1", name: "Classic", bg: "#ffffff", accent: "#1a365d" },
  { id: "cl-2", name: "Modern", bg: "#f8fafc", accent: "#0E7C86" },
  { id: "cl-3", name: "Bold", bg: "#f0fdf4", accent: "#15803d" },
  { id: "cl-4", name: "Elegant", bg: "#faf5ff", accent: "#7c3aed" },
  { id: "cl-5", name: "Executive", bg: "#fff7ed", accent: "#c2410c" },
];

const AI_SUGGESTIONS = [
  {
    id: "ai-1",
    label: "Opening hook",
    text: "I am writing to express my strong interest in the [Position] role at [Company]. With [X] years of experience in [field], I am confident I can make an immediate and meaningful contribution to your team.",
  },
  {
    id: "ai-2",
    label: "Achievement highlight",
    text: "In my most recent role at [Company], I [specific achievement with metric], resulting in [quantifiable impact]. This experience has prepared me to bring similar results to your organization.",
  },
  {
    id: "ai-3",
    label: "Cultural fit",
    text: "What excites me most about [Company] is [specific company value/product/mission]. I have long admired your commitment to [specific aspect], and I believe my background in [area] aligns perfectly with this vision.",
  },
  {
    id: "ai-4",
    label: "Strong close",
    text: "I would welcome the opportunity to discuss how my experience and passion for [field] can contribute to [Company]'s continued success. I look forward to speaking with you.",
  },
];

const TOOLBAR_ICONS = [
  { Icon: Bold, label: "Bold" },
  { Icon: Italic, label: "Italic" },
  { Icon: AlignLeft, label: "Align Left" },
  { Icon: AlignCenter, label: "Align Center" },
  { Icon: Type, label: "Font" },
];

interface CoverLetterEditorProps {
  coverId?: string;
}

export default function CoverLetterEditor({ coverId }: CoverLetterEditorProps) {
  const { coverLetter, updateCoverLetter } = useCoverLetter(coverId);
  const [showAi, setShowAi] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Cover letter saved!");
  };

  const insertSuggestion = (text: string) => {
    updateCoverLetter({
      body: coverLetter.body + (coverLetter.body ? "\n\n" : "") + text,
    });
  };

  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Template Sidebar */}
      <div className="w-48 border-r border-border bg-muted/30 p-3 shrink-0">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Templates
        </h4>
        <div className="space-y-2">
          {CL_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => updateCoverLetter({ templateId: tpl.id })}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-all text-left",
                coverLetter.templateId === tpl.id
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "hover:bg-muted text-foreground border border-transparent",
              )}
              data-ocid={`cover.template.${tpl.id}.button`}
            >
              <div
                className="w-8 h-10 rounded border border-border shrink-0"
                style={{ background: tpl.bg }}
              >
                <div
                  className="h-1.5 w-full rounded-t"
                  style={{ background: tpl.accent }}
                />
              </div>
              <span className="text-xs">{tpl.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-muted-foreground mr-2">
              Format:
            </span>
            {TOOLBAR_ICONS.map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setShowAi(!showAi)}
              data-ocid="cover.ai.toggle"
            >
              <Sparkles size={12} className="text-primary" />
              AI Suggestions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs"
              onClick={handleSave}
              disabled={saving}
              data-ocid="cover.save_button"
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <PdfExportButton
              targetId="cover-letter-preview"
              filename="cover-letter.pdf"
              className="h-7 text-xs"
            />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Editor */}
          <ScrollArea className="flex-1">
            <div className="p-6 max-w-3xl mx-auto">
              <div
                id="cover-letter-preview"
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden"
                style={{ minHeight: "842px" }}
              >
                {/* Header fields */}
                <div
                  className="px-8 py-6 border-b"
                  style={{
                    background:
                      CL_TEMPLATES.find((t) => t.id === coverLetter.templateId)
                        ?.bg || "#ffffff",
                    borderColor: CL_TEMPLATES.find(
                      (t) => t.id === coverLetter.templateId,
                    )?.accent,
                    borderBottomWidth: "3px",
                  }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Your Name</Label>
                      <Input
                        value={coverLetter.yourName}
                        onChange={(e) =>
                          updateCoverLetter({ yourName: e.target.value })
                        }
                        placeholder="Alex Johnson"
                        className="mt-0.5 bg-white/80"
                        data-ocid="cover.name.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Position</Label>
                      <Input
                        value={coverLetter.jobTitle}
                        onChange={(e) =>
                          updateCoverLetter({ jobTitle: e.target.value })
                        }
                        placeholder="Senior Engineer"
                        className="mt-0.5 bg-white/80"
                        data-ocid="cover.jobtitle.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Company</Label>
                      <Input
                        value={coverLetter.company}
                        onChange={(e) =>
                          updateCoverLetter({ company: e.target.value })
                        }
                        placeholder="Google"
                        className="mt-0.5 bg-white/80"
                        data-ocid="cover.company.input"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date</Label>
                      <Input
                        value={coverLetter.date}
                        onChange={(e) =>
                          updateCoverLetter({ date: e.target.value })
                        }
                        placeholder="April 5, 2026"
                        className="mt-0.5 bg-white/80"
                        data-ocid="cover.date.input"
                      />
                    </div>
                  </div>
                </div>

                {/* Letter body */}
                <div className="p-8">
                  <Textarea
                    value={coverLetter.body}
                    onChange={(e) =>
                      updateCoverLetter({ body: e.target.value })
                    }
                    placeholder={
                      "Dear Hiring Manager,\n\nStart writing your cover letter here..."
                    }
                    className="min-h-[500px] border-0 resize-none text-sm leading-relaxed focus-visible:ring-0 bg-transparent p-0"
                    style={{ fontFamily: "Georgia, serif" }}
                    data-ocid="cover.body.textarea"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* AI Suggestions Panel */}
          {showAi && (
            <div className="w-64 border-l border-border bg-muted/30 p-4 shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={16} className="text-amber-500" />
                <h4 className="text-sm font-semibold">AI Suggestions</h4>
              </div>
              <div className="space-y-3">
                {AI_SUGGESTIONS.map((s, i) => (
                  <div
                    key={s.id}
                    className="p-3 bg-background border border-border rounded-lg"
                  >
                    <p className="text-xs font-medium text-foreground mb-1">
                      {s.label}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-2">
                      {s.text}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full h-6 text-xs"
                      onClick={() => insertSuggestion(s.text)}
                      data-ocid={`cover.ai.suggestion.button.${i + 1}`}
                    >
                      Insert
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
