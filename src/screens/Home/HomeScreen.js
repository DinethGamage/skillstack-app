import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setCourses, setError } from '../../redux/slices/coursesSlice';
import { toggleFavourite } from '../../redux/slices/favouritesSlice';
import { fetchCourses } from '../../services/api';
import { getTheme } from '../../utils/theme';
import { persistState } from '../../redux/store';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import Icon from 'react-native-vector-icons/Feather';

/**
 * HomeScreen Component
 * Displays list of courses fetched from API
 */
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: courses, loading } = useSelector((state) => state.courses);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);

  /**
   * Load courses on component mount
   */
  useEffect(() => {
    loadCourses();
  }, []);

  /**
   * Filter courses based on search query
   */
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  /**
   * Fetch courses from API
   */
  const loadCourses = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchCourses();
      dispatch(setCourses(data));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await loadCourses();
    setRefreshing(false);
  };

  /**
   * Handle favourite toggle
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

  if (loading && courses.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Icon name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search courses..."
          placeholderTextColor={theme.placeholder}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="x" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Courses List */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Courses Found"
          subtitle={searchQuery ? 'Try adjusting your search' : 'Pull to refresh'}
        />
      ) : (
        <FlatList
          data={filteredCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.primary}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
});

export default HomeScreen;
