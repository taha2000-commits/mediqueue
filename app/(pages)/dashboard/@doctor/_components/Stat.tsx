import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
function Stat({
  title,
  value,
  icon,
  className,
  iconClassName,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = icon;
  return (
    <div
      className={cn(
        "bg-second-background flex gap-4 rounded-xl p-4 shadow",
        className,
      )}
    >
      <div className={cn("h-fit w-fit rounded-full p-3", iconClassName)}>
        <Icon size={30} />
      </div>
      <div className="">
        <h4 className="">{title}</h4>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
}
export default Stat;
