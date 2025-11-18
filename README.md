CLOUD COST ANALYSER
Intelligent Multi-Cloud Cost Optimization Platform
A comprehensive FinOps dashboard for analyzing, forecasting, and optimizing cloud infrastructure costs across AWS, Azure, and GCP.


🎯 Overview
Cloud Cost Analyzer is a professional-grade FinOps tool designed to help organizations monitor, analyze, and optimize their cloud spending across multiple providers. Built with modern web technologies, it provides real-time insights, AI-powered recommendations, and actionable cost reduction strategies.

✨ Key Highlights
 Multi-Cloud Support - Compare costs across AWS, Azure, and GCP
 AI-Powered Insights - Machine learning-driven cost optimization recommendations
 Predictive Analytics - Forecast future spending with trend analysis
 Smart Alerts - Budget monitoring with proactive notifications
 Tag Management - Segment costs by environment, department, or project
 Automated Reporting - Generate weekly cost summaries and export to PDF
 Real-time Analysis - Instant visualization of spending patterns

🚀 Features
1. Budget Alerts System :
Set monthly budget thresholds
Real-time tracking of spending vs budget
Predictive alerts: "You will cross your ₹5,000 budget in 8 days"
Visual progress indicators with percentage breakdowns
2. Tag-Based Cost Segmentation :
Filter costs by Environment (Production, Testing, Development)
Department-level analysis (AI Team, Backend Team, etc.)
Project-wise breakdown (Research, SIH, College App)
Multi-select filtering for granular insights
3. AI-Powered Cost Reduction Strategies :
Automated analysis of spending patterns
Intelligent recommendations:
Reserved instance optimization
Spot instance suggestions
Storage tier migration (hot → cold)
Idle resource identification
Priority-based action items (High, Medium, Low)
4. Hourly Scheduling Simulator :
Calculate savings from automated shutdowns
Simulate night-time instance termination (8 PM - 8 AM)
Weekend shutdown scenarios
ROI calculator for automation implementation
5. Multi-Cloud Cost Comparison :
Side-by-side comparison of AWS, Azure, and GCP pricing
Storage tier analysis across providers:
AWS: S3 Standard, S3 IA, Glacier
Azure: Hot, Cool, Archive
GCP: Standard, Nearline, Coldline, Archive
Migration cost calculator
Best value recommendations
6. Trend Insights & Analytics :
Auto-generated spending summaries
Pattern recognition (stable, increasing, decreasing)
Service-level trend analysis
Anomaly highlighting
7. Cost Forecasting :
30-day cost predictions using linear regression
Confidence intervals and prediction accuracy
Visual trend lines with historical data
Budget impact projections
8. Anomaly Detection :
Automatic spike detection
Unusual spending pattern alerts
Root cause analysis
Historical anomaly tracking
9. Weekly Email Generator :
Automated cost summary generation
Key metrics and insights
Downloadable .txt format
Customizable reporting periods
10. Export & Reporting :
PDF export with charts and tables
CSV data export
Custom date range selection
Professional formatting
11. Savings Calculator :
Reserved instance savings estimator
Spot instance cost reduction calculator
Storage tier migration savings
Right-sizing recommendations

🛠️ Tech Stack
Frontend:
React 18.3 - UI framework
TypeScript - Type safety
Vite - Build tool & dev server
Tailwind CSS - Utility-first styling
shadcn/ui - Component library

Data Visualization:
Recharts - Interactive charts and graphs
Lucide React - Icon library

Backend & AI:
Supabase - Database & authentication
Edge Functions - Serverless AI processing
Gemini AI - Cost optimization recommendations
Additional Libraries
React Hook Form - Form management
Zod - Schema validation
jsPDF - PDF generation
date-fns - Date manipulation
Sonner - Toast notifications

Installation
Prerequisites
Node.js 18+ and npm
Git
Setup Steps

# Clone the repository
git clone <YOUR_GIT_URL>
cd cloud-cost-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
The application will be available at http://localhost:5173

Build for Production

npm run build
npm run preview

 Usage Guide
1. Upload Cost Data
Click the "Upload CSV" button in the Data Upload section
Select your cloud billing CSV file

Supported format:

Service,UsageHours,StorageGB,Cost,Date
Compute,50,0,120,2024-01-15
Storage,0,100,30,2024-01-15
Database,20,10,40,2024-01-15
2. Set Budget Alerts
Navigate to Budget Alerts section
Set your monthly budget threshold
Monitor real-time spending progress
Receive predictive alerts before exceeding budget
3. Filter by Tags
Use Tag Filters panel to segment costs
Select environment, department, or project
Combine multiple filters for detailed analysis
4. Get AI Recommendations
View AI-powered optimization strategies
Click on recommendations for detailed implementation steps
Apply suggestions to reduce costs
5. Compare Cloud Providers
Use Cloud Comparison tool
Select services to compare
View pricing differences across AWS, Azure, and GCP
Calculate migration savings
6. Generate Reports
Navigate to Weekly Email Generator
Review auto-generated summary
Download as .txt file or export to PDF

PROJECT STRUCTURE
 cloud-cost-analyzer/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── CostTrendChart.tsx
│   │   │   ├── ServiceBreakdown.tsx
│   │   │   ├── ResourcesTable.tsx
│   │   │   └── OptimizationPanel.tsx
│   │   ├── ui/
│   │   ├── AIRecommendations.tsx
│   │   ├── AnomalyDetection.tsx
│   │   ├── BudgetAlerts.tsx
│   │   ├── CloudComparison.tsx
│   │   ├── CostForecast.tsx
│   │   ├── CostReductionStrategies.tsx
│   │   ├── DataUpload.tsx
│   │   ├── ExportReport.tsx
│   │   ├── SavingsCalculator.tsx
│   │   ├── SchedulingSimulator.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── TagFilters.tsx
│   │   ├── TrendInsights.tsx
│   │   └── WeeklyEmailGenerator.tsx
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── mockData.ts
│   │   └── utils.ts
│   ├── integrations/
│   │   └── supabase/
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   └── analyze-costs/
│   └── config.toml
└── public/


🎓 Use Cases
Enterprise FinOps Teams
Multi-team cost allocation
Budget enforcement
Optimization tracking
Cloud Architects
Infrastructure cost planning
Migration cost analysis
Right-sizing recommendations
Startups & SMBs
Cost-conscious scaling
Budget monitoring
Waste reduction
Educational Projects
Cloud computing coursework
FinOps certification preparation
DevOps portfolio projects
