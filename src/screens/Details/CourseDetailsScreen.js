import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../../redux/slices/favouritesSlice';
import { getTheme } from '../../utils/theme';
import { formatStudents, getLevelColor, getStatusColor } from '../../utils/helpers';
import { persistState } from '../../redux/store';
import LoadingSpinner from '../../components/LoadingSpinner';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

/**
 * CourseDetailsScreen Component
 * Displays detailed information about a course
 */
const CourseDetailsScreen = ({ route, navigation }) => {
  const { course } = route.params;
  const dispatch = useDispatch();
  const favouriteIds = useSelector((state) => state.favourites.items);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = getTheme(themeMode);
  const [loading, setLoading] = useState(false);
  
  const isFavourite = favouriteIds.includes(course.id);

  /**
   * Set header with favourite button
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleFavouriteToggle}
        >
          <Icon
            name={isFavourite ? 'heart' : 'heart'}
            size={24}
            color={isFavourite ? theme.error : theme.text}
          />
        </TouchableOpacity>
      ),
    });
  }, [isFavourite, themeMode]);

  /**
   * Handle favourite toggle
   */
  const handleFavouriteToggle = async () => {
    dispatch(toggleFavourite(course.id));
    // Persist favourites to AsyncStorage
    const state = {
      favourites: { items: [...useSelector((state) => state.favourites.items)] },
      theme: { mode: themeMode },
      auth: useSelector((state) => state.auth),
    };
    await persistState(state);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Course Image */}
      <Image
        source={{ uri: course.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Course Content */}
      <View style={styles.content}>
        {/* Title and Status */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{course.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(course.status) }]}>
            <Text style={styles.statusText}>{course.status}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {course.rating?.toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Rating
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Icon name="users" size={20} color={theme.primary} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {(course.students / 1000).toFixed(1)}k
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Students
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Icon name="book-open" size={20} color={theme.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {course.lessons}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Lessons
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About This Course</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {course.description}
          </Text>
        </View>

        {/* Course Details */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Course Information</Text>
          
          <View style={[styles.detailRow, { borderColor: theme.border }]}>
            <Icon name="bookmark" size={18} color={theme.textSecondary} />
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Category</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{course.category}</Text>
          </View>

          <View style={[styles.detailRow, { borderColor: theme.border }]}>
            <Icon name="bar-chart" size={18} color={theme.textSecondary} />
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Level</Text>
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(course.level) }]}>
              <Text style={styles.levelText}>{course.level}</Text>
            </View>
          </View>

          <View style={[styles.detailRow, { borderColor: theme.border }]}>
            <Icon name="clock" size={18} color={theme.textSecondary} />
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Duration</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{course.duration}</Text>
          </View>

          <View style={[styles.detailRow, { borderColor: theme.border }]}>
            <Icon name="users" size={18} color={theme.textSecondary} />
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Students</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>
              {formatStudents(course.students)}
            </Text>
          </View>
        </View>

        {/* What You'll Learn */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>What You'll Learn</Text>
          {[
            'Master key concepts and practical skills',
            'Build real-world projects',
            'Learn industry best practices',
            'Get hands-on experience',
            'Earn a certificate of completion',
          ].map((item, index) => (
            <View key={index} style={styles.learningItem}>
              <Icon name="check-circle" size={18} color={theme.success} />
              <Text style={[styles.learningText, { color: theme.textSecondary }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>

        {/* Enroll Button */}
        <TouchableOpacity style={[styles.enrollButton, { backgroundColor: theme.primary }]}>
          <Text style={styles.enrollText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: width * 0.6,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 32,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  learningItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  learningText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  enrollButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  enrollText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default CourseDetailsScreen;
