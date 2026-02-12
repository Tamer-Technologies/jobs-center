"use client";

import { Job } from "@/types/job.types";
import * as JOB_CONSTANTS from "@/constants/job.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, useState, useCallback, useMemo } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";
import { formSchema } from "@/schemas/job.schema";
import FormInput from "../FormInput";
import FormTextArea from "../FormTextArea";
import FormRadio from "../FormRadio";
import FormSelect from "../FormSelect";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import FormSwitch from "../FormSwitch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

type FormValues = z.infer<typeof formSchema>;

interface JobForm extends ComponentProps<"form"> {
  job?: Job;
  onUpdate?: () => void;
}

const JobForm = ({ job, onUpdate, ...props }: JobForm) => {
  const form = useForm<FormValues>({
    defaultValues: {
      title: job?.jobTitle ?? "",
      status: job?.status ?? JOB_CONSTANTS.JOB_STATUSES[0],
      companyType: job?.company?.type ?? JOB_CONSTANTS.COMPANY_TYPES[0],
      companyName: job?.company?.name,
      description: job?.description ?? "",
      employmentType: job?.employmentType ?? JOB_CONSTANTS.EMPLOYMENT_TYPES[0],
      workMode: job?.workMode ?? JOB_CONSTANTS.WORK_MODES[0],
      experienceLevel:
        job?.experienceLevel ?? JOB_CONSTANTS.EXPERIENCE_LEVELS[0],
      location: job?.location ?? "",
      hasSalary: job?.salary ? true : false,
      salaryMode: job?.salary?.fixed ? "Fixed" : "Range",
      salaryMin: job?.salary?.min,
      salaryMax: job?.salary?.max,
      salaryFixed: job?.salary?.fixed,
      salaryCurrency:
        job?.salary?.currency ?? JOB_CONSTANTS.SALARY_CURRENCIES[0],
      salaryPeriod: job?.salary?.period ?? JOB_CONSTANTS.SALARY_PERIOD[0],
      techStack: job?.techStack ?? [],
    },
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
  });

  const hasSalary = form.watch("hasSalary");
  const salaryMode = form.watch("salaryMode");
  const watchedTechStack = form.watch("techStack");
  const techStack = useMemo(() => watchedTechStack || [], [watchedTechStack]);

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = useCallback(() => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag !== "" && !techStack.includes(trimmedTag)) {
      form.setValue("techStack", [...techStack, trimmedTag], {
        shouldValidate: true,
      });
      setTagInput("");
    }
  }, [tagInput, techStack, form]);

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      "techStack",
      techStack.filter((item) => item !== tagToRemove),
      { shouldValidate: true },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const refinedData: Omit<Job, "id"> = {
      jobTitle: data.title,
      status: data.status,
      company: {
        name: data.companyName,
        type: data.companyType,
      },
      description: data.description,
      employmentType: data.employmentType,
      workMode: data.workMode,
      experienceLevel: data.experienceLevel,
      techStack: data.techStack,
    };

    if (data.location?.trim()) {
      refinedData.location = data.location;
    }

    if (data.hasSalary) {
      refinedData.salary = {
        currency: data.salaryCurrency,
        period: data.salaryPeriod,
      };

      if (data.salaryMode === "Fixed") {
        if (data.salaryFixed !== undefined)
          refinedData.salary.fixed = data.salaryFixed;
      } else {
        if (data.salaryMin !== undefined)
          refinedData.salary.min = data.salaryMin;
        if (data.salaryMax !== undefined)
          refinedData.salary.max = data.salaryMax;
      }
    }

    const savedJobs = localStorage.getItem("jobs");
    let jobsList: Job[] = savedJobs ? JSON.parse(savedJobs) : [];

    if (job) {
      const updatedJob = { ...refinedData, id: job.id };
      jobsList = jobsList.map((item) =>
        item.id === job.id ? updatedJob : item,
      );
    } else {
      const newJob = { ...refinedData, id: crypto.randomUUID() };
      jobsList.push(newJob);
    }

    localStorage.setItem("jobs", JSON.stringify(jobsList));
    if (onUpdate) onUpdate();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <FormInput control={form.control} name="title" label="Job Title*" />

        <FormTextArea
          control={form.control}
          name="description"
          label="Description*"
          description="Provide details about the Job."
        />

        <FieldSet>
          <FieldLegend>Tech Stack</FieldLegend>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="skill"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddTag}
                className="shrink-0"
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.length > 0 ? (
                techStack.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="pl-3 pr-1 py-1 flex items-center gap-1 group"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="p-0.5 rounded-full hover:bg-destructive hover:text-background transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No technologies added.
                </p>
              )}
            </div>
            {form.formState.errors.techStack && (
              <p className="text-destructive text-xs font-medium">
                {form.formState.errors.techStack.message}
              </p>
            )}
          </div>
        </FieldSet>

        <FormInput
          control={form.control}
          name="location"
          label="Job Location"
        />

        <Separator />

        <FormRadio
          control={form.control}
          name="status"
          label="Status*"
          options={JOB_CONSTANTS.JOB_STATUSES}
        />

        <Separator />

        <FieldSet>
          <FieldLegend>Company</FieldLegend>
          <FormInput control={form.control} name="companyName" label="Name*" />
          <FormSelect
            control={form.control}
            name="companyType"
            label="Type*"
            options={JOB_CONSTANTS.COMPANY_TYPES}
          />
        </FieldSet>

        <FormSelect
          control={form.control}
          name="employmentType"
          label="Employment*"
          options={JOB_CONSTANTS.EMPLOYMENT_TYPES}
        />

        <Separator />

        <FormRadio
          control={form.control}
          name="workMode"
          label="Work Mode*"
          options={JOB_CONSTANTS.WORK_MODES}
        />

        <FormSelect
          control={form.control}
          name="experienceLevel"
          label="Experience*"
          options={JOB_CONSTANTS.EXPERIENCE_LEVELS}
        />

        <Separator />

        <FieldSet>
          <FieldLegend className="flex gap-3 items-center">
            Salary <FormSwitch control={form.control} name="hasSalary" />
          </FieldLegend>

          {hasSalary && (
            <>
              <FormRadio
                control={form.control}
                name="salaryMode"
                options={["Fixed", "Range"]}
                className="flex-row"
              />

              {salaryMode === "Fixed" ? (
                <FormInput
                  control={form.control}
                  name="salaryFixed"
                  label="Value*"
                />
              ) : (
                <div className="flex gap-5">
                  <FormInput
                    control={form.control}
                    name="salaryMin"
                    label="Min Value*"
                  />
                  <FormInput
                    control={form.control}
                    name="salaryMax"
                    label="Max Value*"
                  />
                </div>
              )}

              <div className="flex gap-5">
                <FormSelect
                  control={form.control}
                  name="salaryCurrency"
                  label="Currency*"
                  options={JOB_CONSTANTS.SALARY_CURRENCIES}
                />
                <FormSelect
                  control={form.control}
                  name="salaryPeriod"
                  label="Period*"
                  options={JOB_CONSTANTS.SALARY_PERIOD}
                />
              </div>
            </>
          )}
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default JobForm;
