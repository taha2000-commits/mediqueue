import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { HashLoader } from "react-spinners";

import CustomSelect from "@/app/components/CustomSelect";
import { Separator } from "@/components/ui/separator";
import { PRIMARY_COLOR } from "@/lib/constants";
import { DoctorStatsDate, StatsPeriod } from "@/types/stats";

import AppointmentsAreaChart from "./AppointmentsAreaChart";

const AppointmentsStatsAreaChart = ({
  data,
  isLoading,
  periodState,
}: {
  data: { total_appointments: number; dates: DoctorStatsDate[] };
  isLoading: boolean;
  periodState: [StatsPeriod, Dispatch<SetStateAction<StatsPeriod>>];
}) => {
  const [period, setPeriod] = periodState;
  const total = data?.total_appointments;

  const chartData =
    data?.dates?.map((stat) => ({
      name: format(stat.day, "MMM d"),
      "appointments count": stat.appointments_count,
    })) ?? [];

  return (
    <div className="bg-secondary max-w-lg flex-1 rounded-xl p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-4 text-xl font-semibold">
          <p>
            {period == "today"
              ? "Daily"
              : period == "this_month"
                ? "monthly"
                : "weekly"}{" "}
            Appointments (<span className="text-tertiary">{total}</span>)
          </p>
          {isLoading ? <HashLoader size={20} color={PRIMARY_COLOR} /> : null}
        </h3>
        <CustomSelect
          options={[
            { text: "this week", value: "this_week" },
            { text: "this month", value: "this_month" },
          ]}
          placeholder="period"
          defaultValue={period}
          className="w-fit rounded-lg"
          onValueChange={(val) => setPeriod(val as StatsPeriod)}
        />
      </div>

      <Separator className="mt-2 mb-4" />
      <AppointmentsAreaChart chartData={chartData} />
    </div>
  );
};

export default AppointmentsStatsAreaChart;
