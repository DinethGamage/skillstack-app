import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../../redux/slices/favouritesSlice';
import { getTheme } from '../../utils/theme';
import { persistState } from '../../redux/store';
import CourseCard from '../../components/CourseCard';
import EmptyState from '../../components/EmptyState';

/**
 * FavouritesScreen Component
 * Displays user's favourite courses
 */
const FavouritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favouriteIds = useSelector((state) => state.favourites.items);
  const allCourses = useSelector((state) => state.courses.items);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);

  // Get favourite courses from all courses
  const favouriteCourses = allCourses.filter(course => 
    favouriteIds.includes(course.id)
  );

  /**
   * Handle favourite toggle (remove from favourites)
   */
  const handleFavouritePress = async (courseId) => {
    dispatch(toggleFavourite(courseId));
    // Persist favourites to AsyncStorage
    const state = {
      favourites: { items: [...useSelector((state) => state.favourites.items)] },
      theme: { mode: themeMode },
      auth: useSelector((state) => state.auth),
    };
    await persistState(state);
  };

  /**
   * Navigate to course details
   */
  const navigateToDetails = (course) => {
    navigation.navigate('Details', { course });
  };

  /**
   * Render course card
   */
  const renderCourseCard = ({ item }) => (
    <CourseCard
      course={item}
      onPress={() => navigateToDetails(item)}
      onFavouritePress={() => handleFavouritePress(item.id)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {favouriteCourses.length === 0 ? (
        <EmptyState
          icon="heart"
          title="No Favourites Yet"
          subtitle="Start adding courses to your favourites"
        />
      ) : (
        <FlatList
          data={favouriteCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 16,
  },
});

export default FavouritesScreen;
