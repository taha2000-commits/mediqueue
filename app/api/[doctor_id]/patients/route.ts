import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getPaginationData } from "@/lib/utils";
import { PatientsWithAppointments } from "@/types/patients";
import { ResponseType } from "@/types/types";

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/[doctor_id]/patients">,
) {
  const { doctor_id } = await ctx.params;

  const { searchParams } = new URL(req.url);

  const type = (searchParams.get("type") ?? "all") as
    | "returning"
    | "new"
    | "active"
    | "all";

  const today = searchParams.get("today");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient();

  const query = supabase
    .from("patients_with_appointments")
    .select("*", { count: "exact" })
    .eq("doctor_id", doctor_id);
  if (today) query.eq("has_appointment_today", true);
  if (type == "active") query.eq("active", true);
  if (type == "new" || type == "returning") query.eq("type", type);
  if (searchParams.get("limit")) query.range(from, to);

  const { data, error, status, count } = await query;

  if (error) return NextResponse.json(error.message, { status });

  const { next, numOfPage, prev } = getPaginationData({
    count,
    limit,
    page,
  });

  const response: ResponseType<PatientsWithAppointments[]> = {
    count: count ?? 0,
    next,
    numOfPage,
    prev,
    page,
    from: from + 1,
    to: (count ?? 0) > limit * page ? to + 1 : (count ?? 0),
    results: data || [],
  };

  return NextResponse.json(response, { status: status });
}
