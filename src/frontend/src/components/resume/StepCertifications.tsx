import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import type { CertificationEntry } from "../../hooks/useResume";

interface StepCertificationsProps {
  data: CertificationEntry[];
  onChange: (data: CertificationEntry[]) => void;
}

export default function StepCertifications({
  data,
  onChange,
}: StepCertificationsProps) {
  const add = () => {
    onChange([
      ...data,
      {
        id: `cert-${Date.now()}`,
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
      },
    ]);
  };

  const update = (id: string, updates: Partial<CertificationEntry>) => {
    onChange(data.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const remove = (id: string) => {
    onChange(data.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Certifications</h2>
        <p className="text-sm text-muted-foreground">
          Add your professional certifications and licenses.
        </p>
      </div>
      {data.map((cert, i) => (
        <div
          key={cert.id}
          className="p-4 border border-border rounded-lg space-y-3 bg-muted/20"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Certification {i + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive"
              onClick={() => remove(cert.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
          <div>
            <Label>Certification Name</Label>
            <Input
              value={cert.name}
              onChange={(e) => update(cert.id, { name: e.target.value })}
              placeholder="AWS Solutions Architect"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Issuing Organization</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => update(cert.id, { issuer: e.target.value })}
                placeholder="Amazon Web Services"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Issue Date</Label>
              <Input
                value={cert.date}
                onChange={(e) => update(cert.id, { date: e.target.value })}
                placeholder="2023-06"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Credential ID (optional)</Label>
            <Input
              value={cert.credentialId}
              onChange={(e) =>
                update(cert.id, { credentialId: e.target.value })
              }
              placeholder="ABC-12345"
              className="mt-1"
            />
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={add}
        className="w-full"
        data-ocid="resume.certifications.add_button"
      >
        <Plus size={16} className="mr-2" /> Add Certification
      </Button>
    </div>
  );
}
