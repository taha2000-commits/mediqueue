"use client";

import { format } from "date-fns";
import Image from "next/image";

import CardsList from "@/app/components/CardsList";
import CustomTable from "@/app/components/table/table";
import { ColsType } from "@/app/components/table/types";
import { Avatar } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTablet } from "@/hooks/use-tablet";
import { cn, formatTime } from "@/lib/utils";
import { PatientWithAppointments } from "@/types/patients";

type ColumnKey = "patient" | "next appointment";

type Props = {
  patients: PatientWithAppointments[];
};

const PatientsTable = ({ patients }: Props) => {
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  if (isMobile || isTablet || (open && isTablet))
    return (
      <CardsList<ColumnKey, PatientWithAppointments>
        cards={cols({ type: "cards" })}
        data={patients}
      />
    );
  return (
    <CustomTable<ColumnKey, PatientWithAppointments>
      cols={cols()}
      data={patients}
    />
  );
};

export const cols: (params?: {
  type?: "cards" | "cols";
}) => ColsType<ColumnKey, PatientWithAppointments> = (params) => {
  const { type } = params ?? { type: "cols" };
  const isCards = type == "cards";
  return [
    {
      header: "patient",
      columnKey: "patient",
      colSpan: 3,
      cell: (patient) => <PatientInfo patient={patient} isCards={isCards} />,
    },

    {
      header: "next appointment",
      columnKey: "next appointment",
      colSpan: 4,
      cell: (patient) => (
        <DateTimeCell
          date={patient.next_appointment?.date}
          time={patient.next_appointment?.time}
          isCards={isCards}
        />
      ),
    },
  ];
};

const PatientInfo = ({
  patient,
  isCards = false,
}: {
  patient: PatientWithAppointments;
  isCards: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={cn("size-10", {
          "size-8!": isCards,
        })}
      >
        <Image src="/male-avatar.png" alt="avatar" width={40} height={40} />
      </Avatar>

      <div
        className={cn(
          "flex flex-1 flex-col flex-wrap justify-between gap-x-2 text-center text-nowrap",
          {
            "flex-row items-center": isCards,
          },
        )}
      >
        <h6 className="text-sm font-semibold">{patient.name}</h6>

        <div className="text-muted-foreground flex flex-wrap items-center gap-x-1">
          <span>ID: {patient.id}</span>
          <span>-</span>
          <span>{patient.age} years</span>
        </div>
      </div>
    </div>
  );
};

type DateTimeCellProps = {
  date?: Date | string | null;
  time?: string | null;
  isCards: boolean;
};

const DateTimeCell = ({ date, time, isCards }: DateTimeCellProps) => {
  const { open } = useSidebar();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  if (!date || !time) {
    return (
      <div className="flex items-center">
        <p>-</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-start justify-between gap-x-2",
        {
          "flex-row! items-center!": isCards,
        },
      )}
    >
      <p className="font-medium">{format(new Date(date), "MMM dd, yyyy")}</p>

      <p>{formatTime(time, "HH:mm aa")}</p>
    </div>
  );
};

export default PatientsTable;
