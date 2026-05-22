import { cn } from "@/lib/utils";

import { ColsType } from "./types";

type TableHeaderProps<ColumnKey, Item> = {
  cols: ColsType<ColumnKey, Item>;
  gridClassName: string;
  isColumnVisible: (column: ColumnKey) => boolean;
};

function TableHeader<ColumnKey, Item>({
  cols,
  gridClassName,
  isColumnVisible,
}: TableHeaderProps<ColumnKey, Item>) {
  return (
    <div
      className={cn(
        "bg-primary grid rounded-t-xl p-2 text-sm text-white",
        "[&_div]:flex [&_div]:items-center [&_div]:truncate",
        gridClassName,
      )}
    >
      {cols.map((col, i) => {
        const colSpanClass = `col-span-${col.colSpan ?? 1}`;
        const alignClass =
          col.align == "center"
            ? "justify-center"
            : col.align == "end"
              ? "justify-end"
              : "justify-start";
        return (
          isColumnVisible(col.accessorKey) && (
            <div
              key={i}
              className={cn(
                "flex items-center capitalize",
                colSpanClass,
                alignClass,
              )}
            >
              {col.header}
            </div>
          )
        );
      })}
    </div>
  );
}
export default TableHeader;
