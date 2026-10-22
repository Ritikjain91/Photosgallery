import React from 'react';

/**
 * SearchBar component for filtering photos by author name.
 * Wrapped in React.memo to prevent unnecessary re-renders when parent states change,
 * which takes full advantage of the useCallback hook on the onChange handler.
 */
function SearchBar({ value, onChange, onClear, totalCount, filteredCount }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-8 px-4">
      <div className="relative flex items-center">
        {/* Search icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>

        {/* Search Input */}
        <input
          type="text"
          id="author-search"
          value={value}
          onChange={onChange}
          placeholder="Search by author name (e.g. Alejandro, Paul)..."
          className="w-full py-3.5 pl-11 pr-10 text-sm md:text-base text-slate-800 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out placeholder-slate-400"
          autoComplete="off"
        />

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Result counter indicator */}
      {value && (
        <p className="mt-2 text-xs md:text-sm text-slate-500 text-center">
          Showing <span className="font-semibold text-slate-700">{filteredCount}</span> of{' '}
          <span className="font-semibold text-slate-700">{totalCount}</span> photos
        </p>
      )}
    </div>
  );
}

export default React.memo(SearchBar);
