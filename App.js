import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import store, { loadPersistedState } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingSpinner from './src/components/LoadingSpinner';

/**
 * AppContent Component
 * Handles app initialization and loading persisted state
 */
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const themeMode = useSelector((state) => state.theme.mode);

  /**
   * Load persisted state on app startup
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadPersistedState(store.dispatch);
      } catch (error) {
        console.error('Error loading persisted state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <RootNavigator />
    </>
  );
};

/**
 * Main App Component
 * Root component with Redux Provider
 */
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}
