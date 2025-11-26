import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import coursesReducer from './slices/coursesSlice';
import favouritesReducer from './slices/favouritesSlice';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';

/**
 * Redux Store Configuration
 * Combines all slices and configures the store
 */
const store = configureStore({
  reducer: {
    courses: coursesReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/**
 * Load persisted state from AsyncStorage
 */
export const loadPersistedState = async (dispatch) => {
  try {
    // Load favourites
    const favouritesData = await AsyncStorage.getItem('favourites');
    if (favouritesData) {
      const { setFavourites } = require('./slices/favouritesSlice');
      dispatch(setFavourites(JSON.parse(favouritesData)));
    }

    // Load theme
    const themeData = await AsyncStorage.getItem('theme');
    if (themeData) {
      const { setTheme } = require('./slices/themeSlice');
      dispatch(setTheme(themeData));
    }

    // Load auth state
    const authData = await AsyncStorage.getItem('auth');
    if (authData) {
      const { setAuthState } = require('./slices/authSlice');
      dispatch(setAuthState(JSON.parse(authData)));
    }
  } catch (error) {
    console.error('Error loading persisted state:', error);
  }
};

/**
 * Persist state to AsyncStorage
 */
export const persistState = async (state) => {
  try {
    // Persist favourites
    await AsyncStorage.setItem('favourites', JSON.stringify(state.favourites.items));
    
    // Persist theme
    await AsyncStorage.setItem('theme', state.theme.mode);
    
    // Persist auth state
    await AsyncStorage.setItem('auth', JSON.stringify({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      token: state.auth.token,
    }));
  } catch (error) {
    console.error('Error persisting state:', error);
  }
};

export default store;
