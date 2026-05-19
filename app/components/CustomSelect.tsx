"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
interface CustomSelectProps {
  name?: string;
  defaultValue: string;
  onValueChange?(value: string): void;
  placeholder: string;
  className?: string;
  options: { value: string; text: string }[];
}

function CustomSelect({
  className = "",
  defaultValue,
  options,
  placeholder,
  name,
  onValueChange,
}: CustomSelectProps) {
  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        className={cn((className = "border-ring w-full border"), className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
