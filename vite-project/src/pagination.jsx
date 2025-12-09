import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold mr-2">Total Pages {currentPage}-{totalPages}</span>
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 border border-black disabled:opacity-30"
      >
        Prev
      </button>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-2 py-1 border border-black disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
};