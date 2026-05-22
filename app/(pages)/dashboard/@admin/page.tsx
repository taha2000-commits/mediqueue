import AdminDashboardStats from "./_components/AdminDashboardStats";
import AppointmentsByDepartment from "./_components/AppointmentsByDepartment";
import AppointmentsTrend from "./_components/AppointmentsTrend";
import DoctorsOverview from "./_components/DoctorsOverview";
import ScheduleOverview from "./_components/ScheduleOverview";
import SystemOverview from "./_components/SystemOverview";

const page = async () => {
  return (
    <div className="space-y-6">
      <AdminDashboardStats />
      <div className="flex gap-4">
        <DoctorsOverview />
        <AppointmentsTrend />
      </div>
      <div className="flex gap-4">
        <AppointmentsByDepartment />
        <SystemOverview />
        <ScheduleOverview />
      </div>
    </div>
  );
};

export default page;
