import JobCardList from "@/components/JobCardList";
import { Button } from "@/components/ui/button";
import { jobsPageContent } from "@/constants/pagesContent/jobsContent";
import Link from "next/link";

const Jobs = () => {
  return (
    <div className="max-w-200 mx-auto flex flex-col items-center gap-10">
      <h1>{jobsPageContent.title}</h1>
      <Button
        asChild
        variant={"outline"}
        className="group border-2 border-dashed border-accent w-full hover:border-none hover:bg-accent/50 hover:text-primary active:bg-accent"
      >
        <Link href={"/jobs/new"}>
          <jobsPageContent.cta.addIcon />
          {jobsPageContent.cta.label}
          <jobsPageContent.cta.descriptiveIcon />
        </Link>
      </Button>
      <JobCardList />
    </div>
  );
};

export default Jobs;
