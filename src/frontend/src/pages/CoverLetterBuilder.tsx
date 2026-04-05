import { useParams } from "react-router-dom";
import CoverLetterEditor from "../components/cover-letter/CoverLetterEditor";
import Layout from "../components/layout/Layout";

export default function CoverLetterBuilder() {
  const { id } = useParams<{ id: string }>();
  const coverId = id === "new" ? undefined : id;
  return (
    <Layout title="Cover Letter Builder" fullWidth>
      <CoverLetterEditor coverId={coverId} />
    </Layout>
  );
}
