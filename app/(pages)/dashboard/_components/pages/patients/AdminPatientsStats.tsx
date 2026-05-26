import {
  ArrowUpRight,
  UserRoundCheck,
  UserRoundPlus,
  UserRoundX,
  Users,
  UserStar,
} from "lucide-react";

import { PatientStats } from "@/types/patients";

import Stat from "../../../_components/Stat";

const AdminPatientsStats = async ({
  stats,
  thisWeekStats,
}: {
  stats: PatientStats;
  thisWeekStats: PatientStats;
}) => {
  return (
    <div className="grid grid-cols-5 gap-3">
      <Stat
        title="total patients"
        icon={Users}
        value={stats.all_count}
        chart={{
          num: 4,
          fillClass: "fill-tertiary/10",
          strokeClass: "stroke-tertiary",
        }}
        iconClassName="text-tertiary bg-tertiary/10"
        description={
          thisWeekStats.all_count > 0 ? (
            <p className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
              <span className="text-status-accepted me-1">
                +{thisWeekStats.all_count}
              </span>
              <span className="capitalize">This week</span>
              <ArrowUpRight size={16} className="ms-1 inline text-green-500" />
            </p>
          ) : null
        }
      />
      <Stat
        title="new patients (this month)"
        icon={UserRoundPlus}
        value={stats.new_count}
        chart={{
          num: 0,
          fillClass: "fill-status-accepted/10",
          strokeClass: "stroke-status-accepted",
        }}
        iconClassName="text-status-accepted bg-status-accepted/10"
        description={
          <div className="flex items-center gap-1 text-sm font-medium text-green-500">
            <p>{(stats.new_count * (stats.all_count / 100)).toFixed(2)}%</p>
            <ArrowUpRight size={16} className="ms-1 inline" />
          </div>
        }
      />

      <Stat
        title="returning patients"
        icon={UserStar}
        value={stats.returning_count}
        chart={{
          num: 2,
          fillClass: "fill-orange-500/10",
          strokeClass: "stroke-orange-500",
        }}
        iconClassName="text-orange-500 bg-orange-500/10"
        description={
          <p className="text-sm font-medium text-orange-500/50">
            {((stats.returning_count / stats.all_count) * 100).toFixed(2)}% of
            total
          </p>
        }
      />
      <Stat
        title="active patients"
        icon={UserRoundCheck}
        value={stats.active_count}
        chart={{
          num: 1,
          fillClass: "fill-fuchsia-600/10",
          strokeClass: "stroke-fuchsia-600",
        }}
        iconClassName="text-fuchsia-600 bg-fuchsia-600/10"
        description={
          <p className="text-sm font-medium text-fuchsia-600/50">
            {((stats.active_count / stats.all_count) * 100).toFixed(2)}% of
            total
          </p>
        }
      />
      <Stat
        title="inactive patients"
        icon={UserRoundX}
        value={stats.inactive_count}
        chart={{
          num: 3,
          fillClass: "fill-status-cancelled/10",
          strokeClass: "stroke-status-cancelled",
        }}
        iconClassName="text-status-cancelled bg-status-cancelled/10"
        description={
          <p className="text-status-cancelled/50 text-sm font-medium">
            {((stats.inactive_count / stats.all_count) * 100).toFixed(2)}% of
            total
          </p>
        }
      />
    </div>
  );
};

export default AdminPatientsStats;
