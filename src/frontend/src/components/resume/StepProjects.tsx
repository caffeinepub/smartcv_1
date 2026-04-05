import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { ProjectEntry } from "../../hooks/useResume";

interface StepProjectsProps {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

export default function StepProjects({ data, onChange }: StepProjectsProps) {
  const add = () => {
    onChange([
      ...data,
      {
        id: `proj-${Date.now()}`,
        name: "",
        description: "",
        url: "",
        technologies: "",
      },
    ]);
  };

  const update = (id: string, updates: Partial<ProjectEntry>) => {
    onChange(data.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const remove = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your notable projects.
        </p>
      </div>
      {data.map((proj, i) => (
        <div
          key={proj.id}
          className="p-4 border border-border rounded-lg space-y-3 bg-muted/20"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Project {i + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => remove(proj.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div>
            <Label>Project Name</Label>
            <Input
              value={proj.name}
              onChange={(e) => update(proj.id, { name: e.target.value })}
              placeholder="My Awesome Project"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Project URL</Label>
            <Input
              value={proj.url}
              onChange={(e) => update(proj.id, { url: e.target.value })}
              placeholder="github.com/user/project"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Technologies Used</Label>
            <Input
              value={proj.technologies}
              onChange={(e) =>
                update(proj.id, { technologies: e.target.value })
              }
              placeholder="React, Node.js, PostgreSQL"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={proj.description}
              onChange={(e) => update(proj.id, { description: e.target.value })}
              placeholder="Describe the project and your role..."
              rows={3}
              className="mt-1"
            />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={add}
        className="w-full"
        data-ocid="resume.projects.add_button"
      >
        <Plus size={16} className="mr-2" /> Add Project
      </Button>
    </div>
  );
}
