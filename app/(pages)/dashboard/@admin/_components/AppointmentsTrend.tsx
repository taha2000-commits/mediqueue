import { format } from "date-fns";

import { Separator } from "@/components/ui/separator";
import { hospitalService } from "@/lib/services/hospital";

import AppointmentsAreaChart from "./AppointmentsAreaChart";

const AppointmentsTrend = async () => {
  const lastWeekStats = await hospitalService.getLastWeekAppointmentsStats();

  const chartData = lastWeekStats.map((stat) => ({
    name: format(stat.day, "MMM d"),
    "appointments count": stat.appointments_count,
  }));

  return (
    <div className="bg-secondary max-w-lg flex-1 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">Appointments Last Week</h3>
      <Separator className="mt-2 mb-4" />
      <AppointmentsAreaChart chartData={chartData} />
    </div>
  );
};

export default AppointmentsTrend;
