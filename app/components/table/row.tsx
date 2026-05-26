import { cn } from "@/lib/utils";

import { ColsType } from "./types";

type PatientRowProps<ColumnKey, Item> = {
  item: Item;
  cols: ColsType<ColumnKey, Item>;
  selected?: boolean;
  gridClassName: string;
  isColumnVisible: (column: ColumnKey) => boolean;
  onClick?: () => void;
};

function PatientRow<ColumnKey, Item>({
  cols,
  item,
  selected = false,
  gridClassName,
  isColumnVisible,
  // onClick = () => {},
}: PatientRowProps<ColumnKey, Item>) {
  return (
    <div
      className={cn(
        "border-border hover:bg-background grid cursor-pointer p-2 text-sm not-last:border-b",
        gridClassName,
        selected && "bg-background",
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
          isColumnVisible(col.columnKey) && (
            <div
              key={i}
              className={cn(
                "flex w-full items-center",
                colSpanClass,
                alignClass,
              )}
            >
              {col.cell
                ? col.cell(item)
                : col.value
                  ? col.value(item[col.accessorKey as keyof Item])
                  : (item[col.accessorKey as keyof Item] as string)
                    ? (item[col.accessorKey as keyof Item] as string)
                    : "-"}
            </div>
          )
        );
      })}
    </div>
  );
}
export default PatientRow;
