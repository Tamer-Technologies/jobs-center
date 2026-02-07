import { Card, CardFooter } from "./ui/card";
import { ComponentProps } from "react";
import JobCardHeader from "./JobCardHeader";
import type { JobCardData } from "@/types/job.types";

interface JobCardProps
  extends ComponentProps<typeof Card>, Omit<JobCardData, "id"> {}

const JobCard = ({ jobTitle, status, companyName, ...props }: JobCardProps) => {
  return (
    <Card {...props}>
      <JobCardHeader jobTitle={jobTitle} status={status} />
      <CardFooter>
        {companyName.type}: {companyName.name}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
