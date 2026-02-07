import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

interface JobDetailItemProps extends ComponentProps<"div"> {
  icon: LucideIcon;
  label: string;
  value: string;
}

const JobDetailItem = ({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: JobDetailItemProps) => {
  return (
    <div className={cn("flex gap-2", className)} {...props}>
      <Icon className="size-4 text-primary mt-1" />
      <div className="flex flex-col">
        <span className="text-primary">{label}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default JobDetailItem;
