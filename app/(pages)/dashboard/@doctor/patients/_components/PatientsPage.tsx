import PaginationFooter from "@/app/components/PaginationFooter";
import { patientsService } from "@/lib/services/patients";

import PatientsTable from "./PatientsTable";
type PatientsPageProps = {
  params?: Promise<{
    type: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const PatientsPage = async ({ params, searchParams }: PatientsPageProps) => {
  const patientsPageParams = await params;
  const sp = await searchParams;

  const patientsResponse = await patientsService.getAll({
    params: { ...sp, type: patientsPageParams?.type, limit: sp.limit ?? "10" },
  });

  return (
    <>
      <PatientsTable patients={patientsResponse.results} />

      <PaginationFooter {...patientsResponse} className="mt-5" />
    </>
  );
};

export default PatientsPage;
