import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getTheme } from '../utils/theme';
import { truncateText, getStatusColor, formatStudents } from '../utils/helpers';
import Icon from 'react-native-vector-icons/Feather';

/**
 * CourseCard Component
 * Reusable card component for displaying course information
 * @param {object} course - Course data object
 * @param {function} onPress - Function to handle card press
 * @param {boolean} showFavourite - Show favourite icon
 * @param {function} onFavouritePress - Function to handle favourite press
 */
const CourseCard = ({ course, onPress, showFavourite = true, onFavouritePress }) => {
  const themeMode = useSelector((state) => state.theme.mode);
  const favourites = useSelector((state) => state.favourites.items);
  const theme = getTheme(themeMode);
  
  const isFavourite = favourites.includes(course.id);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Course Image */}
      <Image
        source={{ uri: course.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />
      
      {/* Favourite Button */}
      {showFavourite && (
        <TouchableOpacity
          style={[styles.favouriteButton, { backgroundColor: theme.card }]}
          onPress={onFavouritePress}
        >
          <Icon
            name={isFavourite ? 'heart' : 'heart'}
            size={20}
            color={isFavourite ? theme.error : theme.textSecondary}
            style={{ fontWeight: isFavourite ? 'bold' : 'normal' }}
          />
        </TouchableOpacity>
      )}
      
      {/* Course Content */}
      <View style={styles.content}>
        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(course.status) }]}>
          <Text style={styles.statusText}>{course.status}</Text>
        </View>
        
        {/* Course Title */}
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {course.title}
        </Text>
        
        {/* Category */}
        <View style={styles.categoryRow}>
          <Icon name="bookmark" size={14} color={theme.primary} />
          <Text style={[styles.category, { color: theme.primary }]}>
            {course.category}
          </Text>
        </View>
        
        {/* Course Footer */}
        <View style={styles.footer}>
          <View style={styles.metaItem}>
            <Icon name="clock" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {course.duration}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Icon name="book-open" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {course.lessons} lessons
            </Text>
          </View>
        </View>

        {/* Rating and Students */}
        <View style={styles.statsRow}>
          <View style={styles.rating}>
            <Icon name="star" size={14} color="#FFD700" />
            <Text style={[styles.ratingText, { color: theme.text }]}>
              {course.rating?.toFixed(1)}
            </Text>
          </View>
          <Text style={[styles.students, { color: theme.textSecondary }]}>
            {formatStudents(course.students)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  content: {
    padding: 12,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  category: {
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.1)',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  students: {
    fontSize: 12,
  },
});

export default CourseCard;
