import { Separator } from "@/components/ui/separator";
import { statsServices } from "@/lib/services/stats";
import { StatsPeriod } from "@/types/stats";

import PieChartWithCustomizedLabel from "./AppointmentsPieCharts";

export const COLORS = ["#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"];

export default async function AppointmentsByDepartment({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const period =
    !searchParams.period || searchParams.period == "all_time"
      ? undefined
      : (searchParams.period as StatsPeriod);

  const { total_appointments } = await statsServices.hospital.getStats(period);

  const specializationStats = await statsServices.getSpecializationsStats({
    period: period,
  });

  const sortedStats = specializationStats.toSorted(
    (a, b) => b.total_appointments - a.total_appointments,
  );

  const topStats = sortedStats.slice(0, 5);

  const otherAppointmentsCount = sortedStats
    .slice(5)
    .reduce((total, { total_appointments }) => total + total_appointments, 0);

  const chartData = topStats.map((stat, i) => ({
    name: stat.specialization,
    value: +((stat.total_appointments / total_appointments) * 100).toFixed(0),
    color: COLORS[i],
  }));

  return (
    <div className="bg-secondary xs:min-w-sm h-fit min-w-xs rounded-xl p-4 shadow">
      <h3 className="text-xl font-semibold">
        Appointments By Department (
        <span className="text-tertiary">{total_appointments}</span>)
      </h3>
      <Separator className="mt-2 mb-4" />
      <div className="xs:flex-row flex flex-col items-center gap-6">
        <PieChartWithCustomizedLabel data={chartData} />
        <div className="flex w-full flex-col gap-2">
          {[
            { name: "all", value: total_appointments, color: "#0088FE" },
            ...chartData,
            { name: "Other", value: otherAppointmentsCount, color: "#ccc" },
          ].map((stat) => (
            <div key={stat.name} className="flex items-center gap-2 text-sm">
              <span className="font-medium">{stat.name}</span>
              <div
                className={"h-3 w-full rounded-full"}
                style={{
                  backgroundColor: stat.color,
                }}
              ></div>
              <span className="text-muted-foreground">
                {stat.value}
                {stat.name === "all" ? "" : "%"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
