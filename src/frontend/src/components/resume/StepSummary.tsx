import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";

interface StepSummaryProps {
  value: string;
  onChange: (v: string) => void;
}

const AI_IMPROVED =
  "Results-driven software engineer with 5+ years of experience architecting and delivering scalable, high-performance applications used by thousands of users. Proven track record of leading cross-functional teams to ship product features 20% faster through rigorous agile methodologies. Deep expertise in React, TypeScript, and cloud infrastructure, with a passion for clean code and exceptional user experiences. Seeking to leverage my technical leadership and full-stack capabilities in a senior engineering role at an innovative company.";

export default function StepSummary({ value, onChange }: StepSummaryProps) {
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");

  const runAiImprove = async () => {
    setAiLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAiResult(AI_IMPROVED);
    setAiLoading(false);
  };

  const applyAi = () => {
    onChange(aiResult);
    setShowAiModal(false);
    setAiResult("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Professional Summary</h2>
        <p className="text-sm text-muted-foreground">
          Write a compelling 2-3 sentence summary of your professional profile.
        </p>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label>Summary</Label>
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1"
            onClick={() => {
              setShowAiModal(true);
              runAiImprove();
            }}
            data-ocid="resume.summary.ai_improve.button"
          >
            <Sparkles size={12} className="text-primary" />
            AI Improve
          </Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software engineer with a track record of..."
          rows={6}
          data-ocid="resume.summary.textarea"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {value.length} characters
        </p>
      </div>

      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="max-w-xl" data-ocid="ai.improve.modal">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles size={18} className="text-primary" />
              AI-Improved Summary
            </DialogTitle>
            <DialogDescription>
              Our AI has enhanced your summary with stronger language and impact
              metrics.
            </DialogDescription>
          </DialogHeader>
          {aiLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">
                Analyzing and improving your summary...
              </span>
            </div>
          ) : (
            <>
              <div className="p-3 bg-muted rounded-lg text-sm text-foreground leading-relaxed">
                {aiResult}
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowAiModal(false)}
                  data-ocid="ai.improve.cancel_button"
                >
                  Discard
                </Button>
                <Button onClick={applyAi} data-ocid="ai.improve.confirm_button">
                  <Sparkles size={14} className="mr-1" /> Apply Improvement
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
