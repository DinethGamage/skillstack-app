import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

/**
 * RootNavigator Component
 * Root navigation that switches between Auth and App based on authentication state
 */
const RootNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  // Navigation theme configuration
  const navigationTheme = {
    dark: themeMode === 'dark',
    colors: {
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.accent,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
