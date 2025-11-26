import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';

/**
 * LoadingSpinner Component
 * Displays a centered loading spinner
 */
const LoadingSpinner = ({ size = 'large' }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingSpinner;
