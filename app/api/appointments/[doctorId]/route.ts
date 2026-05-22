import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getPaginationData } from "@/lib/utils";
import { AppointmentWithPriority } from "@/types/appointments";
import { Appointment_Status } from "@/types/enums";
import { ResponseType } from "@/types/types";

export const GET = async (
  req: NextRequest,
  ctx: RouteContext<"/api/appointments/[doctorId]">,
) => {
  const { doctorId } = await ctx.params;

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  const sort = searchParams.get("sort");
  const statusParam = searchParams.get("status");
  const priorityParam = searchParams.get("priority");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const db = await createClient();

  const query = db
    .rpc(
      "get_requests_sorted",
      { doctor_uuid: doctorId, sort_order: sort ?? undefined },
      { count: "exact" },
    )
    .select("*");

  if (date) query.eq("date", date);
  if (priorityParam) query.eq("priority", priorityParam);
  if (statusParam == "expired") query.eq("is_expired", true);
  if (statusParam && statusParam !== "expired")
    query.eq("status", statusParam as Appointment_Status);

  if (searchParams.get("limit")) query.range(from, to);

  const { data: appointments, error, status, count } = await query;

  if (error) return NextResponse.json(error, { status });

  const { next, numOfPage, prev } = getPaginationData({
    count,
    limit,
    page,
  });

  const response: ResponseType<AppointmentWithPriority[]> = {
    count: count ?? 0,
    next,
    numOfPage,
    prev,
    page,
    results: (appointments as AppointmentWithPriority[]) || [],
    from: from + 1,
    to: (count ?? 0) > limit * page ? to + 1 : (count ?? 0),
  };

  return NextResponse.json(response, {
    status: 200,
  });
};
