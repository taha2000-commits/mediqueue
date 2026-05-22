"use client";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";

import { AppointmentWithPriority } from "@/types/appointments";
import { Appointment_Status } from "@/types/enums";

import { changeStatus } from "../appointments/actions";

interface State {
  chosenAppointment?: AppointmentWithPriority;
  setChosenAppointment: Dispatch<
    SetStateAction<AppointmentWithPriority | undefined>
  >;
  loading: {
    isLoading: boolean;
    status?: Appointment_Status;
  };
  setLoading: Dispatch<
    SetStateAction<{
      isLoading: boolean;
      status?: Appointment_Status;
    }>
  >;
  changeRequestStatus: (
    id: number,
    changeTo: Appointment_Status,
  ) => Promise<void> | void;
}

const RequestsContext = createContext<State>({
  chosenAppointment: undefined,
  setChosenAppointment: () => {},
  loading: { isLoading: true },
  setLoading() {},
  changeRequestStatus: function (): void {},
});

export const RequestsContextProvider = ({ children }: PropsWithChildren) => {
  const [chosenAppointment, setChosenAppointment] =
    useState<AppointmentWithPriority>();

  const [loading, setLoading] = useState<{
    isLoading: boolean;
    status?: Appointment_Status;
  }>({ isLoading: false });
  const qClient = useQueryClient();
  const requestSuccessMsg: Partial<Record<Appointment_Status, string>> = {
    accepted: "Requested Appointment Accepted Successfully",
    cancelled: "Requested Appointment Canceled Successfully",
    rejected: "Requested Appointment Rejected Successfully",
    completed: "Requested Appointment Completed Successfully",
    in_progress: "Requested Appointment is in progress",
  };

  const changeRequestStatus = async (
    id: number,
    changeTo: Appointment_Status,
  ) => {
    setLoading({ isLoading: true, status: changeTo });

    const { data, isSuccess, isError, error } = await changeStatus(
      id,
      changeTo,
    );

    if (isError) toast.error(error);

    if (data && isSuccess) {
      toast.success(requestSuccessMsg[changeTo]);
      qClient.invalidateQueries({ queryKey: ["patient-appointments"] });

      if (chosenAppointment) setChosenAppointment(undefined);
    }
    setLoading({ isLoading: false });
  };

  return (
    <RequestsContext
      value={{
        chosenAppointment,
        setChosenAppointment,
        changeRequestStatus,
        loading,
        setLoading,
      }}
    >
      {children}
    </RequestsContext>
  );
};

export function useRequestsContext() {
  return useContext(RequestsContext);
}
