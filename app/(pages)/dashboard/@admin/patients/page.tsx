import { Metadata } from "next";

import { UserRole } from "@/types/user-role";

import PatientsPage from "../../_components/pages/patients/PatientsPage";

export const metadata: Metadata = {
  title: "Patients",
};

const page = async ({
  searchParams,
  params,
}: PageProps<"/dashboard/patients">) => {
  return (
    <PatientsPage
      searchParams={searchParams}
      params={params}
      role={UserRole.ADMIN}
    />
  );
};

export default page;
