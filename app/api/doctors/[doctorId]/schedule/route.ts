import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getTranslatedObj } from "@/lib/utils";
import { Schedule } from "@/types/doctor-schedule";
import { Doctor } from "@/types/doctors";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/doctors/[doctorId]/schedule">,
) {
  const { searchParams } = new URL(req.url);
  const { doctorId } = await ctx.params;
  const lang = searchParams.get("lang") || "en";

  const db = await createClient();

  const { data: doctor_availability, error } = await db
    .from("doctor_availability")
    .select(
      `weekly_schedule,
      doctors (*)`,
    )
    .eq("doctor_id", doctorId)
    .maybeSingle()
    .then((value) => {
      return {
        ...value,
        data: value.data
          ? {
              weekly_schedule: value.data.weekly_schedule as Schedule,
              doctors: getTranslatedObj<Doctor>(
                value.data.doctors as object,
                lang,
              ),
            }
          : null,
      };
    });

  if (error) return NextResponse.json(error, { status: 400 });

  return NextResponse.json(doctor_availability, { status: 200 });
}
