import {
  CircleCheck,
  Clock4,
  ClockAlert,
  ClockFading,
  UserRound,
} from "lucide-react";

import { appointmentsService } from "@/lib/services/appointments";

import Stat from "./Stat";

export default async function Stats() {
  const {
    all_count,
    pending_count,
    completed_count,
    accepted_count,
    expired_count,
  } = await appointmentsService.getAppointmentsStats(new Date().toDateString());

  return (
    <div className="grid grid-cols-5 gap-4">
      <Stat
        title="Today's Patients"
        value={all_count}
        icon={UserRound}
        iconClassName="text-primary bg-primary/20"
      />
      <Stat
        title="Waiting Now"
        value={accepted_count}
        icon={Clock4}
        iconClassName="text-amber-600 bg-amber-600/20"
      />
      <Stat
        title="Completed"
        value={completed_count}
        icon={CircleCheck}
        iconClassName="text-green-600 bg-green-600/20"
      />
      <Stat
        title="Pending Requests"
        value={pending_count}
        icon={ClockAlert}
        iconClassName="text-tertiary bg-tertiary/20"
      />
      <Stat
        title="Expired Requests"
        value={expired_count}
        icon={ClockFading}
        iconClassName="text-status-cancelled bg-status-cancelled/20"
      />
    </div>
  );
}
