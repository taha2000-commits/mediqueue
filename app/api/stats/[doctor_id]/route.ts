import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/stats/[doctor_id]">,
) {
  const { searchParams } = new URL(req.url);

  const period = searchParams.get("period");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");

  const { doctor_id } = await ctx.params;

  const db = await createClient();

  const { data, error } = await db
    .rpc("get_doctor_stats", {
      p_doctor_id: doctor_id,
      p_period: period ?? undefined,
      p_start_date: startDate ?? undefined,
      p_end_date: endDate ?? undefined,
    })
    .select("*")
    .maybeSingle();

  if (error || !data) return NextResponse.json("error", { status: 400 });
  return NextResponse.json(data, { status: 200 });
}
