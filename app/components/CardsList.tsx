import SortButton from "./table/SortButton";
import { ColsType } from "./table/types";
import TooltipComponent from "./TooltipComponent";

type Props<ColumnKey, Item> = {
  data: Item[];
  cards: ColsType<ColumnKey, Item>;
};

function CardsList<ColumnKey, Item>({ data, cards }: Props<ColumnKey, Item>) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      {data.map((item, i) => (
        <div
          key={i}
          className="border-border overflow-hidden rounded-xl border"
        >
          {cards.map((col, j) =>
            col.accessorKey && !item[col.accessorKey as keyof Item] ? null : (
              <div
                key={j}
                className="border-border grid grid-cols-3 items-center gap-2 not-last:border-b"
              >
                <TooltipComponent
                  active={col.header.length > 12}
                  element={
                    <div className="bg-primary flex h-full flex-wrap items-center gap-2 p-1 ps-2 text-white capitalize">
                      <span className="truncate text-nowrap text-ellipsis">
                        {col.header}
                      </span>
                      {col.isSorted && (
                        <SortButton
                          param={`${col.accessorKey as string}`}
                          onSort={col.onSort}
                        />
                      )}
                    </div>
                  }
                  content={col.header}
                />

                <div key={j} className="col-span-2 p-1 pe-2">
                  {col.cell
                    ? col.cell(item)
                    : col.value
                      ? col.value(item[col.accessorKey as keyof Item])
                      : (item[col.accessorKey as keyof Item] as string)
                        ? (item[col.accessorKey as keyof Item] as string)
                        : "-"}
                </div>
              </div>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

export default CardsList;
