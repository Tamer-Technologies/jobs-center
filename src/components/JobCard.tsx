import { BriefcaseBusinessIcon, Clock4, Zap } from "lucide-react";
import { Card, CardFooter } from "./ui/card";
import { ComponentProps } from "react";
import JobCardHeader from "./JobCardHeader";
import type { JobCardData, JobStatus, StateOptions } from "@/types/job.types";

interface JobCardProps extends ComponentProps<typeof Card>, JobCardData {}

const iconList: Record<JobStatus, StateOptions> = {
  Active: {
    styles: "text-status-active",
    icon: Zap,
  },
  Pending: {
    styles: "text-status-pending",
    icon: Clock4,
  },
  "On Hold": {
    styles: "text-status-on-hold",
    icon: BriefcaseBusinessIcon,
  },
};

const JobCard = ({ jobTitle, status, companyName, ...props }: JobCardProps) => {
  const stateOptions = iconList[status];
  return (
    <Card {...props}>
      <JobCardHeader
        jobTitle={jobTitle}
        status={status}
        stateOptions={stateOptions}
      />
      <CardFooter>
        {companyName.type}: {companyName.name}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
