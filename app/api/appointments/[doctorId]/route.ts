import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/appointments/[doctorId]">,
) => {
  const { doctorId } = await ctx.params;
  const db = await createClient();

  const {
    data: appointments,
    error,
    status,
  } = await db.from("appointments").select(`*`).eq("doctor_id", doctorId);
  
  if (error) return NextResponse.json(error, { status });

  return NextResponse.json(appointments, {
    status: 200,
  });
};
