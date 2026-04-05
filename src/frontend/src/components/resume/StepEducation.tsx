import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { EducationEntry } from "../../hooks/useResume";

interface StepEducationProps {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

export default function StepEducation({ data, onChange }: StepEducationProps) {
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: `edu-${Date.now()}`,
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
        description: "",
      },
    ]);
  };

  const updateEntry = (id: string, updates: Partial<EducationEntry>) => {
    onChange(data.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const removeEntry = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your educational background.
        </p>
      </div>
      {data.map((edu, i) => (
        <div
          key={edu.id}
          className="p-4 border border-border rounded-lg space-y-3 bg-muted/20"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Education {i + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => removeEntry(edu.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div>
            <Label>School / University</Label>
            <Input
              value={edu.school}
              onChange={(e) => updateEntry(edu.id, { school: e.target.value })}
              placeholder="University of California"
              className="mt-1"
              data-ocid={`resume.education.school.input.${i + 1}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Degree</Label>
              <Input
                value={edu.degree}
                onChange={(e) =>
                  updateEntry(edu.id, { degree: e.target.value })
                }
                placeholder="Bachelor of Science"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Field of Study</Label>
              <Input
                value={edu.field}
                onChange={(e) => updateEntry(edu.id, { field: e.target.value })}
                placeholder="Computer Science"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Start Date</Label>
              <Input
                value={edu.startDate}
                onChange={(e) =>
                  updateEntry(edu.id, { startDate: e.target.value })
                }
                placeholder="2019-09"
                className="mt-1"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                value={edu.endDate}
                onChange={(e) =>
                  updateEntry(edu.id, { endDate: e.target.value })
                }
                placeholder="2023-05"
                className="mt-1"
              />
            </div>
            <div>
              <Label>GPA</Label>
              <Input
                value={edu.gpa}
                onChange={(e) => updateEntry(edu.id, { gpa: e.target.value })}
                placeholder="3.8"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Description (optional)</Label>
            <Textarea
              value={edu.description}
              onChange={(e) =>
                updateEntry(edu.id, { description: e.target.value })
              }
              placeholder="Relevant coursework, honors, activities..."
              rows={2}
              className="mt-1"
            />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={addEntry}
        className="w-full"
        data-ocid="resume.education.add_button"
      >
        <Plus size={16} className="mr-2" /> Add Education
      </Button>
    </div>
  );
}
