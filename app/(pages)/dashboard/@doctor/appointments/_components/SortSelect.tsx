"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

export function SortSelect() {
  const { urlSearchParams } = useHandleSearchParams();
  return (
    <Select
      defaultValue="newest"
      onValueChange={(val) => urlSearchParams.set("sort", val)}
    >
      <SelectTrigger className="border-ring w-full max-w-48 border">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="newest">Newest first</SelectItem>
          <SelectItem value="oldest">Oldest first</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
