import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import { costMetrics, serviceCosts, topResources, optimizations } from "@/lib/mockData";

export const ExportReport = () => {
  const { toast } = useToast();

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue
    doc.text("Cloud Cost Analysis Report", pageWidth / 2, y, { align: "center" });
    y += 15;

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, y, { align: "center" });
    y += 15;

    // Cost Metrics Section
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Cost Metrics Overview", 15, y);
    y += 10;

    doc.setFontSize(10);
    costMetrics.forEach((metric) => {
      doc.text(`${metric.label}: ${metric.value}`, 20, y);
      doc.text(`Change: ${metric.change > 0 ? "+" : ""}${metric.change}%`, 120, y);
      y += 7;
    });
    y += 10;

    // Service Breakdown Section
    doc.setFontSize(14);
    doc.text("Service Cost Breakdown", 15, y);
    y += 10;

    doc.setFontSize(10);
    serviceCosts.forEach((service) => {
      doc.text(service.name, 20, y);
      doc.text(`$${service.cost.toLocaleString()}`, 120, y);
      doc.text(`${service.percentage}%`, 170, y);
      y += 7;
    });
    y += 10;

    // Top Resources Section
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.text("Top Cost Resources", 15, y);
    y += 10;

    doc.setFontSize(9);
    topResources.slice(0, 5).forEach((resource) => {
      doc.text(resource.name, 20, y);
      doc.text(`$${resource.cost}`, 120, y);
      doc.text(`${resource.utilization}%`, 160, y);
      y += 7;
    });
    y += 10;

    // Optimization Opportunities Section
    if (y > 220) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(239, 68, 68); // Red
    doc.text("Optimization Opportunities", 15, y);
    y += 10;

    doc.setFontSize(10);
    doc.setTextColor(0);
    optimizations.forEach((opt) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      
      doc.setFont(undefined, "bold");
      doc.text(opt.title, 20, y);
      y += 5;
      
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      const descLines = doc.splitTextToSize(opt.description, 170);
      doc.text(descLines, 20, y);
      y += descLines.length * 5;
      
      doc.text(`Savings: $${opt.potentialSavings}/mo | Priority: ${opt.priority}`, 20, y);
      y += 10;
    });

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Cloud Cost Analyzer - Page ${i} of ${totalPages}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    // Save PDF
    doc.save(`cloud-cost-report-${new Date().toISOString().split('T')[0]}.pdf`);

    toast({
      title: "Report Exported",
      description: "PDF report downloaded successfully",
    });
  };

  return (
    <Button
      onClick={generatePDF}
      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
    >
      <Download className="mr-2 h-4 w-4" />
      Export PDF Report
    </Button>
  );
};
