import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
  nextLabel: string;
  previousLabel: string;
}

function Pagination({
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  onPageChange,
  forcePage,
  nextLabel,
  previousLabel,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={nextLabel}
      previousLabel={previousLabel}
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      forcePage={forcePage}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
export default Pagination;
