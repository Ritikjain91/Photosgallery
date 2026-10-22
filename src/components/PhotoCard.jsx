import React, { useState } from 'react';

/**
 * PhotoCard component displays a single photo card with:
 *  - Photo image
 *  - Author name
 *  - Interactive Heart icon button to toggle favorites
 */
function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // We use an optimized dimensions URL from Picsum for fast loading,
  // falling back to photo.download_url
  const imageUrl = `https://picsum.photos/id/${photo.id}/600/450`;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      {/* Image Container with fixed aspect ratio to prevent layout shifts */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 text-xs">
            Loading image...
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
            <svg
              className="w-8 h-8 mb-1 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Photo by ${photo.author}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Card Footer: Author Name & Favorite Heart Button */}
      <div className="p-4 flex items-center justify-between gap-3 bg-white mt-auto">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider font-medium text-slate-400">
            Author
          </p>
          <h3
            className="text-sm md:text-base font-semibold text-slate-800 truncate"
            title={photo.author}
          >
            {photo.author}
          </h3>
        </div>

        {/* Heart Icon Button */}
        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={isFavorite ? 'Remove from favourites' : 'Mark as favourite'}
          title={isFavorite ? 'Remove from favourites' : 'Mark as favourite'}
          className={`p-2.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
          }`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 active:scale-125 ${
              isFavorite ? 'fill-rose-500 stroke-rose-500 scale-110' : 'fill-none stroke-current'
            }`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default React.memo(PhotoCard);
