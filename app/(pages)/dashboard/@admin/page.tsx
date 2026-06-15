import CustomSelect from "@/app/components/CustomSelect";
import { statsServices } from "@/lib/services/stats";
import { StatsPeriod } from "@/types/stats";

import { RefreshButton } from "../@doctor/requests/_components/RefreshButton";
import AddNewDoctor from "./_components/AddNewDoctor";
import AdminDashboardStats from "./_components/AdminDashboardStats";
import AppointmentsByDepartment from "./_components/AppointmentsByDepartment";
import AppointmentsStatusStats from "./_components/AppointmentsStatusStats";
import DoctorsOverview from "./_components/DoctorsOverview";
import ScheduleOverview from "./_components/ScheduleOverview";
import SystemOverview from "./_components/SystemOverview";
import TotalAppointmentsInRange from "./_components/TotalAppointmentsInRange";

const page = async ({ searchParams }: PageProps<"/dashboard">) => {
  const sp = await searchParams;
  const { am_doctors_count } = await statsServices.getDoctorsStats();
  const stats = await statsServices.hospital.getStats(
    !sp.period || sp.period == "all_time"
      ? undefined
      : (sp.period as StatsPeriod),
  );
  return (
    <div className="space-y-4">
      <div className="p-2">
        <h2 className="text-2xl font-bold capitalize" id="el">
          Dashboard overview
        </h2>
        <p className="text-muted-foreground">
          Monitor your hospital operations and performance. Get insights into
          appointments, doctors, and system status at a glance.
        </p>
      </div>
      <div className="flex justify-end gap-5">
        <CustomSelect
          defaultValue="all_time"
          options={[
            { text: "all time", value: "all_time" },
            { text: "today", value: "today" },
            { text: "this week", value: "this_week" },
            { text: "this month", value: "this_month" },
          ]}
          placeholder="period"
          className="w-fit rounded-lg"
          use_search_params={{ param: "period" }}
        />
        <RefreshButton variant="icon" className="rounded-lg" />
      </div>
      <AdminDashboardStats
        searchParams={sp}
        am_doctors_count={am_doctors_count}
        stats={stats}
      />
      <div className="flex flex-row flex-wrap gap-4 [&_div]:flex-1">
        <AddNewDoctor />
        <SystemOverview searchParams={sp} />
        <TotalAppointmentsInRange />
        <AppointmentsByDepartment searchParams={sp} />
        <DoctorsOverview />
        <ScheduleOverview />
        <AppointmentsStatusStats />
      </div>
    </div>
  );
};

export default page;
