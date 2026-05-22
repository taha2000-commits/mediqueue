import {
  CheckSquare,
  GitPullRequest,
  LucideIcon,
  ShieldOff,
  Siren,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { hospitalService } from "@/lib/services/hospital";
import { cn } from "@/lib/utils";

export default async function SystemOverview() {
  const {
    pending_appointments_count,
    high_priority_requests_count,
    expired_requests_count,
    accepted_requests_count,
  } = await hospitalService.getStats();

  return (
    <div className="bg-secondary min-w-sm space-y-2 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">System Overview</h3>
      <Separator />
      <LabelValue
        label="Pending Requests"
        value={pending_appointments_count}
        icon={GitPullRequest}
        valueClassName="bg-status-pending/10 text-status-pending"
      />
      <LabelValue
        label="Accepted Requests"
        value={accepted_requests_count}
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
        value={expired_requests_count}
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
