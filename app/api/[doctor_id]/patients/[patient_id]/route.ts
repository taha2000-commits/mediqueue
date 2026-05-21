import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/[doctor_id]/patients/[patient_id]">,
) {
  const { patient_id, doctor_id } = await ctx.params;

  const db = await createClient();

  const { data, error, status } = await db
    .from("patients_with_appointments")
    .select("*")
    .eq("doctor_id", doctor_id)
    .eq("id", patient_id)
    .single();

  if (error) return NextResponse.json(error.message, { status });

  return NextResponse.json(data, { status: status });
}
