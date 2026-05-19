import { cn } from "@/lib/utils";

import Pagination from "./Pagination";
import { RowsPerPage } from "./RowsPerPage";

interface PaginationFooterProps {
  count: number;
  from: number;
  next: number | null;
  numOfPage: number;
  page: number;
  prev: number | null;
  to: number;
  className?: string;
  showRowPerPage?: boolean;
}

function PaginationFooter({
  count,
  from,
  next,
  numOfPage,
  page,
  prev,
  to,
  className = "",
  showRowPerPage = true,
}: PaginationFooterProps) {
  if (!count) return;
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <p className="text-muted-foreground text-sm normal-case">
        Showing {from} to {to} from {count}
      </p>
      <Pagination next={next} page={page} prev={prev} numOfPage={numOfPage} />
      {showRowPerPage && <RowsPerPage count={count} />}
    </div>
  );
}
export default PaginationFooter;
