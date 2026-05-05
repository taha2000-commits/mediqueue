import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";
import { getTranslatedObj } from "@/lib/utils";
import { Doctor } from "@/types/doctors";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/doctors/[doctorId]">,
) {
  const { doctorId } = await ctx.params;

  const db = await createClient();

  const { data: doctor, error } = await db
    .from("doctors")
    .select("*")
    .eq("id", +doctorId)
    .maybeSingle()
    .then((value) => {
      return {
        ...value,
        data: value.data ? getTranslatedObj<Doctor>(value.data) : null,
      };
    });

  if (error?.code == "PGRST116") return NextResponse.json({}, { status: 200 });
  else if (error) return NextResponse.json(error, { status: 400 });
  return NextResponse.json(doctor, { status: 200 });
}
