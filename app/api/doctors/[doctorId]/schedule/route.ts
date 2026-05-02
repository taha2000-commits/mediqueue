import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";
import { getTranslatedObj } from "@/lib/utils";

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
      doctors (
     *
      )`,
    )
    .eq("doctor_id", doctorId)
    .single()
    .then((value) => {
      return {
        ...value,
        data: {
          ...value.data,
          doctors: getTranslatedObj(value.data?.doctors as object, lang),
        },
      };
    });

  if (error?.code == "PGRST116") return NextResponse.json({}, { status: 200 });
  else if (error) return NextResponse.json(error, { status: 400 });

  return NextResponse.json(
    doctor_availability,

    { status: 200 },
  );
}
