import { UserRole } from "@/types/user-role";

import PatientsPage from "../../../_components/pages/patients/PatientsPage";

const page = async ({
  searchParams,
  params,
}: PageProps<"/dashboard/patients/[type]">) => {
  return (
    <PatientsPage
      params={params}
      searchParams={searchParams}
      role={UserRole.ADMIN}
    />
  );
};

export default page;
