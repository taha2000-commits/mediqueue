import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  age: number;
  type: string;
}
const AgeAndTypeBar = ({ className, age, type }: IProps) => {
  return (
    <div
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1 text-sm",
        className,
      )}
    >
      <span>{age} years</span>
      <span>-</span>
      <span className="capitalize">{type.split("_").join(" ")}</span>
    </div>
  );
};

export default AgeAndTypeBar;
