import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { getTheme } from '../../utils/theme';
import { persistState } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

/**
 * ProfileScreen Component
 * Displays user profile and app settings
 */
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const themeMode = useSelector((state) => state.theme.mode);
  const favouriteCount = useSelector((state) => state.favourites.items.length);
  const theme = getTheme(themeMode);
  const isDarkMode = themeMode === 'dark';

  /**
   * Handle theme toggle
   */
  const handleThemeToggle = async () => {
    dispatch(toggleTheme());
    // Persist theme to AsyncStorage
    const newMode = isDarkMode ? 'light' : 'dark';
    await AsyncStorage.setItem('theme', newMode);
  };

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      dispatch(logout());
      await AsyncStorage.removeItem('auth');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  /**
   * Render menu item
   */
  const MenuItem = ({ icon, title, value, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.menuLeft}>
        <Icon name={icon} size={22} color={theme.primary} />
        <Text style={[styles.menuTitle, { color: theme.text }]}>{title}</Text>
      </View>
      <View style={styles.menuRight}>
        {value && <Text style={[styles.menuValue, { color: theme.textSecondary }]}>{value}</Text>}
        {rightComponent}
        {showArrow && onPress && (
          <Icon name="chevron-right" size={20} color={theme.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={[styles.name, { color: theme.text }]}>{user?.name || 'User'}</Text>
        <Text style={[styles.email, { color: theme.textSecondary }]}>
          {user?.email || 'user@example.com'}
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>STATISTICS</Text>
        <MenuItem
          icon="heart"
          title="Favourite Courses"
          value={favouriteCount.toString()}
          showArrow={false}
        />
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SETTINGS</Text>
        <MenuItem
          icon="moon"
          title="Dark Mode"
          showArrow={false}
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          }
        />
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT</Text>
        <MenuItem
          icon="log-out"
          title="Logout"
          onPress={handleLogout}
          showArrow={false}
        />
      </View>

      {/* App Info */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          SkillStack v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
  },
});

export default ProfileScreen;
