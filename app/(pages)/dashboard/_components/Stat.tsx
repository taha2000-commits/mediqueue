import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
type ChartNum = 0 | 1 | 2 | 3 | 4;
const getChart = (chart: { fillClass: string; strokeClass: string }) => [
  <svg key={0} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      className={chart?.fillClass ?? "fill-primary/20"}
      d="M0,96L30,96C60,96,120,96,180,122.7C240,149,300,203,360,234.7C420,267,480,277,540,234.7C600,192,660,96,720,69.3C780,43,840,85,900,128C960,171,1020,213,1080,208C1140,203,1200,149,1260,160C1320,171,1380,245,1410,282.7L1440,320L1440,320L0,320Z"
    />
    <path
      className={chart?.strokeClass ?? "stroke-primary"}
      d="M0,96L30,96C60,96,120,96,180,122.7C240,149,300,203,360,234.7C420,267,480,277,540,234.7C600,192,660,96,720,69.3C780,43,840,85,900,128C960,171,1020,213,1080,208C1140,203,1200,149,1260,160C1320,171,1380,245,1410,282.7L1440,320"
      fill="none"
      strokeWidth="3"
    />
  </svg>,
  <svg key={1} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      className={chart?.fillClass ?? "fill-primary/20"}
      d="M0,288L34.3,250.7C68.6,213,137,139,206,112C274.3,85,343,107,411,133.3C480,160,549,192,617,176C685.7,160,754,96,823,101.3C891.4,107,960,181,1029,197.3C1097.1,213,1166,171,1234,170.7C1302.9,171,1371,213,1406,234.7L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
    />

    <path
      d="M0,288L34.3,250.7C68.6,213,137,139,206,112C274.3,85,343,107,411,133.3C480,160,549,192,617,176C685.7,160,754,96,823,101.3C891.4,107,960,181,1029,197.3C1097.1,213,1166,171,1234,170.7C1302.9,171,1371,213,1406,234.7L1440,256"
      fill="none"
      className={chart?.strokeClass ?? "stroke-primary"}
      strokeWidth="4"
    />
  </svg>,
  <svg key={2} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      className={chart?.fillClass ?? "fill-primary/20"}
      d="M0,256L10.9,245.3C21.8,235,44,213,65,181.3C87.3,149,109,107,131,90.7C152.7,75,175,85,196,128C218.2,171,240,245,262,250.7C283.6,256,305,192,327,176C349.1,160,371,192,393,176C414.5,160,436,96,458,74.7C480,53,502,75,524,112C545.5,149,567,203,589,218.7C610.9,235,633,213,655,213.3C676.4,213,698,235,720,202.7C741.8,171,764,85,785,69.3C807.3,53,829,107,851,117.3C872.7,128,895,96,916,96C938.2,96,960,128,982,165.3C1003.6,203,1025,245,1047,266.7C1069.1,288,1091,288,1113,277.3C1134.5,267,1156,245,1178,213.3C1200,181,1222,139,1244,144C1265.5,149,1287,203,1309,213.3C1330.9,224,1353,192,1375,165.3C1396.4,139,1418,117,1429,106.7L1440,96L1440,320L0,320Z"
    />

    <path
      d="M0,256L10.9,245.3C21.8,235,44,213,65,181.3C87.3,149,109,107,131,90.7C152.7,75,175,85,196,128C218.2,171,240,245,262,250.7C283.6,256,305,192,327,176C349.1,160,371,192,393,176C414.5,160,436,96,458,74.7C480,53,502,75,524,112C545.5,149,567,203,589,218.7C610.9,235,633,213,655,213.3C676.4,213,698,235,720,202.7C741.8,171,764,85,785,69.3C807.3,53,829,107,851,117.3C872.7,128,895,96,916,96C938.2,96,960,128,982,165.3C1003.6,203,1025,245,1047,266.7C1069.1,288,1091,288,1113,277.3C1134.5,267,1156,245,1178,213.3C1200,181,1222,139,1244,144C1265.5,149,1287,203,1309,213.3C1330.9,224,1353,192,1375,165.3C1396.4,139,1418,117,1429,106.7L1440,96"
      fill="none"
      className={chart?.strokeClass ?? "stroke-primary"}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>,
  <svg key={3} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      className={chart?.fillClass ?? "fill-primary/20"}
      d="M0,288L40,250.7C80,213,160,139,240,96C320,53,400,43,480,80C560,117,640,203,720,229.3C800,256,880,224,960,181.3C1040,139,1120,85,1200,80C1280,75,1360,117,1400,138.7L1440,160L1440,320L0,320Z"
    />

    <path
      d="M0,288L40,250.7C80,213,160,139,240,96C320,53,400,43,480,80C560,117,640,203,720,229.3C800,256,880,224,960,181.3C1040,139,1120,85,1200,80C1280,75,1360,117,1400,138.7L1440,160"
      fill="none"
      className={chart?.strokeClass ?? "stroke-primary"}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  <svg key={4} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      className={chart?.fillClass ?? "fill-primary/20"}
      d="M0,256L120,245.3C240,235,480,213,720,192C960,171,1200,149,1320,138.7L1440,128L1440,320L0,320Z"
    />

    <path
      d="M0,256L120,245.3C240,235,480,213,720,192C960,171,1200,149,1320,138.7L1440,128"
      fill="none"
      className={chart?.strokeClass ?? "stroke-primary"}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

function Stat({
  title,
  value,
  icon,
  className,
  iconClassName,
  chart,
}: {
  title: string;
  value: number | string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  chart?: {
    num?: ChartNum;
    fillClass: string;
    strokeClass: string;
  };
}) {
  const Icon = icon;
  return (
    <div
      className={cn("bg-secondary space-y-1 rounded-xl p-4 shadow", className)}
    >
      <div className="flex gap-4">
        <div className={cn("h-fit w-fit rounded-full p-3", iconClassName)}>
          <Icon size={30} />
        </div>
        <div className="">
          <h4 className="">{title}</h4>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
      {chart && getChart(chart)[chart.num ?? 0]}
    </div>
  );
}
export default Stat;
