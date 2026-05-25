import { ReactNode } from "react";

export type ColumnType<
  Item,
  ColumnKey,
  AccessorKey extends keyof Item = keyof Item,
> = {
  columnKey: ColumnKey;
  accessorKey?: AccessorKey;
  header: string;

  cell?: (item: Item) => ReactNode;
  value?: (value: Item[AccessorKey]) => string | number;

  colSpan?: number;
  align?: "center" | "start" | "end";
  onSort?: () => void;
  isSorted?: boolean;
};

export type ColsType<ColumnKey, Item> = ColumnType<Item, ColumnKey>[];
