import leftArrowIcon from '../assets/icons/pagination/leftArrow.svg'
import rightArrowIcon from '../assets/icons/pagination/rightArrow.svg'
import type { Table } from '@tanstack/react-table';

interface PaginationProps {
    table: Table<any>;
}

function Pagination({ table }: PaginationProps) {
    const page = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();

    function getPages() {
        const pages: (number | "...")[] = [];
        const maxAround = 1;

        for (let i = 1; i <= pageCount; i++) {
            if (
                i === 1 ||
                i === pageCount ||
                Math.abs(i - page) <= maxAround
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    }

    return (
        <div dir='rtl' className="flex items-center justify-center gap-3 py-4 text-sm select-none">

            <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="disabled:opacity-40"
            >
                <img src={rightArrowIcon} className='w-[6px] h-[9px]' alt="" />
            </button>

            <div className="flex items-center gap-2">
                {getPages().map((p, i) =>
                    p === "..." ? (
                        <span key={i}>...</span>
                    ) : (
                        <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center rounded-full
                                ${p === page ? "bg-green-500 text-white" : ""}
                            `}
                            onClick={() => table.setPageIndex(p - 1)}
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="disabled:opacity-40"
            >
                <img src={leftArrowIcon} className='w-[6px] h-[9px]' alt="" />
            </button>

        </div>
    );
}

export default Pagination;
