"use client";

import { format } from "date-fns";
import { PersonStanding } from "lucide-react";
import Image from "next/image";

import StatusBadge from "@/app/components/StatusBadge";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatTime } from "@/lib/utils";
import { PatientsWithAppointments } from "@/types/patients";

import EmptySection from "../../_components/EmptySection";
import { useSelectedPatientCtx } from "../../_context/SelectedPatientCtx";

type ColumnKey =
  | "patient"
  | "contact"
  | "last visited"
  | "next appointment"
  | "status";

type Props = {
  patients: PatientsWithAppointments[];
  excludedColumns?: ColumnKey[];
};

const BASE_COLUMNS = 7;

const PatientsTable = ({ patients, excludedColumns = [] }: Props) => {
  const { selectedPatient, setSelectedPatient } = useSelectedPatientCtx();

  const isColumnVisible = (column: ColumnKey) => {
    if (excludedColumns.includes(column)) return false;

    if (selectedPatient) {
      return column !== "contact" && column !== "status";
    }

    return true;
  };

  const gridCols = (() => {
    if (selectedPatient) return 4;

    let cols = BASE_COLUMNS;

    if (!isColumnVisible("patient")) cols -= 2;
    if (!isColumnVisible("contact")) cols -= 2;
    if (!isColumnVisible("last visited")) cols -= 1;
    if (!isColumnVisible("next appointment")) cols -= 1;
    if (!isColumnVisible("status")) cols -= 1;

    return cols;
  })();

  const gridClassName = `grid-cols-${gridCols}`;

  if (!patients.length) {
    return (
      <div className="h-fit">
        <TableHeader
          gridClassName={gridClassName}
          isColumnVisible={isColumnVisible}
        />

        <div className="border-border rounded-b-xl border">
          <EmptySection
            title="No new patients yet"
            description="Newly registered patients will appear here."
            icon={PersonStanding}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit">
      <TableHeader
        gridClassName={gridClassName}
        isColumnVisible={isColumnVisible}
      />

      {patients.map((patient) => (
        <PatientRow
          key={patient.id}
          patient={patient}
          selected={selectedPatient?.id === patient.id}
          gridClassName={gridClassName}
          isColumnVisible={isColumnVisible}
          onClick={() => setSelectedPatient(patient)}
        />
      ))}
    </div>
  );
};

type TableHeaderProps = {
  gridClassName: string;
  isColumnVisible: (column: ColumnKey) => boolean;
};

const TableHeader = ({ gridClassName, isColumnVisible }: TableHeaderProps) => {
  return (
    <div
      className={cn(
        "bg-primary grid rounded-t-xl p-2 text-sm text-white",
        "[&_div]:flex [&_div]:items-center [&_div]:truncate",
        gridClassName,
      )}
    >
      {isColumnVisible("patient") && <div className="col-span-2">Patient</div>}

      {isColumnVisible("contact") && <div className="col-span-2">Contact</div>}

      {isColumnVisible("last visited") && <div>Last visited</div>}

      {isColumnVisible("next appointment") && <div>Next appointment</div>}

      {isColumnVisible("status") && <div>Status</div>}
    </div>
  );
};

type PatientRowProps = {
  patient: PatientsWithAppointments;
  selected: boolean;
  gridClassName: string;
  isColumnVisible: (column: ColumnKey) => boolean;
  onClick: () => void;
};

const PatientRow = ({
  patient,
  selected,
  gridClassName,
  isColumnVisible,
  onClick,
}: PatientRowProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border-border hover:bg-background grid cursor-pointer p-2 text-sm not-last:border-b",
        gridClassName,
        selected && "bg-background",
      )}
    >
      {isColumnVisible("patient") && (
        <div className="col-span-2">
          <PatientInfo patient={patient} />
        </div>
      )}

      {isColumnVisible("contact") && (
        <div className="col-span-2">
          <ContactInfo patient={patient} />
        </div>
      )}

      {isColumnVisible("last visited") && (
        <DateTimeCell
          date={patient.last_visit_date}
          time={patient.last_visit_time}
        />
      )}

      {isColumnVisible("next appointment") && (
        <DateTimeCell
          date={patient.next_appointment_date}
          time={patient.next_appointment_time}
        />
      )}

      {isColumnVisible("status") && (
        <div className="flex items-center">
          <StatusBadge
            status={patient.active ? "accepted" : "cancelled"}
            text={patient.active ? "active" : "inactive"}
          />
        </div>
      )}
    </div>
  );
};

const PatientInfo = ({ patient }: { patient: PatientsWithAppointments }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar size="lg">
        <Image src="/male-avatar.png" alt="avatar" width={40} height={40} />
      </Avatar>

      <div>
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

const ContactInfo = ({ patient }: { patient: PatientsWithAppointments }) => {
  return (
    <div>
      <p>{patient.phone}</p>
      <p className="normal-case">{patient.email}</p>
    </div>
  );
};

type DateTimeCellProps = {
  date?: Date | string | null;
  time?: string | null;
};

const DateTimeCell = ({ date, time }: DateTimeCellProps) => {
  if (!date || !time) {
    return (
      <div className="flex items-center">
        <p>_</p>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div>
        <p className="font-medium">{format(new Date(date), "MMM dd, yyyy")}</p>

        <p>{formatTime(time, "HH:mm aa")}</p>
      </div>
    </div>
  );
};

export default PatientsTable;
