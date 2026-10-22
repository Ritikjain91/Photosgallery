// Action Types
export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

// localStorage key for saving favorited photo IDs
export const STORAGE_KEY = 'photo_gallery_favorites';

/**
 * Lazy initializer function for useReducer.
 * Reads existing favorite photo IDs from localStorage on initial page load.
 */
export function getInitialFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse favorites from localStorage:', error);
    return [];
  }
}

/**
 * Reducer function to manage favorite photo IDs.
 * State is an array of photo IDs that the user has marked as favorites.
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const photoId = action.payload;
      const isAlreadyFavorite = state.includes(photoId);

      // If already favorited, remove it; otherwise, add it to the list
      if (isAlreadyFavorite) {
        return state.filter((id) => id !== photoId);
      } else {
        return [...state, photoId];
      }
    }

    default:
      return state;
  }
}
