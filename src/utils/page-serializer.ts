export default function paginatedPageSerializer({
  currentPage,
  pageSize,
  index,
}: {
  currentPage: number;
  pageSize: number;
  index: number;
}) {
  return String((currentPage - 1) * pageSize + (index + 1));
}
