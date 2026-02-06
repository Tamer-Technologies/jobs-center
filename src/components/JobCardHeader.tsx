import { ComponentProps } from "react";
import { CardHeader, CardTitle } from "./ui/card";
import { StateOptions } from "./JobCard";
import { cn } from "@/lib/utils";

interface JobCardHeader extends ComponentProps<typeof CardHeader> {
  jobTitle: string;
  status: string;
  stateOptions: StateOptions;
}

const JobCardHeader = ({
  jobTitle,
  status,
  stateOptions,
  ...props
}: JobCardHeader) => {
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
    </CardHeader>
  );
};

export default JobCardHeader;
