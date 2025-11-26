import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';
import TabNavigator from './TabNavigator';
import CourseDetailsScreen from '../screens/Details/CourseDetailsScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator Component
 * Main app navigation with tabs and course details
 */
const AppNavigator = () => {
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={CourseDetailsScreen}
        options={{
          title: 'Course Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
