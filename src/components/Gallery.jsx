import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favoritesReducer,
  getInitialFavorites,
  FAVORITES_ACTIONS,
  STORAGE_KEY,
} from '../reducers/favoritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';

export default function Gallery() {
  // Requirement 6: Use custom hook useFetchPhotos to retrieve photos, loading, error
  const { photos, loading, error } = useFetchPhotos();

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Requirement 5: Manage favourites list using useReducer (persisted in localStorage)
  const [favorites, dispatch] = useReducer(favoritesReducer, [], getInitialFavorites);

  // Sync favorites state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  // Requirement 7: useCallback on the search filter handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Handler to clear search input
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Handler to toggle favorite status for a photo
  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({
      type: FAVORITES_ACTIONS.TOGGLE_FAVORITE,
      payload: photoId,
    });
  }, []);

  // Requirement 7: useMemo to compute the filtered photo list by author name
  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) {
      return photos;
    }

    const query = searchTerm.toLowerCase().trim();
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Photo Gallery
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Explore curated photos from Picsum API and save your favourites.
        </p>
      </header>

      {/* Requirement 4: Search input at the top */}
      <SearchBar
        value={searchTerm}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        totalCount={photos.length}
        filteredCount={filteredPhotos.length}
      />

      {/* Requirement 2: Show a loading spinner while fetching */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <svg
            className="animate-spin h-10 w-10 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <p className="text-base font-medium">Loading photos...</p>
        </div>
      )}

      {/* Requirement 2: Show an error message if the fetch fails */}
      {error && !loading && (
        <div className="max-w-xl mx-auto my-8 p-4 bg-rose-50 border border-rose-200 rounded-xl text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose-100 text-rose-600 mb-2">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-base font-semibold text-rose-800">
            Failed to Load Gallery
          </h2>
          <p className="text-sm text-rose-600 mt-1">{error}</p>
        </div>
      )}

      {/* Requirement 3: Responsive Grid (Desktop: 4 cols, Tablet: 2 cols, Mobile: 1 col) */}
      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Empty State when no photos match the search query */}
      {!loading && !error && photos.length > 0 && filteredPhotos.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-800">No photos found</h3>
          <p className="text-sm text-slate-500 mt-1">
            No author matches &ldquo;{searchTerm}&rdquo;. Try another name.
          </p>
          <button
            type="button"
            onClick={handleClearSearch}
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
