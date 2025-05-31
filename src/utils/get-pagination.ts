export default function getPagination(currentPage: number, totalPages: number) {
  const currPage = Number(currentPage || 1) || 1;
  const totalPage = Number(totalPages || 1) || 1;
  const pages = [] as any[];
  for (let i = 1; i <= totalPage; i++) {
    if (totalPage < 6) {
      pages.push(i);
    } else {
      if (i <= 2) {
        //Show first two pages
        pages.push(i);
      } else if (i === totalPage - 1 || i === totalPage) {
        //show last two pages
        pages.push(i);
      } else {
        if (currPage === i - 1 || currPage === i || currPage === i + 1) {
          //show current page and two adjacent pages
          pages.push(i);
        } else {
          if (
            (i === 3 && currPage !== 1 && currPage !== totalPage) ||
            i === totalPage - 2
          ) {
            pages.push("...");
          }
        }
      }
    }
  }

  // Remove duplicates and sort
  return pages;
}
