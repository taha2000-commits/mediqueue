import {
  CheckSquare,
  File,
  GitPullRequest,
  LucideIcon,
  ShieldOff,
  Siren,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { statsServices } from "@/lib/services/stats";
import { cn } from "@/lib/utils";
import { StatsPeriod } from "@/types/stats";

export default async function SystemOverview({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const {
    total_appointments,
    total_pending,
    total_accepted,
    high_priority_requests_count,
    total_expired,
  } = await statsServices.hospital.getStats(
    !searchParams.period || searchParams.period == "all_time"
      ? undefined
      : (searchParams.period as StatsPeriod),
  );

  return (
    <div className="bg-secondary min-w-sm space-y-2 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">System Overview</h3>
      <Separator />
      <LabelValue
        label="Total Appointments"
        value={total_appointments}
        icon={File}
        valueClassName="bg-primary/10 text-primary"
      />
      <LabelValue
        label="Pending Requests"
        value={total_pending}
        icon={GitPullRequest}
        valueClassName="bg-status-pending/10 text-status-pending"
      />
      <LabelValue
        label="Accepted Requests"
        value={total_accepted}
        icon={CheckSquare}
        valueClassName="bg-status-accepted/10 text-status-accepted"
      />
      <LabelValue
        label="High Priority Requests"
        value={high_priority_requests_count}
        icon={Siren}
        valueClassName="bg-destructive/10 text-destructive"
      />
      <LabelValue
        label="Expired Requests"
        value={total_expired}
        icon={ShieldOff}
        valueClassName="bg-status-cancelled/10 text-status-cancelled"
      />
    </div>
  );
}

const LabelValue = ({
  label,
  value,
  icon,
  valueClassName,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  valueClassName: string;
}) => {
  const Icon = icon;
  const iconClassName = `text${valueClassName.split("text")[1]}`;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={18} className={iconClassName} />
        <span className="">{label}</span>
      </div>
      <span className={cn("rounded-lg p-1 px-3", valueClassName)}>{value}</span>
    </div>
  );
};
