# Photo Gallery Web App

A responsive React photo gallery web application built with **React**, **Vite**, and **Tailwind CSS**. It fetches photos from the Picsum API, renders them in a responsive multi-column grid, supports real-time author filtering, and manages persistent favorites using `useReducer` and `localStorage`.

Built as part of the Celebrare Frontend React Internship Pre-Screening Assignment.

---

## 🚀 Features

1. **Project Setup**: Built from scratch using React 19 + Vite and styled exclusively with Tailwind CSS.
2. **API Integration**: Fetches 30 photos on load from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30). Includes loading spinner and graceful error handling.
3. **Responsive Grid**:
   - **Desktop** (≥1024px): 4 columns
   - **Tablet** (≥768px): 2 columns
   - **Mobile** (<768px): 1 column
   - Each card displays the image, the author's name, and an interactive heart toggle button.
4. **Real-Time Search Filter**: Search bar at the top that filters photos by author name in real time without extra API calls or page reloads.
5. **Favourites with `useReducer` + `localStorage`**:
   - Favorites state is managed with a dedicated `favoritesReducer` (no `useState`).
   - Persists state across browser refreshes via `localStorage` with lazy initialization.
6. **Custom Hook (`useFetchPhotos`)**: Encapsulates fetch logic, loading status, and error handling with `AbortController` cleanup.
7. **Performance Optimization (`useCallback` & `useMemo`)**:
   - `useCallback` memoizes search and toggle event handler references.
   - `useMemo` computes the filtered photos list to prevent redundant calculations on unrelated renders.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Gallery.jsx       # Main gallery view (combines search, grid, states)
│   ├── PhotoCard.jsx     # Individual photo card with image, author & heart
│   └── SearchBar.jsx     # Search input with clear button and counter
├── hooks/
│   └── useFetchPhotos.js # Custom hook returning { photos, loading, error }
├── reducers/
│   └── favoritesReducer.js # useReducer logic & localStorage lazy initializer
├── App.jsx               # Application root layout
├── index.css             # Tailwind CSS imports and base styles
└── main.jsx              # Application entry point
```

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🎥 Video Recording Guide & Talking Points

Here is a quick cheat sheet for the 5-minute screen recording:

### 1. App Demo
- Show the photos loading initially.
- Type an author's name (e.g. `Paul` or `Alejandro`) into the search bar to demonstrate instant, real-time filtering.
- Click the heart icon on a couple of photos to mark them as favorites (note the filled red heart).
- Refresh the browser (F5) to show that favorited photos stay favorited via `localStorage`.

### 2. Custom Hook: `useFetchPhotos` (`src/hooks/useFetchPhotos.js`)
- **What it returns:** Returns `{ photos, loading, error }`.
- **Failure handling:** If the network fails or the response status is not 200–299 (`!response.ok`), the catch block captures the error and sets the `error` state. We also use an `AbortController` cleanup to avoid state updates if the component unmounts mid-request.

### 3. Reducer: `favoritesReducer` (`src/reducers/favoritesReducer.js`)
- **Actions handled:** `TOGGLE_FAVORITE` (adds the photo ID if not present; removes it if already present).
- **Why `useReducer` over `useState`?**
  1. **Separation of Concerns:** Keeps state transition rules in a pure function outside UI components.
  2. **Predictability & Scalability:** Easier to add new actions (e.g., clear all, batch favoriting) without cluttering components.
  3. **Reliable Initialization:** Pairable with a lazy initializer (`getInitialFavorites`) to safely read from `localStorage` only once on mount.

### 4. Performance Hooks: `useCallback` & `useMemo` (`src/components/Gallery.jsx`)
- **`useCallback` (on search handler):** Preserves the function identity of `handleSearchChange`. When passed as a prop to `<SearchBar />` (which is wrapped in `React.memo`), it prevents unnecessary re-renders of the search bar when other states (like favorites) update.
- **`useMemo` (on filtered photos):** Caches the filtered array result. It only recalculates when either `photos` or `searchTerm` changes. Without `useMemo`, clicking any favorite button would trigger a full re-filtering of the entire photo list.

### 5. Hardest Part & Solution
- **Problem:** Synchronizing `useReducer` state with `localStorage` properly without hydration mismatches or reading from storage on every single re-render.
- **Solution:** Used `useReducer`'s 3rd argument (the lazy initializer `getInitialFavorites`) to read from `localStorage` once on initial mount, and combined it with a `useEffect` that triggers writes to `localStorage` only when `favorites` state changes.
