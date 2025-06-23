import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Skeleton } from "../loader/skeleton";
import { Search } from "lucide-react";
import Pagination from "../pagination";
import { pagination } from "../../types/pagination";
import ColumnSort from "../filterAndSort/column-sort";

interface Column<T> {
  key: string;
  header: string;
  render: (item: any, index?: number) => React.ReactNode;
  cellClassName?: string;
  showColumnSort?: boolean;
}
export default function TableTemplate({
  data,
  columns,
  isLoading,
  emptyStateText,
  showPaginator,
  pagination,
  onCurrentPageChange,
  onPageSizeChange,
  paginatorLabel,
}: {
  data: any[];
  columns: Column<any>[];
  isLoading?: boolean;
  emptyStateText?: string;
  showPaginator?: boolean;
  pagination?: pagination;
  onCurrentPageChange?: (val: number) => void;
  onPageSizeChange?: (val: number) => void;
  paginatorLabel?: string;
}) {
  return (
    <div className=" w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={String(column.key)}>
                <div className="flex gap-3 items-center">
                  {column.header}{" "}
                  {column.showColumnSort && (
                    <ColumnSort columnIdentifier={column.key} />
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loading state */}
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center space-y-3"
              >
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton key={item} className="h-12" />
                ))}
              </TableCell>
            </TableRow>
          )}

          {/* Empty State */}
          {data?.length < 1 && !isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className=" h-[320px] place-items-center"
              >
                <div className="flex flex-col items-center text-center space-y-4 text-gray-400">
                  <div className=" p-3 rounded-full shadow-lg shadow-primary">
                    <Search />
                  </div>
                  <p className="body-md-normal text-gray-400!tracking-wide">
                    {emptyStateText ?? "No data"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* Data state */}
          {data?.length > 0 &&
            !isLoading &&
            data.map((item, index: number) => (
              <TableRow key={item.id}>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    className={column.cellClassName}
                    key={`${String(column.key)}-${columnIndex}`}
                  >
                    {column.render(item, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {showPaginator && (
        <Pagination
          isLoading={Boolean(isLoading)}
          pagination={
            pagination || {
              current_page: 1,
              last_page: 1,
              per_page: 1,
              total: 1,
              from: 1,
              to: 1,
            }
          }
          label={paginatorLabel}
          setCurrentPage={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
