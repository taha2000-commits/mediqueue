import {
  CircleCheck,
  Clock4,
  ClockAlert,
  ClockFading,
  UserRound,
} from "lucide-react";

import { statsServices } from "@/lib/services/stats";

import Stat from "../../_components/Stat";

export default async function Stats() {
  const doctor_stats = await statsServices.doctor.getStats();

  if (!doctor_stats) return null;

  const {
    total_accepted,
    total_appointments,
    total_pending,
    total_rejected,
    total_completed,
  } = doctor_stats;
  return (
    <div className="grid grid-cols-5 gap-4">
      <Stat
        title="Today's Patients"
        value={total_appointments}
        icon={UserRound}
        iconClassName="text-primary bg-primary/20"
      />
      <Stat
        title="Waiting Now"
        value={total_accepted}
        icon={Clock4}
        iconClassName="text-amber-600 bg-amber-600/20"
      />
      <Stat
        title="Completed"
        value={total_completed}
        icon={CircleCheck}
        iconClassName="text-green-600 bg-green-600/20"
      />
      <Stat
        title="Pending Requests"
        value={total_pending}
        icon={ClockAlert}
        iconClassName="text-tertiary bg-tertiary/20"
      />
      <Stat
        title="Rejected Requests"
        value={total_rejected}
        icon={ClockFading}
        iconClassName="text-status-cancelled bg-status-cancelled/20"
      />
    </div>
  );
}
