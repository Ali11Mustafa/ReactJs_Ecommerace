import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/products/paginationSlice";

const Pagination = () => {
  const { currentPage, lastPage } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (page > 0 && page <= lastPage) {
      dispatch(setPage(page));
    }
  };

  const generatePages = () => {
    const pages = [];
    if (lastPage <= 7) {
      // If total pages are 7 or less, show all pages
      for (let i = 1; i <= lastPage; i++) pages.push(i);
    } else {
      // Otherwise, implement a concise pagination
      if (currentPage > 3) pages.push(1, 2, "...");
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(lastPage, currentPage + 2);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < lastPage - 2) pages.push("...", lastPage);
    }
    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4 scale-[0.6] md:scale-[1]">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-4 py-2 border rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
