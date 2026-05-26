"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AppointmentsAreaChart({
  chartData,
}: {
  chartData: {
    name: string;
    "appointments count": number;
  }[];
}) {
  return (
    <AreaChart
      style={{
        width: "100%",
        maxHeight: "40vh",
        aspectRatio: 1.818,
      }}
      responsive
      data={chartData}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      onContextMenu={(_, e) => e.preventDefault()}
      className="bg-background rounded-xl p-3 inset-shadow-sm"
    >
      <CartesianGrid strokeDasharray="3 3" color="red" />
      <XAxis dataKey="name" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="appointments count"
        stroke="#f59e0b"
        fill="#f59f0b38"
      />{" "}
      <Area
        type="monotone"
        dataKey="amt"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </AreaChart>
  );
}
