"use client";
import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector,
} from "recharts";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps & { colors: string[] }) => {
  return (
    <Sector
      {...props}
      fill={props.colors[props.index % props.colors?.length]}
    />
  );
};

export default function PieChartWithCustomizedLabel({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: { name: string; value: number; color: string }[];
}) {
  const colors = data.map((entry) => entry.color);
  return (
    <PieChart
      style={{
        width: "50%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
      className="bg-background rounded-xl p-3 inset-shadow-sm"
    >
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={(props) => <MyCustomPie {...props} colors={colors} />}
      />
    </PieChart>
  );
}
