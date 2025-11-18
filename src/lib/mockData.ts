// Mock data for Cloud Cost Analyzer

export interface CostMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

export interface ServiceCost {
  name: string;
  cost: number;
  percentage: number;
}

export interface CostTrend {
  date: string;
  cost: number;
}

export interface Resource {
  id: string;
  name: string;
  service: string;
  region: string;
  cost: number;
  utilization: number;
  status: "active" | "idle" | "underutilized";
}

export interface Optimization {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  priority: "high" | "medium" | "low";
  category: string;
}

export const costMetrics: CostMetric[] = [
  {
    label: "Total Monthly Cost",
    value: "$18,432",
    change: 12.5,
    trend: "up",
  },
  {
    label: "Daily Average",
    value: "$614",
    change: -3.2,
    trend: "down",
  },
  {
    label: "Potential Savings",
    value: "$3,245",
    change: 0,
    trend: "down",
  },
  {
    label: "Active Resources",
    value: "247",
    change: 5.1,
    trend: "up",
  },
];

export const serviceCosts: ServiceCost[] = [
  { name: "Compute (EC2)", cost: 7234, percentage: 39.2 },
  { name: "Storage (S3)", cost: 4123, percentage: 22.4 },
  { name: "Database (RDS)", cost: 3456, percentage: 18.7 },
  { name: "Network & CDN", cost: 2189, percentage: 11.9 },
  { name: "Other Services", cost: 1430, percentage: 7.8 },
];

export const costTrends: CostTrend[] = [
  { date: "2024-01-15", cost: 16234 },
  { date: "2024-01-22", cost: 16890 },
  { date: "2024-01-29", cost: 17123 },
  { date: "2024-02-05", cost: 17456 },
  { date: "2024-02-12", cost: 17890 },
  { date: "2024-02-19", cost: 18234 },
  { date: "2024-02-26", cost: 18432 },
];

export const topResources: Resource[] = [
  {
    id: "i-0a1b2c3d4e5f",
    name: "prod-web-server-01",
    service: "EC2",
    region: "us-east-1",
    cost: 1234,
    utilization: 87,
    status: "active",
  },
  {
    id: "db-prod-mysql-01",
    name: "prod-database-primary",
    service: "RDS",
    region: "us-east-1",
    cost: 987,
    utilization: 92,
    status: "active",
  },
  {
    id: "i-9z8y7x6w5v4",
    name: "dev-test-server-03",
    service: "EC2",
    region: "us-west-2",
    cost: 856,
    utilization: 12,
    status: "underutilized",
  },
  {
    id: "bucket-prod-media",
    name: "production-media-storage",
    service: "S3",
    region: "us-east-1",
    cost: 743,
    utilization: 76,
    status: "active",
  },
  {
    id: "i-5u4t3s2r1q0",
    name: "staging-api-server",
    service: "EC2",
    region: "eu-west-1",
    cost: 634,
    utilization: 5,
    status: "idle",
  },
];

export const optimizations: Optimization[] = [
  {
    id: "opt-1",
    title: "Stop Idle EC2 Instances",
    description: "3 EC2 instances have been idle for over 7 days with <5% utilization",
    potentialSavings: 1245,
    priority: "high",
    category: "Compute",
  },
  {
    id: "opt-2",
    title: "Rightsize Underutilized Instances",
    description: "5 instances running at <20% capacity could be downsized",
    potentialSavings: 892,
    priority: "high",
    category: "Compute",
  },
  {
    id: "opt-3",
    title: "Use Reserved Instances",
    description: "Save 40% on stable workloads by committing to 1-year reserved instances",
    potentialSavings: 678,
    priority: "medium",
    category: "Compute",
  },
  {
    id: "opt-4",
    title: "Clean Up Old Snapshots",
    description: "Delete 127 snapshots older than 90 days",
    potentialSavings: 234,
    priority: "medium",
    category: "Storage",
  },
  {
    id: "opt-5",
    title: "Enable S3 Lifecycle Policies",
    description: "Transition infrequently accessed data to cheaper storage tiers",
    potentialSavings: 196,
    priority: "low",
    category: "Storage",
  },
];
