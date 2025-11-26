import { createSlice } from '@reduxjs/toolkit';

/**
 * Courses Slice
 * Manages the state of courses fetched from the API
 */
const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Set loading state when fetching courses
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Store fetched courses
    setCourses: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Handle fetch errors
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setCourses, setError } = coursesSlice.actions;
export default coursesSlice.reducer;
