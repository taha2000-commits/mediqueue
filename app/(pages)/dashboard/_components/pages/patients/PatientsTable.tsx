"use client";
import CardsList from "@/app/components/CardsList";
import CustomTable from "@/app/components/table/table";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { PatientWithAppointments } from "@/types/patients";

import { useSelectedPatientCtx } from "../../../_context/SelectedPatientCtx";
import { cols, ColumnKey } from "./cols";

const PatientsTable = ({
  patientsResponse,
}: {
  patientsResponse: { results: PatientWithAppointments[] };
}) => {
  const { selectedPatient } = useSelectedPatientCtx();
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  if (isMobile || (isTablet && (selectedPatient || open)))
    return (
      <CardsList<ColumnKey, PatientWithAppointments>
        cards={cols({ type: "cards" })}
        data={patientsResponse.results}
      />
    );
  return (
    <CustomTable<ColumnKey, PatientWithAppointments>
      cols={cols()}
      data={patientsResponse.results}
      excludedColumns={
        !!selectedPatient || isTablet ? ["age-gender", "status"] : []
      }
    />
  );
};

export default PatientsTable;
