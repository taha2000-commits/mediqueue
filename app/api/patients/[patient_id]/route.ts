import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(
  _: NextRequest,
  { params }: RouteContext<"/api/patients/[patient_id]">,
) {
  const { patient_id } = await params;
  const db = await createClient();
  const { data, error } = await db
    .rpc(
      "get_patients_with_appointments",
      {
        doctor_uuid: undefined,
      },
      { count: "exact" },
    )
    .select("*")
    .eq("id", patient_id)
    .single();
  if (error) return NextResponse.json(error.message, { status: 400 });
  return NextResponse.json(data, { status: 200 });
}
