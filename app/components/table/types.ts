import { ReactNode } from "react";

export type ColsType<ColumnKey, Item> = {
  cell?: (props: Item) => ReactNode;
  value?: (value: string | number) => string;
  accessorKey: ColumnKey;
  colSpan?: number;
  header: string;
  align?: "center" | "start" | "end";
}[];
