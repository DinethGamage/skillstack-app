import { createSlice } from '@reduxjs/toolkit';

/**
 * Favourites Slice
 * Manages user's favourite courses with persistence
 */
const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    items: [], // Array of course IDs
  },
  reducers: {
    // Add a course to favourites
    addFavourite: (state, action) => {
      const courseId = action.payload;
      if (!state.items.includes(courseId)) {
        state.items.push(courseId);
      }
    },
    // Remove a course from favourites
    removeFavourite: (state, action) => {
      const courseId = action.payload;
      state.items = state.items.filter(id => id !== courseId);
    },
    // Toggle favourite status
    toggleFavourite: (state, action) => {
      const courseId = action.payload;
      const index = state.items.indexOf(courseId);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(courseId);
      }
    },
    // Set favourites (used when loading from AsyncStorage)
    setFavourites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addFavourite, removeFavourite, toggleFavourite, setFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
