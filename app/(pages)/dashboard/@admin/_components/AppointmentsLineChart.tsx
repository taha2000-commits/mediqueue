import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { status_colors } from "@/lib/constants";

export default function AppointmentsLineChart({
  chartData,
}: {
  chartData: {
    name: string;
    total: number;
    pending: number;
    completed: number;
    accepted: number;
    cancelled: number;
    rejected: number;
    no_show: number;
  }[];
}) {
  const lines = Object.entries({ total: "#433676", ...status_colors })
    .filter(([k]) => k !== "upcoming" && k !== "in_progress")
    .map(([k, v]) => ({
      dataKey: k,
      stroke: v,
    }));

  return (
    <LineChart
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "40vh",
        aspectRatio: 1.818,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      className="bg-background rounded-xl p-3 inset-shadow-sm"
    >
      <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" />
      <XAxis dataKey="name" stroke="var(--muted-foreground)" />
      <YAxis width="auto" stroke="var(--muted-foreground)" />
      <Tooltip
        cursor={{
          stroke: "var(--muted-foreground)",
        }}
        contentStyle={{
          backgroundColor: "var(--background)",
          borderColor: "var(--muted-foreground)",
        }}
      />
      {lines.map((d, i) => (
        <Line
          key={i}
          type="monotone"
          dataKey={d.dataKey}
          stroke={d.stroke}
          dot={{
            fill: d.stroke,
          }}
        />
      ))}
    </LineChart>
  );
}
