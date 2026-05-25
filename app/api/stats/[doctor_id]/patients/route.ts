import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  _: NextRequest,
  ctx: RouteContext<"/api/stats/[doctor_id]/patients">,
) {
  const { doctor_id: doctor_uuid } = await ctx.params;
  const supabase = await createClient();
  const { data, error, status } = await supabase
    .rpc("get_patients_stats", { doctor_uuid })
    .maybeSingle();

  if (error) return NextResponse.json(error.message, { status });
  return NextResponse.json(data, { status: 200 });
}
