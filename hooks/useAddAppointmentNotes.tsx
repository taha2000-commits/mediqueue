import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

type UpdatePatientNotesInput = {
  appointment_id: number;
  patient_id: string;
  medications: string[];
  conditions: string[];
  allergies: string[];
  notes?: string;
};

const useAddAppointmentNotes = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      medications,
      conditions,
      allergies,
      notes,
      appointment_id,
    }: UpdatePatientNotesInput) => {
      const { error } = await supabase.rpc("finish_appointment_with_notes", {
        appointment_id: appointment_id,

        p_conditions: conditions,
        p_medications: medications,
        p_allergies: allergies,

        p_notes: notes,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Notes updated successfully");
      router.refresh();
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

export default useAddAppointmentNotes;
