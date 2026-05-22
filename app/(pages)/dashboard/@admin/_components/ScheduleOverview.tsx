import { Calendar, Moon, ShieldOff, Sun } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { hospitalService } from "@/lib/services/hospital";

const ScheduleOverview = async () => {
  const {
    am_doctors_count,
    pm_doctors_count,
    doctors_off_today_count,
    doctors_leaves_today_count,
  } = await hospitalService.getStats();

  return (
    <div className="bg-secondary max-w-lg flex-1 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">Today{"'"}s Schedule Overview</h3>
      <Separator className="mt-2 mb-4" />
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        <div className="border-status-pending flex items-center gap-3 rounded-xl border p-3 ps-4">
          <Sun size={26} className="text-status-pending" />
          <div className="">
            <span className="text-muted-foreground text-sm">
              Morning shifts
            </span>
            <h4 className="font-medium">{am_doctors_count} Doctors</h4>
          </div>
        </div>
        <div className="border-status-in-progress flex items-center gap-3 rounded-xl border p-3 ps-4">
          <Moon size={26} className="text-status-border-status-in-progress" />
          <div className="">
            <span className="text-muted-foreground text-sm">
              Evening shifts
            </span>
            <h4 className="font-medium">{pm_doctors_count} Doctors</h4>
          </div>
        </div>
        <div className="border-status-rejected flex items-center gap-3 rounded-xl border p-3 ps-4">
          <ShieldOff size={26} className="text-status-rejected" />
          <div className="">
            <span className="text-muted-foreground text-sm">
              Doctors off today
            </span>
            <h4 className="font-medium">{doctors_off_today_count} Doctors</h4>
          </div>
        </div>
        <div className="border-status-completed flex items-center gap-3 rounded-xl border p-3 ps-4">
          <Calendar size={26} className="text-status-completed" />
          <div className="">
            <span className="text-muted-foreground text-sm">Leaves today</span>
            <h4 className="font-medium">
              {doctors_leaves_today_count} Doctors
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleOverview;
