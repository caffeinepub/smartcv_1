import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { ExperienceEntry } from "../../hooks/useResume";

interface StepExperienceProps {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

export default function StepExperience({
  data,
  onChange,
}: StepExperienceProps) {
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: `exp-${Date.now()}`,
        company: "",
        title: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const updateEntry = (id: string, updates: Partial<ExperienceEntry>) => {
    onChange(data.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const removeEntry = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your professional experience, most recent first.
        </p>
      </div>
      {data.map((exp, i) => (
        <div
          key={exp.id}
          className="p-4 border border-border rounded-lg space-y-3 bg-muted/20"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Experience {i + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => removeEntry(exp.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Job Title</Label>
              <Input
                value={exp.title}
                onChange={(e) => updateEntry(exp.id, { title: e.target.value })}
                placeholder="Senior Developer"
                className="mt-1"
                data-ocid={`resume.experience.title.input.${i + 1}`}
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                onChange={(e) =>
                  updateEntry(exp.id, { company: e.target.value })
                }
                placeholder="TechCorp Inc."
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={exp.location}
              onChange={(e) =>
                updateEntry(exp.id, { location: e.target.value })
              }
              placeholder="San Francisco, CA"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input
                value={exp.startDate}
                onChange={(e) =>
                  updateEntry(exp.id, { startDate: e.target.value })
                }
                placeholder="2021-01"
                className="mt-1"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                value={exp.endDate}
                onChange={(e) =>
                  updateEntry(exp.id, { endDate: e.target.value })
                }
                placeholder="2024-06"
                className="mt-1"
                disabled={exp.current}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current}
              onCheckedChange={(c) => updateEntry(exp.id, { current: !!c })}
            />
            <Label
              htmlFor={`current-${exp.id}`}
              className="text-sm cursor-pointer"
            >
              Currently working here
            </Label>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={exp.description}
              onChange={(e) =>
                updateEntry(exp.id, { description: e.target.value })
              }
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
              className="mt-1"
              data-ocid={`resume.experience.description.textarea.${i + 1}`}
            />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={addEntry}
        className="w-full"
        data-ocid="resume.experience.add_button"
      >
        <Plus size={16} className="mr-2" /> Add Experience
      </Button>
    </div>
  );
}
