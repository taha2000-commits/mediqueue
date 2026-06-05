import CustomSelect from "@/app/components/CustomSelect";

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

  return (
    <div className="space-y-6">
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
      <AdminDashboardStats searchParams={sp} />
      <div className="flex gap-4">
        <SystemOverview searchParams={sp} />
        <AddNewDoctor />
        <TotalAppointmentsInRange />
      </div>
      <div className="flex gap-4">
        <AppointmentsByDepartment searchParams={sp} />
        <DoctorsOverview />
      </div>
      <div className="flex gap-4">
        <AppointmentsStatusStats />
        <ScheduleOverview />
      </div>
    </div>
  );
};

export default page;
