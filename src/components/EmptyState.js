import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';
import Icon from 'react-native-vector-icons/Feather';

/**
 * EmptyState Component
 * Displays when there's no data to show
 * @param {string} icon - Feather icon name
 * @param {string} title - Main message
 * @param {string} subtitle - Secondary message
 */
const EmptyState = ({ icon = 'inbox', title = 'No Data', subtitle = '' }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  return (
    <View style={styles.container}>
      <Icon name={icon} size={64} color={theme.textSecondary} />
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default EmptyState;
