import { Appointment_Status } from "@/types/appointments";

export interface Database {
  public: {
    Tables: {
      doctors: {
        id: number;
        name: string;
        email: string;
        phone: string;
        specialization: string;
        avatar: string;
        is_active: boolean;
      };
      appointments: {
        Row: {
          id: number;
          created_at: string;
          patient_name: string;
          patient_email: string;
          patient_phone: string;
          doctor_id: number;
          date: string;
          time: string;
          status: Appointment_Status;
        };
      };
    };
  };
}
export type AppointmentRow =
  Database["public"]["Tables"]["appointments"]["Row"];
