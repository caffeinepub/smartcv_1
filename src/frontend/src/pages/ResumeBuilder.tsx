import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ResumeWizard from "../components/resume/ResumeWizard";

export default function ResumeBuilder() {
  const { id } = useParams<{ id: string }>();
  const resumeId = id === "new" ? undefined : id;
  return (
    <Layout title="Resume Builder" fullWidth>
      <ResumeWizard resumeId={resumeId} />
    </Layout>
  );
}
