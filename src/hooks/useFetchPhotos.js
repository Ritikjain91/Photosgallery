import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to fetch 30 photos from Picsum API.
 * 
 * Returns:
 *  - photos: Array of fetched photo objects
 *  - loading: Boolean indicating whether fetch is in progress
 *  - error: Error message string or null
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController allows us to cancel fetch if component unmounts
    const controller = new AbortController();

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        // If the server response status is not 200-299, throw an error
        if (!response.ok) {
          throw new Error(`Failed to load photos (Status: ${response.status})`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Do not update error state if the fetch was intentionally aborted
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred while fetching photos.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadPhotos();

    // Clean up controller if component unmounts during request
    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}
