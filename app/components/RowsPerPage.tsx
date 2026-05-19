"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

export const RowsPerPage = ({ count }: { count: number }) => {
  const { urlSearchParams } = useHandleSearchParams();
  return (
    <div className="flex items-center gap-2 text-sm">
      <p className="text-muted-foreground">rows per page</p>
      <Select
        onValueChange={(value) => {
          if (+value <= count) urlSearchParams.set("limit", value);
        }}
      >
        <SelectTrigger
          className="border-muted-foreground rounded-lg"
          defaultValue={"10"}
        >
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10" disabled={count < 10}>
            10
          </SelectItem>
          <SelectItem value="15" disabled={count < 15}>
            15
          </SelectItem>
          <SelectItem value="20" disabled={count < 20}>
            20
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
