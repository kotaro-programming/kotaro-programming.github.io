import Link from "next/link";

const createRange = (count: number) =>
  Array.from({ length: count }, (_, index) => index + 1);

type PaginationProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = createRange(totalPages);

  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}/page/${page}`;

  return (
    <nav className="pagination" aria-label="Pagination">
      <Link
        className={`page-link ${currentPage === 1 ? "is-disabled" : ""}`}
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
      >
        ← Prev
      </Link>
      <div className="page-list">
        {pages.map((page) => (
          <Link
            key={page}
            className={`page-number ${page === currentPage ? "is-active" : ""}`}
            href={pageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link
        className={`page-link ${currentPage === totalPages ? "is-disabled" : ""}`}
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
      >
        Next →
      </Link>
    </nav>
  );
}
