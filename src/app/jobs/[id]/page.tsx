import JobCardHeader from "@/components/JobCardHeader";
import JobDetailItem from "@/components/JobDetailItem";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { jobsDetailsData } from "@/constants/pagesContent/jobsContent";
import { formatSalary } from "@/lib/formatters";
import {
  BriefcaseBusinessIcon,
  Building2,
  MapPin,
  Banknote,
  Monitor,
  Clock,
} from "lucide-react";
import { ComponentProps } from "react";

interface JobDetailsProps extends ComponentProps<"div"> {
  params: Promise<{
    id: string;
  }>;
}

const JobDetails = async ({ params }: JobDetailsProps) => {
  const jobId = (await params).id;

  // fetch where the object has the same id in Jobs object

  const data = jobsDetailsData.find(
    (item) => String(item.id) === String(jobId),
  );

  if (!data) {
    return (
      <Card>
        <CardContent>Job not found</CardContent>
      </Card>
    );
  }

  return (
    <div className="container">
      <Card className=" max-w-170 mx-auto">
        <div className="sr-only">
          <h1>{data?.jobTitle}</h1>
          <span>{data?.status}</span>
        </div>

        <JobCardHeader
          jobTitle={data?.jobTitle}
          status={data?.status}
          aria-hidden="true"
        >
          <div className="flex gap-2 items-center text-primary">
            <Building2 className="size-4" />
            <span>{data?.companyName.name}</span>
            <span className="text-primary/60">•</span>
            <span className="text-sm">{data?.companyName.type}</span>
          </div>
        </JobCardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-7">
          <div className="flex flex-col gap-7">
            <div className="flex gap-5">
              <div className="text-2xl flex gap-2">
                <BriefcaseBusinessIcon className="mt-1.25" /> experience:
                <span>{data?.experienceLevel}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-3">About the Role</h2>
              <p className="text-primary">{data?.description}</p>
            </div>

            <div>
              <h2 className="text-xl mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-4 text-sm">
                {data?.techStack?.length ? (
                  data.techStack.map((item) => (
                    <p className="bg-accent py-1 px-2 rounded-md" key={item}>
                      {item}
                    </p>
                  ))
                ) : (
                  <p>none</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-7 border-t pt-5 ">
            <JobDetailItem
              icon={Monitor}
              label="Work Mode"
              value={data?.workMode}
            />
            <JobDetailItem
              icon={Clock}
              label="Type"
              value={data?.employmentType}
            />
            <JobDetailItem
              icon={Banknote}
              label="Salary"
              value={formatSalary(data?.salary)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <div className="border-t w-full pt-3 text-primary flex gap-2">
            <MapPin className="size-4" />
            <span className="text-sm">
              {data?.location ? data.location : "Location not specified"}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetails;
