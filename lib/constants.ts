import { BloodGroup } from "@/types/patients";

export const PRIMARY_COLOR = "#00607a";
export const specializations = [
  { en: "Cardiology", ar: "أمراض القلب" },
  { en: "Dermatology", ar: "الأمراض الجلدية" },
  { en: "Orthopedics", ar: "جراحة العظام" },
  { en: "Pediatrics", ar: "طب الأطفال" },
  { en: "Neurology", ar: "الأمراض العصبية" },
  { en: "Gynecology", ar: "أمراض النساء" },
  { en: "General Surgery", ar: "الجراحة العامة" },
  { en: "Ophthalmology", ar: "طب العيون" },
  { en: "ENT", ar: "أنف وأذن وحنجرة" },
  { en: "Psychiatry", ar: "الطب النفسي" },
  { en: "Urology", ar: "المسالك البولية" },
  { en: "Dentistry", ar: "طب الأسنان" },
  { en: "Oncology", ar: "الأورام" },
  { en: "Endocrinology", ar: "الغدد الصماء" },
  { en: "Gastroenterology", ar: "الجهاز الهضمي" },
  { en: "Radiology", ar: "الأشعة" },
  { en: "Anesthesiology", ar: "التخدير" },
  { en: "Nephrology", ar: "أمراض الكلى" },
  { en: "Pulmonology", ar: "الأمراض الصدرية" },
  { en: "Plastic Surgery", ar: "جراحة التجميل" },
];

export const dayIndices = ["0", "1", "2", "3", "4", "5", "6"] as const;

export const capacityColors = ["#0EA5E9", "#10B981", "#F59E0B", "#EF4444"];
export const status_colors = {
  pending: "#f59e0b",
  accepted: "#22c55e",
  upcoming: "#9ca3af",
  in_progress: "#8b5cf6",
  completed: "#0ea4e9",
  cancelled: "#6b7280",
  rejected: "#ef4343",
  no_show: "#910000",
};
export const bloodGroup: BloodGroup[] = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];
