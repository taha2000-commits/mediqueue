import { Separator } from "@/components/ui/separator";
import { hospitalService } from "@/lib/services/hospital";

import PieChartWithCustomizedLabel from "./AppointmentsPieCharts";

export const COLORS = ["#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

export default async function AppointmentsByDepartment() {
  const { all_appointments_count } = await hospitalService.getStats();

  const specializationAppointmentsStats =
    await hospitalService.getSpecializationAppointmentsStats();

  const sortedStats = specializationAppointmentsStats.toSorted(
    (a, b) => b.appointments_count - a.appointments_count,
  );

  const topStats = sortedStats.slice(0, 5);

  const otherAppointmentsCount = sortedStats
    .slice(5)
    .reduce((total, { appointments_count }) => total + appointments_count, 0);

  const chartData = topStats.map((stat, i) => ({
    name: stat.specialization,
    value: +((stat.appointments_count / all_appointments_count) * 100).toFixed(
      0,
    ),
    color: COLORS[i],
  }));

  return (
    <div className="bg-secondary max-w-lg flex-1 rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">
        Appointments By Department (
        <span className="text-tertiary">{all_appointments_count}</span>)
      </h3>
      <Separator className="mt-2 mb-4" />
      <div className="flex items-center gap-6">
        <PieChartWithCustomizedLabel data={chartData} />
        <div className="flex flex-col gap-2">
          {[
            { name: "all", value: all_appointments_count, color: "#0088FE" },
            ...chartData,
            { name: "Other", value: otherAppointmentsCount, color: "#ccc" },
          ].map((stat) => (
            <div key={stat.name} className="flex items-center gap-2 text-sm">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: stat.color,
                }}
              ></div>
              <div className="flex flex-1 items-center justify-between gap-6">
                <span className="font-medium">{stat.name}</span>
                <span className="text-muted-foreground">
                  {stat.value}
                  {stat.name === "all" ? "" : "%"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
