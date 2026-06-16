import PaginationFooter from "@/app/components/PaginationFooter";
import { getUser } from "@/lib/auth/getUser";
import { patientsService } from "@/lib/services/patients";
import { statsServices } from "@/lib/services/stats";
import { UserRole } from "@/types/user-role";

import SelectedPatientProvider from "../../../_context/SelectedPatientCtx";
import AdminPatientsStats from "./AdminPatientsStats";
import PatientsControlBar from "./PatientsControlBar";
import PatientsTable from "./PatientsTable";
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
        <AdminPatientsStats stats={stats} thisWeekStats={thisWeekStats} />

        <div className="flex w-full">
          <div className="bg-secondary flex-1 space-y-4 rounded-xl p-4 shadow">
            <PatientsControlBar count={patientsResponse.count} />

            <PatientsTable patientsResponse={patientsResponse} />
            <PaginationFooter {...patientsResponse} showRowPerPage={true} />
          </div>
          <SelectedPatient />
        </div>
      </div>
    </SelectedPatientProvider>
  );
};

export default PatientsPage;
