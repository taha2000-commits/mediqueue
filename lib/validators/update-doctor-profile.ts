import { z } from "zod";

import { specializations } from "../constants";

export const doctor_profile_schema = z
  .object({
    name_en: z.string().min(1, "name is required"),
    name_ar: z
      .string()
      .min(1, "name is required")
      .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
        message: "Must contain Arabic characters only",
      }),
    specialization_ar: z
      .string()
      .min(1, "specialization_ar is required")
      .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
        message: "Must contain Arabic characters only",
      }),
    specialization_en: z.string().min(1, "specialization is required"),
    email: z.email("invalidEmailFormat").min(1, "email invalid"),
    phone: z.string().min(11, "phoneInvalid"),
    description_en: z.string().min(1, "description is required"),
    description_ar: z
      .string()
      .min(1, "description is required")
      .refine((value) => /^[\u0600-\u06FF\s]+$/.test(value), {
        message: "Must contain Arabic characters only",
      }),
    photo: z
      .custom<File | undefined>((file) => {
        if ((file as File).size == 0) return false;
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        return validTypes.includes((file as File).type);
      }, "Only JPG, PNG, and WEBP images are allowed")
      .refine(
        (file) => {
          if (!file || (file as File).size == 0) return true;

          return file.size <= 2 * 1024 * 1024;
        },
        {
          message: "Image must be less than 2MB",
        },
      ),
  })
  .refine(
    (data) => {
      console.log("dd", data);

      const ar_specialization = specializations.find((sp) =>
        sp["en"].includes(data.specialization_en),
      )?.["ar"];
      console.log("ar_specialization", ar_specialization);
      return ar_specialization === data.specialization_ar;
    },
    { error: "specializations not match", path: ["specialization_ar"] },
  );
