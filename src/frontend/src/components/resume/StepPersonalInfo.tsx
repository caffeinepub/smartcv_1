import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeData } from "../../hooks/useResume";

interface StepPersonalInfoProps {
  data: ResumeData["personalInfo"];
  onChange: (updates: Partial<ResumeData["personalInfo"]>) => void;
}

export default function StepPersonalInfo({
  data,
  onChange,
}: StepPersonalInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Personal Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Your contact details and basic info.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="John"
            className="mt-1"
            data-ocid="resume.firstname.input"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="Smith"
            className="mt-1"
            data-ocid="resume.lastname.input"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="john@example.com"
            className="mt-1"
            data-ocid="resume.email.input"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="mt-1"
            data-ocid="resume.phone.input"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="San Francisco, CA"
          className="mt-1"
          data-ocid="resume.location.input"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="yoursite.com"
            className="mt-1"
            data-ocid="resume.website.input"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => onChange({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/you"
            className="mt-1"
            data-ocid="resume.linkedin.input"
          />
        </div>
      </div>
    </div>
  );
}
