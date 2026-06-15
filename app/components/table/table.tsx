import { PersonStanding } from "lucide-react";

import EmptySection from "@/app/(pages)/dashboard/@doctor/_components/EmptySection";

import TableHeader from "./header";
import TableRow from "./row";
import { ColsType } from "./types";

type Props<ColumnKey, Item> = {
  data: Item[];
  excludedColumns?: ColumnKey[];
  cols: ColsType<ColumnKey, Item>;
};

function CustomTable<ColumnKey, Item>({
  data,
  cols,
  excludedColumns = [],
}: Props<ColumnKey, Item>) {
  const isColumnVisible = (column: ColumnKey) => {
    if (excludedColumns.includes(column)) return false;

    return true;
  };

  const gridCols = (() => {
    let colsNumber = cols.reduce((acc, col) => acc + (col.colSpan ?? 1), 0);

    for (const col of cols) {
      if (!isColumnVisible(col.columnKey)) colsNumber -= col.colSpan ?? 1;
    }

    return colsNumber;
  })();

  const colsArray = (() => {
    let c = cols;
    if (gridCols % 2 == 0)
      c = [
        { ...cols[0], colSpan: Number(cols[0].colSpan) + 1 },
        ...cols.slice(1),
      ];
    return c;
  })();

  const gridClassName = `grid-cols-${gridCols % 2 == 0 ? gridCols + 1 : gridCols}`;

  if (!data?.length) {
    return (
      <div className="h-fit">
        <TableHeader<ColumnKey, Item>
          gridClassName={gridClassName}
          isColumnVisible={isColumnVisible}
          cols={colsArray}
        />

        <div className="border-border rounded-b-xl border">
          <EmptySection
            title="No records yet"
            description="Newly registered patients will appear here."
            icon={PersonStanding}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-fit">
      <TableHeader<ColumnKey, Item>
        cols={colsArray}
        gridClassName={gridClassName}
        isColumnVisible={isColumnVisible}
      />

      {data.map((item, i) => (
        <TableRow<ColumnKey, Item>
          cols={colsArray}
          key={i}
          item={item}
          gridClassName={gridClassName}
          isColumnVisible={isColumnVisible}
        />
      ))}
    </div>
  );
}

export default CustomTable;
