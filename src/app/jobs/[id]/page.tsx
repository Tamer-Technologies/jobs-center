import { ComponentProps } from "react";
import { JobDetailsClient } from "@/components/JobDetailsClient";

interface JobDetailsProps extends ComponentProps<"div"> {
  params: Promise<{
    id: string;
  }>;
}

const JobDetails = async ({ params }: JobDetailsProps) => {
  const jobId = (await params).id;

  // fetch where the object has the same id in Jobs object

  return <JobDetailsClient jobId={jobId} />;
};

export default JobDetails;
