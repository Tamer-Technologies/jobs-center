import { ComponentProps } from "react";
import { CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { JobStatus, StateOptions } from "@/types/job.types";
import { BriefcaseBusinessIcon, Clock4, Zap } from "lucide-react";

interface JobCardHeader extends ComponentProps<typeof CardHeader> {
  jobTitle: string;
  status: JobStatus;
}

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

const JobCardHeader = ({
  jobTitle,
  status,
  children,
  ...props
}: JobCardHeader) => {
  const stateOptions = iconList[status];
  return (
    <CardHeader className="grid-cols-[1fr_auto] items-center" {...props}>
      <CardTitle className="md:text-2xl">{jobTitle}</CardTitle>
      <p
        className={cn(
          "flex items-center gap-1.5 [&_svg:not([class*='size-'])]:size-4",
          stateOptions.styles,
        )}
      >
        {status}
        <stateOptions.icon />
      </p>
      {children}
    </CardHeader>
  );
};

export default JobCardHeader;
