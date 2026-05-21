import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/appointments/[doctorId]/stats">,
) {
  const { searchParams } = new URL(req.url);
  const filter_date = searchParams.get("date");

  const { doctorId: doctor_uuid } = await ctx.params;
  const supabase = await createClient();
  const { data, error, status } = await supabase
    .rpc("get_appointments_stats", {
      doctor_uuid,
      filter_date: filter_date ?? undefined,
    })
    .maybeSingle();

  if (error) return NextResponse.json(error.message, { status });
  return NextResponse.json(data, { status: 200 });
}
