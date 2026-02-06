import { LucideIcon } from "lucide-react";

export type JobStatus = "Active" | "Pending" | "On Hold";

export type StateOptions = { styles: string; icon: LucideIcon };

export type JobCardData = {
  jobTitle: string;
  status: JobStatus;
  companyName: {
    type: string;
    name: string;
  };
};
