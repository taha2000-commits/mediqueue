import PaginationFooter from "@/app/components/PaginationFooter";
import CustomTable from "@/app/components/table/table";
import { getUser } from "@/lib/auth/getUser";
import { patientsService } from "@/lib/services/patients";
import { statsServices } from "@/lib/services/stats";
import { PatientWithAppointments } from "@/types/patients";
import { UserRole } from "@/types/user-role";

import SelectedPatientProvider from "../../../_context/SelectedPatientCtx";
import FiltersBar from "../../../@admin/doctors/_components/FiltersBar";
import { cols, ColumnKey } from "../../../@admin/patients/cols";
import { RefreshButton } from "../../../@doctor/requests/_components/RefreshButton";
import AdminPatientsStats from "./AdminPatientsStats";
import PatientsControlBar from "./PatientsControlBar";
import SelectedPatient from "./SelectedPatient";

const PatientsPage = async ({
  role,
  searchParams,
  params,
}: {
  role: UserRole;
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const sp = await searchParams;
  const patientsPageParams = await params;

  const reqParams = {
    ...sp,
    type: patientsPageParams?.type,
    limit: sp?.limit ?? "10",
  };

  const user = await getUser();

  const doctorID = role == UserRole.Doctor ? `${user?.id}` : undefined;

  const patientsResponse = await patientsService.getAll({
    doctor_id: doctorID,
    params: reqParams,
  });

  const stats = await statsServices.getPatientsStats({
    doctor_id: doctorID,
  });

  const thisWeekStats = await statsServices.getPatientsStats({
    doctor_id: doctorID,
    period: "this_week",
  });
  return (
    <SelectedPatientProvider>
      <div className="space-y-4">
        <div className="flex justify-end">
          <RefreshButton />
        </div>
        <AdminPatientsStats stats={stats} thisWeekStats={thisWeekStats} />

        <div className="flex w-full">
          <div className="bg-secondary flex-1 space-y-4 rounded-xl p-4 shadow">
            <PatientsControlBar count={patientsResponse.count} />
            <FiltersBar />
            <CustomTable<ColumnKey, PatientWithAppointments>
              cols={cols}
              data={patientsResponse.results}
              // excludedColumns={["age-gender", "status"]}
            />
            <PaginationFooter {...patientsResponse} showRowPerPage={true} />
          </div>
          <SelectedPatient />
        </div>
      </div>
    </SelectedPatientProvider>
  );
};

export default PatientsPage;
