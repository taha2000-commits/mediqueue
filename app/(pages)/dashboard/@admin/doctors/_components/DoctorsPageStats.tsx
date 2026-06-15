import { ShieldCheck, ShieldOff, Sunrise, Sunset, Syringe } from "lucide-react";
import { cookies } from "next/headers";

import { statsServices } from "@/lib/services/stats";
import { cn } from "@/lib/utils";

import Stat from "../../../_components/Stat";

const DoctorsPageStats = async () => {
  const {
    total_doctors,
    active_doctors,
    am_doctors_count,
    pm_doctors_count,
    doctors_off_today_count,
  } = await statsServices.getDoctorsStats();
  const cookiesStore = await cookies();
  const isSidebarOpen = cookiesStore.get("sidebar_state")?.value;
  return (
    <div
      className={cn(
        "mx-2 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5",
        {
          "grid-cols-2! lg:grid-cols-3! xl:grid-cols-5!": isSidebarOpen,
        },
      )}
    >
      <Stat
        title="total doctors"
        value={total_doctors}
        chart={{
          num: 4,
          fillClass: "fill-status-completed/20",
          strokeClass: "stroke-status-completed",
        }}
        icon={Syringe}
        iconClassName="text-status-completed bg-status-completed/20"
      />
      <Stat
        title="active doctors"
        value={active_doctors}
        chart={{
          num: 2,
          fillClass: "fill-status-accepted/20",
          strokeClass: "stroke-status-accepted",
        }}
        icon={ShieldCheck}
        iconClassName="text-status-accepted bg-status-accepted/20"
      />
      <Stat
        title="work AM"
        value={am_doctors_count}
        chart={{
          num: 3,
          fillClass: "fill-status-pending/20",
          strokeClass: "stroke-status-pending",
        }}
        icon={Sunrise}
        iconClassName="text-status-pending bg-status-pending/20"
      />
      <Stat
        title="work PM"
        value={pm_doctors_count}
        chart={{
          num: 0,
          fillClass: "fill-status-cancelled/20",
          strokeClass: "stroke-status-cancelled",
        }}
        icon={Sunset}
        iconClassName="text-status-cancelled bg-status-cancelled/20"
      />
      <Stat
        title="off today"
        value={doctors_off_today_count}
        chart={{
          num: 1,
          fillClass: "fill-status-no-show/20",
          strokeClass: "stroke-status-no-show",
        }}
        icon={ShieldOff}
        iconClassName="text-status-no-show bg-status-no-show/20"
      />
    </div>
  );
};

export default DoctorsPageStats;
