import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';

/**
 * CustomButton Component
 * Reusable button with consistent styling
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {string} variant - 'primary' or 'secondary'
 * @param {boolean} loading - Show loading state
 * @param {boolean} disabled - Disable button
 */
const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
}) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  const buttonStyle = variant === 'primary' 
    ? { backgroundColor: theme.primary }
    : { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.primary };

  const textStyle = variant === 'primary'
    ? { color: '#FFFFFF' }
    : { color: theme.primary };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : theme.primary} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;
