import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { SkillEntry } from "../../hooks/useResume";

interface StepSkillsProps {
  data: SkillEntry[];
  onChange: (data: SkillEntry[]) => void;
}

export default function StepSkills({ data, onChange }: StepSkillsProps) {
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState<SkillEntry["level"]>("Intermediate");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    onChange([
      ...data,
      { id: `sk-${Date.now()}`, name: newSkill.trim(), level: newLevel },
    ]);
    setNewSkill("");
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((s) => s.id !== id));
  };

  const levelColors: Record<SkillEntry["level"], string> = {
    Beginner: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
    Intermediate:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    Advanced:
      "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400",
    Expert:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Add your technical and soft skills.
        </p>
      </div>
      {/* Add skill form */}
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g., React, Python, Leadership..."
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
          className="flex-1"
          data-ocid="resume.skill.input"
        />
        <Select
          value={newLevel}
          onValueChange={(v) => setNewLevel(v as SkillEntry["level"])}
        >
          <SelectTrigger className="w-36" data-ocid="resume.skill.level.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addSkill} data-ocid="resume.skill.add_button">
          <Plus size={16} />
        </Button>
      </div>
      {/* Skills display */}
      <div className="flex flex-wrap gap-2">
        {data.map((skill) => (
          <div
            key={skill.id}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${levelColors[skill.level]}`}
          >
            <span>{skill.name}</span>
            <span className="text-xs opacity-70">· {skill.level}</span>
            <button
              type="button"
              onClick={() => removeSkill(skill.id)}
              className="ml-1 hover:opacity-70 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No skills added yet. Start typing above.
          </p>
        )}
      </div>
      {/* Suggestions */}
      <div>
        <Label className="text-xs text-muted-foreground">Quick add:</Label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {[
            "JavaScript",
            "TypeScript",
            "React",
            "Python",
            "SQL",
            "AWS",
            "Docker",
            "Git",
            "Agile",
            "Leadership",
          ].map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => {
                if (!data.find((d) => d.name === s)) {
                  onChange([
                    ...data,
                    {
                      id: `sk-${Date.now()}-${s}`,
                      name: s,
                      level: "Intermediate",
                    },
                  ]);
                }
              }}
              className="text-xs px-2 py-1 rounded-full border border-border hover:bg-muted transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
