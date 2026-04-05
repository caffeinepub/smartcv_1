import type { ResumeData } from "../../hooks/useResume";

interface ResumePreviewProps {
  resume: ResumeData;
  id?: string;
}

export default function ResumePreview({
  resume,
  id = "resume-preview",
}: ResumePreviewProps) {
  const info = resume.personalInfo;
  const fullName = `${info.firstName} ${info.lastName}`.trim() || "Your Name";

  return (
    <div
      id={id}
      className="bg-white text-gray-900 shadow-lg"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "11px",
        lineHeight: "1.5",
        padding: "32px 36px",
        minHeight: "842px",
        width: "100%",
        maxWidth: "794px",
      }}
    >
      {/* Header */}
      <div
        className="text-center border-b-2 pb-4 mb-4"
        style={{ borderColor: "#b45309" }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#111827",
            marginBottom: "4px",
          }}
        >
          {fullName}
        </h1>
        <div
          className="flex flex-wrap justify-center gap-3 text-xs"
          style={{ color: "#6b7280" }}
        >
          {info.email && <span>{info.email}</span>}
          {info.phone && <span>· {info.phone}</span>}
          {info.location && <span>· {info.location}</span>}
          {info.website && <span>· {info.website}</span>}
          {info.linkedin && <span>· {info.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {(info.summary || resume.summary) && (
        <Section title="Professional Summary">
          <p style={{ color: "#374151", lineHeight: "1.6" }}>
            {resume.summary || info.summary}
          </p>
        </Section>
      )}

      {/* Dynamic sections based on sectionOrder */}
      {resume.sectionOrder.map((section) => {
        if (section === "experience" && resume.experience.length > 0) {
          return (
            <Section key={section} title="Experience">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong style={{ fontSize: "12px" }}>{exp.title}</strong>{" "}
                      at <span style={{ color: "#92400e" }}>{exp.company}</span>
                      {exp.location && ` · ${exp.location}`}
                    </div>
                    <span style={{ color: "#6b7280", fontSize: "10px" }}>
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p style={{ color: "#4b5563", marginTop: "4px" }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          );
        }
        if (section === "education" && resume.education.length > 0) {
          return (
            <Section key={section} title="Education">
              {resume.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <strong>{edu.school}</strong>
                      {" — "}
                      <span style={{ color: "#4b5563" }}>
                        {edu.degree}
                        {edu.field ? ` in ${edu.field}` : ""}
                      </span>
                      {edu.gpa && ` · GPA: ${edu.gpa}`}
                    </div>
                    <span style={{ color: "#6b7280", fontSize: "10px" }}>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p style={{ color: "#4b5563", marginTop: "2px" }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          );
        }
        if (section === "skills" && resume.skills.length > 0) {
          return (
            <Section key={section} title="Skills">
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      background: "#fef3c7",
                      border: "1px solid #fcd34d",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      fontSize: "10px",
                      color: "#92400e",
                    }}
                  >
                    {skill.name} · {skill.level}
                  </span>
                ))}
              </div>
            </Section>
          );
        }
        if (section === "projects" && resume.projects.length > 0) {
          return (
            <Section key={section} title="Projects">
              {resume.projects.map((proj) => (
                <div key={proj.id} className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <strong>{proj.name}</strong>
                    {proj.url && (
                      <span style={{ color: "#374151", fontSize: "10px" }}>
                        {proj.url}
                      </span>
                    )}
                  </div>
                  {proj.technologies && (
                    <p style={{ color: "#6b7280", fontSize: "10px" }}>
                      {proj.technologies}
                    </p>
                  )}
                  {proj.description && (
                    <p style={{ color: "#4b5563", marginTop: "2px" }}>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </Section>
          );
        }
        if (section === "certifications" && resume.certifications.length > 0) {
          return (
            <Section key={section} title="Certifications">
              {resume.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="flex justify-between items-baseline mb-2"
                >
                  <div>
                    <strong>{cert.name}</strong>
                    {cert.issuer && (
                      <span style={{ color: "#6b7280" }}> — {cert.issuer}</span>
                    )}
                  </div>
                  <span style={{ color: "#6b7280", fontSize: "10px" }}>
                    {cert.date}
                  </span>
                </div>
              ))}
            </Section>
          );
        }
        return null;
      })}
    </div>
  );
}

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2
        style={{
          fontSize: "13px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#374151",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "3px",
          marginBottom: "8px",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
