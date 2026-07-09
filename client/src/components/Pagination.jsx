const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">
        Showing page {pagination.page} of {pagination.totalPages || 1}
      </p>
      <div className="flex gap-2">
        <button disabled={!pagination.hasPrevPage} onClick={() => onPageChange(pagination.page - 1)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">
          Previous
        </button>
        {Array.from({ length: pagination.totalPages || 1 }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => onPageChange(pageNumber)} className={`rounded-lg px-3 py-2 text-sm ${pagination.page === pageNumber ? 'bg-sky-600 text-white' : 'border border-slate-200'}`}>
            {pageNumber}
          </button>
        ))}
        <button disabled={!pagination.hasNextPage} onClick={() => onPageChange(pagination.page + 1)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
