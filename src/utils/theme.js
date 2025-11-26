/**
 * Theme Configuration
 * Defines light and dark theme colors
 */

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#007AFF',
  secondary: '#5856D6',
  accent: '#FF9500',
  error: '#FF3B30',
  success: '#34C759',
  border: '#E5E5E5',
  shadow: '#000000',
  placeholder: '#C7C7CC',
};

export const darkTheme = {
  background: '#000000',
  surface: '#1C1C1E',
  card: '#2C2C2E',
  text: '#FFFFFF',
  textSecondary: '#EBEBF5',
  primary: '#0A84FF',
  secondary: '#5E5CE6',
  accent: '#FF9F0A',
  error: '#FF453A',
  success: '#32D74B',
  border: '#38383A',
  shadow: '#FFFFFF',
  placeholder: '#636366',
};

/**
 * Get theme colors based on mode
 * @param {string} mode - 'light' or 'dark'
 * @returns {object} Theme colors
 */
export const getTheme = (mode) => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
