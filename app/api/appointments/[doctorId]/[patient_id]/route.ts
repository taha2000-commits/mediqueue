import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const GET = async (
  _: NextRequest,
  ctx: RouteContext<"/api/appointments/[doctorId]/[patient_id]">,
) => {
  const { doctorId, patient_id } = await ctx.params;

  const db = await createClient();

  const { data, error, status } = await db
    .rpc(
      "get_requests_sorted",
      { doctor_uuid: doctorId, sort_order: undefined },
      { count: "exact" },
    )
    .select(`*`)
    .eq("doctor_id", doctorId)
    .eq("patient_id", patient_id);

  if (error) return NextResponse.json(error, { status });

  return NextResponse.json(data, {
    status: status,
  });
};
