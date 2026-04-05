import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PdfExportButtonProps {
  targetId: string;
  filename?: string;
  className?: string;
}

export default function PdfExportButton({
  targetId,
  filename = "resume.pdf",
  className,
}: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const exportPdf = async () => {
    setLoading(true);
    try {
      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const html2canvas = html2canvasModule.default;
      const { jsPDF } = jsPDFModule;

      const element = document.getElementById(targetId);
      if (!element) {
        toast.error("Could not find preview element");
        return;
      }
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(filename);
      toast.success("PDF exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Export failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={exportPdf}
      disabled={loading}
      className={className}
      data-ocid="pdf.export_button"
    >
      {loading ? (
        <Loader2 size={16} className="mr-2 animate-spin" />
      ) : (
        <Download size={16} className="mr-2" />
      )}
      {loading ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
