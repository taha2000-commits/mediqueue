import { z } from "zod";

export const bookSchema = z.object({
  patient_name: z.string().min(1, "nameRequired"),
  patient_phone: z.string().min(11, "phoneInvalid"),
  patient_email: z.email("invalidEmailFormat").min(1, "phoneInvalid"),
  doctorId: z.string().min(1),
  time: z
    .string()
    .min(1, "chooseAvailableTime")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  date: z.string().min(1),
});
