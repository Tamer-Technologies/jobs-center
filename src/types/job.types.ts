import { LucideIcon } from "lucide-react";

export type JobStatus = "Active" | "Pending" | "On Hold";

export type StateOptions = { styles: string; icon: LucideIcon };

export type JobCardData = {
  id: string;
  jobTitle: string;
  status: JobStatus;
  companyName: {
    type: "Company" | "Agency" | "Corporation";
    name: string;
  };
};

export interface Job extends JobCardData {
  description: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Freelance";
  workMode: "Remote" | "On-site" | "Hybrid";
  experienceLevel: "Junior" | "Mid" | "Senior" | "Lead";
  location?: string;
  salary?: {
    min?: number;
    max?: number;
    fixed?: number;
    currency: "USD" | "EUR" | "EGP";
    period: "Monthly" | "Yearly";
  };
  techStack?: string[];
}
