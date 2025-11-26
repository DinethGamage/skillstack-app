import { createSlice } from '@reduxjs/toolkit';

/**
 * Theme Slice
 * Manages application theme (light/dark mode)
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light', // 'light' or 'dark'
  },
  reducers: {
    // Toggle between light and dark mode
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    // Set specific theme mode
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
